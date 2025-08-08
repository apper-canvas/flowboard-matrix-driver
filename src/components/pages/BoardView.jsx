import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import TaskModal from "@/components/organisms/TaskModal";
import ProjectModal from "@/components/organisms/ProjectModal";
import FilterBar from "@/components/molecules/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";
import { projectService } from "@/services/api/projectService";
import { isToday, isThisWeek, isThisMonth, isPast } from "date-fns";

const BoardView = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    priority: "",
    dateRange: "",
    searchQuery: ""
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [tasksData, projectsData] = await Promise.all([
        taskService.getAll(),
        projectService.getAll()
      ]);
      
      setTasks(tasksData);
      setProjects(projectsData);
      
      // Set first project as default if none selected
      if (!selectedProject && projectsData.length > 0) {
        setSelectedProject(projectsData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by selected project
    if (selectedProject) {
      filtered = filtered.filter(task => task.projectId === selectedProject.Id);
    }

    // Filter by priority
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Filter by date range
    if (filters.dateRange && filters.dateRange !== "") {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        
        switch (filters.dateRange) {
          case "today":
            return isToday(dueDate);
          case "week":
            return isThisWeek(dueDate);
          case "month":
            return isThisMonth(dueDate);
          case "overdue":
            return isPast(dueDate) && task.status !== "done";
          default:
            return true;
        }
      });
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [tasks, selectedProject, filters]);

  // Task operations
  const handleTaskSave = async (taskData) => {
    try {
      let savedTask;
      if (editingTask) {
        savedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => task.Id === editingTask.Id ? savedTask : task));
        toast.success("Task updated successfully!");
      } else {
        savedTask = await taskService.create(taskData);
        setTasks(prev => [...prev, savedTask]);
        toast.success("Task created successfully!");
      }
      
      // Update project task counts
      await updateProjectCounts();
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task");
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const savedTask = await taskService.update(updatedTask.Id, updatedTask);
      setTasks(prev => prev.map(task => task.Id === updatedTask.Id ? savedTask : task));
      
      if (updatedTask.status === "done") {
        toast.success("Task completed! 🎉");
      }
      
      await updateProjectCounts();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleTaskDelete = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      await updateProjectCounts();
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // Project operations
  const handleProjectSave = async (projectData) => {
    try {
      let savedProject;
      if (editingProject) {
        savedProject = await projectService.update(editingProject.Id, projectData);
        setProjects(prev => prev.map(project => project.Id === editingProject.Id ? savedProject : project));
        
        if (selectedProject && selectedProject.Id === editingProject.Id) {
          setSelectedProject(savedProject);
        }
        toast.success("Project updated successfully!");
      } else {
        savedProject = await projectService.create(projectData);
        setProjects(prev => [...prev, savedProject]);
        toast.success("Project created successfully!");
      }
      
      setEditingProject(null);
    } catch (err) {
      toast.error("Failed to save project");
    }
  };

  // Update project task counts
  const updateProjectCounts = async () => {
    try {
      const updatedTasks = await taskService.getAll();
      const updatedProjects = projects.map(project => {
        const projectTasks = updatedTasks.filter(task => task.projectId === project.Id);
        const completedTasks = projectTasks.filter(task => task.status === "done");
        
        return {
          ...project,
          taskCount: projectTasks.length,
          completedCount: completedTasks.length
        };
      });
      
      setProjects(updatedProjects);
      
      // Update selected project
      if (selectedProject) {
        const updatedSelected = updatedProjects.find(p => p.Id === selectedProject.Id);
        if (updatedSelected) {
          setSelectedProject(updatedSelected);
        }
      }
    } catch (err) {
      console.error("Failed to update project counts:", err);
    }
  };

  // Modal handlers
  const openTaskModal = (task = null) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const openProjectModal = (project = null) => {
    setEditingProject(project);
    setProjectModalOpen(true);
  };

  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} onRetry={loadData} />;

  return (
    <div className="min-h-screen bg-background">
      <Header
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        onAddTask={() => openTaskModal()}
        onAddProject={() => openProjectModal()}
      />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            onSearch={handleSearch}
          />
          
          <KanbanBoard
            tasks={filteredTasks}
            projects={projects}
            onTaskUpdate={handleTaskUpdate}
            onTaskEdit={openTaskModal}
            onTaskDelete={handleTaskDelete}
            onAddTask={() => openTaskModal()}
          />
        </div>
      </main>

      <TaskModal
        task={editingTask}
        projects={projects}
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleTaskSave}
      />

      <ProjectModal
        project={editingProject}
        isOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleProjectSave}
      />
    </div>
  );
};

export default BoardView;
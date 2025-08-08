import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const KanbanBoard = ({ 
  tasks, 
  projects, 
  onTaskUpdate, 
  onTaskEdit, 
  onTaskDelete,
  onAddTask 
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { id: "todo", title: "To Do", icon: "Circle" },
    { id: "in_progress", title: "In Progress", icon: "Clock" },
    { id: "done", title: "Done", icon: "CheckCircle2" }
  ];

const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status_c === status);
  };

const getProjectForTask = (task) => {
    return projects.find(project => project.Id === task.project_id_c?.Id);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (columnId) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== columnId) {
const updatedTask = {
        ...draggedTask,
        status_c: columnId,
        completed_at_c: columnId === "done" ? new Date().toISOString() : null
      };
      onTaskUpdate(updatedTask);
    }
    setDragOverColumn(null);
    setDraggedTask(null);
  };

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks yet"
        description="Create your first task to get started with your project management workflow."
        actionLabel="Add First Task"
        onAction={onAddTask}
        icon="Clipboard"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        const isDragOver = dragOverColumn === column.id;
        
        return (
          <div
            key={column.id}
            className={cn(
              "bg-white rounded-xl shadow-card transition-all duration-200",
              isDragOver && "drag-over"
            )}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name={column.icon} 
                    size={18} 
                    className={cn(
                      column.id === "todo" && "text-gray-500",
                      column.id === "in_progress" && "text-warning",
                      column.id === "done" && "text-success"
                    )} 
                  />
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                </div>
                <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="space-y-3 min-h-[200px]">
                <AnimatePresence mode="popLayout">
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.Id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TaskCard
                        task={task}
                        project={getProjectForTask(task)}
                        onEdit={onTaskEdit}
                        onDelete={onTaskDelete}
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedTask?.Id === task.Id}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {columnTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <ApperIcon name="Plus" size={24} className="mb-2" />
                    <p className="text-sm">Drop tasks here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
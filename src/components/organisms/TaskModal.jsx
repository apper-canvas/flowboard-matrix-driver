import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Textarea from "@/components/atoms/Textarea";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";

const TaskModal = ({ 
  task, 
  projects, 
  labels = [],
  isOpen, 
  onClose, 
  onSave 
}) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    priority: "medium",
    dueDate: "",
    status: "todo",
    labelIds: []
  });

useEffect(() => {
    if (task) {
      setFormData({
        title: task.title_c || "",
        description: task.description_c || "",
        projectId: task.project_id_c?.Id?.toString() || "",
        priority: task.priority_c || "medium",
        dueDate: task.due_date_c ? task.due_date_c.split('T')[0] : "",
        status: task.status_c || "todo",
        labelIds: task.label_ids_c ? task.label_ids_c.split(',').map(id => parseInt(id)) : []
      });
    } else {
      setFormData({
        title: "",
        description: "",
        projectId: projects.length > 0 ? projects[0].Id.toString() : "",
        priority: "medium",
        dueDate: "",
        status: "todo",
        labelIds: []
      });
    }
  }, [task, projects, isOpen]);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      title_c: formData.title,
      description_c: formData.description,
      project_id_c: parseInt(formData.projectId),
      priority_c: formData.priority,
      due_date_c: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      status_c: formData.status,
      label_ids_c: formData.labelIds.join(','),
      updated_at_c: new Date().toISOString()
    };

    if (task) {
      onSave({ ...task, ...taskData });
    } else {
      onSave({
        ...taskData,
        created_at_c: new Date().toISOString(),
        completed_at_c: null,
        position_c: 0
      });
    }
    
    onClose();
  };

  const handleLabelChange = (labelId) => {
    const currentLabels = formData.labelIds || [];
    const updatedLabels = currentLabels.includes(labelId)
      ? currentLabels.filter(id => id !== labelId)
      : [...currentLabels, labelId];
    handleChange("labelIds", updatedLabels);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" size={18} className="text-gray-500" />
              </button>
            </div>
            
<form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter task title..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                />
              </div>

              {/* Labels Section */}
              {labels.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Labels
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {labels.map((label) => (
                      <button
                        key={label.Id}
                        type="button"
                        onClick={() => handleLabelChange(label.Id)}
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
                          (formData.labelIds || []).includes(label.Id)
                            ? "text-white shadow-md"
                            : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                        )}
                        style={{
                          backgroundColor: (formData.labelIds || []).includes(label.Id) ? label.color : undefined
                        }}
                      >
                        {label.name}
                        {(formData.labelIds || []).includes(label.Id) && (
                          <ApperIcon name="Check" size={12} className="ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project
                  </label>
                  <Select
                    value={formData.projectId}
                    onChange={(e) => handleChange("projectId", e.target.value)}
                    required
                  >
{projects.map((project) => (
                      <option key={project.Id} value={project.Id}>
                        {project.Name}
                      </option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <Select
                    value={formData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </Select>
                </div>
              </div>
              
<div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {task ? "Update Task" : "Create Task"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;
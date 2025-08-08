import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose, 
  onSave 
}) => {
const [formData, setFormData] = useState({
    name: "",
    color: "#5B47E0"
  });

  const colorOptions = [
    "#5B47E0", "#FF6B6B", "#4ECDC4", "#45B7D1",
    "#F39C12", "#9B59B6", "#E74C3C", "#1ABC9C",
    "#3498DB", "#F1C40F", "#E67E22", "#2ECC71"
  ];

  useEffect(() => {
if (project) {
      setFormData({
        name: project.Name || "",
        color: project.color_c || "#5B47E0"
      });
    } else {
      setFormData({
        name: "",
        color: "#5B47E0"
      });
    }
  }, [project, isOpen]);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const projectData = {
      Name: formData.name,
      color_c: formData.color,
      updated_at_c: new Date().toISOString()
    };

    if (project) {
      onSave({ ...project, ...projectData });
    } else {
      onSave({
        ...projectData,
        created_at_c: new Date().toISOString(),
        task_count_c: 0,
        completed_count_c: 0
      });
    }
    
    onClose();
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
          className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {project ? "Edit Project" : "Create New Project"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" size={18} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter project name..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Project Color
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleChange("color", color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === color 
                          ? "border-gray-900 scale-110" 
                          : "border-gray-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {formData.color === color && (
                        <ApperIcon name="Check" size={16} className="text-white mx-auto" />
                      )}
                    </button>
                  ))}
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
                  {project ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const LabelManager = ({ 
  isOpen, 
  onClose, 
  labels,
  onLabelsChange 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#3B82F6"
  });
  const [editingLabel, setEditingLabel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedColors = [
    '#EF4444', // Red
    '#F59E0B', // Orange  
    '#10B981', // Green
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#DC2626'  // Dark Red
  ];

  useEffect(() => {
    if (editingLabel) {
      setFormData({
        name: editingLabel.name,
        color: editingLabel.color
      });
    } else {
      setFormData({
        name: "",
        color: "#3B82F6"
      });
    }
  }, [editingLabel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);
    try {
      if (editingLabel) {
        await onLabelsChange('update', editingLabel.Id, formData);
        toast.success('Label updated successfully!');
      } else {
        await onLabelsChange('create', null, formData);
        toast.success('Label created successfully!');
      }
      
      setFormData({ name: "", color: "#3B82F6" });
      setEditingLabel(null);
    } catch (error) {
      toast.error(editingLabel ? 'Failed to update label' : 'Failed to create label');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (label) => {
    setEditingLabel(label);
  };

  const handleDelete = async (label) => {
    if (!confirm(`Are you sure you want to delete the label "${label.name}"?`)) {
      return;
    }

    setIsLoading(true);
    try {
      await onLabelsChange('delete', label.Id);
      toast.success('Label deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete label');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingLabel(null);
    setFormData({ name: "", color: "#3B82F6" });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Labels
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ApperIcon name="X" size={16} />
            </Button>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter label name..."
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all duration-200",
                        formData.color === color 
                          ? "border-gray-400 scale-110 shadow-md" 
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      style={{ backgroundColor: color }}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-10"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                {editingLabel && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit"
                  disabled={isLoading || !formData.name.trim()}
                >
                  {isLoading ? (
                    <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                  ) : null}
                  {editingLabel ? "Update Label" : "Create Label"}
                </Button>
              </div>
            </form>

            {/* Labels List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Existing Labels ({labels.length})
              </h3>
              
              {labels.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Tag" size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No labels created yet</p>
                </div>
              ) : (
                labels.map((label) => (
                  <div
                    key={label.Id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: label.color }}
                      />
                      <span className="font-medium text-gray-900">
                        {label.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(label)}
                        disabled={isLoading}
                        className="p-1"
                      >
                        <ApperIcon name="Edit2" size={14} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDelete(label)}
                        disabled={isLoading}
                        className="p-1 text-error hover:text-error hover:bg-red-50"
                      >
                        <ApperIcon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LabelManager;
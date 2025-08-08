import React from "react";
import Button from "@/components/atoms/Button";
import ProjectSelector from "@/components/molecules/ProjectSelector";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  projects, 
  selectedProject, 
  onProjectChange, 
  onAddTask,
  onAddProject 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="Layers" size={18} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">FlowBoard</h1>
            </div>
            
            <ProjectSelector
              projects={projects}
              selectedProject={selectedProject}
              onProjectChange={onProjectChange}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={onAddProject}
              className="hidden sm:flex"
            >
              <ApperIcon name="FolderPlus" size={16} className="mr-2" />
              New Project
            </Button>
            
            <Button onClick={onAddTask}>
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
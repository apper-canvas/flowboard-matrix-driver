import React from "react";
import Card from "@/components/atoms/Card";
import ProgressRing from "@/components/atoms/ProgressRing";
import ApperIcon from "@/components/ApperIcon";

const ProjectCard = ({ project, onSelect }) => {
  const completionRate = project.taskCount > 0 
    ? (project.completedCount / project.taskCount) * 100 
    : 0;
    
  return (
    <Card 
      className="p-6 cursor-pointer hover:shadow-card-hover transition-all duration-200"
      onClick={() => onSelect(project)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
        </div>
        <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-2xl font-bold text-gray-900">{project.taskCount}</p>
            <p className="text-sm text-gray-500">Total Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">{project.completedCount}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
        
        <ProgressRing progress={completionRate} size={60} strokeWidth={4} />
      </div>
    </Card>
  );
};

export default ProjectCard;
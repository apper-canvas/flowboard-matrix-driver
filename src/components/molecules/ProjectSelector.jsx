import React from "react";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const ProjectSelector = ({ projects, selectedProject, onProjectChange }) => {
return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: selectedProject?.color_c }}
        />
        <ApperIcon name="Folder" size={20} className="text-gray-600" />
      </div>
      
      <Select
        value={selectedProject?.Id || ""}
        onChange={(e) => {
          const { value } = e.target;
          const project = projects.find(p => p.Id.toString() === value);
          onProjectChange(project);
        }}
        className="min-w-[200px]"
      >
        <option value="">All Projects</option>
        {projects.map((project) => (
          <option key={project.Id} value={project.Id}>
            {project.Name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ProjectSelector;
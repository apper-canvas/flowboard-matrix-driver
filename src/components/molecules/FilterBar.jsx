import React from "react";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-card">
      <div className="flex items-center space-x-2 min-w-[140px]">
        <ApperIcon name="Flag" size={16} className="text-gray-500" />
        <Select
          value={filters.priority || ""}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2 min-w-[160px]">
        <ApperIcon name="Calendar" size={16} className="text-gray-500" />
        <Select
          value={filters.dateRange || ""}
          onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
        >
          <option value="">All Dates</option>
          <option value="today">Due Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="overdue">Overdue</option>
        </Select>
      </div>
      
      <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
        <ApperIcon name="Search" size={16} className="text-gray-500" />
        <Input
          placeholder="Search tasks..."
          value={filters.searchQuery || ""}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default FilterBar;
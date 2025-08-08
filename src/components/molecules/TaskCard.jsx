import React from "react";
import { format } from "date-fns";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import PriorityIndicator from "@/components/molecules/PriorityIndicator";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ 
  task, 
  project, 
  labels = [],
  onEdit, 
  onDelete, 
  draggable = false,
  onDragStart,
  onDragEnd,
  isDragging = false
}) => {
const isOverdue = task.due_date_c && new Date(task.due_date_c) < new Date() && task.status_c !== "done";
  
  const handleDragStart = (e) => {
    if (onDragStart) {
      onDragStart(e, task);
    }
  };
  
  const handleDragEnd = (e) => {
    if (onDragEnd) {
      onDragEnd(e, task);
    }
  };
  
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-card-hover transition-all duration-200 group",
        isDragging && "dragging",
        isOverdue && "border-l-4 border-l-error"
      )}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onEdit && onEdit(task)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {project && (
<div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color_c }}
            />
          )}
          <PriorityIndicator priority={task.priority} />
        </div>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(task);
            }}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ApperIcon name="Edit2" size={14} className="text-gray-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(task.Id);
            }}
            className="p-1 rounded hover:bg-gray-100"
          >
            <ApperIcon name="Trash2" size={14} className="text-gray-500" />
          </button>
        </div>
      </div>
      
<h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
        {task.title_c}
      </h4>
      
{task.description_c && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description_c}
        </p>
      )}
{/* Task Labels */}
{task.label_ids_c && task.label_ids_c.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.label_ids_c.split(',').map((labelId) => {
            const label = labels.find(l => l.Id === parseInt(labelId));
            return label ? (
              <span
                key={labelId}
                className="inline-block px-2 py-1 text-xs font-medium rounded-full text-white"
                style={{ backgroundColor: label.color_c }}
              >
                {label.Name}
              </span>
            ) : null;
          })}
        </div>
      )}

<div className="flex items-center justify-between">
        {task.due_date_c && (
          <div className={cn(
            "flex items-center space-x-1 text-xs",
            isOverdue ? "text-error" : "text-gray-500"
          )}>
            <ApperIcon name="Calendar" size={12} />
            <span>{format(new Date(task.due_date_c), "MMM dd")}</span>
          </div>
        )}
        
        <Badge variant={task.priority_c} className="text-xs">
          {task.priority_c}
        </Badge>
      </div>
    </Card>
  );
};

export default TaskCard;
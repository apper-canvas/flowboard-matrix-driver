import React from "react";
import { cn } from "@/utils/cn";

const PriorityIndicator = ({ priority, size = "sm" }) => {
  const priorityConfig = {
    high: { color: "bg-error", glow: "priority-high" },
    medium: { color: "bg-warning", glow: "priority-medium" },
    low: { color: "bg-success", glow: "priority-low" }
  };
  
  const sizeConfig = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };
  
  const config = priorityConfig[priority] || priorityConfig.low;
  
  return (
    <div className={cn(
      "rounded-full",
      config.color,
      sizeConfig[size],
      config.glow
    )} />
  );
};

export default PriorityIndicator;
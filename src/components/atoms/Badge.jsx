import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    high: "bg-error/10 text-error",
    medium: "bg-warning/10 text-warning",
    low: "bg-success/10 text-success"
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
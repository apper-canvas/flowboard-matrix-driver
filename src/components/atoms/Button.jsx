import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary-light hover:to-primary shadow-lg hover:shadow-xl",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error shadow-lg hover:shadow-xl"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
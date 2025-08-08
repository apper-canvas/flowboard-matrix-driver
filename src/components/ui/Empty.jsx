import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ title, description, actionLabel, onAction, icon = "Clipboard" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title || "No items found"}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description || "Get started by creating your first item."}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel || "Get Started"}
        </Button>
      )}
    </div>
  );
};

export default Empty;
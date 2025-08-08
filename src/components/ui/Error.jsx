import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-error" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {error || "We encountered an error while loading your data. Please try again."}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;
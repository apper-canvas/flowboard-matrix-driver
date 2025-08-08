import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex items-center space-x-4">
        <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Kanban columns skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((col) => (
          <div key={col} className="bg-white rounded-xl p-4 shadow-card">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((card) => (
                <div key={card} className="bg-gray-50 rounded-lg p-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
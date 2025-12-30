export function BikeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="h-24 bg-gradient-to-br from-gray-300 to-gray-400 p-5">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-white/30 rounded w-3/4"></div>
          <div className="h-6 bg-white/30 rounded w-16"></div>
        </div>
      </div>
      
      <div className="p-5">
        {/* Image skeleton */}
        <div className="w-full mb-4 rounded-lg bg-gray-200 h-64"></div>
        
        <div className="flex flex-col gap-4">
          {/* Description skeleton */}
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
          </div>
          
          {/* Date skeleton */}
          <div className="flex flex-col gap-1">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          
          {/* Date reported skeleton */}
          <div className="flex flex-col gap-1">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
          
          {/* Location skeleton */}
          <div className="flex flex-col gap-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


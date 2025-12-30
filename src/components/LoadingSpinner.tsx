import { BikeCardSkeletonList } from './BikeCardSkeletonList';

export function LoadingSpinner() {
  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
      </header>
      <BikeCardSkeletonList count={6} />
    </div>
  );
}


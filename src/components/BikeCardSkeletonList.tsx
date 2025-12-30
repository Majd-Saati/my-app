import { BikeCardSkeleton } from './BikeCardSkeleton';

interface BikeCardSkeletonListProps {
  count?: number;
}

export function BikeCardSkeletonList({ count = 6 }: BikeCardSkeletonListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <BikeCardSkeleton key={index} />
      ))}
    </div>
  );
}


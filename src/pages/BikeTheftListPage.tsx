import { useState } from 'react';
import { BikeCard } from '../components/BikeCard';
import { BikeCardSkeletonList } from '../components/BikeCardSkeletonList';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import { useStolenBikes, useStolenBikesCount } from '../hooks/useBikes';
import { calculatePaginationRange } from '../utils/pagination';

const ITEMS_PER_PAGE = 10;
const SEARCH_DISTANCE = 10;
const SKELETON_COUNT = 6;

function BikeTheftListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Trigger both requests on page initial load
  const { data: bikes = [], isLoading, error, refetch } = useStolenBikes({
    distance: SEARCH_DISTANCE,
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
    enabled: true, // Explicitly enable on initial load
  });

  const {
    data: countData,
    isLoading: isCountLoading,
    error: countError,
    refetch: refetchCount,
  } = useStolenBikesCount({
    enabled: true, // Explicitly enable on initial load
  });

  // Get count from useStolenBikesCount and calculate total pages (divide by 10)
  const totalCount = countData?.stolen || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const { startItem, endItem } = calculatePaginationRange(currentPage, ITEMS_PER_PAGE, totalCount);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    refetch();
    refetchCount();
  };

  const isLoadingData = isLoading || isCountLoading;
  const hasError = error || countError;
  const errorMessage =
    error instanceof Error
      ? error.message
      : countError instanceof Error
        ? countError.message
        : 'Failed to load bike theft data';
  const hasBikes = bikes.length > 0;
  const hasNoResults = !isLoadingData && !hasError && totalCount === 0;

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-4xl mb-2 text-gray-900">🚴 Munich Bike Theft Reports</h1>
        <p className="text-lg text-gray-600 m-0">Stolen bikes reported in the Munich area</p>
      </header>

      <main className="w-full">
        {isLoadingData && <BikeCardSkeletonList count={SKELETON_COUNT} />}

        {/* Error state: Show if list is unavailable (either query failed) */}
        {hasError && !isLoadingData && (
          <ErrorDisplay message={errorMessage} onRetry={handleRetry} />
        )}

        {/* Empty state: Show if there are no results (no error, but count is 0) */}
        {hasNoResults && <EmptyState />}

        {/* Success state: Show bikes list when data is available */}
        {!isLoadingData && !hasError && !hasNoResults && (
          <>
            <ResultsSummary
              totalCount={totalCount}
              startItem={startItem}
              endItem={endItem}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {hasBikes ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {bikes.map((bike) => (
                    <BikeCard key={bike.id} bike={bike} />
                  ))}
                </div>

                {/* Render pagination based on calculated total pages from count */}
                {totalPages > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </main>
    </div>
  );
}

interface ResultsSummaryProps {
  totalCount: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  totalPages: number;
}

function ResultsSummary({
  totalCount,
  startItem,
  endItem,
  currentPage,
  totalPages,
}: ResultsSummaryProps) {
  return (
    <div className="text-center text-xl font-semibold text-gray-900 mb-8 py-4 px-4 bg-white rounded-lg shadow-sm">
      {totalCount > 0 ? (
        <>
          Showing {startItem}-{endItem} of {totalCount} stolen {totalCount === 1 ? 'bike' : 'bikes'}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </>
      ) : (
        'No stolen bikes found in the Munich area'
      )}
    </div>
  );
}

export default BikeTheftListPage;


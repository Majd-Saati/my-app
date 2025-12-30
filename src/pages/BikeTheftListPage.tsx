import { useState } from 'react';
import { BikeCard } from '../components/BikeCard';
import { BikeCardSkeletonList } from '../components/BikeCardSkeletonList';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import { useStolenBikes, useStolenBikesCount } from '../hooks/useBikes';
import { calculatePaginationRange, calculateTotalPages } from '../utils/pagination';

const ITEMS_PER_PAGE = 10;
const SEARCH_DISTANCE = 10;
const SKELETON_COUNT = 6;

function BikeTheftListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: bikes = [], isLoading, error, refetch } = useStolenBikes({
    distance: SEARCH_DISTANCE,
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  const { data: countData, isLoading: isCountLoading } = useStolenBikesCount({
    distance: SEARCH_DISTANCE,
  });

  const totalCount = countData?.stolen || 0;
  const totalPages = calculateTotalPages(totalCount, ITEMS_PER_PAGE);
  const { startItem, endItem } = calculatePaginationRange(currentPage, ITEMS_PER_PAGE, totalCount);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoadingData = isLoading || isCountLoading;
  const errorMessage = error instanceof Error ? error.message : 'Failed to load bikes';
  const hasBikes = bikes.length > 0;
  const showPagination = totalPages > 1;

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-4xl mb-2 text-gray-900">🚴 Munich Bike Theft Reports</h1>
        <p className="text-lg text-gray-600 m-0">Stolen bikes reported in the Munich area</p>
      </header>

      <main className="w-full">
        {isLoadingData && <BikeCardSkeletonList count={SKELETON_COUNT} />}

        {error && <ErrorDisplay message={errorMessage} onRetry={refetch} />}

        {!isLoadingData && !error && (
          <>
            <ResultsSummary
              totalCount={totalCount}
              startItem={startItem}
              endItem={endItem}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {!hasBikes ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {bikes.map((bike) => (
                    <BikeCard key={bike.id} bike={bike} />
                  ))}
                </div>

                {showPagination && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                )}
              </>
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


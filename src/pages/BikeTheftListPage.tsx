import type { Bike } from '../types/bike';
import { BikeCard } from '../components/BikeCard';
import { BikeCardSkeletonList } from '../components/BikeCardSkeletonList';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { EmptyState } from '../components/EmptyState';
import { ResultsSummary } from '../components/ResultsSummary';
import { Pagination } from '../components/Pagination';
import { SearchInput } from '../components/SearchInput';
import { useBikeTheftData } from '../hooks/useBikeTheftData';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { getDataState, handleDataState } from '../utils/stateHandler';
import { SKELETON_COUNT } from '../constants';

function BikeTheftListPage() {
  const { filters, setQuery, setPage } = useSearchFilters();
  const { query, page: currentPage } = filters;
  
  const {
    bikes,
    totalCount,
    totalPages,
    startItem,
    endItem,
    isLoading,
    hasError,
    errorMessage,
    handleRetry,
  } = useBikeTheftData({ currentPage, query });

  const hasBikes = bikes.length > 0;
  const dataState = getDataState({
    isLoading,
    hasError: !!hasError,
    hasData: hasBikes,
    totalCount,
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <PageHeader />
      <SearchSection query={query} onQueryChange={setQuery} isLoading={isLoading} />
      <main className="w-full">
        {handleDataState(dataState, {
          loading: () => <BikeCardSkeletonList count={SKELETON_COUNT} />,
          error: () => <ErrorDisplay message={errorMessage} onRetry={handleRetry} />,
          empty: () => <EmptyState searchQuery={query} />,
          success: () => (
            <>
              <ResultsSummary
                totalCount={totalCount}
                startItem={startItem}
                endItem={endItem}
                currentPage={currentPage}
                totalPages={totalPages}
                searchQuery={query}
              />
              {hasBikes ? (
                <>
                  <BikeList bikes={bikes} />
                  {totalPages > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setPage}
                      isLoading={isLoading}
                    />
                  )}
                </>
              ) : (
                <EmptyState searchQuery={query} />
              )}
            </>
          ),
        })}
      </main>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="text-center mb-6 pb-6 border-b-2 border-gray-200">
      <h1 className="text-4xl mb-2 text-gray-900">🚴 Munich Bike Theft Reports</h1>
      <p className="text-lg text-gray-600 m-0">Stolen bikes reported in the Munich area</p>
    </header>
  );
}

interface SearchSectionProps {
  query: string;
  onQueryChange: (query: string) => void;
  isLoading: boolean;
}

function SearchSection({ query, onQueryChange, isLoading }: SearchSectionProps) {
  return (
    <section className="mb-8 flex justify-center">
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search by case title (e.g., 'Canyon', 'BMX', 'Electric')..."
        isLoading={isLoading}
      />
    </section>
  );
}

interface BikeListProps {
  bikes: Bike[];
}

function BikeList({ bikes }: BikeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}

export default BikeTheftListPage;


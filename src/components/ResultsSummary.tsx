interface ResultsSummaryProps {
  totalCount: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
}

export function ResultsSummary({
  totalCount,
  startItem,
  endItem,
  currentPage,
  totalPages,
  searchQuery,
}: ResultsSummaryProps) {
  const hasSearchQuery = !!searchQuery?.trim();
  
  return (
    <div className="text-center text-xl font-semibold text-gray-900 mb-8 py-4 px-4 bg-white rounded-lg shadow-sm">
      {totalCount > 0 ? (
        <>
          Showing {startItem}-{endItem} of {totalCount} stolen {totalCount === 1 ? 'bike' : 'bikes'}
          {hasSearchQuery && (
            <span className="text-amber-600"> matching "{searchQuery}"</span>
          )}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </>
      ) : hasSearchQuery ? (
        <>No stolen bikes found matching "{searchQuery}"</>
      ) : (
        'No stolen bikes found in the Munich area'
      )}
    </div>
  );
}


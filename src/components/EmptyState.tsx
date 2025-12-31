import { FaInbox, FaSearch } from 'react-icons/fa';

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  const hasSearchQuery = !!searchQuery?.trim();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 bg-white rounded-lg shadow-sm">
      <div className="mb-4">
        {hasSearchQuery ? (
          <FaSearch className="w-16 h-16 text-gray-400 mx-auto" />
        ) : (
          <FaInbox className="w-20 h-20 text-gray-400 mx-auto" />
        )}
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        {hasSearchQuery ? 'No Matching Results' : 'No Results Found'}
      </h2>
      <p className="text-lg text-gray-500 m-0 text-center max-w-md">
        {hasSearchQuery ? (
          <>
            No stolen bikes found matching "<span className="font-medium text-gray-700">{searchQuery}</span>" in the Munich area.
            <br />
            <span className="text-base">Try a different search term.</span>
          </>
        ) : (
          'No stolen bikes found in the Munich area.'
        )}
      </p>
    </div>
  );
}


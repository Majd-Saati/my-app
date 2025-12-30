import { FaInbox } from 'react-icons/fa';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 bg-white rounded-lg shadow-sm">
      <div className="mb-4">
        <FaInbox className="w-20 h-20 text-gray-400 mx-auto" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Results Found</h2>
      <p className="text-lg text-gray-500 m-0">No stolen bikes found in the Munich area.</p>
    </div>
  );
}


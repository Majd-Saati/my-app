import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center bg-red-50 border-2 border-red-300 rounded-lg my-8">
      <div className="mb-4">
        <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-red-900 mb-2">Unable to Load Bike Theft Reports</h2>
      <p className="text-red-700 text-lg mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-red-600 text-white border-none rounded-md text-base font-medium cursor-pointer transition-colors hover:bg-red-700 shadow-md"
      >
        Try Again
      </button>
    </div>
  );
}


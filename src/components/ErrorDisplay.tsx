interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center bg-yellow-50 border border-yellow-400 rounded-lg my-8">
      <p className="text-yellow-800 text-lg mb-4">⚠️ Error: {message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-indigo-600 text-white border-none rounded-md text-base font-medium cursor-pointer transition-colors hover:bg-indigo-700"
      >
        Retry
      </button>
    </div>
  );
}


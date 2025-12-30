export function formatDate(timestamp: number | null): string {
  if (!timestamp) return 'Date unknown';
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


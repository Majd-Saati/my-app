export function calculatePaginationRange(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
): { startItem: number; endItem: number } {
  if (totalItems === 0) {
    return { startItem: 0, endItem: 0 };
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return { startItem, endItem };
}

export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}


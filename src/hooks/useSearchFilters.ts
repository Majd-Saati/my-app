import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const PARAM_KEYS = {
  QUERY: 'q',
  PAGE: 'page',
} as const;

export interface SearchFilters {
  query: string;
  page: number;
}

export function useSearchFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: SearchFilters = useMemo(() => ({
    query: searchParams.get(PARAM_KEYS.QUERY) || '',
    page: parseInt(searchParams.get(PARAM_KEYS.PAGE) || '1', 10),
  }), [searchParams]);

  const setQuery = useCallback((query: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (query.trim()) {
        newParams.set(PARAM_KEYS.QUERY, query.trim());
      } else {
        newParams.delete(PARAM_KEYS.QUERY);
      }
      // Reset to page 1 when search query changes
      newParams.delete(PARAM_KEYS.PAGE);
      return newParams;
    });
  }, [setSearchParams]);

  const setPage = useCallback((page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (page > 1) {
        newParams.set(PARAM_KEYS.PAGE, page.toString());
      } else {
        newParams.delete(PARAM_KEYS.PAGE);
      }
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filters,
    setQuery,
    setPage,
    clearFilters,
  };
}


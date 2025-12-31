import { useQuery } from '@tanstack/react-query';
import { fetchStolenBikesCount } from '../services/bikeApi';
import { BIKE_QUERY_KEYS } from './queryKeys';
import { SEARCH_LOCATION } from '../constants';

interface UseStolenBikesCountOptions {
  query?: string;
  enabled?: boolean;
}

export function useStolenBikesCount(options: UseStolenBikesCountOptions = {}) {
  const { query = '', enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.count(SEARCH_LOCATION, query),
    queryFn: () => fetchStolenBikesCount({ query }),
    enabled,
  });
}


import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchStolenBikesFromMunich } from '../services/bikeApi';
import type { Bike } from '../types/bike';
import { BIKE_QUERY_KEYS } from './queryKeys';
import { SEARCH_LOCATION } from '../constants';

interface UseStolenBikesOptions {
  distance?: number;
  page?: number;
  perPage?: number;
  query?: string;
  enabled?: boolean;
}

export function useStolenBikes(options: UseStolenBikesOptions = {}) {
  const { distance = 10, page = 1, perPage = 10, query = '', enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.stolen(SEARCH_LOCATION, distance, page, perPage, query),
    queryFn: async () => {
      const response = await fetchStolenBikesFromMunich({
        distance,
        page,
        perPage,
        query,
      });
      return response.bikes.filter(
        (bike): bike is Bike => bike.stolen && bike.status === 'stolen'
      );
    },
    enabled,
    placeholderData: keepPreviousData,
  });
}


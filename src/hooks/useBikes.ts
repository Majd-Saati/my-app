import { useQuery } from '@tanstack/react-query';
import { fetchStolenBikesFromMunich } from '../services/bikeApi';
import type { Bike } from '../types/bike';

export const BIKE_QUERY_KEYS = {
  all: ['bikes'] as const,
  stolen: (location: string, distance: number) =>
    ['bikes', 'stolen', location, distance] as const,
} as const;

interface UseStolenBikesOptions {
  distance?: number;
  enabled?: boolean;
}

export function useStolenBikes(options: UseStolenBikesOptions = {}) {
  const { distance = 10, enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.stolen('munich', distance),
    queryFn: async () => {
      const response = await fetchStolenBikesFromMunich(distance);
      // Filter to only show stolen bikes (not found bikes)
      return response.bikes.filter(
        (bike): bike is Bike => bike.stolen && bike.status === 'stolen'
      );
    },
    enabled,
  });
}


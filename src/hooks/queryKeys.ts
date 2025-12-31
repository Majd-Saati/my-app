export const BIKE_QUERY_KEYS = {
  all: ['bikes'] as const,
  stolen: (location: string, distance: number, page: number, perPage: number, query: string) =>
    ['bikes', 'stolen', location, distance, page, perPage, query] as const,
  count: (location: string, query: string) => ['bikes', 'count', location, query] as const,
} as const;


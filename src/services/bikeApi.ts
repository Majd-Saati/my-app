import type { BikeSearchResponse } from '../types/bike';

const API_BASE_URL = 'https://bikeindex.org/api/v3';

/**
 * Fetches stolen bikes from the Munich area
 * @param distance Distance in miles from Munich (default: 10)
 * @returns Promise with bike search response
 */
export async function fetchStolenBikesFromMunich(
  distance: number = 10
): Promise<BikeSearchResponse> {
  // Munich coordinates: 48.1351, 11.5820
  const params = new URLSearchParams({
    location: '48.1351,11.5820', // Munich coordinates
    stolenness: 'proximity',
    distance: distance.toString(),
    per_page: '100', // Maximum per page
  });

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch bikes: ${response.statusText}`);
  }

  return response.json();
}


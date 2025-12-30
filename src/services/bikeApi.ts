import { apiClient } from '../lib/axios';
import type { BikeSearchResponse, BikeCountResponse } from '../types/bike';

export interface FetchBikesParams {
  distance?: number;
  page?: number;
  perPage?: number;
}

/**
 * Fetches stolen bikes from the Munich area
 * @param params - Search parameters
 * @param params.distance - Distance in miles from Munich (default: 10)
 * @param params.page - Page number (default: 1)
 * @param params.perPage - Number of bikes per page (default: 10)
 * @returns Promise with bike search response
 */
export async function fetchStolenBikesFromMunich(
  params: FetchBikesParams = {}
): Promise<BikeSearchResponse> {
  const { page = 1, perPage = 10 } = params;

  const response = await apiClient.get<BikeSearchResponse>('/search', {
    params: {
      query: 'munich',
      stolenness: 'stolen',
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });

  return response.data;
}

/**
 * Fetches the count of stolen bikes from the Munich area
 * @returns Promise with bike count response
 */
export async function fetchStolenBikesCount(): Promise<BikeCountResponse> {
  const response = await apiClient.get<BikeCountResponse>('/search/count', {
    params: {
      query: 'munich',
      // location: 'IP',
      stolenness: 'stolen',
    },
  });

  return response.data;
}


import { apiClient } from '../lib/axios';
import type { BikeSearchResponse, BikeCountResponse } from '../types/bike';
import { SEARCH_LOCATION } from '../constants';

export interface FetchBikesParams {
  distance?: number;
  page?: number;
  perPage?: number;
  query?: string;
}

/**
 * Builds the search query combining location with optional search term
 */
function buildSearchQuery(searchTerm?: string): string {
  if (searchTerm?.trim()) {
    return `${SEARCH_LOCATION} ${searchTerm.trim()}`;
  }
  return SEARCH_LOCATION;
}

/**
 * Fetches stolen bikes from the Munich area
 * @param params - Search parameters
 * @param params.distance - Distance in miles from Munich (default: 10)
 * @param params.page - Page number (default: 1)
 * @param params.perPage - Number of bikes per page (default: 10)
 * @param params.query - Optional search query to filter by title
 * @returns Promise with bike search response
 */
export async function fetchStolenBikesFromMunich(
  params: FetchBikesParams = {}
): Promise<BikeSearchResponse> {
  const { page = 1, perPage = 10, query } = params;

  const response = await apiClient.get<BikeSearchResponse>('/search', {
    params: {
      query: buildSearchQuery(query),
      stolenness: 'stolen',
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });

  return response.data;
}

export interface FetchBikesCountParams {
  query?: string;
}

/**
 * Fetches the count of stolen bikes from the Munich area
 * @param params - Optional parameters
 * @param params.query - Optional search query to filter count
 * @returns Promise with bike count response
 */
export async function fetchStolenBikesCount(
  params: FetchBikesCountParams = {}
): Promise<BikeCountResponse> {
  const { query } = params;
  
  const response = await apiClient.get<BikeCountResponse>('/search/count', {
    params: {
      query: buildSearchQuery(query),
      stolenness: 'stolen',
    },
  });

  return response.data;
}


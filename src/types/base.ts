/**
 * Base API response structure
 */
export interface APIResponse<T> {
  status: string;
  message: string;
  result: T;
}

/**
 * Sort direction for paginated results
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Common paginated request parameters
 */
export interface PaginatedRequest {
  page?: number;
  offset?: number;
  sort?: SortDirection;
}

/**
 * Block range filter parameters
 */
export interface BlockRangeRequest {
  startBlock?: number;
  endBlock?: number;
}

/**
 * Transaction types
 */
export type TransactionType =
  | 'normal'
  | 'internal'
  | 'token'
  | 'erc721'
  | 'erc1155';

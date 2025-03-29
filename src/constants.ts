/**
 * Constants for the Etherscan API
 */

/**
 * Base API URLs for different Ethereum networks
 */
export const API_URLS = {
  mainnet: 'https://api.etherscan.io/api',
  goerli: 'https://api-goerli.etherscan.io/api',
  sepolia: 'https://api-sepolia.etherscan.io/api',
};

/**
 * Default configuration values
 */
export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_MAX_REQUESTS_PER_SECOND = 5;
export const DEFAULT_NETWORK = 'mainnet';

/**
 * API response status values
 */
export const API_STATUS = {
  SUCCESS: '1',
  ERROR: '0',
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  MISSING_API_KEY: 'API key is required',
  INVALID_NETWORK:
    'Invalid network. Supported networks: mainnet, goerli, sepolia',
  REQUEST_TIMEOUT: 'Request timed out',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
};

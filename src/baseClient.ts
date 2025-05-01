/**
 * Etherscan SDK
 * A Cross-Platform TypeScript SDK for the Etherscan API (Works in Node.js and in the Browser)
 * @module EtherscanSDK
 */

import {
  EtherscanSDKOptions,
  Network,
  EtherscanAPIError,
  EtherscanValidationError,
  EtherscanNetworkError,
  Version,
  NetworkString,
} from './types';
import { HttpClient } from './utils/http-client';
import {
  DEFAULT_TIMEOUT,
  DEFAULT_MAX_REQUESTS_PER_SECOND,
  DEFAULT_NETWORK,
  ERROR_MESSAGES,
  V1_API_URLS,
  V2_API_URL,
  V2_API_CHAIN_IDS,
  SUPPORTED_CHAINS,
} from './constants';

/**
 * Main Etherscan SDK class that provides access to all Etherscan API endpoints
 * @class EtherscanSDK
 * @description A comprehensive SDK for interacting with the Etherscan API, providing methods for accessing blockchain data, transactions, accounts, and more.
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({
 *   apiKey: 'your_api_key',
 *   network: 'mainnet',
 *   version: 'v2',
 *   timeout: 5000,
 *   rateLimitEnabled: true,
 *   maxRequestsPerSecond: 5
 * });
 *
 * // Get account balance
 * const balance = await sdk.accounts.getBalance({
 *   address: '0x123...abc'
 * });
 * ```
 */
export class EtherscanSDKBase {
  /** API key for Etherscan */
  protected readonly apiKey: string;
  /** HTTP client for making API requests */
  protected httpClient: HttpClient;

  /** Network to use (e.g., 'mainnet', 'testnet', etc.) */
  private readonly network: Network | NetworkString;
  /** API version to use ('v1' or 'v2') */
  private readonly version: Version;

  /**
   * API error class for handling API-related errors
   * @static
   * @type {EtherscanAPIError}
   * @readonly
   * @example
   * ```ts
   * try {
   *   await sdk.accounts.getBalance({ address: '0x123...abc' });
   * } catch (error) {
   *   if (error instanceof EtherscanSDK.APIError) {
   *     console.error('API error:', error.message);
   *   }
   * }
   * ```
   */
  public static readonly APIError = EtherscanAPIError;

  /**
   * Validation error class for handling validation-related errors
   * @static
   * @type {EtherscanValidationError}
   * @readonly
   * @example
   * ```ts
   * try {
   *   await sdk.accounts.getBalance({ address: 'invalid_address' });
   * } catch (error) {
   *   if (error instanceof EtherscanSDK.ValidationError) {
   *     console.error('Validation error:', error.message);
   *   }
   * }
   * ```
   */
  public static readonly ValidationError = EtherscanValidationError;

  /**
   * Network error class for handling network-related errors
   * @static
   * @type {EtherscanNetworkError}
   * @readonly
   * @example
   * ```ts
   * try {
   *   await sdk.accounts.getBalance({ address: '0x123...abc' });
   * } catch (error) {
   *   if (error instanceof EtherscanSDK.NetworkError) {
   *     console.error('Network error:', error.message);
   *   }
   * }
   * ```
   */
  public static readonly NetworkError = EtherscanNetworkError;

  /**
   * Initialize the SDK with configuration options
   * @param {EtherscanSDKOptions} options - SDK configuration options
   * @throws {EtherscanValidationError} if API key is missing
   * @throws {EtherscanValidationError} if network is invalid
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({
   *   apiKey: 'your_api_key',
   *   network: 'mainnet',
   *   version: 'v2',
   *   timeout: 5000,
   *   rateLimitEnabled: true,
   *   maxRequestsPerSecond: 5
   * });
   * ```
   */
  constructor(options: EtherscanSDKOptions) {
    // Validate API key
    if (!options.apiKey) {
      throw new EtherscanValidationError(ERROR_MESSAGES.MISSING_API_KEY);
    }

    this.apiKey = options.apiKey;
    this.network = options.network || DEFAULT_NETWORK;

    // Validate network
    if (!SUPPORTED_CHAINS.includes(this.network)) {
      throw new EtherscanValidationError(ERROR_MESSAGES.INVALID_NETWORK);
    }

    this.version = options.version || 'v2';

    // Initialize HTTP client
    this.httpClient = new HttpClient({
      baseUrl: this.resolveAPIURL(this.network),
      timeout: options.timeout || DEFAULT_TIMEOUT,
    });

    // Configure rate limiting
    if (options.rateLimitEnabled !== undefined) {
      this.httpClient.setRateLimit(
        options.rateLimitEnabled,
        options.maxRequestsPerSecond || DEFAULT_MAX_REQUESTS_PER_SECOND
      );
    }
  }

  /**
   * Resolve the API URL for the given network
   * @param {Network | NetworkString} network - The network to resolve the API URL for
   * @returns {string} The API URL
   * @private
   * @example
   * ```ts
   * const url = this.resolveAPIURL('mainnet');
   * // Returns: 'https://api.etherscan.io/api' for v1
   * // Returns: 'https://api.etherscan.io/v2/api?chainid=1' for v2
   * ```
   */
  private resolveAPIURL(network: Network | NetworkString): string {
    if (this.version === 'v1') {
      return V1_API_URLS[network];
    }

    const chainId = V2_API_CHAIN_IDS[network];

    return `${V2_API_URL}?chainid=${chainId}`;
  }

  /**
   * Get the current network configuration
   * @returns {Network | NetworkString} The current network
   * @example
   * ```ts
   * const network = sdk.getNetwork();
   * console.log(network); // 'mainnet'
   * ```
   */
  public getNetwork(): Network | NetworkString {
    return this.network;
  }

  /**
   * Set the request timeout for all API calls
   * @param {number} timeout - The timeout in milliseconds
   * @throws {EtherscanValidationError} if timeout is not a positive integer
   * @example
   * ```ts
   * sdk.setTimeout(10000); // Set timeout to 10 seconds
   * ```
   */
  public setTimeout(timeout: number): void {
    if (!Number.isInteger(timeout) || timeout <= 0) {
      throw new EtherscanValidationError('Timeout must be a positive integer');
    }

    this.httpClient = new HttpClient({
      baseUrl: this.resolveAPIURL(this.network),
      timeout,
    });
  }
}

/**
 * Etherscan SDK
 * A Cross-Platform TypeScript SDK for the Etherscan API (Works in Node.js and in the Browser)
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
import { AccountsModule } from './modules/accounts';
import { ContractsModule } from './modules/contracts';
import { TransactionsModule } from './modules/transactions';
import { BlocksModule } from './modules/blocks';
import { LogsModule } from './modules/logs';
import { ProxyModule } from './modules/proxy';
import { TokensModule } from './modules/tokens';
import { GasModule } from './modules/gas';
import { StatsModule } from './modules/stats';
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
 * Main Etherscan SDK class
 */
export class EtherscanSDK {
  /** API key for Etherscan */
  private readonly apiKey: string;
  /** Network to use */
  private readonly network: Network | NetworkString;
  /** Version to use */
  private readonly version: Version;
  /** HTTP client */
  private httpClient: HttpClient;

  /**
   * Account module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.accounts.getBalance('0x1234567890123456789012345678901234567890');
   */
  public readonly accounts: AccountsModule;
  /**
   * Contracts module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.contracts.getABI('0x1234567890123456789012345678901234567890');
   */
  public readonly contracts: ContractsModule;
  /**
   * Transactions module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.transactions.getTransaction('0x1234567890123456789012345678901234567890');
   */
  public readonly transactions: TransactionsModule;
  /**
   * Blocks module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.blocks.getBlock('0x1234567890123456789012345678901234567890');
   */
  public readonly blocks: BlocksModule;
  /**
   * Logs module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.logs.getLogs('0x1234567890123456789012345678901234567890');
   */
  public readonly logs: LogsModule;
  /**
   * Proxy module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.proxy.getProxyAddress('0x1234567890123456789012345678901234567890');
   */
  public readonly proxy: ProxyModule;
  /**
   * Tokens module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.tokens.getTokenSupply('0x1234567890123456789012345678901234567890');
   */
  public readonly tokens: TokensModule;
  /**
   * Gas module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.gas.getGasPrice();
   */
  public readonly gas: GasModule;
  /**
   * Stats module instance
   * @readonly
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * sdk.stats.getStats();
   */
  public readonly stats: StatsModule;

  /**
   * API error class
   * @static
   * @type {EtherscanAPIError}
   * @readonly
   * @example
   * if (error instanceof EtherscanSDK.APIError) {
   *   console.error('API error:', error.message);
   * }
   */
  public static readonly APIError = EtherscanAPIError;
  /**
   * Validation error class
   * @static
   * @type {EtherscanValidationError}
   * @readonly
   * @example
   * if (error instanceof EtherscanSDK.ValidationError) {
   *   console.error('Validation error:', error.message);
   * }
   */
  public static readonly ValidationError = EtherscanValidationError;
  /**
   * Network error class
   * @static
   * @type {EtherscanNetworkError}
   * @readonly
   * @example
   * if (error instanceof EtherscanSDK.NetworkError) {
   *   console.error('Network error:', error.message);
   * }
   */
  public static readonly NetworkError = EtherscanNetworkError;

  /**
   * Initialize the SDK
   * @param {EtherscanSDKOptions} options - SDK configuration options
   * @throws {EtherscanValidationError} if API key is missing
   * @throws {EtherscanValidationError} if network is invalid
   * @example
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
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

    // Initialize modules
    this.accounts = new AccountsModule(this.httpClient, this.apiKey);
    this.contracts = new ContractsModule(this.httpClient, this.apiKey);
    this.transactions = new TransactionsModule(this.httpClient, this.apiKey);
    this.blocks = new BlocksModule(this.httpClient, this.apiKey);
    this.logs = new LogsModule(this.httpClient, this.apiKey);
    this.proxy = new ProxyModule(this.httpClient, this.apiKey);
    this.tokens = new TokensModule(this.httpClient, this.apiKey);
    this.gas = new GasModule(this.httpClient, this.apiKey);
    this.stats = new StatsModule(this.httpClient, this.apiKey);
  }

  /**
   * Resolve the API URL for the given network
   * @param {Network | NetworkString} network - The network to resolve the API URL for
   * @returns {string} The API URL
   */
  private resolveAPIURL(network: Network | NetworkString): string {
    if (this.version === 'v1') {
      return V1_API_URLS[network];
    }

    const chainId = V2_API_CHAIN_IDS[network];

    return `${V2_API_URL}?chainid=${chainId}`;
  }

  /**
   * Get the current network
   * @returns {Network | NetworkString} The current network
   */
  public getNetwork(): Network | NetworkString {
    return this.network;
  }

  /**
   * Set the request timeout
   * @param {number} timeout - The timeout in milliseconds
   * @throws {EtherscanValidationError} if timeout is not a positive integer
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

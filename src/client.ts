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
export class EtherscanSDK {
  /** API key for Etherscan */
  private readonly apiKey: string;
  /** Network to use (e.g., 'mainnet', 'testnet', etc.) */
  private readonly network: Network | NetworkString;
  /** API version to use ('v1' or 'v2') */
  private readonly version: Version;
  /** HTTP client for making API requests */
  private httpClient: HttpClient;

  /**
   * Account module instance for accessing account-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get account balance
   * const balance = await sdk.accounts.getBalance({
   *   address: '0x123...abc'
   * });
   * // Get transaction history
   * const transactions = await sdk.accounts.getTransactions({
   *   address: '0x123...abc'
   * });
   * ```
   */
  public readonly accounts: AccountsModule;

  /**
   * Contracts module instance for accessing contract-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get contract ABI
   * const abi = await sdk.contracts.getABI({
   *   address: '0x123...abc'
   * });
   * // Get contract source code
   * const sourceCode = await sdk.contracts.getSourceCode({
   *   address: '0x123...abc'
   * });
   * ```
   */
  public readonly contracts: ContractsModule;

  /**
   * Transactions module instance for accessing transaction-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get transaction status
   * const status = await sdk.transactions.getStatus({
   *   txhash: '0x123...abc'
   * });
   * // Get transaction receipt status
   * const receiptStatus = await sdk.transactions.getReceiptStatus({
   *   txhash: '0x123...abc'
   * });
   * ```
   */
  public readonly transactions: TransactionsModule;

  /**
   * Blocks module instance for accessing block-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get block reward
   * const reward = await sdk.blocks.getBlockReward({
   *   blockno: 1000000
   * });
   * // Get block countdown
   * const countdown = await sdk.blocks.getBlockCountdown({
   *   blockno: 1000000
   * });
   * ```
   */
  public readonly blocks: BlocksModule;

  /**
   * Logs module instance for accessing log-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get logs
   * const logs = await sdk.logs.getLogs({
   *   address: '0x123...abc',
   *   fromBlock: 1000000,
   *   toBlock: 1000100
   * });
   * ```
   */
  public readonly logs: LogsModule;

  /**
   * Proxy module instance for accessing proxy-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get block by number
   * const block = await sdk.proxy.getBlockByNumber('0x123abc');
   * // Get transaction by hash
   * const tx = await sdk.proxy.getTransactionByHash('0x123...abc');
   * ```
   */
  public readonly proxy: ProxyModule;

  /**
   * Tokens module instance for accessing token-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get token balance
   * const balance = await sdk.tokens.getTokenBalance({
   *   contractAddress: '0x123...abc',
   *   address: '0x456...def'
   * });
   * // Get token supply
   * const supply = await sdk.tokens.getTokenSupply({
   *   contractAddress: '0x123...abc'
   * });
   * ```
   */
  public readonly tokens: TokensModule;

  /**
   * Gas module instance for accessing gas-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get gas price
   * const gasPrice = await sdk.gas.getGasPrice();
   * // Get gas oracle
   * const gasOracle = await sdk.gas.getGasOracle();
   * ```
   */
  public readonly gas: GasModule;

  /**
   * Stats module instance for accessing statistics-related endpoints
   * @readonly
   * @example
   * ```ts
   * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
   * // Get ETH price
   * const ethPrice = await sdk.stats.getEthPrice();
   * // Get ETH supply
   * const ethSupply = await sdk.stats.getEthSupply();
   * ```
   */
  public readonly stats: StatsModule;

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
   * @private
   * @example
   * ```ts
   * const url = this.resolveAPIURL('mainnet');
   * // Returns: 'https://api.etherscan.io/api' for v1
   * // Returns: 'https://api.etherscan.io/api?chainid=1' for v2
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

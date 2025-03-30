/**
 * Etherscan SDK
 * A TypeScript SDK for the Etherscan API that works in both Node.js and browser environments
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
  /**
   * API key for Etherscan
   */
  private readonly apiKey: string;

  /**
   * Network to use
   */
  private readonly network: Network | NetworkString;

  /**
   * Version to use
   */
  private readonly version: Version;

  /**
   * HTTP client
   */
  private httpClient: HttpClient;

  /**
   * Module instances
   */
  public readonly accounts: AccountsModule;
  public readonly contracts: ContractsModule;
  public readonly transactions: TransactionsModule;
  public readonly blocks: BlocksModule;
  public readonly logs: LogsModule;
  public readonly proxy: ProxyModule;
  public readonly tokens: TokensModule;
  public readonly gas: GasModule;
  public readonly stats: StatsModule;

  /**
   * Error classes for error handling
   */
  public static APIError = EtherscanAPIError;
  public static ValidationError = EtherscanValidationError;
  public static NetworkError = EtherscanNetworkError;

  /**
   * Initialize the SDK
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

  private resolveAPIURL(network: Network | NetworkString): string {
    if (this.version === 'v1') {
      return V1_API_URLS[network];
    }

    const chainId = V2_API_CHAIN_IDS[network];

    return `${V2_API_URL}?chainid=${chainId}`;
  }

  /**
   * Get the current network
   */
  public getNetwork(): Network | NetworkString {
    return this.network;
  }

  /**
   * Set the request timeout
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

// Re-export all types
export * from './types';

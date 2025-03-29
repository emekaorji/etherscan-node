/**
 * SDK Configuration options
 */
export interface EtherscanSDKOptions {
  /** Etherscan API key */
  apiKey: string;
  /** Network to use (defaults to mainnet) */
  network?: Network;
  /** Request timeout in milliseconds (defaults to 30000) */
  timeout?: number;
  /** Enable rate limiting (defaults to true) */
  rateLimitEnabled?: boolean;
  /** Maximum number of requests per second (defaults to 5) */
  maxRequestsPerSecond?: number;
}

/**
 * Supported Ethereum networks
 */
export type Network = 'mainnet' | 'goerli' | 'sepolia';

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

/**
 * Account module types
 */
export namespace Accounts {
  export interface BalanceRequest {
    address: string;
    tag?: string;
  }

  export interface BalanceResponse {
    account: string;
    balance: string;
  }

  export interface BalanceMultiRequest {
    addresses: string[];
    tag?: string;
  }

  export interface TransactionsRequest
    extends PaginatedRequest,
      BlockRangeRequest {
    address: string;
  }

  export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
  }

  export interface TransactionsResponse extends Array<Transaction> {}

  export interface InternalTransactionsRequest extends TransactionsRequest {}

  export interface InternalTransactionsResponse
    extends Array<InternalTransaction> {}

  export interface InternalTransaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    contractAddress: string;
    input: string;
    type: string;
    gas: string;
    gasUsed: string;
    traceId: string;
    isError: string;
    errCode: string;
  }
}

/**
 * Contract module types
 */
export namespace Contracts {
  export interface ABIRequest {
    address: string;
  }

  export interface ABIResponse {
    abi: string;
  }

  export interface SourceCodeRequest {
    address: string;
  }

  export interface SourceCodeResponse {
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    OptimizationUsed: string;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
  }
}

/**
 * Transaction module types
 */
export namespace Transactions {
  export interface StatusRequest {
    txhash: string;
  }

  export interface StatusResponse {
    status: string;
  }

  export interface ReceiptStatusRequest {
    txhash: string;
  }

  export interface ReceiptStatusResponse {
    status: string;
  }
}

/**
 * Blocks module types
 */
export namespace Blocks {
  export interface BlockRewardRequest {
    blockno: number;
  }

  export interface BlockRewardResponse {
    blockNumber: string;
    timeStamp: string;
    blockMiner: string;
    blockReward: string;
    uncles: Array<{
      miner: string;
      unclePosition: string;
      blockreward: string;
    }>;
    uncleInclusionReward: string;
  }

  export interface BlockCountdownRequest {
    blockno: number;
  }

  export interface BlockCountdownResponse {
    CurrentBlock: string;
    CountdownBlock: string;
    RemainingBlock: string;
    EstimateTimeInSec: string;
  }
}

/**
 * Logs module types
 */
export namespace Logs {
  export interface LogsRequest extends BlockRangeRequest {
    address: string;
    topics?: string[];
  }

  export interface Log {
    address: string;
    topics: string[];
    data: string;
    blockNumber: string;
    timeStamp: string;
    gasPrice: string;
    gasUsed: string;
    logIndex: string;
    transactionHash: string;
    transactionIndex: string;
  }

  export interface LogsResponse extends Array<Log> {}
}

/**
 * Proxy module types
 */
export namespace Proxy {
  export interface BlockNumberResponse {
    jsonrpc: string;
    id: number;
    result: string;
  }

  export interface BlockByNumberRequest {
    tag: string | number;
    boolean: boolean;
  }

  export interface BlockByNumberResponse {
    jsonrpc: string;
    id: number;
    result: any;
  }

  export interface TransactionByHashRequest {
    txhash: string;
  }

  export interface TransactionByHashResponse {
    jsonrpc: string;
    id: number;
    result: any;
  }
}

/**
 * Tokens module types
 */
export namespace Tokens {
  export interface TokenBalanceRequest {
    contractAddress: string;
    address: string;
    tag?: string;
  }

  export interface TokenBalanceResponse {
    account: string;
    balance: string;
  }

  export interface TokenSupplyRequest {
    contractAddress: string;
  }

  export interface TokenSupplyResponse {
    supply: string;
  }
}

/**
 * Gas module types
 */
export namespace Gas {
  export interface GasPriceResponse {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  }

  export interface GasOracleResponse {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  }
}

/**
 * Stats module types
 */
export namespace Stats {
  export interface EthPriceResponse {
    ethbtc: string;
    ethbtc_timestamp: string;
    ethusd: string;
    ethusd_timestamp: string;
  }

  export interface EthSupplyResponse {
    EthSupply: string;
    Eth2Staking: string;
    BurntFees: string;
  }

  export interface EthNodeSizeResponse {
    blockNumber: string;
    chainNeeded: string;
    pruningNeeded: string;
    archiveNeeded: string;
  }
}

/**
 * Error types
 */
export class EtherscanAPIError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'EtherscanAPIError';
  }
}

export class EtherscanValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EtherscanValidationError';
  }
}

export class EtherscanNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EtherscanNetworkError';
  }
}

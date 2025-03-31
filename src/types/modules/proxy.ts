/**
 * Proxy module types
 */

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

export interface BlockResponse {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: TransactionResponse[];
  uncles: string[];
}

export interface TransactionResponse {
  hash: string;
  nonce: string;
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
}

export interface TransactionReceiptResponse {
  transactionHash: string;
  transactionIndex: string;
  blockNumber: string;
  blockHash: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  contractAddress: string | null;
  logs: LogResponse[];
  status: string;
}

export interface LogResponse {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
}

export interface SyncingStatusResponse {
  startingBlock: string;
  currentBlock: string;
  highestBlock: string;
  knownStates: string;
  pulledStates: string;
}

export interface WorkResponse {
  currentBlockHeader: string;
  seedHash: string;
  target: string;
}

export interface CallRequest {
  to?: string;
  data?: string;
  from?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
}

export interface LogRequest {
  fromBlock?: string;
  toBlock?: string;
  address?: string;
  topics?: string[];
}

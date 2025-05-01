/**
 * ==========================================
 * Account module types
 * ==========================================
 */

import { PaginatedRequest, BlockRangeRequest } from '../index';

/**
 * ==========================================
 * Request Types
 * ==========================================
 */

export interface BalanceRequest {
  address: string;
  tag?: string;
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

export interface InternalTransactionsRequest extends TransactionsRequest {}

export interface InternalTransactionsByBlockRangeRequest
  extends PaginatedRequest,
    Required<BlockRangeRequest> {}

export interface TokenTranfersRequest
  extends PaginatedRequest,
    BlockRangeRequest {
  address: string;
  contractAddress: string;
}

export interface MinedBlockRequest {
  address: string;
  blocktype?: 'blocks' | 'uncles';
  page?: number;
  offset?: number;
}

/**
 * ==========================================
 * Response Types
 * ==========================================
 */

interface Transaction {
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

interface InternalTransaction {
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

export interface BalanceResponse {
  account: string;
  balance: string;
}

export interface TransactionsResponse extends Array<Transaction> {}

export interface InternalTransactionsResponse
  extends Array<InternalTransaction> {}

export interface TokenTransferResponse {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface NFTTransferResponse {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface ERC1155TransferResponse {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface MinedBlockResponse {
  blockNumber: string;
  timeStamp: string;
  blockReward: string;
}

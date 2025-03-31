/**
 * Account module types
 */

import { PaginatedRequest, BlockRangeRequest } from '../index';

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

/**
 * Logs module types
 */

import { BlockRangeRequest } from '../index';

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

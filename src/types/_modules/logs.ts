/**
 * Logs module types
 */

import { BlockRangeRequest, PaginatedRequest } from '../index';

export type TopicOperator = 'and' | 'or';

export interface LogsRequest extends PaginatedRequest, BlockRangeRequest {
  address: string;
  topics?: string[];
  topic0_1_opr?: TopicOperator;
  topic0_2_opr?: TopicOperator;
  topic0_3_opr?: TopicOperator;
  topic1_2_opr?: TopicOperator;
  topic1_3_opr?: TopicOperator;
  topic2_3_opr?: TopicOperator;
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

/**
 * Logs module for Etherscan API
 */
import { BaseModule } from './base';
import { Logs, APIResponse } from '../types';

export class LogsModule extends BaseModule {
  /**
   * Get event logs for an address and/or topics
   */
  public async getLogs(params: Logs.LogsRequest): Promise<Logs.LogsResponse> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    // Validate topics (up to 3 topics supported by Etherscan API)
    const topics = params.topics || [];
    if (topics.length > 3) {
      throw new Error('Maximum of 3 topics supported');
    }

    const apiParams = this.createParams('logs', 'getLogs', {
      address: params.address,
      fromBlock: params.startBlock,
      toBlock: params.endBlock,
      topic0: topics[0],
      topic1: topics[1],
      topic2: topics[2],
      topic0_1_opr: 'and',
      topic0_2_opr: 'and',
      topic1_2_opr: 'and',
    });

    const response = await this.httpClient.get<APIResponse<Logs.LogsResponse>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get event logs with topic operators
   */
  public async getLogsWithTopicOperators(
    params: Logs.LogsRequest & {
      topic0_1_opr?: 'and' | 'or';
      topic0_2_opr?: 'and' | 'or';
      topic1_2_opr?: 'and' | 'or';
    }
  ): Promise<Logs.LogsResponse> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    // Validate topics (up to 3 topics supported by Etherscan API)
    const topics = params.topics || [];
    if (topics.length > 3) {
      throw new Error('Maximum of 3 topics supported');
    }

    // Validate topic operators
    const validOperators = ['and', 'or'];
    if (params.topic0_1_opr && !validOperators.includes(params.topic0_1_opr)) {
      throw new Error("Topic operator must be 'and' or 'or'");
    }
    if (params.topic0_2_opr && !validOperators.includes(params.topic0_2_opr)) {
      throw new Error("Topic operator must be 'and' or 'or'");
    }
    if (params.topic1_2_opr && !validOperators.includes(params.topic1_2_opr)) {
      throw new Error("Topic operator must be 'and' or 'or'");
    }

    const apiParams = this.createParams('logs', 'getLogs', {
      address: params.address,
      fromBlock: params.startBlock,
      toBlock: params.endBlock,
      topic0: topics[0],
      topic1: topics[1],
      topic2: topics[2],
      topic0_1_opr: params.topic0_1_opr || 'and',
      topic0_2_opr: params.topic0_2_opr || 'and',
      topic1_2_opr: params.topic1_2_opr || 'and',
    });

    const response = await this.httpClient.get<APIResponse<Logs.LogsResponse>>(
      '',
      apiParams
    );
    return response.result;
  }
}

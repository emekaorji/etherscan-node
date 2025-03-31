/**
 * Logs module for the Etherscan API
 * @module LogsModule
 */

import { BaseModule } from './base';
import { Logs, APIResponse } from '../types';

/**
 * Logs module for the Etherscan API
 * @class LogsModule
 * @description Provides methods for retrieving and filtering Ethereum event logs
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/logs Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const logs = sdk.logs;
 * ```
 */
export class LogsModule extends BaseModule {
  /**
   * Get event logs for an address and/or topics
   * @param {Logs.LogsRequest} params - Request parameters
   * @param {string} params.address - Contract address to get logs for
   * @param {number} [params.startBlock] - Starting block number (inclusive)
   * @param {number} [params.endBlock] - Ending block number (inclusive)
   * @param {string[]} [params.topics] - Array of topic hashes (max 3)
   * @returns {Promise<Logs.LogsResponse>} Array of event logs matching the criteria
   * @throws {EtherscanValidationError} if address is invalid
   * @throws {EtherscanValidationError} if block numbers are invalid
   * @throws {EtherscanValidationError} if more than 3 topics are provided
   * @example
   * ```ts
   * const logs = await logsModule.getLogs({
   *   address: '0x123...',
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   topics: [
   *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // Transfer event
   *   ]
   * });
   * console.log(logs[0].blockNumber); // '1000001'
   * console.log(logs[0].data); // '0x...'
   * console.log(logs[0].topics); // ['0xddf252ad...', '0x000000000000000000000000...']
   * ```
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
   * Get event logs with topic operators for advanced filtering
   * @param {Logs.LogsRequest & { topic0_1_opr?: 'and' | 'or', topic0_2_opr?: 'and' | 'or', topic1_2_opr?: 'and' | 'or' }} params - Request parameters
   * @param {string} params.address - Contract address to get logs for
   * @param {number} [params.startBlock] - Starting block number (inclusive)
   * @param {number} [params.endBlock] - Ending block number (inclusive)
   * @param {string[]} [params.topics] - Array of topic hashes (max 3)
   * @param {'and' | 'or'} [params.topic0_1_opr='and'] - Operator between topic0 and topic1
   * @param {'and' | 'or'} [params.topic0_2_opr='and'] - Operator between topic0 and topic2
   * @param {'and' | 'or'} [params.topic1_2_opr='and'] - Operator between topic1 and topic2
   * @returns {Promise<Logs.LogsResponse>} Array of event logs matching the criteria
   * @throws {EtherscanValidationError} if address is invalid
   * @throws {EtherscanValidationError} if block numbers are invalid
   * @throws {EtherscanValidationError} if more than 3 topics are provided
   * @throws {EtherscanValidationError} if topic operators are invalid
   * @example
   * ```ts
   * const logs = await logsModule.getLogsWithTopicOperators({
   *   address: '0x123...',
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   topics: [
   *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer event
   *     '0x000000000000000000000000abc...' // Specific address
   *   ],
   *   topic0_1_opr: 'or' // Match either topic0 OR topic1
   * });
   * ```
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

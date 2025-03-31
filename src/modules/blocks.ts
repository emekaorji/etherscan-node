/**
 * Blocks module for the Etherscan API
 * @module BlocksModule
 */

import { BaseModule } from './base';
import { Blocks, APIResponse } from '../types';

/**
 * Blocks module for the Etherscan API
 * @class BlocksModule
 * @description Provides methods for interacting with Ethereum blocks
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/blocks Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const blocks = sdk.blocks;
 * ```
 */
export class BlocksModule extends BaseModule {
  /**
   * Get block reward by block number
   * @param {Blocks.BlockRewardRequest} params - Request parameters
   * @returns {Promise<Blocks.BlockRewardResponse>} Block reward information including miner address and reward amount
   * @throws {EtherscanValidationError} if block number is invalid
   * @example
   * ```ts
   * const blockReward = await blocksModule.getBlockReward({
   *   blockno: 123456
   * });
   * console.log(blockReward.blockNumber); // '123456'
   * console.log(blockReward.timeStamp); // '1625097600'
   * console.log(blockReward.blockMiner); // '0x123...'
   * console.log(blockReward.blockReward); // '2000000000000000000'
   * ```
   */
  public async getBlockReward(
    params: Blocks.BlockRewardRequest
  ): Promise<Blocks.BlockRewardResponse> {
    // Validate required parameters
    this.validateRequired(params, ['blockno']);
    this.validateBlockNumber(params.blockno);

    const apiParams = this.createParams('block', 'getblockreward', {
      blockno: params.blockno,
    });

    const response = await this.httpClient.get<
      APIResponse<Blocks.BlockRewardResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get estimated block countdown for a specific block number
   * @param {Blocks.BlockCountdownRequest} params - Request parameters
   * @returns {Promise<Blocks.BlockCountdownResponse>} Block countdown information including current block, target block, and estimated time
   * @throws {EtherscanValidationError} if block number is invalid
   * @example
   * ```ts
   * const countdown = await blocksModule.getBlockCountdown({
   *   blockno: 123456
   * });
   * console.log(countdown.CurrentBlock); // '123400'
   * console.log(countdown.CountdownBlock); // '123456'
   * console.log(countdown.RemainingBlock); // '56'
   * console.log(countdown.EstimateTimeInSec); // '840'
   * ```
   */
  public async getBlockCountdown(
    params: Blocks.BlockCountdownRequest
  ): Promise<Blocks.BlockCountdownResponse> {
    // Validate required parameters
    this.validateRequired(params, ['blockno']);
    this.validateBlockNumber(params.blockno);

    const apiParams = this.createParams('block', 'getblockcountdown', {
      blockno: params.blockno,
    });

    const response = await this.httpClient.get<
      APIResponse<Blocks.BlockCountdownResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get block number by timestamp
   * @param {number} timestamp - Unix timestamp in seconds
   * @param {'before' | 'after'} [closest='before'] - Whether to return the block before or after the timestamp
   * @returns {Promise<string>} The block number closest to the given timestamp
   * @throws {EtherscanValidationError} if timestamp is invalid
   * @throws {EtherscanValidationError} if closest parameter is invalid
   * @example
   * ```ts
   * // Get block number before timestamp
   * const blockBefore = await blocksModule.getBlockNumberByTimestamp(1625097600);
   * console.log(blockBefore); // '123456'
   *
   * // Get block number after timestamp
   * const blockAfter = await blocksModule.getBlockNumberByTimestamp(1625097600, 'after');
   * console.log(blockAfter); // '123457'
   * ```
   */
  public async getBlockNumberByTimestamp(
    timestamp: number,
    closest: 'before' | 'after' = 'before'
  ): Promise<string> {
    // Validate timestamp
    if (!Number.isInteger(timestamp) || timestamp < 0) {
      throw new Error('Timestamp must be a positive integer');
    }

    // Validate closest parameter
    if (closest !== 'before' && closest !== 'after') {
      throw new Error("Closest parameter must be either 'before' or 'after'");
    }

    const apiParams = this.createParams('block', 'getblocknobytime', {
      timestamp,
      closest,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }
}

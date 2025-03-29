/**
 * Blocks module for Etherscan API
 */
import { BaseModule } from './base';
import { Blocks, APIResponse } from '../types';

export class BlocksModule extends BaseModule {
  /**
   * Get block reward by block number
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

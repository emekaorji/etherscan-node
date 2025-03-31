/**
 * Blocks module types
 */

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

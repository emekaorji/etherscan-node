/**
 * Stats module types
 */

export interface EthPriceResponse {
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string;
}

export interface EthSupplyResponse {
  EthSupply: string;
  Eth2Staking: string;
  BurntFees: string;
}

export interface EthNodeSizeResponse {
  blockNumber: string;
  chainNeeded: string;
  pruningNeeded: string;
  archiveNeeded: string;
}

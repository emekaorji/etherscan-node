/**
 * Tokens module types
 */

export interface TokenBalanceRequest {
  contractAddress: string;
  address: string;
  tag?: string;
}

export interface TokenBalanceResponse {
  account: string;
  balance: string;
}

export interface TokenSupplyRequest {
  contractAddress: string;
}

export interface TokenSupplyResponse {
  supply: string;
}

export interface TokenHolderResponse {
  address: string;
  value: string;
}

export interface TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  owner: string;
  contractAddress: string;
  blockNumber: string;
  blockHash: string;
  timestamp: string;
}

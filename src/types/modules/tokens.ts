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

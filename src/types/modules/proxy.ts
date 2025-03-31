/**
 * Proxy module types
 */

export interface BlockNumberResponse {
  jsonrpc: string;
  id: number;
  result: string;
}

export interface BlockByNumberRequest {
  tag: string | number;
  boolean: boolean;
}

export interface BlockByNumberResponse {
  jsonrpc: string;
  id: number;
  result: any;
}

export interface TransactionByHashRequest {
  txhash: string;
}

export interface TransactionByHashResponse {
  jsonrpc: string;
  id: number;
  result: any;
}

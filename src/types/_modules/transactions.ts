/**
 * Transaction module types
 */

export interface StatusRequest {
  txhash: string;
}

export interface StatusResponse {
  status: string;
}

export interface ReceiptStatusRequest {
  txhash: string;
}

export interface ReceiptStatusResponse {
  status: string;
}

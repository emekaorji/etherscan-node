/**
 * Error types
 */
export class EtherscanAPIError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'EtherscanAPIError';
  }
}

export class EtherscanValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EtherscanValidationError';
  }
}

export class EtherscanNetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EtherscanNetworkError';
  }
}

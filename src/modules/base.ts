/**
 * Base module class for all API modules
 */
import { HttpClient } from '../utils/http-client';
import { EtherscanValidationError } from '../types';

export abstract class BaseModule {
  protected readonly httpClient: HttpClient;
  protected readonly apiKey: string;

  constructor(httpClient: HttpClient, apiKey: string) {
    this.httpClient = httpClient;
    this.apiKey = apiKey;
  }

  /**
   * Create query parameters for an API request
   */
  protected createParams(
    module: string,
    action: string,
    params: Record<string, any> = {}
  ): Record<string, any> {
    return {
      module,
      action,
      apikey: this.apiKey,
      ...params,
    };
  }

  /**
   * Validate required parameters
   */
  protected validateRequired(
    params: Record<string, any>,
    requiredParams: string[]
  ): void {
    for (const param of requiredParams) {
      if (
        params[param] === undefined ||
        params[param] === null ||
        params[param] === ''
      ) {
        throw new EtherscanValidationError(
          `Missing required parameter: ${param}`
        );
      }
    }
  }

  /**
   * Validate address format (basic check)
   */
  protected validateAddress(address: string): boolean {
    // Basic Ethereum address validation (0x followed by 40 hex characters)
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!addressRegex.test(address)) {
      throw new EtherscanValidationError(
        `Invalid Ethereum address format: ${address}`
      );
    }
    return true;
  }

  /**
   * Validate transaction hash format (basic check)
   */
  protected validateTxHash(txhash: string): boolean {
    // Basic transaction hash validation (0x followed by 64 hex characters)
    const txHashRegex = /^0x[a-fA-F0-9]{64}$/;
    if (!txHashRegex.test(txhash)) {
      throw new EtherscanValidationError(
        `Invalid transaction hash format: ${txhash}`
      );
    }
    return true;
  }

  /**
   * Validate block number is a positive integer
   */
  protected validateBlockNumber(blockNumber: number): boolean {
    if (!Number.isInteger(blockNumber) || blockNumber < 0) {
      throw new EtherscanValidationError(
        `Invalid block number: ${blockNumber}. Must be a positive integer.`
      );
    }
    return true;
  }

  /**
   * Format a request parameter
   */
  protected formatParam(
    value: any,
    type: 'boolean' | 'string' | 'number' = 'string'
  ): string | number | boolean {
    if (value === undefined || value === null) {
      return '';
    }

    switch (type) {
      case 'boolean':
        return value ? '1' : '0';
      case 'number':
        return Number(value);
      case 'string':
      default:
        return String(value);
    }
  }
}

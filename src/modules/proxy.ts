/**
 * Proxy module for Etherscan API
 * This module implements web3-compatible JSON-RPC methods
 */
import { BaseModule } from './base';
import { Proxy, APIResponse } from '../types';

export class ProxyModule extends BaseModule {
  /**
   * Get the current block number
   */
  public async getBlockNumber(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_blockNumber', {});

    const response = await this.httpClient.get<Proxy.BlockNumberResponse>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get block by number
   */
  public async getBlockByNumber(
    params: Proxy.BlockByNumberRequest
  ): Promise<any> {
    // Validate parameters
    this.validateRequired(params, ['tag', 'boolean']);

    // If tag is a number, validate it's a positive integer
    if (typeof params.tag === 'number') {
      this.validateBlockNumber(params.tag);
    }

    const apiParams = this.createParams('proxy', 'eth_getBlockByNumber', {
      tag:
        typeof params.tag === 'number'
          ? `0x${params.tag.toString(16)}`
          : params.tag,
      boolean: params.boolean,
    });

    const response = await this.httpClient.get<Proxy.BlockByNumberResponse>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get transaction by hash
   */
  public async getTransactionByHash(
    params: Proxy.TransactionByHashRequest
  ): Promise<any> {
    // Validate parameters
    this.validateRequired(params, ['txhash']);
    this.validateTxHash(params.txhash);

    const apiParams = this.createParams('proxy', 'eth_getTransactionByHash', {
      txhash: params.txhash,
    });

    const response = await this.httpClient.get<Proxy.TransactionByHashResponse>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get transaction count (nonce) for an address
   */
  public async getTransactionCount(
    address: string,
    tag: string = 'latest'
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(address);

    const apiParams = this.createParams('proxy', 'eth_getTransactionCount', {
      address,
      tag,
    });

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Send a raw transaction
   */
  public async sendRawTransaction(hex: string): Promise<string> {
    // Validate parameters
    if (!hex || typeof hex !== 'string' || !hex.startsWith('0x')) {
      throw new Error('Invalid hex string');
    }

    const apiParams = this.createParams('proxy', 'eth_sendRawTransaction', {
      hex,
    });

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Call a contract function
   */
  public async call(
    to: string,
    data: string,
    tag: string = 'latest'
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(to);

    if (!data || typeof data !== 'string' || !data.startsWith('0x')) {
      throw new Error('Invalid data string');
    }

    const apiParams = this.createParams('proxy', 'eth_call', {
      to,
      data,
      tag,
    });

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Get code at an address
   */
  public async getCode(
    address: string,
    tag: string = 'latest'
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(address);

    const apiParams = this.createParams('proxy', 'eth_getCode', {
      address,
      tag,
    });

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Get storage at an address and position
   */
  public async getStorageAt(
    address: string,
    position: number,
    tag: string = 'latest'
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(address);

    if (!Number.isInteger(position) || position < 0) {
      throw new Error('Position must be a positive integer');
    }

    const apiParams = this.createParams('proxy', 'eth_getStorageAt', {
      address,
      position: `0x${position.toString(16)}`,
      tag,
    });

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Get gas price
   */
  public async getGasPrice(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_gasPrice', {});

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }

  /**
   * Estimate gas for a transaction
   */
  public async estimateGas(data: {
    to?: string;
    value?: string;
    data?: string;
    from?: string;
  }): Promise<string> {
    // Validate parameters
    if (data.to) {
      this.validateAddress(data.to);
    }

    if (data.from) {
      this.validateAddress(data.from);
    }

    const apiParams = this.createParams('proxy', 'eth_estimateGas', data);

    const response = await this.httpClient.get<{
      jsonrpc: string;
      id: number;
      result: string;
    }>('', apiParams);

    return response.result;
  }
}

/**
 * Tokens module for the Etherscan API
 * @module TokensModule
 */

import { BaseModule } from './base';
import { Tokens, APIResponse } from '../types';

/**
 * Tokens module for the Etherscan API
 * @class TokensModule
 * @description Provides methods for retrieving ERC20 token information, balances, and holder data
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/tokens Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const tokens = sdk.tokens;
 * ```
 */
export class TokensModule extends BaseModule {
  /**
   * Get ERC20 token account balance for token contract address
   * @param {Object} params - Token balance request parameters
   * @param {string} params.contractAddress - ERC20 token contract address
   * @param {string} params.address - Account address to check balance for
   * @param {string} [params.tag='latest'] - Block tag (latest, earliest, pending, or block number)
   * @returns {Promise<string>} Token balance in base units (wei)
   * @throws {EtherscanValidationError} if contract or account address is invalid
   * @example
   * ```ts
   * const balance = await tokensModule.getTokenBalance({
   *   contractAddress: '0x123...abc', // ERC20 token contract
   *   address: '0x456...def', // Account address
   *   tag: 'latest'
   * });
   * console.log(balance); // '1000000000000000000' (1 token with 18 decimals)
   * ```
   */
  public async getTokenBalance(
    params: Tokens.TokenBalanceRequest
  ): Promise<string> {
    // Validate required parameters
    this.validateRequired(params, ['contractAddress', 'address']);
    this.validateAddress(params.contractAddress);
    this.validateAddress(params.address);

    const apiParams = this.createParams('account', 'tokenbalance', {
      contractaddress: params.contractAddress,
      address: params.address,
      tag: params.tag || 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get ERC20 token total supply for token contract address
   * @param {Object} params - Token supply request parameters
   * @param {string} params.contractAddress - ERC20 token contract address
   * @returns {Promise<string>} Total token supply in base units (wei)
   * @throws {EtherscanValidationError} if contract address is invalid
   * @example
   * ```ts
   * const supply = await tokensModule.getTokenSupply({
   *   contractAddress: '0x123...abc'
   * });
   * console.log(supply); // '1000000000000000000000' (1000 tokens with 18 decimals)
   * ```
   */
  public async getTokenSupply(
    params: Tokens.TokenSupplyRequest
  ): Promise<string> {
    // Validate required parameters
    this.validateRequired(params, ['contractAddress']);
    this.validateAddress(params.contractAddress);

    const apiParams = this.createParams('stats', 'tokensupply', {
      contractaddress: params.contractAddress,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get ERC20 token circulation supply for token contract address
   * @param {string} contractAddress - ERC20 token contract address
   * @returns {Promise<string>} Circulating token supply in base units (wei)
   * @throws {EtherscanValidationError} if contract address is invalid
   * @example
   * ```ts
   * const circulation = await tokensModule.getTokenCirculationSupply(
   *   '0x123...abc'
   * );
   * console.log(circulation); // '800000000000000000000' (800 tokens with 18 decimals)
   * ```
   */
  public async getTokenCirculationSupply(
    contractAddress: string
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(contractAddress);

    const apiParams = this.createParams('stats', 'tokenCsupply', {
      contractaddress: contractAddress,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get ERC20 token holder list for token contract address
   * @param {string} contractAddress - ERC20 token contract address
   * @param {number} [page=1] - Page number for pagination
   * @param {number} [offset=10] - Number of records per page
   * @returns {Promise<Tokens.TokenHolder[]>} List of token holders with their balances
   * @throws {EtherscanValidationError} if contract address is invalid
   * @example
   * ```ts
   * const holders = await tokensModule.getTokenHolders(
   *   '0x123...abc',
   *   1,
   *   10
   * );
   * console.log(holders[0].address); // '0x456...def'
   * console.log(holders[0].value); // '1000000000000000000'
   * ```
   */
  public async getTokenHolders(
    contractAddress: string,
    page: number = 1,
    offset: number = 10
  ): Promise<Tokens.TokenHolderResponse[]> {
    // Validate parameters
    this.validateAddress(contractAddress);

    const apiParams = this.createParams('token', 'tokenholderlist', {
      contractaddress: contractAddress,
      page,
      offset,
    });

    const response = await this.httpClient.get<
      APIResponse<Tokens.TokenHolderResponse[]>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get ERC20 token information by contract address
   * @param {string} contractAddress - ERC20 token contract address
   * @returns {Promise<Tokens.TokenInfo>} Token information including name, symbol, decimals, etc.
   * @throws {EtherscanValidationError} if contract address is invalid
   * @example
   * ```ts
   * const info = await tokensModule.getTokenInfo('0x123...abc');
   * console.log(info.name); // 'My Token'
   * console.log(info.symbol); // 'MTK'
   * console.log(info.decimals); // '18'
   * console.log(info.totalSupply); // '1000000000000000000000'
   * ```
   */
  public async getTokenInfo(
    contractAddress: string
  ): Promise<Tokens.TokenInfoResponse> {
    // Validate parameters
    this.validateAddress(contractAddress);

    const apiParams = this.createParams('token', 'tokeninfo', {
      contractaddress: contractAddress,
    });

    const response = await this.httpClient.get<
      APIResponse<Tokens.TokenInfoResponse[]>
    >('', apiParams);
    return response.result[0]; // API returns array with single object
  }
}

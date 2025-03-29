/**
 * Tokens module for Etherscan API
 */
import { BaseModule } from './base';
import { Tokens, APIResponse } from '../types';

export class TokensModule extends BaseModule {
  /**
   * Get ERC20 token account balance for token contract address
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
   */
  public async getTokenHolders(
    contractAddress: string,
    page: number = 1,
    offset: number = 10
  ): Promise<any[]> {
    // Validate parameters
    this.validateAddress(contractAddress);

    const apiParams = this.createParams('token', 'tokenholderlist', {
      contractaddress: contractAddress,
      page,
      offset,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get ERC20 token information by contract address
   */
  public async getTokenInfo(contractAddress: string): Promise<any> {
    // Validate parameters
    this.validateAddress(contractAddress);

    const apiParams = this.createParams('token', 'tokeninfo', {
      contractaddress: contractAddress,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result[0]; // API returns array with single object
  }
}

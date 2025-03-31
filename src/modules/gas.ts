/**
 * Gas module for the Etherscan API
 * @module GasModule
 */

import { BaseModule } from './base';
import { Gas, APIResponse } from '../types';

/**
 * Gas module for the Etherscan API
 * @class GasModule
 * @description Provides methods for interacting with Ethereum gas prices and estimations
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/gas-tracker Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const gas = sdk.gas;
 * ```
 */
export class GasModule extends BaseModule {
  /**
   * Get current Safe, Proposed and Fast gas prices
   * @returns {Promise<Gas.GasOracleResponse>} Current gas prices in Gwei
   * @example
   * ```ts
   * const gasOracle = await gasModule.getGasOracle();
   * console.log(gasOracle.safeLow); // '30'
   * console.log(gasOracle.standard); // '35'
   * console.log(gasOracle.fast); // '40'
   * console.log(gasOracle.baseFee); // '25'
   * ```
   */
  public async getGasOracle(): Promise<Gas.GasOracleResponse> {
    const apiParams = this.createParams('gastracker', 'gasoracle', {});

    const response = await this.httpClient.get<
      APIResponse<Gas.GasOracleResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get estimated confirmation time for a given gas price
   * @param {number} gasPrice - Gas price in Gwei
   * @returns {Promise<string>} Estimated confirmation time in seconds
   * @throws {EtherscanValidationError} if gas price is invalid
   * @example
   * ```ts
   * const confirmationTime = await gasModule.estimateConfirmationTime(35);
   * console.log(confirmationTime); // '30' (seconds)
   * ```
   */
  public async estimateConfirmationTime(gasPrice: number): Promise<string> {
    // Validate parameters
    if (!Number.isInteger(gasPrice) || gasPrice <= 0) {
      throw new Error('Gas price must be a positive integer');
    }

    const apiParams = this.createParams('gastracker', 'gasestimate', {
      gasprice: gasPrice,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get gas usage estimation for a contract function execution
   * @param {string} to - Contract address
   * @param {string} data - Encoded function call data (must start with '0x')
   * @param {string} [value='0'] - Amount of ETH to send with the transaction in Wei
   * @returns {Promise<string>} Estimated gas limit for the transaction
   * @throws {EtherscanValidationError} if contract address is invalid
   * @throws {EtherscanValidationError} if data string is invalid
   * @example
   * ```ts
   * const gasEstimate = await gasModule.estimateGasForContractExecution(
   *   '0x123...', // Contract address
   *   '0xa9059cbb000000000000000000000000...', // Encoded transfer function call
   *   '0' // No ETH value
   * );
   * console.log(gasEstimate); // '65000'
   * ```
   */
  public async estimateGasForContractExecution(
    to: string,
    data: string,
    value: string = '0'
  ): Promise<string> {
    // Validate parameters
    this.validateAddress(to);

    if (!data || typeof data !== 'string' || !data.startsWith('0x')) {
      throw new Error('Invalid data string');
    }

    const apiParams = this.createParams(
      'gastracker',
      'contractexecutionstatus',
      {
        to,
        data,
        value,
      }
    );

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }
}

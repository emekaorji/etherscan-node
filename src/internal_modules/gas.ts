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
}

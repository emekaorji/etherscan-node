/**
 * Gas module for Etherscan API
 */
import { BaseModule } from './base';
import { Gas, APIResponse } from '../types';

export class GasModule extends BaseModule {
  /**
   * Get current Safe, Proposed and Fast gas prices
   */
  public async getGasOracle(): Promise<Gas.GasOracleResponse> {
    const apiParams = this.createParams('gastracker', 'gasoracle', {});

    const response = await this.httpClient.get<
      APIResponse<Gas.GasOracleResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get estimated gas price for contract execution
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
   * Get gas usage estimation for a contract function
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

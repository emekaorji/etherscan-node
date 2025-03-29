/**
 * Contracts module for Etherscan API
 */
import { BaseModule } from './base';
import { Contracts, APIResponse } from '../types';

export class ContractsModule extends BaseModule {
  /**
   * Get contract ABI for a verified contract
   */
  public async getAbi(params: Contracts.ABIRequest): Promise<string> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    const apiParams = this.createParams('contract', 'getabi', {
      address: params.address,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get source code for a verified contract
   */
  public async getSourceCode(
    params: Contracts.SourceCodeRequest
  ): Promise<Contracts.SourceCodeResponse[]> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    const apiParams = this.createParams('contract', 'getsourcecode', {
      address: params.address,
    });

    const response = await this.httpClient.get<
      APIResponse<Contracts.SourceCodeResponse[]>
    >('', apiParams);
    return response.result;
  }

  /**
   * Verify a contract on Etherscan
   */
  public async verifyContract(params: {
    contractAddress: string;
    sourceCode: string;
    contractName: string;
    compilerVersion: string;
    optimizationUsed: boolean;
    runs?: number;
    constructorArguments?: string;
    evmVersion?: string;
    licenseType?: string;
  }): Promise<string> {
    // Validate required parameters
    this.validateRequired(params, [
      'contractAddress',
      'sourceCode',
      'contractName',
      'compilerVersion',
      'optimizationUsed',
    ]);

    this.validateAddress(params.contractAddress);

    const apiParams = this.createParams('contract', 'verifysourcecode', {
      contractaddress: params.contractAddress,
      sourceCode: params.sourceCode,
      contractname: params.contractName,
      compilerversion: params.compilerVersion,
      optimizationUsed: this.formatParam(params.optimizationUsed, 'boolean'),
      runs: params.runs,
      constructorArguements: params.constructorArguments,
      evmversion: params.evmVersion,
      licenseType: params.licenseType,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Check status of source code verification
   */
  public async checkVerificationStatus(guid: string): Promise<string> {
    // Validate required parameters
    this.validateRequired({ guid }, ['guid']);

    const apiParams = this.createParams('contract', 'checkverifystatus', {
      guid,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get contract creation info
   */
  public async getContractCreation(
    contractAddresses: string[]
  ): Promise<any[]> {
    // Validate required parameters
    if (!Array.isArray(contractAddresses) || contractAddresses.length === 0) {
      throw new Error('Contract addresses must be a non-empty array');
    }

    // Validate each address
    contractAddresses.forEach((address) => this.validateAddress(address));

    const apiParams = this.createParams('contract', 'getcontractcreation', {
      contractaddresses: contractAddresses.join(','),
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }
}

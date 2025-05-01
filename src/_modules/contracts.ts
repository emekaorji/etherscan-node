/**
 * Contracts module for the Etherscan API
 * @module ContractsModule
 */

import { BaseModule } from './base';
import { Contracts, APIResponse } from '../types';

/**
 * Contracts module class that extends BaseModule
 * @class ContractsModule
 * @description Provides methods for interacting with smart contracts on the Ethereum blockchain through Etherscan API.
 * This module allows you to retrieve contract ABIs, source code, verify contracts, and get contract creation information.
 * @extends {BaseModule}
 * @see {@link https://docs.etherscan.io/api-endpoints/contracts}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const contracts = sdk.contracts;
 * ```
 */
export class ContractsModule extends BaseModule {
  /**
   * Get contract ABI for a verified contract
   * @param {Contracts.ABIRequest} params - Parameters for the request
   * @param {string} params.address - The contract address
   * @returns {Promise<string>} The contract ABI as a JSON string
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const abi = await contracts.getAbi({
   *   address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
   * });
   * // Returns: '[{"constant":true,"inputs":[],"name":"name",...}]'
   * ```
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
   * @param {string} address - The contract address
   * @returns {Promise<Contracts.SourceCodeResponse[]>} Array of source code information
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const sourceCode = await contracts.getSourceCode('0x06012c8cf97BEaD5deAe237070F9587f8E7A266d');
   * // Returns: [{SourceCode: 'contract CryptoKitties {...}', ABI: '[...]', ...}]
   * ```
   */
  public async getSourceCode(
    address: string
  ): Promise<Contracts.SourceCodeResponse[]>;

  /**
   * Get source code for a verified contract
   * @param {Contracts.SourceCodeRequest} params - Parameters for the request
   * @param {string} params.address - The contract address
   * @returns {Promise<Contracts.SourceCodeResponse[]>} Array of source code information
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const sourceCode = await contracts.getSourceCode({
   *   address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
   * });
   * // Returns: [{SourceCode: 'contract CryptoKitties {...}', ABI: '[...]', ...}]
   * ```
   */
  public async getSourceCode(
    params: Contracts.SourceCodeRequest
  ): Promise<Contracts.SourceCodeResponse[]>;

  public async getSourceCode(
    addressOrParams: string | Contracts.SourceCodeRequest
  ): Promise<Contracts.SourceCodeResponse[]> {
    // Convert string address to params object if needed
    const params: Contracts.SourceCodeRequest =
      typeof addressOrParams === 'string'
        ? { address: addressOrParams }
        : addressOrParams;

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
   * @param {Object} params - Verification parameters
   * @param {string} params.contractAddress - The contract address to verify
   * @param {string} params.sourceCode - The contract source code
   * @param {string} params.contractName - The name of the contract
   * @param {string} params.compilerVersion - The Solidity compiler version used
   * @param {boolean} params.optimizationUsed - Whether optimization was used
   * @param {number} [params.runs] - Number of optimization runs
   * @param {string} [params.constructorArguments] - Constructor arguments if any
   * @param {string} [params.evmVersion] - EVM version used
   * @param {string} [params.licenseType] - License type of the contract
   * @returns {Promise<string>} The verification GUID
   * @throws {EtherscanValidationError} if required parameters are missing or invalid
   * @example
   * ```ts
   * const guid = await contracts.verifyContract({
   *   contractAddress: '0x123...abc',
   *   sourceCode: 'contract MyContract {...}',
   *   contractName: 'MyContract',
   *   compilerVersion: 'v0.8.0+commit.c7dfd78e',
   *   optimizationUsed: true,
   *   runs: 200,
   *   constructorArguments: '0x...',
   *   evmVersion: 'byzantium',
   *   licenseType: 'MIT'
   * });
   * // Returns: 'guid-123...'
   * ```
   */
  public async verifyContract(params: {
    contractAddress: string;
    sourceCode: string;
    contractName: string;
    compilerVersion: string;
    optimizationUsed: boolean;
    codeformat?: 'solidity-single-file' | 'solidity-standard-json-input';
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

    const response = await this.httpClient.post<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Check status of source code verification
   * @param {string} guid - The verification GUID returned from verifyContract
   * @returns {Promise<string>} The verification status
   * @throws {EtherscanValidationError} if GUID is missing
   * @example
   * ```ts
   * const status = await contracts.checkVerificationStatus('guid-123...');
   * // Returns: 'Pass - Verified' or 'Fail - Unable to verify'
   * ```
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
   * Get contract creation information
   * @param {string[]} contractAddresses - Array of contract addresses
   * @returns {Promise<any[]>} Array of contract creation information
   * @throws {EtherscanValidationError} if addresses array is empty or invalid
   * @example
   * ```ts
   * const creationInfo = await contracts.getContractCreation([
   *   '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
   *   '0x123...abc'
   * ]);
   * // Returns: [{contractAddress: '0x...', contractCreator: '0x...', txHash: '0x...'}]
   * ```
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

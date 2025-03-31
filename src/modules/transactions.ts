/**
 * Transactions module for Etherscan API
 * @class TransactionsModule
 * @description Provides methods for retrieving and checking transaction information and status
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/transactions Etherscan API Documentation}
 */
import { BaseModule } from './base';
import { Transactions, APIResponse } from '../types';

export class TransactionsModule extends BaseModule {
  /**
   * Check transaction execution status
   * @param {Object} params - Transaction status request parameters
   * @param {string} params.txhash - Transaction hash to check
   * @returns {Promise<Transactions.StatusResponse>} Transaction execution status
   * @throws {EtherscanValidationError} if transaction hash is invalid
   * @example
   * ```ts
   * const status = await transactionsModule.getStatus({
   *   txhash: '0x123...abc'
   * });
   * console.log(status.isError); // '0' for success, '1' for error
   * console.log(status.errDescription); // Error description if isError is '1'
   * ```
   */
  public async getStatus(
    params: Transactions.StatusRequest
  ): Promise<Transactions.StatusResponse> {
    // Validate required parameters
    this.validateRequired(params, ['txhash']);
    this.validateTxHash(params.txhash);

    const apiParams = this.createParams('transaction', 'getstatus', {
      txhash: params.txhash,
    });

    const response = await this.httpClient.get<
      APIResponse<Transactions.StatusResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Check transaction receipt status
   * @param {Object} params - Transaction receipt status request parameters
   * @param {string} params.txhash - Transaction hash to check
   * @returns {Promise<Transactions.ReceiptStatusResponse>} Transaction receipt status
   * @throws {EtherscanValidationError} if transaction hash is invalid
   * @example
   * ```ts
   * const receiptStatus = await transactionsModule.getReceiptStatus({
   *   txhash: '0x123...abc'
   * });
   * console.log(receiptStatus.status); // '1' for success, '0' for failure
   * ```
   */
  public async getReceiptStatus(
    params: Transactions.ReceiptStatusRequest
  ): Promise<Transactions.ReceiptStatusResponse> {
    // Validate required parameters
    this.validateRequired(params, ['txhash']);
    this.validateTxHash(params.txhash);

    const apiParams = this.createParams('transaction', 'gettxreceiptstatus', {
      txhash: params.txhash,
    });

    const response = await this.httpClient.get<
      APIResponse<Transactions.ReceiptStatusResponse>
    >('', apiParams);
    return response.result;
  }
}

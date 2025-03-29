/**
 * Transactions module for Etherscan API
 */
import { BaseModule } from './base';
import { Transactions, APIResponse } from '../types';

export class TransactionsModule extends BaseModule {
  /**
   * Check transaction execution status
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

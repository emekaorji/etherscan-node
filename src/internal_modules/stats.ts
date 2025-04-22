/**
 * Stats module for the Etherscan API
 * @module StatsModule
 */

import { BaseModule } from './base';
import { Stats, APIResponse } from '../types';

/**
 * Stats module for the Etherscan API
 * @class StatsModule
 * @description Provides methods for retrieving Ethereum network statistics and metrics
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/stats Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const stats = sdk.stats;
 * ```
 */
export class StatsModule extends BaseModule {
  /**
   * Get the current Ether price in BTC and USD
   * @returns {Promise<Stats.EthPriceResponse>} Current ETH price information
   * @example
   * ```ts
   * const price = await statsModule.getEthPrice();
   * console.log(price.ethbtc); // '0.0714'
   * console.log(price.ethbtc_timestamp); // '1631234567'
   * console.log(price.ethusd); // '2345.67'
   * console.log(price.ethusd_timestamp); // '1631234567'
   * ```
   */
  public async getEthPrice(): Promise<Stats.EthPriceResponse> {
    const apiParams = this.createParams('stats', 'ethprice', {});

    const response = await this.httpClient.get<
      APIResponse<Stats.EthPriceResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the total amount of Ether in circulation, excluding ETH2 Staking
   * rewards and EIP1559 burnt fees
   *
   * @returns {Promise<Stats.EthSupplyResponse>} Total ETH supply information
   * @example
   * ```ts
   * const supply = await statsModule.getEthSupply();
   * console.log(supply.ethsupply); // '120000000000000000000000000'
   * ```
   */
  public async getBasicEthSupply(): Promise<Stats.EthSupplyResponse> {
    const apiParams = this.createParams('stats', 'ethsupply', {});

    const response = await this.httpClient.get<
      APIResponse<Stats.EthSupplyResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the total amount of Ether in circulation, including ETH2 Staking
   * rewards, EIP1559 burnt fees, and total withdrawn ETH from the beacon chain
   *
   * @returns {Promise<Stats.EthSupplyResponse>} Total ETH supply information
   * @example
   * ```ts
   * const supply = await statsModule.getEthSupply();
   * console.log(supply.ethsupply); // '120000000000000000000000000'
   * ```
   */
  public async getEthSupply(): Promise<Stats.EthSupplyResponse> {
    const apiParams = this.createParams('stats', 'ethsupply2', {});

    const response = await this.httpClient.get<
      APIResponse<Stats.EthSupplyResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the total number of Ethereum nodes
   * @returns {Promise<number>} Total number of nodes
   * @example
   * ```ts
   * const nodeCount = await statsModule.getNodeCount();
   * console.log(nodeCount); // 12345
   * ```
   */
  public async getNodeCount(): Promise<number> {
    const apiParams = this.createParams('stats', 'nodecount', {});

    const response = await this.httpClient.get<APIResponse<number>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get Ethereum node size information
   * @param {Object} params - Node size request parameters
   * @param {string} [params.startDate] - Start date in YYYY-MM-DD format
   * @param {string} [params.endDate] - End date in YYYY-MM-DD format
   * @param {string} [params.clientType='geth'] - Client type (geth, parity, etc.)
   * @param {string} [params.syncMode='default'] - Sync mode
   * @param {'asc'|'desc'} [params.sort='asc'] - Sort order
   * @returns {Promise<Stats.EthNodeSizeResponse>} Node size information
   * @throws {EtherscanValidationError} if date format is invalid
   * @example
   * ```ts
   * const nodeSize = await statsModule.getNodeSize({
   *   startDate: '2023-01-01',
   *   endDate: '2023-12-31',
   *   clientType: 'geth',
   *   syncMode: 'default',
   *   sort: 'asc'
   * });
   * console.log(nodeSize.chainSize); // '123456789'
   * console.log(nodeSize.clientType); // 'geth'
   * ```
   */
  public async getNodeSize(params: {
    startDate: string;
    endDate: string;
    clientType?: 'geth' | 'parity';
    syncMode?: 'default' | 'archive';
    sort?: 'asc' | 'desc';
  }): Promise<Stats.EthNodeSizeResponse> {
    // Validate date format if provided
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (params.startDate && !dateRegex.test(params.startDate)) {
      throw new Error('Start date must be in YYYY-MM-DD format');
    }
    if (params.endDate && !dateRegex.test(params.endDate)) {
      throw new Error('End date must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'chainsize', {
      startdate: params.startDate || '',
      enddate: params.endDate || '',
      clienttype: params.clientType || 'geth',
      syncmode: params.syncMode || 'default',
      sort: params.sort || 'asc',
    });

    const response = await this.httpClient.get<
      APIResponse<Stats.EthNodeSizeResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum daily network transaction fee data
   * @returns {Promise<Array<{UTCDate: string, transactionFee_ETH: string}>>} Daily transaction fee data
   * @example
   * ```ts
   * const fees = await statsModule.getDailyNetworkFee();
   * console.log(fees[0].UTCDate); // '2023-01-01'
   * console.log(fees[0].transactionFee_ETH); // '123.456'
   * ```
   */
  public async getDailyNetworkTransactionFee(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; transactionFee_ETH: string }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailytxnfee', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; transactionFee_ETH: string }>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum daily new address count
   * @returns {Promise<Array<{UTCDate: string, newAddressCount: number}>>} Daily new address count data
   * @example
   * ```ts
   * const newAddresses = await statsModule.getDailyNewAddressCount();
   * console.log(newAddresses[0].UTCDate); // '2023-01-01'
   * console.log(newAddresses[0].newAddressCount); // 12345
   * ```
   */
  public async getDailyNewAddressCount(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; newAddressCount: number }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailynewaddress', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; newAddressCount: number }>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum transaction history by days
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @param {'asc'|'desc'} [sort='asc'] - Sort order
   * @returns {Promise<Array<{UTCDate: string, transactionCount: number}>>} Daily transaction count data
   * @throws {EtherscanValidationError} if date format is invalid
   * @example
   * ```ts
   * const txHistory = await statsModule.getDailyTransactionCount(
   *   '2023-01-01',
   *   '2023-12-31',
   *   'asc'
   * );
   * console.log(txHistory[0].UTCDate); // '2023-01-01'
   * console.log(txHistory[0].transactionCount); // 123456
   * ```
   */
  public async getDailyTransactionCount(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; transactionCount: number }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailytx', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; transactionCount: number }>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum block size history by days
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @param {'asc'|'desc'} [sort='asc'] - Sort order
   * @returns {Promise<Array<{UTCDate: string, avgBlockSize: number}>>} Daily average block size data
   * @throws {EtherscanValidationError} if date format is invalid
   * @example
   * ```ts
   * const blockSizes = await statsModule.getDailyBlockSize(
   *   '2023-01-01',
   *   '2023-12-31',
   *   'asc'
   * );
   * console.log(blockSizes[0].UTCDate); // '2023-01-01'
   * console.log(blockSizes[0].avgBlockSize); // 12345
   * ```
   */
  public async getDailyAverageBlockSize(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; avgBlockSize: number }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyavgblocksize', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; avgBlockSize: number }>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum average block time history by days
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @param {'asc'|'desc'} [sort='asc'] - Sort order
   * @returns {Promise<Array<{UTCDate: string, avgBlockTime: number}>>} Daily average block time data
   * @throws {EtherscanValidationError} if date format is invalid
   * @example
   * ```ts
   * const blockTimes = await statsModule.getDailyAverageBlockTime(
   *   '2023-01-01',
   *   '2023-12-31',
   *   'asc'
   * );
   * console.log(blockTimes[0].UTCDate); // '2023-01-01'
   * console.log(blockTimes[0].avgBlockTime); // 12.34
   * ```
   */
  public async getDailyAverageBlockTime(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; avgBlockTime: number }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyavgblocktime', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; avgBlockTime: number }>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum daily uncle block count
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @param {'asc'|'desc'} [sort='asc'] - Sort order
   * @returns {Promise<Array<{UTCDate: string, uncleCount: number}>>} Daily uncle block count data
   * @throws {EtherscanValidationError} if date format is invalid
   * @example
   * ```ts
   * const uncleCounts = await statsModule.getDailyUncleBlockCount(
   *   '2023-01-01',
   *   '2023-12-31',
   *   'asc'
   * );
   * console.log(uncleCounts[0].UTCDate); // '2023-01-01'
   * console.log(uncleCounts[0].uncleCount); // 123
   * ```
   */
  public async getDailyUncleBlockCount(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Array<{ UTCDate: string; uncleCount: number }>> {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyuncleblkcount', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<{ UTCDate: string; uncleCount: number }>>
    >('', apiParams);
    return response.result;
  }
}

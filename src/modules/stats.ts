/**
 * Stats module for Etherscan API
 */
import { BaseModule } from './base';
import { Stats, APIResponse } from '../types';

export class StatsModule extends BaseModule {
  /**
   * Get Ether price (in BTC and USD)
   */
  public async getEthPrice(): Promise<Stats.EthPriceResponse> {
    const apiParams = this.createParams('stats', 'ethprice', {});

    const response = await this.httpClient.get<
      APIResponse<Stats.EthPriceResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get total Ether supply
   */
  public async getEthSupply(): Promise<Stats.EthSupplyResponse> {
    const apiParams = this.createParams('stats', 'ethsupply2', {});

    const response = await this.httpClient.get<
      APIResponse<Stats.EthSupplyResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get total nodes count
   */
  public async getNodeCount(): Promise<any> {
    const apiParams = this.createParams('stats', 'nodecount', {});

    const response = await this.httpClient.get<APIResponse<any>>('', apiParams);
    return response.result;
  }

  /**
   * Get ethereum node size
   */
  public async getNodeSize(): Promise<Stats.EthNodeSizeResponse> {
    const apiParams = this.createParams('stats', 'chainsize', {
      startdate: '',
      enddate: '',
      clienttype: 'geth',
      syncmode: 'default',
      sort: 'asc',
    });

    const response = await this.httpClient.get<
      APIResponse<Stats.EthNodeSizeResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum daily network transaction fee
   */
  public async getDailyNetworkFee(): Promise<any> {
    const apiParams = this.createParams('stats', 'dailytxnfee', {});

    const response = await this.httpClient.get<APIResponse<any>>('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum daily new address count
   */
  public async getDailyNewAddressCount(): Promise<any> {
    const apiParams = this.createParams('stats', 'dailynewaddress', {});

    const response = await this.httpClient.get<APIResponse<any>>('', apiParams);
    return response.result;
  }

  /**
   * Get Ethereum transaction history by days
   */
  public async getDailyTransactionCount(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<any[]> {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailytx', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get Ethereum block size history by days
   */
  public async getDailyBlockSize(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<any[]> {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyavgblocksize', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get Ethereum average block time history by days
   */
  public async getDailyAverageBlockTime(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<any[]> {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyavgblocktime', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get Ethereum daily uncle block count
   */
  public async getDailyUncleBlockCount(
    startDate: string,
    endDate: string,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<any[]> {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      throw new Error('Dates must be in YYYY-MM-DD format');
    }

    const apiParams = this.createParams('stats', 'dailyuncleblocks', {
      startdate: startDate,
      enddate: endDate,
      sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }
}

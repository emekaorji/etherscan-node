/**
 * Accounts module for Etherscan API
 */
import { BaseModule } from './base';
import { Accounts, APIResponse } from '../types';

export class AccountsModule extends BaseModule {
  /**
   * Get Ether balance for a single address
   */
  public async getBalance(params: Accounts.BalanceRequest): Promise<string> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    const apiParams = this.createParams('account', 'balance', {
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
   * Get Ether balance for multiple addresses in a single call
   */
  public async getBalanceMulti(
    params: Accounts.BalanceMultiRequest
  ): Promise<Array<Accounts.BalanceResponse>> {
    // Validate required parameters
    this.validateRequired(params, ['addresses']);

    if (!Array.isArray(params.addresses) || params.addresses.length === 0) {
      throw new Error('Addresses must be a non-empty array');
    }

    // Validate each address
    params.addresses.forEach((address) => this.validateAddress(address));

    const apiParams = this.createParams('account', 'balancemulti', {
      address: params.addresses.join(','),
      tag: params.tag || 'latest',
    });

    const response = await this.httpClient.get<
      APIResponse<Array<Accounts.BalanceResponse>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of 'normal' transactions by address
   */
  public async getTransactions(
    params: Accounts.TransactionsRequest
  ): Promise<Accounts.TransactionsResponse> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    const apiParams = this.createParams('account', 'txlist', {
      address: params.address,
      startblock: params.startBlock,
      endblock: params.endBlock,
      page: params.page,
      offset: params.offset,
      sort: params.sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Accounts.TransactionsResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of 'internal' transactions by address
   */
  public async getInternalTransactions(
    params: Accounts.InternalTransactionsRequest
  ): Promise<Accounts.InternalTransactionsResponse> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    const apiParams = this.createParams('account', 'txlistinternal', {
      address: params.address,
      startblock: params.startBlock,
      endblock: params.endBlock,
      page: params.page,
      offset: params.offset,
      sort: params.sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Accounts.InternalTransactionsResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of 'internal' transactions by transaction hash
   */
  public async getInternalTransactionsByHash(
    txhash: string
  ): Promise<Accounts.InternalTransactionsResponse> {
    // Validate transaction hash
    this.validateTxHash(txhash);

    const apiParams = this.createParams('account', 'txlistinternal', {
      txhash,
    });

    const response = await this.httpClient.get<
      APIResponse<Accounts.InternalTransactionsResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of 'internal' transactions by block range
   */
  public async getInternalTransactionsByBlockRange(
    startBlock: number,
    endBlock: number,
    page: number = 1,
    offset: number = 10,
    sort: 'asc' | 'desc' = 'asc'
  ): Promise<Accounts.InternalTransactionsResponse> {
    // Validate block numbers
    this.validateBlockNumber(startBlock);
    this.validateBlockNumber(endBlock);

    if (startBlock > endBlock) {
      throw new Error('Start block must be less than or equal to end block');
    }

    const apiParams = this.createParams('account', 'txlistinternal', {
      startblock: startBlock,
      endblock: endBlock,
      page,
      offset,
      sort,
    });

    const response = await this.httpClient.get<
      APIResponse<Accounts.InternalTransactionsResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of ERC-20 token transfer events by address
   */
  public async getTokenTransfers(
    params: Accounts.TransactionsRequest & { contractAddress?: string }
  ): Promise<any[]> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate contract address if provided
    if (params.contractAddress) {
      this.validateAddress(params.contractAddress);
    }

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    const apiParams = this.createParams('account', 'tokentx', {
      address: params.address,
      contractaddress: params.contractAddress,
      startblock: params.startBlock,
      endblock: params.endBlock,
      page: params.page,
      offset: params.offset,
      sort: params.sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get a list of ERC-721 NFT token transfer events by address
   */
  public async getNFTTransfers(
    params: Accounts.TransactionsRequest & { contractAddress?: string }
  ): Promise<any[]> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate contract address if provided
    if (params.contractAddress) {
      this.validateAddress(params.contractAddress);
    }

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    const apiParams = this.createParams('account', 'tokennfttx', {
      address: params.address,
      contractaddress: params.contractAddress,
      startblock: params.startBlock,
      endblock: params.endBlock,
      page: params.page,
      offset: params.offset,
      sort: params.sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get a list of ERC-1155 token transfer events by address
   */
  public async getERC1155Transfers(
    params: Accounts.TransactionsRequest & { contractAddress?: string }
  ): Promise<any[]> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddress(params.address);

    // Validate contract address if provided
    if (params.contractAddress) {
      this.validateAddress(params.contractAddress);
    }

    // Validate optional block numbers if provided
    if (params.startBlock !== undefined) {
      this.validateBlockNumber(params.startBlock);
    }

    if (params.endBlock !== undefined) {
      this.validateBlockNumber(params.endBlock);
    }

    const apiParams = this.createParams('account', 'token1155tx', {
      address: params.address,
      contractaddress: params.contractAddress,
      startblock: params.startBlock,
      endblock: params.endBlock,
      page: params.page,
      offset: params.offset,
      sort: params.sort,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get list of blocks mined by address
   */
  public async getMinedBlocks(
    address: string,
    page: number = 1,
    offset: number = 10
  ): Promise<any[]> {
    // Validate address
    this.validateAddress(address);

    const apiParams = this.createParams('account', 'getminedblocks', {
      address,
      page,
      offset,
    });

    const response = await this.httpClient.get<APIResponse<any[]>>(
      '',
      apiParams
    );
    return response.result;
  }
}

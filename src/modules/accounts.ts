/**
 * Accounts module for the Etherscan API
 * @module AccountsModule
 */

import { BaseModule } from './base';
import { Accounts, APIResponse } from '../types';
import { AtLeastOne } from '../types/utils';

/**
 * Accounts module for the Etherscan API
 * @class AccountsModule
 * @description Provides methods for retrieving account information, balances, and transaction history
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/accounts Etherscan API Documentation}
 * @example
 * ```ts
 * const sdk = new EtherscanSDK({ apiKey: 'your_api_key' });
 * const accounts = sdk.accounts;
 * ```
 */
export class AccountsModule extends BaseModule {
  /**
   * Get Ether balance for a single address
   * @param {Object} params - Balance request parameters
   * @param {string} params.address - Ethereum address to check balance for
   * @param {string} [params.tag='latest'] - Block tag (latest, earliest, pending, or block number)
   * @returns {Promise<string>} Account balance in Wei
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const balance = await accountsModule.getBalance({
   *   address: '0x123...abc',
   *   tag: 'latest'
   * });
   * console.log(balance); // '1000000000000000000' (1 ETH)
   * ```
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
   * @param {Object} params - Balance multi request parameters
   * @param {string[]} params.addresses - Array of Ethereum addresses to check balances for
   * @param {string} [params.tag='latest'] - Block tag (latest, earliest, pending, or block number)
   * @returns {Promise<Array<Accounts.BalanceResponse>>} Array of account balances in Wei
   * @throws {EtherscanValidationError} if addresses array is empty or contains invalid addresses
   * @example
   * ```ts
   * const balances = await accountsModule.getBalanceMulti({
   *   addresses: ['0x123...abc', '0x456...def'],
   *   tag: 'latest'
   * });
   * console.log(balances[0].account); // '0x123...abc'
   * console.log(balances[0].balance); // '1000000000000000000'
   * ```
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
   * @param {Object} params - Transactions request parameters
   * @param {string} params.address - Ethereum address to get transactions for
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of records per page
   * @param {'asc'|'desc'} [params.sort='desc'] - Sort order
   * @returns {Promise<Accounts.TransactionsResponse>} List of transactions
   * @throws {EtherscanValidationError} if address or block numbers are invalid
   * @example
   * ```ts
   * const transactions = await accountsModule.getTransactions({
   *   address: '0x123...abc',
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   page: 1,
   *   offset: 10,
   *   sort: 'desc'
   * });
   * console.log(transactions[0].hash); // '0x789...xyz'
   * console.log(transactions[0].value); // '1000000000000000000'
   * ```
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
   * @param {Object} params - Internal transactions request parameters
   * @param {string} params.address - Ethereum address to get internal transactions for
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of records per page
   * @param {'asc'|'desc'} [params.sort='desc'] - Sort order
   * @returns {Promise<Accounts.InternalTransactionsResponse>} List of internal transactions
   * @throws {EtherscanValidationError} if address or block numbers are invalid
   * @example
   * ```ts
   * const internalTxs = await accountsModule.getInternalTransactions({
   *   address: '0x123...abc',
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   page: 1,
   *   offset: 10,
   *   sort: 'desc'
   * });
   * console.log(internalTxs[0].hash); // '0x789...xyz'
   * console.log(internalTxs[0].value); // '1000000000000000000'
   * ```
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
   * @param {string} txhash - Transaction hash to get internal transactions for
   * @returns {Promise<Accounts.InternalTransactionsResponse>} List of internal transactions
   * @throws {EtherscanValidationError} if transaction hash is invalid
   * @example
   * ```ts
   * const internalTxs = await accountsModule.getInternalTransactionsByHash(
   *   '0x789...xyz'
   * );
   * console.log(internalTxs[0].hash); // '0x789...xyz'
   * console.log(internalTxs[0].value); // '1000000000000000000'
   * ```
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
   * @param {number} startBlock - Starting block number
   * @param {number} endBlock - Ending block number
   * @param {number} [page=1] - Page number for pagination
   * @param {number} [offset=10] - Number of records per page
   * @param {'asc'|'desc'} [sort='asc'] - Sort order
   * @returns {Promise<Accounts.InternalTransactionsResponse>} List of internal transactions
   * @throws {EtherscanValidationError} if block numbers are invalid or start block is greater than end block
   * @example
   * ```ts
   * const internalTxs = await accountsModule.getInternalTransactionsByBlockRange(
   *   1000000,
   *   1000100,
   *   1,
   *   10,
   *   'asc'
   * );
   * console.log(internalTxs[0].hash); // '0x789...xyz'
   * console.log(internalTxs[0].value); // '1000000000000000000'
   * ```
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
   * @param {Object} params - Token transfers request parameters
   * @param {string} params.address - Ethereum address to get token transfers for
   * @param {string} [params.contractAddress] - Optional ERC20 token contract address to filter by
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of records per page
   * @param {'asc'|'desc'} [params.sort='desc'] - Sort order
   * @returns {Promise<Array<Accounts.TokenTransfer>>} List of token transfers
   * @throws {EtherscanValidationError} if address, contract address, or block numbers are invalid
   * @example
   * ```ts
   * const transfers = await accountsModule.getTokenTransfers({
   *   address: '0x123...abc',
   *   contractAddress: '0x456...def', // Optional: filter by specific token
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   page: 1,
   *   offset: 10,
   *   sort: 'desc'
   * });
   * console.log(transfers[0].hash); // '0x789...xyz'
   * console.log(transfers[0].value); // '1000000000000000000'
   * ```
   */
  public async getTokenTransfers(
    params: AtLeastOne<
      Accounts.TokenTranfersRequest,
      'address' | 'contractAddress'
    >
  ): Promise<Array<Accounts.TokenTransferResponse>> {
    // Validate required parameters
    this.validateRequiredOr(params, ['address', 'contractAddress']);
    this.validateAddressOr([params.address, params.contractAddress]);

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

    const response = await this.httpClient.get<
      APIResponse<Array<Accounts.TokenTransferResponse>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of ERC-721 NFT token transfer events by address
   * @param {Object} params - NFT transfers request parameters
   * @param {string} params.address - Ethereum address to get NFT transfers for
   * @param {string} [params.contractAddress] - Optional ERC721 token contract address to filter by
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of records per page
   * @param {'asc'|'desc'} [params.sort='desc'] - Sort order
   * @returns {Promise<Array<Accounts.NFTTransfer>>} List of NFT transfers
   * @throws {EtherscanValidationError} if address, contract address, or block numbers are invalid
   * @example
   * ```ts
   * const nftTransfers = await accountsModule.getNFTTransfers({
   *   address: '0x123...abc',
   *   contractAddress: '0x456...def', // Optional: filter by specific NFT contract
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   page: 1,
   *   offset: 10,
   *   sort: 'desc'
   * });
   * console.log(nftTransfers[0].hash); // '0x789...xyz'
   * console.log(nftTransfers[0].tokenID); // '123'
   * ```
   */
  public async getNFTTransfers(
    params: AtLeastOne<
      Accounts.TokenTranfersRequest,
      'address' | 'contractAddress'
    >
  ): Promise<Array<Accounts.NFTTransferResponse>> {
    // Validate required parameters
    this.validateRequired(params, ['address']);
    this.validateAddressOr([params.address, params.contractAddress]);

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

    const response = await this.httpClient.get<
      APIResponse<Array<Accounts.NFTTransferResponse>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get a list of ERC-1155 token transfer events by address
   * @param {Object} params - ERC1155 transfers request parameters
   * @param {string} params.address - Ethereum address to get ERC1155 transfers for
   * @param {string} [params.contractAddress] - Optional ERC1155 token contract address to filter by
   * @param {number} [params.startBlock] - Starting block number
   * @param {number} [params.endBlock] - Ending block number
   * @param {number} [params.page=1] - Page number for pagination
   * @param {number} [params.offset=10] - Number of records per page
   * @param {'asc'|'desc'} [params.sort='desc'] - Sort order
   * @returns {Promise<Array<Accounts.ERC1155Transfer>>} List of ERC1155 transfers
   * @throws {EtherscanValidationError} if address, contract address, or block numbers are invalid
   * @example
   * ```ts
   * const transfers = await accountsModule.getERC1155Transfers({
   *   address: '0x123...abc',
   *   contractAddress: '0x456...def', // Optional: filter by specific ERC1155 contract
   *   startBlock: 1000000,
   *   endBlock: 1000100,
   *   page: 1,
   *   offset: 10,
   *   sort: 'desc'
   * });
   * console.log(transfers[0].hash); // '0x789...xyz'
   * console.log(transfers[0].tokenID); // '123'
   * console.log(transfers[0].value); // '100'
   * ```
   */
  public async getERC1155Transfers(
    params: Accounts.TransactionsRequest & { contractAddress?: string }
  ): Promise<Array<Accounts.ERC1155TransferResponse>> {
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

    const response = await this.httpClient.get<
      APIResponse<Array<Accounts.ERC1155TransferResponse>>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get list of blocks mined by address
   * @param {string} address - Ethereum address to get mined blocks for
   * @param {number} [page=1] - Page number for pagination
   * @param {number} [offset=10] - Number of records per page
   * @returns {Promise<Array<Accounts.MinedBlock>>} List of mined blocks
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const minedBlocks = await accountsModule.getMinedBlocks(
   *   '0x123...abc',
   *   1,
   *   10
   * );
   * console.log(minedBlocks[0].blockNumber); // '1000000'
   * console.log(minedBlocks[0].timeStamp); // '1631234567'
   * console.log(minedBlocks[0].blockReward); // '2000000000000000000'
   * ```
   */
  public async getMinedBlocks(
    address: string,
    page: number = 1,
    offset: number = 10
  ): Promise<Array<Accounts.MinedBlockResponse>> {
    // Validate address
    this.validateAddress(address);

    const apiParams = this.createParams('account', 'getminedblocks', {
      address,
      page,
      offset,
    });

    const response = await this.httpClient.get<
      APIResponse<Array<Accounts.MinedBlockResponse>>
    >('', apiParams);
    return response.result;
  }
}

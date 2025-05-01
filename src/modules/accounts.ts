/**
 * Accounts module for the Etherscan API
 * @module AccountsModule
 */

import { SortDirection } from '../types';
import { AccountsModuleOptions } from '../types/modules/accounts';
import { EtherscanSDKBase } from '../baseClient';
import { _AccountsModule } from '../_modules/accounts';

/**
 * Accounts module for the Etherscan API
 * @class AccountsModule
 * @description Provides methods for retrieving account information, balances, and transaction history
 * @extends EtherscanSDKBase
 * @see {@link https://docs.etherscan.io/etherscan-v2/api-endpoints/accounts Etherscan API Documentation}
 * @example
 * ```ts
 * const accountsModule = new AccountsModule({
 *   // Required
 *   apiKey: 'your_api_key',
 *   address: '0x123...abc',
 *   // Optional
 *   startBlock: 1000000,
 *   endBlock: 1000100,
 *   page: 1,
 *   offset: 10,
 *   sort: 'desc'
 * })
 * ```
 */
export class AccountsModule extends EtherscanSDKBase {
  private readonly singleAddress: string;
  private readonly multipleAddresses: string[];
  private readonly page?: number;
  private readonly offset?: number;
  private readonly sort?: SortDirection;
  private readonly startBlock?: number;
  private readonly endBlock?: number;
  private readonly tag?: string;

  private readonly baseAccounts: _AccountsModule;

  constructor(options: AccountsModuleOptions) {
    super(options);

    const address = options.address;

    this.singleAddress = Array.isArray(address) ? address[0] : address;
    this.multipleAddresses = Array.isArray(address) ? address : [address];
    this.baseAccounts = new _AccountsModule(this.httpClient, this.apiKey);

    this.page = options.page;
    this.offset = options.offset;
    this.sort = options.sort;
    this.startBlock = options.startBlock;
    this.endBlock = options.endBlock;
    this.tag = options.tag;
  }

  /**
   * Get Ether balance for a single address
   * @returns {Promise<string>} Account balance in Wei
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const balance = await accountsModule.getBalance();
   * console.log(balance); // '1000000000000000000' (1 ETH)
   * ```
   */
  public async getBalance() {
    return this.baseAccounts.getBalance({
      address: this.singleAddress,
      tag: this.tag,
    });
  }

  /**
   * Get Ether balance for multiple addresses in a single call
   * @returns {Promise<Array<Accounts.BalanceResponse>>} Array of account balances in Wei
   * @throws {EtherscanValidationError} if addresses array is empty or contains invalid addresses
   * @example
   * ```ts
   * const balances = await accountsModule.getBalanceMulti();
   * console.log(balances[0].account); // '0x123...abc'
   * console.log(balances[0].balance); // '1000000000000000000'
   * ```
   */
  public async getBalanceMulti() {
    return this.baseAccounts.getBalanceMulti({
      addresses: this.multipleAddresses,
      tag: this.tag,
    });
  }

  /**
   * Get a list of 'normal' transactions by address
   * @returns {Promise<Accounts.TransactionsResponse>} List of transactions
   * @throws {EtherscanValidationError} if address or block numbers are invalid
   * @example
   * ```ts
   * const transactions = await accountsModule.getTransactions();
   * console.log(transactions[0].hash); // '0x789...xyz'
   * console.log(transactions[0].value); // '1000000000000000000'
   * ```
   */
  public async getTransactions() {
    return this.baseAccounts.getTransactions({
      address: this.singleAddress,
      endBlock: this.endBlock,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
      startBlock: this.startBlock,
    });
  }

  /**
   * Get a list of 'internal' transactions by address
   * @returns {Promise<Accounts.InternalTransactionsResponse>} List of internal transactions
   * @throws {EtherscanValidationError} if address or block numbers are invalid
   * @example
   * ```ts
   * const internalTxs = await accountsModule.getInternalTransactions();
   * console.log(internalTxs[0].hash); // '0x789...xyz'
   * console.log(internalTxs[0].value); // '1000000000000000000'
   * ```
   */
  public async getInternalTransactions() {
    return this.baseAccounts.getInternalTransactions({
      address: this.singleAddress,
      endBlock: this.endBlock,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
      startBlock: this.startBlock,
    });
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
  public async getInternalTransactionsByHash(txhash: string) {
    return this.baseAccounts.getInternalTransactionsByHash(txhash);
  }

  /**
   * Get a list of 'internal' transactions by block range
   * @returns {Promise<Accounts.InternalTransactionsResponse>} List of internal transactions
   * @throws {EtherscanValidationError} if block numbers are invalid or start block is greater than end block
   * @example
   * ```ts
   * const internalTxs = await accountsModule.getInternalTransactionsByBlockRange();
   * console.log(internalTxs[0].hash); // '0x789...xyz'
   * console.log(internalTxs[0].value); // '1000000000000000000'
   * ```
   */
  public async getInternalTransactionsByBlockRange() {
    return this.baseAccounts.getInternalTransactionsByBlockRange({
      endBlock: this.endBlock!,
      startBlock: this.startBlock!,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
    });
  }

  /**
   * Get a list of ERC-20 token transfer events by address
   * @returns {Promise<Array<Accounts.TokenTransfer>>} List of token transfers
   * @throws {EtherscanValidationError} if address, contract address, or block numbers are invalid
   * @example
   * ```ts
   * const transfers = await accountsModule.getTokenTransfers('0x456...def');
   * console.log(transfers[0].hash); // '0x789...xyz'
   * console.log(transfers[0].value); // '1000000000000000000'
   * ```
   */
  public async getTokenTransfers(contractAddress: string) {
    return this.baseAccounts.getTokenTransfers({
      address: this.singleAddress,
      contractAddress,
      endBlock: this.endBlock!,
      startBlock: this.startBlock!,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
    });
  }

  /**
   * Get a list of ERC-721 NFT token transfer events by address
   * @returns {Promise<Array<Accounts.NFTTransfer>>} List of NFT transfers
   * @throws {EtherscanValidationError} if address, contract address, or block numbers are invalid
   * @example
   * ```ts
   * const nftTransfers = await accountsModule.getNFTTransfers('0x456...def');
   * console.log(nftTransfers[0].hash); // '0x789...xyz'
   * console.log(nftTransfers[0].tokenID); // '123'
   * ```
   */
  public async getNFTTransfers(contractAddress: string) {
    return this.baseAccounts.getTokenTransfers({
      address: this.singleAddress,
      contractAddress,
      endBlock: this.endBlock!,
      startBlock: this.startBlock!,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
    });
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
   * const transfers = await accountsModule.getERC1155Transfers('0x456...def');
   * console.log(transfers[0].hash); // '0x789...xyz'
   * console.log(transfers[0].tokenID); // '123'
   * console.log(transfers[0].value); // '100'
   * ```
   */
  public async getERC1155Transfers(contractAddress: string) {
    return this.baseAccounts.getERC1155Transfers({
      address: this.singleAddress,
      contractAddress,
      endBlock: this.endBlock!,
      startBlock: this.startBlock!,
      offset: this.offset,
      page: this.page,
      sort: this.sort,
    });
  }

  /**
   * Get list of blocks mined by address
   * @param {'blocks' | 'uncles'} blocktype - The pre-defined block type, either `blocks` for canonical blocks or `uncles` for uncle blocks only
   * @returns {Promise<Array<Accounts.MinedBlock>>} List of mined blocks
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const minedBlocks = await accountsModule.getMinedBlocks('uncles');
   * console.log(minedBlocks[0].blockNumber); // '1000000'
   * console.log(minedBlocks[0].timeStamp); // '1631234567'
   * console.log(minedBlocks[0].blockReward); // '2000000000000000000'
   * ```
   */
  public async getMinedBlocks(blocktype: 'blocks' | 'uncles') {
    return this.baseAccounts.getMinedBlocks({
      address: this.singleAddress,
      blocktype,
      offset: this.offset,
      page: this.page,
    });
  }
}

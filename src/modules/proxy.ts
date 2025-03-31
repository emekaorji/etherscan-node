/**
 * Proxy module for Etherscan API
 * @class ProxyModule
 * @description Provides methods for interacting with Ethereum network through JSON-RPC proxy
 * @extends BaseModule
 * @see {@link https://docs.etherscan.io/api-endpoints/proxy Etherscan API Documentation}
 */
import { BaseModule } from './base';
import { Proxy, APIResponse } from '../types';

export class ProxyModule extends BaseModule {
  /**
   * Validates a block hash
   * @param {string} blockHash - Block hash to validate
   * @throws {EtherscanValidationError} if block hash is invalid
   * @private
   */
  private validateBlockHash(blockHash: string): void {
    if (
      !blockHash ||
      typeof blockHash !== 'string' ||
      !blockHash.startsWith('0x') ||
      blockHash.length !== 66
    ) {
      throw new Error('Invalid block hash');
    }
  }

  /**
   * Get the number of most recent block
   * @returns {Promise<string>} The number of the most recent block
   * @example
   * ```ts
   * const blockNumber = await proxyModule.getBlockNumber();
   * console.log(blockNumber); // '12345678'
   * ```
   */
  public async getBlockNumber(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_blockNumber', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get information about a block by block number
   * @param {string} blockNumber - Block number in hex format or 'latest', 'earliest', 'pending'
   * @returns {Promise<Proxy.Block>} Block information
   * @throws {EtherscanValidationError} if block number is invalid
   * @example
   * ```ts
   * const block = await proxyModule.getBlockByNumber('0x123456');
   * console.log(block.number); // '0x123456'
   * console.log(block.hash); // '0xabc...'
   * console.log(block.timestamp); // '0x5f7b3c1d'
   * ```
   */
  public async getBlockByNumber(
    blockNumber: string
  ): Promise<Proxy.BlockResponse> {
    const apiParams = this.createParams('proxy', 'eth_getBlockByNumber', {
      tag: blockNumber,
      boolean: true,
    });

    const response = await this.httpClient.get<
      APIResponse<Proxy.BlockResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get information about a transaction by hash
   * @param {string} txHash - Transaction hash
   * @returns {Promise<Proxy.Transaction>} Transaction information
   * @throws {EtherscanValidationError} if transaction hash is invalid
   * @example
   * ```ts
   * const tx = await proxyModule.getTransactionByHash('0xabc...');
   * console.log(tx.hash); // '0xabc...'
   * console.log(tx.from); // '0x123...'
   * console.log(tx.to); // '0x456...'
   * console.log(tx.value); // '0xde0b6b3a7640000'
   * ```
   */
  public async getTransactionByHash(
    txHash: string
  ): Promise<Proxy.TransactionResponse> {
    // Validate transaction hash
    this.validateTxHash(txHash);

    const apiParams = this.createParams('proxy', 'eth_getTransactionByHash', {
      txhash: txHash,
    });

    const response = await this.httpClient.get<
      APIResponse<Proxy.TransactionResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the receipt of a transaction by hash
   * @param {string} txHash - Transaction hash
   * @returns {Promise<Proxy.TransactionReceipt>} Transaction receipt information
   * @throws {EtherscanValidationError} if transaction hash is invalid
   * @example
   * ```ts
   * const receipt = await proxyModule.getTransactionReceipt('0xabc...');
   * console.log(receipt.transactionHash); // '0xabc...'
   * console.log(receipt.blockNumber); // '0x123456'
   * console.log(receipt.status); // '0x1'
   * console.log(receipt.gasUsed); // '0x5208'
   * ```
   */
  public async getTransactionReceipt(
    txHash: string
  ): Promise<Proxy.TransactionReceiptResponse> {
    // Validate transaction hash
    this.validateTxHash(txHash);

    const apiParams = this.createParams('proxy', 'eth_getTransactionReceipt', {
      txhash: txHash,
    });

    const response = await this.httpClient.get<
      APIResponse<Proxy.TransactionReceiptResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the number of transactions sent from an address
   * @param {string} address - Ethereum address
   * @returns {Promise<string>} Number of transactions sent from the address
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const nonce = await proxyModule.getTransactionCount('0x123...');
   * console.log(nonce); // '0x42'
   * ```
   */
  public async getTransactionCount(address: string): Promise<string> {
    // Validate address
    this.validateAddress(address);

    const apiParams = this.createParams('proxy', 'eth_getTransactionCount', {
      address,
      tag: 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the code at a given address
   * @param {string} address - Contract address
   * @returns {Promise<string>} Contract bytecode
   * @throws {EtherscanValidationError} if address is invalid
   * @example
   * ```ts
   * const code = await proxyModule.getCode('0x123...');
   * console.log(code); // '0x608060405234801561001057600080fd5b...'
   * ```
   */
  public async getCode(address: string): Promise<string> {
    // Validate address
    this.validateAddress(address);

    const apiParams = this.createParams('proxy', 'eth_getCode', {
      address,
      tag: 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the value from a storage position at a given address
   * @param {string} address - Contract address
   * @param {string} position - Storage position in hex format
   * @returns {Promise<string>} Value at the storage position
   * @throws {EtherscanValidationError} if address is invalid
   * @throws {EtherscanValidationError} if position is invalid
   * @example
   * ```ts
   * const value = await proxyModule.getStorageAt(
   *   '0x123...',
   *   '0x0'
   * );
   * console.log(value); // '0x0000000000000000000000000000000000000000000000000000000000000000'
   * ```
   */
  public async getStorageAt(
    address: string,
    position: string
  ): Promise<string> {
    // Validate address
    this.validateAddress(address);

    // Validate position (must be hex string)
    if (!position.startsWith('0x')) {
      throw new Error('Position must be a hex string starting with 0x');
    }

    const apiParams = this.createParams('proxy', 'eth_getStorageAt', {
      address,
      position,
      tag: 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current gas price in Wei
   * @returns {Promise<string>} Current gas price in Wei
   * @example
   * ```ts
   * const gasPrice = await proxyModule.getGasPrice();
   * console.log(gasPrice); // '0x4a817c800'
   * ```
   */
  public async getGasPrice(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_gasPrice', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network hash rate
   * @returns {Promise<string>} Current network hash rate in hashes per second
   * @example
   * ```ts
   * const hashRate = await proxyModule.getHashRate();
   * console.log(hashRate); // '0x0000000000000000000000000000000000000000000000000000000000000000'
   * ```
   */
  public async getHashRate(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_hashrate', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network difficulty
   * @returns {Promise<string>} Current network difficulty
   * @example
   * ```ts
   * const difficulty = await proxyModule.getDifficulty();
   * console.log(difficulty); // '0x0000000000000000000000000000000000000000000000000000000000000000'
   * ```
   */
  public async getDifficulty(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_difficulty', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network mining status
   * @returns {Promise<boolean>} Whether the network is currently mining
   * @example
   * ```ts
   * const isMining = await proxyModule.isMining();
   * console.log(isMining); // false
   * ```
   */
  public async isMining(): Promise<boolean> {
    const apiParams = this.createParams('proxy', 'eth_mining', {});

    const response = await this.httpClient.get<APIResponse<boolean>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network syncing status
   * @returns {Promise<Proxy.SyncingStatus | boolean>} Network syncing status or false if not syncing
   * @example
   * ```ts
   * const syncing = await proxyModule.isSyncing();
   * if (typeof syncing === 'object') {
   *   console.log(syncing.currentBlock); // '0x123456'
   *   console.log(syncing.highestBlock); // '0x123457'
   * } else {
   *   console.log('Not syncing');
   * }
   * ```
   */
  public async isSyncing(): Promise<Proxy.SyncingStatusResponse | boolean> {
    const apiParams = this.createParams('proxy', 'eth_syncing', {});

    const response = await this.httpClient.get<
      APIResponse<Proxy.SyncingStatusResponse | boolean>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network coinbase address
   * @returns {Promise<string>} Current network coinbase address
   * @example
   * ```ts
   * const coinbase = await proxyModule.getCoinbase();
   * console.log(coinbase); // '0x123...'
   * ```
   */
  public async getCoinbase(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_coinbase', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network gas limit
   * @returns {Promise<string>} Current network gas limit
   * @example
   * ```ts
   * const gasLimit = await proxyModule.getGasLimit();
   * console.log(gasLimit); // '0x47b760'
   * ```
   */
  public async getGasLimit(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_gasLimit', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network accounts
   * @returns {Promise<string[]>} List of accounts on the network
   * @example
   * ```ts
   * const accounts = await proxyModule.getAccounts();
   * console.log(accounts); // ['0x123...', '0x456...']
   * ```
   */
  public async getAccounts(): Promise<string[]> {
    const apiParams = this.createParams('proxy', 'eth_accounts', {});

    const response = await this.httpClient.get<APIResponse<string[]>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network block transaction count by block number
   * @param {string} blockNumber - Block number in hex format or 'latest', 'earliest', 'pending'
   * @returns {Promise<string>} Number of transactions in the block
   * @throws {EtherscanValidationError} if block number is invalid
   * @example
   * ```ts
   * const txCount = await proxyModule.getBlockTransactionCountByNumber('0x123456');
   * console.log(txCount); // '0x42'
   * ```
   */
  public async getBlockTransactionCountByNumber(
    blockNumber: string
  ): Promise<string> {
    const apiParams = this.createParams(
      'proxy',
      'eth_getBlockTransactionCountByNumber',
      {
        tag: blockNumber,
      }
    );

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network block transaction count by block hash
   * @param {string} blockHash - Block hash
   * @returns {Promise<string>} Number of transactions in the block
   * @throws {EtherscanValidationError} if block hash is invalid
   * @example
   * ```ts
   * const txCount = await proxyModule.getBlockTransactionCountByHash('0xabc...');
   * console.log(txCount); // '0x42'
   * ```
   */
  public async getBlockTransactionCountByHash(
    blockHash: string
  ): Promise<string> {
    // Validate block hash
    this.validateBlockHash(blockHash);

    const apiParams = this.createParams(
      'proxy',
      'eth_getBlockTransactionCountByHash',
      {
        blockhash: blockHash,
      }
    );

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network uncle count by block number
   * @param {string} blockNumber - Block number in hex format or 'latest', 'earliest', 'pending'
   * @returns {Promise<string>} Number of uncles in the block
   * @throws {EtherscanValidationError} if block number is invalid
   * @example
   * ```ts
   * const uncleCount = await proxyModule.getUncleCountByBlockNumber('0x123456');
   * console.log(uncleCount); // '0x1'
   * ```
   */
  public async getUncleCountByBlockNumber(
    blockNumber: string
  ): Promise<string> {
    const apiParams = this.createParams(
      'proxy',
      'eth_getUncleCountByBlockNumber',
      {
        tag: blockNumber,
      }
    );

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network uncle count by block hash
   * @param {string} blockHash - Block hash
   * @returns {Promise<string>} Number of uncles in the block
   * @throws {EtherscanValidationError} if block hash is invalid
   * @example
   * ```ts
   * const uncleCount = await proxyModule.getUncleCountByBlockHash('0xabc...');
   * console.log(uncleCount); // '0x1'
   * ```
   */
  public async getUncleCountByBlockHash(blockHash: string): Promise<string> {
    // Validate block hash
    this.validateBlockHash(blockHash);

    const apiParams = this.createParams(
      'proxy',
      'eth_getUncleCountByBlockHash',
      {
        blockhash: blockHash,
      }
    );

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network uncle by block hash and index
   * @param {string} blockHash - Block hash
   * @param {string} index - Uncle index in hex format
   * @returns {Promise<Proxy.Block>} Uncle block information
   * @throws {EtherscanValidationError} if block hash is invalid
   * @throws {EtherscanValidationError} if index is invalid
   * @example
   * ```ts
   * const uncle = await proxyModule.getUncleByBlockHashAndIndex(
   *   '0xabc...',
   *   '0x0'
   * );
   * console.log(uncle.number); // '0x123456'
   * console.log(uncle.hash); // '0xdef...'
   * ```
   */
  public async getUncleByBlockHashAndIndex(
    blockHash: string,
    index: string
  ): Promise<Proxy.BlockResponse> {
    // Validate block hash
    this.validateBlockHash(blockHash);

    // Validate index (must be hex string)
    if (!index.startsWith('0x')) {
      throw new Error('Index must be a hex string starting with 0x');
    }

    const apiParams = this.createParams(
      'proxy',
      'eth_getUncleByBlockHashAndIndex',
      {
        blockhash: blockHash,
        index,
      }
    );

    const response = await this.httpClient.get<
      APIResponse<Proxy.BlockResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network uncle by block number and index
   * @param {string} blockNumber - Block number in hex format or 'latest', 'earliest', 'pending'
   * @param {string} index - Uncle index in hex format
   * @returns {Promise<Proxy.Block>} Uncle block information
   * @throws {EtherscanValidationError} if block number is invalid
   * @throws {EtherscanValidationError} if index is invalid
   * @example
   * ```ts
   * const uncle = await proxyModule.getUncleByBlockNumberAndIndex(
   *   '0x123456',
   *   '0x0'
   * );
   * console.log(uncle.number); // '0x123456'
   * console.log(uncle.hash); // '0xdef...'
   * ```
   */
  public async getUncleByBlockNumberAndIndex(
    blockNumber: string,
    index: string
  ): Promise<Proxy.BlockResponse> {
    // Validate index (must be hex string)
    if (!index.startsWith('0x')) {
      throw new Error('Index must be a hex string starting with 0x');
    }

    const apiParams = this.createParams(
      'proxy',
      'eth_getUncleByBlockNumberAndIndex',
      {
        tag: blockNumber,
        index,
      }
    );

    const response = await this.httpClient.get<
      APIResponse<Proxy.BlockResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network compilation
   * @returns {Promise<string>} Network compilation information
   * @example
   * ```ts
   * const compilation = await proxyModule.getCompilers();
   * console.log(compilation); // '["solidity"]'
   * ```
   */
  public async getCompilers(): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_getCompilers', {});

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network logs
   * @param {Proxy.LogRequest} params - Log request parameters
   * @returns {Promise<Proxy.Log[]>} Array of log entries
   * @throws {EtherscanValidationError} if parameters are invalid
   * @example
   * ```ts
   * const logs = await proxyModule.getLogs({
   *   fromBlock: '0x123456',
   *   toBlock: '0x123457',
   *   address: '0xabc...',
   *   topics: ['0xdef...']
   * });
   * console.log(logs[0].address); // '0xabc...'
   * console.log(logs[0].topics); // ['0xdef...']
   * ```
   */
  public async getLogs(params: Proxy.LogRequest): Promise<Proxy.LogResponse[]> {
    const apiParams = this.createParams('proxy', 'eth_getLogs', params);

    const response = await this.httpClient.get<
      APIResponse<Proxy.LogResponse[]>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network work
   * @returns {Promise<Proxy.Work>} Current network work information
   * @example
   * ```ts
   * const work = await proxyModule.getWork();
   * console.log(work.currentBlockHeader); // '0xabc...'
   * console.log(work.seedHash); // '0xdef...'
   * console.log(work.target); // '0x123...'
   * ```
   */
  public async getWork(): Promise<Proxy.WorkResponse> {
    const apiParams = this.createParams('proxy', 'eth_getWork', {});

    const response = await this.httpClient.get<APIResponse<Proxy.WorkResponse>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Submit work to the network
   * @param {string} nonce - Nonce value
   * @param {string} powHash - Proof of work hash
   * @param {string} mixDigest - Mix digest
   * @returns {Promise<boolean>} Whether the work was accepted
   * @throws {EtherscanValidationError} if parameters are invalid
   * @example
   * ```ts
   * const accepted = await proxyModule.submitWork(
   *   '0x0000000000000001',
   *   '0xabc...',
   *   '0xdef...'
   * );
   * console.log(accepted); // true
   * ```
   */
  public async submitWork(
    nonce: string,
    powHash: string,
    mixDigest: string
  ): Promise<boolean> {
    // Validate parameters (must be hex strings)
    if (
      !nonce.startsWith('0x') ||
      !powHash.startsWith('0x') ||
      !mixDigest.startsWith('0x')
    ) {
      throw new Error('All parameters must be hex strings starting with 0x');
    }

    const apiParams = this.createParams('proxy', 'eth_submitWork', {
      nonce,
      powHash,
      mixDigest,
    });

    const response = await this.httpClient.get<APIResponse<boolean>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Submit a transaction to the network
   * @param {string} rawTx - Raw transaction data in hex format
   * @returns {Promise<string>} Transaction hash
   * @throws {EtherscanValidationError} if raw transaction is invalid
   * @example
   * ```ts
   * const txHash = await proxyModule.sendRawTransaction('0xabc...');
   * console.log(txHash); // '0xdef...'
   * ```
   */
  public async sendRawTransaction(rawTx: string): Promise<string> {
    // Validate raw transaction (must be hex string)
    if (!rawTx.startsWith('0x')) {
      throw new Error('Raw transaction must be a hex string starting with 0x');
    }

    const apiParams = this.createParams('proxy', 'eth_sendRawTransaction', {
      hex: rawTx,
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Call a contract method without creating a transaction
   * @param {Proxy.CallRequest} params - Call request parameters
   * @returns {Promise<string>} Return value of the contract method
   * @throws {EtherscanValidationError} if parameters are invalid
   * @example
   * ```ts
   * const result = await proxyModule.call({
   *   to: '0x123...',
   *   data: '0xabc...',
   *   from: '0x456...',
   *   gas: '0x5208',
   *   gasPrice: '0x4a817c800',
   *   value: '0x0'
   * });
   * console.log(result); // '0xdef...'
   * ```
   */
  public async call(params: Proxy.CallRequest): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_call', {
      ...params,
      tag: 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Estimate gas for a transaction
   * @param {Proxy.CallRequest} params - Transaction parameters
   * @returns {Promise<string>} Estimated gas limit
   * @throws {EtherscanValidationError} if parameters are invalid
   * @example
   * ```ts
   * const gasLimit = await proxyModule.estimateGas({
   *   to: '0x123...',
   *   data: '0xabc...',
   *   from: '0x456...',
   *   value: '0x0'
   * });
   * console.log(gasLimit); // '0x5208'
   * ```
   */
  public async estimateGas(params: Proxy.CallRequest): Promise<string> {
    const apiParams = this.createParams('proxy', 'eth_estimateGas', {
      ...params,
      tag: 'latest',
    });

    const response = await this.httpClient.get<APIResponse<string>>(
      '',
      apiParams
    );
    return response.result;
  }

  /**
   * Get the current network block by hash
   * @param {string} blockHash - Block hash
   * @returns {Promise<Proxy.Block>} Block information
   * @throws {EtherscanValidationError} if block hash is invalid
   * @example
   * ```ts
   * const block = await proxyModule.getBlockByHash('0xabc...');
   * console.log(block.number); // '0x123456'
   * console.log(block.hash); // '0xabc...'
   * ```
   */
  public async getBlockByHash(blockHash: string): Promise<Proxy.BlockResponse> {
    // Validate block hash
    this.validateBlockHash(blockHash);

    const apiParams = this.createParams('proxy', 'eth_getBlockByHash', {
      blockhash: blockHash,
      boolean: true,
    });

    const response = await this.httpClient.get<
      APIResponse<Proxy.BlockResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network transaction by block hash and index
   * @param {string} blockHash - Block hash
   * @param {string} index - Transaction index in hex format
   * @returns {Promise<Proxy.Transaction>} Transaction information
   * @throws {EtherscanValidationError} if block hash is invalid
   * @throws {EtherscanValidationError} if index is invalid
   * @example
   * ```ts
   * const tx = await proxyModule.getTransactionByBlockHashAndIndex(
   *   '0xabc...',
   *   '0x0'
   * );
   * console.log(tx.hash); // '0xdef...'
   * console.log(tx.from); // '0x123...'
   * ```
   */
  public async getTransactionByBlockHashAndIndex(
    blockHash: string,
    index: string
  ): Promise<Proxy.TransactionResponse> {
    // Validate block hash
    this.validateBlockHash(blockHash);

    // Validate index (must be hex string)
    if (!index.startsWith('0x')) {
      throw new Error('Index must be a hex string starting with 0x');
    }

    const apiParams = this.createParams(
      'proxy',
      'eth_getTransactionByBlockHashAndIndex',
      {
        blockhash: blockHash,
        index,
      }
    );

    const response = await this.httpClient.get<
      APIResponse<Proxy.TransactionResponse>
    >('', apiParams);
    return response.result;
  }

  /**
   * Get the current network transaction by block number and index
   * @param {string} blockNumber - Block number in hex format or 'latest', 'earliest', 'pending'
   * @param {string} index - Transaction index in hex format
   * @returns {Promise<Proxy.Transaction>} Transaction information
   * @throws {EtherscanValidationError} if block number is invalid
   * @throws {EtherscanValidationError} if index is invalid
   * @example
   * ```ts
   * const tx = await proxyModule.getTransactionByBlockNumberAndIndex(
   *   '0x123456',
   *   '0x0'
   * );
   * console.log(tx.hash); // '0xdef...'
   * console.log(tx.from); // '0x123...'
   * ```
   */
  public async getTransactionByBlockNumberAndIndex(
    blockNumber: string,
    index: string
  ): Promise<Proxy.TransactionResponse> {
    // Validate index (must be hex string)
    if (!index.startsWith('0x')) {
      throw new Error('Index must be a hex string starting with 0x');
    }

    const apiParams = this.createParams(
      'proxy',
      'eth_getTransactionByBlockNumberAndIndex',
      {
        tag: blockNumber,
        index,
      }
    );

    const response = await this.httpClient.get<
      APIResponse<Proxy.TransactionResponse>
    >('', apiParams);
    return response.result;
  }
}

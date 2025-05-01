// Import all module types
import * as AccountsModule from './_modules/accounts';
import * as ContractsModule from './_modules/contracts';
import * as TransactionsModule from './_modules/transactions';
import * as BlocksModule from './_modules/blocks';
import * as LogsModule from './_modules/logs';
import * as ProxyModule from './_modules/proxy';
import * as TokensModule from './_modules/tokens';
import * as GasModule from './_modules/gas';
import * as StatsModule from './_modules/stats';
import { AtLeastOne } from './utils';

// Export namespaces
export namespace Accounts {
  export type BalanceRequest = AccountsModule.BalanceRequest;
  export type BalanceMultiRequest = AccountsModule.BalanceMultiRequest;
  export type TransactionsRequest = AccountsModule.TransactionsRequest;
  export type InternalTransactionsRequest =
    AccountsModule.InternalTransactionsRequest;
  export type InternalTransactionsByBlockRangeRequest =
    AccountsModule.InternalTransactionsByBlockRangeRequest;
  export type TokenTranfersRequest = AtLeastOne<
    AccountsModule.TokenTranfersRequest,
    'address' | 'contractAddress'
  >;
  export type MinedBlockRequest = AccountsModule.MinedBlockRequest;

  export type BalanceResponse = AccountsModule.BalanceResponse;
  export type TransactionsResponse = AccountsModule.TransactionsResponse;
  export type InternalTransactionsResponse =
    AccountsModule.InternalTransactionsResponse;
  export type TokenTransferResponse = AccountsModule.TokenTransferResponse;
  export type NFTTransferResponse = AccountsModule.NFTTransferResponse;
  export type ERC1155TransferResponse = AccountsModule.ERC1155TransferResponse;
  export type MinedBlockResponse = AccountsModule.MinedBlockResponse;
}

export namespace Contracts {
  export type ABIRequest = ContractsModule.ABIRequest;
  export type SourceCodeRequest = ContractsModule.SourceCodeRequest;

  export type ABIResponse = ContractsModule.ABIResponse;
  export type SourceCodeResponse = ContractsModule.SourceCodeResponse;
}

export namespace Transactions {
  export type StatusRequest = TransactionsModule.StatusRequest;
  export type ReceiptStatusRequest = TransactionsModule.ReceiptStatusRequest;

  export type StatusResponse = TransactionsModule.StatusResponse;
  export type ReceiptStatusResponse = TransactionsModule.ReceiptStatusResponse;
}

export namespace Blocks {
  export type BlockRewardRequest = BlocksModule.BlockRewardRequest;
  export type BlockCountdownRequest = BlocksModule.BlockCountdownRequest;

  export type BlockRewardResponse = BlocksModule.BlockRewardResponse;
  export type BlockCountdownResponse = BlocksModule.BlockCountdownResponse;
}

export namespace Logs {
  export type LogsRequest = AtLeastOne<
    LogsModule.LogsRequest,
    'address' | 'startBlock'
  >;

  export type LogsResponse = LogsModule.LogsResponse;
}

export namespace Proxy {
  export type CallRequest = ProxyModule.CallRequest;
  export type LogRequest = ProxyModule.LogRequest;

  export type BlockResponse = ProxyModule.BlockResponse;
  export type TransactionResponse = ProxyModule.TransactionResponse;
  export type TransactionReceiptResponse =
    ProxyModule.TransactionReceiptResponse;
  export type LogResponse = ProxyModule.LogResponse;
  export type SyncingStatusResponse = ProxyModule.SyncingStatusResponse;
  export type WorkResponse = ProxyModule.WorkResponse;
}

export namespace Tokens {
  export type TokenBalanceRequest = TokensModule.TokenBalanceRequest;
  export type TokenSupplyRequest = TokensModule.TokenSupplyRequest;

  export type TokenBalanceResponse = TokensModule.TokenBalanceResponse;
  export type TokenSupplyResponse = TokensModule.TokenSupplyResponse;
  export type TokenHolderResponse = TokensModule.TokenHolderResponse;
  export type TokenInfoResponse = TokensModule.TokenInfoResponse;
}

export namespace Gas {
  export type GasPriceResponse = GasModule.GasPriceResponse;
  export type GasOracleResponse = GasModule.GasOracleResponse;
}

export namespace Stats {
  export type EthPriceResponse = StatsModule.EthPriceResponse;
  export type EthSupplyResponse = StatsModule.EthSupplyResponse;
  export type EthNodeSizeResponse = StatsModule.EthNodeSizeResponse;
}

export * from './_modules/accounts';
export * from './_modules/contracts';
export * from './_modules/transactions';
export * from './_modules/blocks';
export * from './_modules/logs';
export * from './_modules/proxy';
export * from './_modules/tokens';
export * from './_modules/gas';
export * from './_modules/stats';

export * from './base';
export * from './client';
export * from './error';

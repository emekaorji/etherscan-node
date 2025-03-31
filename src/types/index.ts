// Import all module types
import * as AccountsModule from './modules/accounts';
import * as ContractsModule from './modules/contracts';
import * as TransactionsModule from './modules/transactions';
import * as BlocksModule from './modules/blocks';
import * as LogsModule from './modules/logs';
import * as ProxyModule from './modules/proxy';
import * as TokensModule from './modules/tokens';
import * as GasModule from './modules/gas';
import * as StatsModule from './modules/stats';

// Export namespaces
export namespace Accounts {
  export type BalanceRequest = AccountsModule.BalanceRequest;
  export type BalanceResponse = AccountsModule.BalanceResponse;
  export type BalanceMultiRequest = AccountsModule.BalanceMultiRequest;
  export type TransactionsRequest = AccountsModule.TransactionsRequest;
  export type Transaction = AccountsModule.Transaction;
  export type TransactionsResponse = AccountsModule.TransactionsResponse;
  export type InternalTransactionsRequest =
    AccountsModule.InternalTransactionsRequest;
  export type InternalTransactionsResponse =
    AccountsModule.InternalTransactionsResponse;
  export type InternalTransaction = AccountsModule.InternalTransaction;

  export type TokenTransferResponse = AccountsModule.TokenTransferResponse;

  export type NFTTransferResponse = AccountsModule.NFTTransferResponse;

  export type ERC1155TransferResponse = AccountsModule.ERC1155TransferResponse;

  export type MinedBlockResponse = AccountsModule.MinedBlockResponse;
}

export namespace Contracts {
  export type ABIRequest = ContractsModule.ABIRequest;
  export type ABIResponse = ContractsModule.ABIResponse;
  export type SourceCodeRequest = ContractsModule.SourceCodeRequest;
  export type SourceCodeResponse = ContractsModule.SourceCodeResponse;
}

export namespace Transactions {
  export type StatusRequest = TransactionsModule.StatusRequest;
  export type StatusResponse = TransactionsModule.StatusResponse;
  export type ReceiptStatusRequest = TransactionsModule.ReceiptStatusRequest;
  export type ReceiptStatusResponse = TransactionsModule.ReceiptStatusResponse;
}

export namespace Blocks {
  export type BlockRewardRequest = BlocksModule.BlockRewardRequest;
  export type BlockRewardResponse = BlocksModule.BlockRewardResponse;
  export type BlockCountdownRequest = BlocksModule.BlockCountdownRequest;
  export type BlockCountdownResponse = BlocksModule.BlockCountdownResponse;
}

export namespace Logs {
  export type LogsRequest = LogsModule.LogsRequest;
  export type Log = LogsModule.Log;
  export type LogsResponse = LogsModule.LogsResponse;
}

export namespace Proxy {
  export type BlockResponse = ProxyModule.BlockResponse;
  export type TransactionResponse = ProxyModule.TransactionResponse;
  export type TransactionReceiptResponse =
    ProxyModule.TransactionReceiptResponse;
  export type LogResponse = ProxyModule.LogResponse;
  export type SyncingStatusResponse = ProxyModule.SyncingStatusResponse;
  export type WorkResponse = ProxyModule.WorkResponse;
  export type CallRequest = ProxyModule.CallRequest;
  export type LogRequest = ProxyModule.LogRequest;
}

export namespace Tokens {
  export type TokenBalanceRequest = TokensModule.TokenBalanceRequest;
  export type TokenBalanceResponse = TokensModule.TokenBalanceResponse;
  export type TokenSupplyRequest = TokensModule.TokenSupplyRequest;
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

export * from './modules/accounts';
export * from './modules/contracts';
export * from './modules/transactions';
export * from './modules/blocks';
export * from './modules/logs';
export * from './modules/proxy';
export * from './modules/tokens';
export * from './modules/gas';
export * from './modules/stats';

export * from './base';
export * from './client';
export * from './error';

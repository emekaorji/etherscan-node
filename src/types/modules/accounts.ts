import { BlockRangeRequest, PaginatedRequest } from '../base';
import { EtherscanSDKOptions } from '../client';

export interface AccountsModuleOptions
  extends EtherscanSDKOptions,
    PaginatedRequest,
    BlockRangeRequest {
  address: string;
  tag?: string;
}

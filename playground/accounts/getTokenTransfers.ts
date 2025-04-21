import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getTokenTransfers({
    address: '0x4e83362442b8d1bec281594cea3050c8eb01311c',
    contractAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  });
}

runScript(main, 'Get Token Transfers');

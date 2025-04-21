import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getBalanceMulti({
    addresses: [
      '0xb8c6A5E906a832A4927576501eBB7a7a6DdDda25',
      '0x19d5813e1FffDb31be0F307Ea8cF1D25DEee31aC',
    ],
  });
}

runScript(main, 'Get Multiple Addresses Balances');

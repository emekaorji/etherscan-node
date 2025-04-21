import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getTransactions({
    address: '0xb8c6A5E906a832A4927576501eBB7a7a6DdDda25',
  });
}

runScript(main, 'Get Transactions');

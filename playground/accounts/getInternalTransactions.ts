import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getInternalTransactions({
    address: '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
  });
}

runScript(main, 'Get Get Internal Transactions');

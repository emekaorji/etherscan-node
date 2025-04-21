import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getInternalTransactionsByBlockRange(
    13481773,
    13491773
  );
}

runScript(main, 'Get Internal Transactions By Block Range');

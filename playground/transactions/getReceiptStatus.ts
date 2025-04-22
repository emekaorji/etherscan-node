import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.transactions.getReceiptStatus({
    txhash:
      '0xca68afc1175a1ff8ea6822a51a35dc8a7a9f18344a4c091878149d7ba0a5f1e5',
  });
}

runScript(main, 'Get Transaction Receipt Status');

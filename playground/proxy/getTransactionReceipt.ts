import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.proxy.getTransactionReceipt(
    '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'
  );
}

runScript(main, 'Get Transaction Receipt');

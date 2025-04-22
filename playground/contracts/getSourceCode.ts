import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.contracts.getSourceCode({
    address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  });
}

runScript(main, 'Get Contract Source Code');

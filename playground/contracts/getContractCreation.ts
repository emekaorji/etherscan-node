import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.contracts.getContractCreation([
    '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
  ]);
}

runScript(main, 'Get Contract Creation Info');

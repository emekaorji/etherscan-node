import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getMinedBlocks(
    '0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b'
  );
}

runScript(main, 'Get Mined Blocks');

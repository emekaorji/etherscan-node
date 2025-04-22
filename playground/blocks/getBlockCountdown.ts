import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.blocks.getBlockCountdown({
    // To run this, get a near future or pending block from https://etherscan.io/blocks
    blockno: 22318459,
  });
}

runScript(main, 'Get Block Countdown');

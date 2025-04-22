import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.blocks.getBlockReward({
    blockno: 123456,
  });
}

runScript(main, 'Get Block Reward');

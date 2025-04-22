import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  // Get block number for January 1, 2023 (timestamp: 1672531200)
  return await sdk.blocks.getBlockNumberByTimestamp(1672531200, 'before');
}

runScript(main, 'Get Block Number by Timestamp');

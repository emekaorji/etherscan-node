import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.logs.getLogs({
    address: '0x59728544b08ab483533076417fbbb2fd0b17ce3a',
    startBlock: 15073139,
    endBlock: 15074139,
    topics: [
      '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
      '0x00000000000000000000000023581767a106ae21c074b2276d25e5c3e136a68b',
    ],
    topic0_1_opr: 'and',
    offset: 100,
  });
}

runScript(main, 'Get Event Logs with/without Topic Operators');

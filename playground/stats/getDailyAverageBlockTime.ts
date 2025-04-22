import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.stats.getDailyAverageBlockTime('2019-02-01', '2019-02-28');
}

runScript(main, 'Get Daily Average Block Time');

import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  // Example: Estimate confirmation time for a gas price of 35 Gwei
  return await sdk.gas.estimateConfirmationTime(35);
}

runScript(main, 'Estimate Confirmation Time');

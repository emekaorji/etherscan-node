import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  // Example: Get transaction count for the last 7 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  return await sdk.stats.getDailyTransactionCount(
    startDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
    endDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
    'desc'
  );
}

runScript(main, 'Get Daily Transaction Count');

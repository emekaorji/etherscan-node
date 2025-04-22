import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.tokens.getTokenBalance({
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    tag: 'latest',
  });
}

runScript(main, 'Get Token Balance');

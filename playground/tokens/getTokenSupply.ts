import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.tokens.getTokenSupply({
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT contract
  });
}

runScript(main, 'Get Token Supply');

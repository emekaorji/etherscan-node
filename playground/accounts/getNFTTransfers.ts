import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getNFTTransfers({
    address: '0x6975be450864c02b4613023c2152ee0743572325',
    contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
  });
}

runScript(main, 'Get NFT Transfers');

import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.accounts.getERC1155Transfers({
    address: '0x83f564d180b58ad9a02a449105568189ee7de8cb',
    contractAddress: '0x76be3b62873462d2142405439777e971754e8e77',
  });
}

runScript(main, 'Get Multi Token Standard Token Transfers');

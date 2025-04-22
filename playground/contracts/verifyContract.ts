import '../env';

import { EtherscanSDK } from '../../src';
import { runScript } from '../utils';

const sdk = new EtherscanSDK({
  apiKey: process.env.ETHERSCAN_API_KEY!,
});

async function main() {
  return await sdk.contracts.verifyContract({
    contractAddress: '********',
    sourceCode: `
      // SPDX-License-Identifier: MIT
      pragma solidity ^0.8.0;
      
      contract SimpleStorage {
          uint256 public value;
          
          function setValue(uint256 _value) public {
              value = _value;
          }
      }
    `,
    contractName: 'SimpleStorage',
    compilerVersion: 'v0.8.0+commit.c7dfd78e',
    optimizationUsed: true,
    runs: 200,
    licenseType: 'MIT',
  });
}

runScript(main, 'Verify Contract');

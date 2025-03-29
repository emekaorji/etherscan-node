# Etherscan SDK

A comprehensive TypeScript SDK for the Etherscan API that works in both Node.js and browser environments.

## Features

- Complete coverage of all Etherscan API modules and endpoints
- TypeScript support with full type definitions
- Works in both Node.js and browser environments
- Zero dependencies
- Promise-based API

## Installation

```bash
npm install etherscan-sdk
# or
yarn add etherscan-sdk
```

## Quick Start

```typescript
import { EtherscanSDK } from 'etherscan-sdk';

// Initialize with your Etherscan API key
const etherscan = new EtherscanSDK({
  apiKey: 'YOUR_ETHERSCAN_API_KEY',
  network: 'mainnet' // Optional: defaults to mainnet
});

// Example: Get ETH balance for an address
async function getBalance() {
  try {
    const balance = await etherscan.accounts.getBalance({
      address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
    });
    console.log('Balance:', balance);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBalance();
```

## Supported Networks

- Ethereum Mainnet (`mainnet`)
- Goerli Testnet (`goerli`)
- Sepolia Testnet (`sepolia`)

## Modules

The SDK is organized into modules that correspond to Etherscan's API categories:

- `accounts`: Account-related operations
- `contracts`: Smart contract related operations
- `transactions`: Transaction-related operations
- `blocks`: Block-related operations
- `logs`: Event logs operations
- `proxy`: Proxy methods for web3 compatibility
- `tokens`: Token-related operations
- `gas`: Gas tracker operations
- `stats`: Stats and metrics

## Examples

### Account Module

```typescript
// Get ETH balance for an address
const balance = await etherscan.accounts.getBalance({
  address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
});

// Get list of transactions for an address
const txList = await etherscan.accounts.getTransactions({
  address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
  startBlock: 0,
  endBlock: 99999999,
  page: 1,
  offset: 10,
  sort: 'asc'
});
```

### Contract Module

```typescript
// Get contract ABI
const abi = await etherscan.contracts.getAbi({
  address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
});

// Get contract source code
const sourceCode = await etherscan.contracts.getSourceCode({
  address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
});
```

### Token Module

```typescript
// Get ERC-20 token balance
const tokenBalance = await etherscan.tokens.getTokenBalance({
  contractAddress: '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
  address: '0xe04f27eb70e025b78871a2ad7eabe85e61212761'
});
```

## Configuration Options

You can configure the SDK with the following options:

```typescript
const etherscan = new EtherscanSDK({
  apiKey: 'YOUR_ETHERSCAN_API_KEY',   // Required
  network: 'mainnet',                 // Optional: defaults to mainnet
  timeout: 10000,                     // Optional: request timeout in ms (default: 30000)
  rateLimitEnabled: true,             // Optional: enable rate limiting (default: true)
  maxRequestsPerSecond: 5             // Optional: max requests per second (default: 5)
});
```

## Error Handling

The SDK throws errors with descriptive messages for API errors, network issues, or validation errors:

```typescript
try {
  const balance = await etherscan.accounts.getBalance({
    address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
  });
  console.log('Balance:', balance);
} catch (error) {
  if (error instanceof EtherscanSDK.APIError) {
    console.error('API Error:', error.message, error.code);
  } else if (error instanceof EtherscanSDK.ValidationError) {
    console.error('Validation Error:', error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
}
```

## License

MIT

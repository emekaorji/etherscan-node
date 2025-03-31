/**
 * Simple example of using the Etherscan SDK
 */
import { EtherscanSDK, Network } from '../src';

// Replace with your own Etherscan API key
const API_KEY = 'YOUR_ETHERSCAN_API_KEY';

async function main() {
  // Initialize the SDK
  const etherscan = new EtherscanSDK({
    apiKey: API_KEY,
    network: Network.ETH_MAINNET,
    timeout: 10000,
    rateLimitEnabled: true,
    maxRequestsPerSecond: 5,
  });

  try {
    // etherscan.contracts.getSourceCode()
    // Get ETH balance for a specific address
    const address = '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'; // Ethereum Foundation
    const balance = await etherscan.accounts.getBalance({ address });
    console.log(`Balance of ${address}: ${balance} wei`);

    // Get contract ABI for a verified contract
    const contractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'; // CryptoKitties
    const abi = await etherscan.contracts.getAbi({ address: contractAddress });
    console.log(`Contract ABI fetched for ${contractAddress}`);

    // Get latest ETH price
    const ethPrice = await etherscan.stats.getEthPrice();
    console.log(
      `Current ETH price: $${ethPrice.ethusd} USD, ${ethPrice.ethbtc} BTC`
    );

    // Get gas oracle information
    const gasOracle = await etherscan.gas.getGasOracle();
    console.log('Current gas prices:');
    console.log(`- Safe: ${gasOracle.SafeGasPrice} Gwei`);
    console.log(`- Proposed: ${gasOracle.ProposeGasPrice} Gwei`);
    console.log(`- Fast: ${gasOracle.FastGasPrice} Gwei`);

    // Get current block number using proxy
    const blockNumber = await etherscan.proxy.getBlockNumber();
    console.log(`Current block number: ${parseInt(blockNumber, 16)}`);
  } catch (error) {
    if (error instanceof EtherscanSDK.APIError) {
      console.error('API Error:', error.message, error.code);
    } else if (error instanceof EtherscanSDK.ValidationError) {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
}

main().catch(console.error);

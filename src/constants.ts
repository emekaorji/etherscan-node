/**
 * Constants for the Etherscan API
 */

import { Network, NetworkString } from './types';

/**
 * Base API URLs for different Ethereum networks
 */
export const V1_API_URLS: Record<Network, string> = {
  [Network.ETH_MAINNET]: 'https://api.etherscan.io/api',
  [Network.ETH_GOERLI]: 'https://api-goerli.etherscan.io/api',
  [Network.ETH_SEPOLIA]: 'https://api-sepolia.etherscan.io/api',
  [Network.ETH_HOLESKY]: 'https://api-holesky.etherscan.io/api',
  [Network.ABSTRACT_MAINNET]: 'https://api.abstractscan.io/api',
  [Network.ABSTRACT_TESTNET]: 'https://api-testnet.abstractscan.io/api',
  [Network.APECHAIN_CURTIS]: 'https://api.apechain.com/api',
  [Network.APECHAIN_MAINNET]: 'https://api.apechain.com/api',
  [Network.ARB_MAINNET]: 'https://api.arbiscan.io/api',
  [Network.ARB_SEPOLIA]: 'https://api-sepolia.arbiscan.io/api',
  [Network.ARBITRUM_NOVA]: 'https://api-nova.arbiscan.io/api',
  [Network.AVAX_MAINNET]: 'https://api.snowtrace.io/api',
  [Network.AVAX_FUJI]: 'https://api-testnet.snowtrace.io/api',
  [Network.BASE_MAINNET]: 'https://api.basescan.org/api',
  [Network.BASE_SEPOLIA]: 'https://api-sepolia.basescan.org/api',
  [Network.BERACHAIN_MAINNET]: 'https://api.beratrail.io/api',
  [Network.BITTORRENT_MAINNET]: 'https://api.bttcscan.com/api',
  [Network.BITTORRENT_TESTNET]: 'https://api-testnet.bttcscan.com/api',
  [Network.BLAST_MAINNET]: 'https://api.blastscan.io/api',
  [Network.BLAST_SEPOLIA]: 'https://api-sepolia.blastscan.io/api',
  [Network.BNB_MAINNET]: 'https://api.bscscan.com/api',
  [Network.BNB_TESTNET]: 'https://api-testnet.bscscan.com/api',
  [Network.CELO_ALFAJORES]: 'https://api-alfajores.celoscan.io/api',
  [Network.CELO_MAINNET]: 'https://api.celoscan.io/api',
  [Network.CRONOS_MAINNET]: 'https://api.cronoscan.com/api',
  [Network.FRAX_MAINNET]: 'https://api.fraxscan.com/api',
  [Network.FRAX_SEPOLIA]: 'https://api-sepolia.fraxscan.com/api',
  [Network.GNOSIS_MAINNET]: 'https://api.gnosisscan.io/api',
  [Network.LINEA_MAINNET]: 'https://api.lineascan.build/api',
  [Network.LINEA_SEPOLIA]: 'https://api-sepolia.lineascan.build/api',
  [Network.MANTLE_MAINNET]: 'https://api.mantlescan.xyz/api',
  [Network.MANTLE_SEPOLIA]: 'https://api-sepolia.mantlescan.xyz/api',
  [Network.MOONBASE_ALPHA]: 'https://api-moonbase.moonscan.io/api',
  [Network.MOONBEAM_MAINNET]: 'https://api-moonbeam.moonscan.io/api',
  [Network.MOONRIVER_MAINNET]: 'https://api-moonriver.moonscan.io/api',
  [Network.OPT_MAINNET]: 'https://api-optimistic.etherscan.io/api',
  [Network.OPT_SEPOLIA]: 'https://api-sepolia-optimistic.etherscan.io/api',
  [Network.MATIC_AMOY]: 'https://api-amoy.polygonscan.com/api',
  [Network.MATIC_MAINNET]: 'https://api.polygonscan.com/api',
  [Network.POLYGONZKEVM_CARDONA]:
    'https://api-cardona-zkevm.polygonscan.com/api',
  [Network.POLYGONZKEVM_MAINNET]: 'https://api-zkevm.polygonscan.com/api',
  [Network.SCROLL_MAINNET]: 'https://api.scrollscan.com/api',
  [Network.SCROLL_SEPOLIA]: 'https://api-sepolia.scrollscan.com/api',
  [Network.SONIC_BLAZE]: 'https://api.sonic.ooo/api',
  [Network.SONIC_MAINNET]: 'https://api.sonic.ooo/api',
  [Network.SOPHON_MAINNET]: 'https://api.sophon.io/api',
  [Network.SOPHON_SEPOLIA]: 'https://api-sepolia.sophon.io/api',
  [Network.TAIKO_HEKLA]: 'https://api.hekla.taiko.xyz/api',
  [Network.TAIKO_MAINNET]: 'https://api.taikoscan.net/api',
  [Network.UNICHAIN_MAINNET]: 'https://api.unichain.io/api',
  [Network.UNICHAIN_SEPOLIA]: 'https://api-sepolia.unichain.io/api',
  [Network.WEMIX_MAINNET]: 'https://api.wemixscan.com/api',
  [Network.WEMIX_TESTNET]: 'https://api-testnet.wemixscan.com/api',
  [Network.WORLDCHAIN_MAINNET]: 'https://api.worldscan.io/api',
  [Network.WORLDCHAIN_SEPOLIA]: 'https://api-sepolia.worldscan.io/api',
  [Network.XAI_MAINNET]: 'https://api.xai.network/api',
  [Network.XAI_SEPOLIA]: 'https://api-sepolia.xai.network/api',
  [Network.XDC_APOTHEM]: 'https://api-apothem.blocksscan.io/api',
  [Network.XDC_MAINNET]: 'https://api.xdc.dev/api',
  [Network.ZKSYNC_MAINNET]: 'https://api-explorer.zksync.io/api',
  [Network.ZKSYNC_SEPOLIA]: 'https://api-sepolia-explorer.zksync.io/api',
};

/**
 * V2 Unified API URL
 */
export const V2_API_URL = 'https://api.etherscan.io/v2/api';

/**
 * V2 API Chain IDs for different Ethereum networks
 */
export const V2_API_CHAIN_IDS: Record<Network, string> = {
  [Network.ETH_MAINNET]: '1',
  [Network.ETH_GOERLI]: '5',
  [Network.ETH_SEPOLIA]: '11155111',
  [Network.ETH_HOLESKY]: '17000',
  [Network.ABSTRACT_MAINNET]: '2741',
  [Network.ABSTRACT_TESTNET]: '11124',
  [Network.APECHAIN_CURTIS]: '33111',
  [Network.APECHAIN_MAINNET]: '33139',
  [Network.ARB_MAINNET]: '42161',
  [Network.ARB_SEPOLIA]: '421614',
  [Network.ARBITRUM_NOVA]: '42170',
  [Network.AVAX_MAINNET]: '43114',
  [Network.AVAX_FUJI]: '43113',
  [Network.BASE_MAINNET]: '8453',
  [Network.BASE_SEPOLIA]: '84532',
  [Network.BERACHAIN_MAINNET]: '80094',
  [Network.BITTORRENT_MAINNET]: '199',
  [Network.BITTORRENT_TESTNET]: '1028',
  [Network.BLAST_MAINNET]: '81457',
  [Network.BLAST_SEPOLIA]: '168587773',
  [Network.BNB_MAINNET]: '56',
  [Network.BNB_TESTNET]: '97',
  [Network.CELO_ALFAJORES]: '44787',
  [Network.CELO_MAINNET]: '42220',
  [Network.CRONOS_MAINNET]: '25',
  [Network.FRAX_MAINNET]: '252',
  [Network.FRAX_SEPOLIA]: '2522',
  [Network.GNOSIS_MAINNET]: '100',
  [Network.LINEA_MAINNET]: '59144',
  [Network.LINEA_SEPOLIA]: '59141',
  [Network.MANTLE_MAINNET]: '5000',
  [Network.MANTLE_SEPOLIA]: '5003',
  [Network.MOONBASE_ALPHA]: '1287',
  [Network.MOONBEAM_MAINNET]: '1284',
  [Network.MOONRIVER_MAINNET]: '1285',
  [Network.OPT_MAINNET]: '10',
  [Network.OPT_SEPOLIA]: '11155420',
  [Network.MATIC_AMOY]: '80002',
  [Network.MATIC_MAINNET]: '137',
  [Network.POLYGONZKEVM_CARDONA]: '2442',
  [Network.POLYGONZKEVM_MAINNET]: '1101',
  [Network.SCROLL_MAINNET]: '534352',
  [Network.SCROLL_SEPOLIA]: '534351',
  [Network.SONIC_BLAZE]: '57054',
  [Network.SONIC_MAINNET]: '146',
  [Network.SOPHON_MAINNET]: '50104',
  [Network.SOPHON_SEPOLIA]: '531050104',
  [Network.TAIKO_HEKLA]: '167009',
  [Network.TAIKO_MAINNET]: '167000',
  [Network.UNICHAIN_MAINNET]: '130',
  [Network.UNICHAIN_SEPOLIA]: '1301',
  [Network.WEMIX_MAINNET]: '1111',
  [Network.WEMIX_TESTNET]: '1112',
  [Network.WORLDCHAIN_MAINNET]: '480',
  [Network.WORLDCHAIN_SEPOLIA]: '4801',
  [Network.XAI_MAINNET]: '660279',
  [Network.XAI_SEPOLIA]: '37714555429',
  [Network.XDC_APOTHEM]: '51',
  [Network.XDC_MAINNET]: '50',
  [Network.ZKSYNC_MAINNET]: '324',
  [Network.ZKSYNC_SEPOLIA]: '300',
};

/**
 * Supported chains
 */
export const SUPPORTED_CHAINS = Object.values(Network) as (
  | Network
  | NetworkString
)[];

/**
 * Default configuration values
 */
export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_MAX_REQUESTS_PER_SECOND = 5;
export const DEFAULT_NETWORK = Network.ETH_MAINNET;
export const DEFAULT_VERSION = 'v2';

/**
 * API response status values
 */
export const API_STATUS = {
  SUCCESS: '1',
  ERROR: '0',
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  MISSING_API_KEY: 'API key is required',
  INVALID_NETWORK:
    'Invalid network. Supported networks: mainnet, goerli, sepolia',
  REQUEST_TIMEOUT: 'Request timed out',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
};

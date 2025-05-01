/**
 * Supported SDK versions
 */
export type Version = 'v1' | 'v2';

/**
 * SDK Configuration options
 */
export interface EtherscanSDKOptions {
  /** SDK version (defaults to 'v2') */
  version?: Version;
  /** Etherscan API key */
  apiKey: string;
  /** Network to use (defaults to mainnet) */
  network?: Network | NetworkString;
  /** Request timeout in milliseconds (defaults to 30000) */
  timeout?: number;
  /** Enable rate limiting (defaults to true) */
  rateLimitEnabled?: boolean;
  /** Maximum number of requests per second (defaults to 5) */
  maxRequestsPerSecond?: number;
}

/**
 * Supported Ethereum networks
 */
export enum Network {
  /** Ethereum Mainnet */
  ETH_MAINNET = 'eth-mainnet',
  /** Ethereum Goerli */
  ETH_GOERLI = 'eth-goerli',
  /** Ethereum Sepolia */
  ETH_SEPOLIA = 'eth-sepolia',
  /** Ethereum Holesky */
  ETH_HOLESKY = 'eth-holesky',
  /** Abstract Mainnet */
  ABSTRACT_MAINNET = 'abstract-mainnet',
  /** Abstract Testnet */
  ABSTRACT_TESTNET = 'abstract-testnet',
  /** Apechain Curtis */
  APECHAIN_CURTIS = 'apechain-curtis',
  /** Apechain Mainnet */
  APECHAIN_MAINNET = 'apechain-mainnet',
  /** Arbitrum Mainnet */
  ARB_MAINNET = 'arb-mainnet',
  /** Arbitrum Sepolia */
  ARB_SEPOLIA = 'arb-sepolia',
  /** Arbitrum Nova */
  ARBITRUM_NOVA = 'arbitrum-nova',
  /** Avalanche Mainnet */
  AVAX_MAINNET = 'avax-mainnet',
  /** Avalanche Fuji */
  AVAX_FUJI = 'avax-fuji',
  /** Base Mainnet */
  BASE_MAINNET = 'base-mainnet',
  /** Base Sepolia */
  BASE_SEPOLIA = 'base-sepolia',
  /** Berachain Mainnet */
  BERACHAIN_MAINNET = 'berachain-mainnet',
  /** Bittorrent Mainnet */
  BITTORRENT_MAINNET = 'bittorrent-mainnet',
  /** Bittorrent Testnet */
  BITTORRENT_TESTNET = 'bittorrent-testnet',
  /** Blast Mainnet */
  BLAST_MAINNET = 'blast-mainnet',
  /** Blast Sepolia */
  BLAST_SEPOLIA = 'blast-sepolia',
  /** BNB Chain Mainnet */
  BNB_MAINNET = 'bnb-mainnet',
  /** BNB Chain Testnet */
  BNB_TESTNET = 'bnb-testnet',
  /** Celo Alfaforres */
  CELO_ALFAJORES = 'celo-alfajores',
  /** Celo Mainnet */
  CELO_MAINNET = 'celo-mainnet',
  /** Cronos Mainnet */
  CRONOS_MAINNET = 'cronos-mainnet',
  /** FRAX Mainnet */
  FRAX_MAINNET = 'frax-mainnet',
  /** FRAX Sepolia */
  FRAX_SEPOLIA = 'frax-sepolia',
  /** Gnosis Mainnet */
  GNOSIS_MAINNET = 'gnosis-mainnet',
  /** Linea Mainnet */
  LINEA_MAINNET = 'linea-mainnet',
  /** Linea Sepolia */
  LINEA_SEPOLIA = 'linea-sepolia',
  /** Mantle Mainnet */
  MANTLE_MAINNET = 'mantle-mainnet',
  /** Mantle Sepolia */
  MANTLE_SEPOLIA = 'mantle-sepolia',
  /** Moonbase Alpha */
  MOONBASE_ALPHA = 'moonbase-alpha',
  /** Moonbeam Mainnet */
  MOONBEAM_MAINNET = 'moonbeam-mainnet',
  /** Moonriver Mainnet */
  MOONRIVER_MAINNET = 'moonriver-mainnet',
  /** Optimism Mainnet */
  OPT_MAINNET = 'opt-mainnet',
  /** Optimism Sepolia */
  OPT_SEPOLIA = 'opt-sepolia',
  /** Polygon AMOY */
  MATIC_AMOY = 'polygon-amoy',
  /** Polygon Mainnet */
  MATIC_MAINNET = 'polygon-mainnet',
  /** Polygon ZKEVM Cardona */
  POLYGONZKEVM_CARDONA = 'polygonzkevm-cardona',
  /** Polygon ZKEVM Mainnet */
  POLYGONZKEVM_MAINNET = 'polygonzkevm-mainnet',
  /** Scroll Mainnet */
  SCROLL_MAINNET = 'scroll-mainnet',
  /** Scroll Sepolia */
  SCROLL_SEPOLIA = 'scroll-sepolia',
  /** Sonic Blaze */
  SONIC_BLAZE = 'sonic-blaze',
  /** Sonic Mainnet */
  SONIC_MAINNET = 'sonic-mainnet',
  /** Sophon Mainnet */
  SOPHON_MAINNET = 'sophon-mainnet',
  /** Sophon Sepolia */
  SOPHON_SEPOLIA = 'sophon-sepolia',
  /** Taiko Hekla */
  TAIKO_HEKLA = 'taiko-hekla',
  /** Taiko Mainnet */
  TAIKO_MAINNET = 'taiko-mainnet',
  /** Unichain Mainnet */
  UNICHAIN_MAINNET = 'unichain-mainnet',
  /** Unichain Sepolia */
  UNICHAIN_SEPOLIA = 'unichain-sepolia',
  /** WEMIX Mainnet */
  WEMIX_MAINNET = 'wemix-mainnet',
  /** WEMIX Testnet */
  WEMIX_TESTNET = 'wemix-testnet',
  /** Worldchain Mainnet */
  WORLDCHAIN_MAINNET = 'worldchain-mainnet',
  /** Worldchain Sepolia */
  WORLDCHAIN_SEPOLIA = 'worldchain-sepolia',
  /** XAI Mainnet */
  XAI_MAINNET = 'xai-mainnet',
  /** XAI Sepolia */
  XAI_SEPOLIA = 'xai-sepolia',
  /** XDC Apothem */
  XDC_APOTHEM = 'xdc-apothem',
  /** XDC Mainnet */
  XDC_MAINNET = 'xdc-mainnet',
  /** ZKSync Mainnet */
  ZKSYNC_MAINNET = 'zksync-mainnet',
  /** ZKSync Sepolia */
  ZKSYNC_SEPOLIA = 'zksync-sepolia',
}

export type NetworkString = `${Network}`;

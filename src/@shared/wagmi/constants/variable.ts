import ethereumLogoUrl from "../../assets/image/ethereum-logo.png";
import arbitrumLogoUrl from "../../assets/svg/arbitrum_logo.svg";
import bnbLogo from "../../assets/svg/bnb-logo.svg";
import celoLogo from "../../assets/svg/celo_logo.svg";
import optimismLogoUrl from "../../assets/svg/optimistic_ethereum.svg";
import polygonMaticLogo from "../../assets/svg/polygon-matic-logo.svg";
import {
  arbitrumGoerli,
  bscTestnet,
  celoAlfajores,
  goerli,
  optimismGoerli,
  polygonMumbai,
} from "wagmi/chains";

export enum WalletType {
  WALLET_CONNECT = "walletConnect",
  COINBASE_WALLET = "coinbaseWallet",
  METAMASK_WALLET = "metaMask",
  INJECTED = "walletConnectLegacy",
}

export const SELECTABLE_WALLETS = [
  WalletType.METAMASK_WALLET,
  WalletType.COINBASE_WALLET,
  WalletType.WALLET_CONNECT,
  WalletType.INJECTED,
];

export const CHAINS = [
  bscTestnet,
  goerli,
  arbitrumGoerli,
  celoAlfajores,
  polygonMumbai,
  optimismGoerli,
];

export enum CHAIN_TYPE {
  BNB = "bnb",
  ETHEREUM = "ethereum",
  ARBITRUM = "arbitrum",
  CELO = "celo",
  POLYGON = "polygon",
  OPTIMISM = "optimism",
}

export const SUPPORTED_CHAINS = [
  {
    id: CHAIN_TYPE.ETHEREUM,
    logoUrl: ethereumLogoUrl,
    name: "Ethereum",
  },
  {
    id: CHAIN_TYPE.POLYGON,
    logoUrl: polygonMaticLogo,
    name: "Polygon",
  },
  {
    id: CHAIN_TYPE.OPTIMISM,
    logoUrl: optimismLogoUrl,
    name: "Optimism",
  },
  {
    id: CHAIN_TYPE.ARBITRUM,
    logoUrl: arbitrumLogoUrl,
    name: "Arbitrum",
  },
  {
    id: CHAIN_TYPE.CELO,
    logoUrl: celoLogo,
    name: "Celo",
  },
  {
    id: CHAIN_TYPE.BNB,
    logoUrl: bnbLogo,
    name: "BNB Chain",
  },
];

export const enum TOKENS {
  ETH = "ETH",
  WBTC = "WBTC",
  USDC = "USDC",
}

export const ABLE_TO_USE_TOKENS = [
  {
    tokenName: TOKENS.ETH,
    tokenSymbol: "Ether",
    tokenImgUrl: ethereumLogoUrl,
    tokenPerUsd: "1000",
  },
  {
    tokenName: TOKENS.WBTC,
    tokenSymbol: "Wrapped BTC",
    tokenImgUrl:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    tokenPerUsd: "10000",
  },
  {
    tokenName: TOKENS.USDC,
    tokenSymbol: "USD Coin",
    tokenImgUrl:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    tokenPerUsd: "1",
  },
];

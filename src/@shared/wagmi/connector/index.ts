import { configureChains, createConfig } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { CHAINS } from "../constants/variable";

export const { publicClient, chains } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => {
      return { http: chain.rpcUrls.default.http[0] };
    },
  }),
]);

// // v1
export const walletConnectNoQrCodeConnector = new WalletConnectLegacyConnector({
  chains: chains,
  options: {
    qrcode: false,
  },
});

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "wagmi.sh",
  },
});
export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
});

export const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    metaMaskConnector,
    walletConnectNoQrCodeConnector,
    coinbaseConnector,
  ],
});

import { walletConnectNoQrCodeConnector } from "../connector";
import { WalletType } from "../constants/variable";

export const delay = (t: number) =>
  new Promise((resolve) => setTimeout(resolve, t));

const createQrCode =
  (chainId: number, connect: any, onSuccess: any) => async () => {
    // wallet connect v1
    connect({ connector: walletConnectNoQrCodeConnector, chainId });
    await delay(100);
    const { uri } = (
      (await walletConnectNoQrCodeConnector.getProvider()) as any
    ).connector;
    return uri;
  };

export const isMetamaskInstalled = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.ethereum?.isMetaMask) {
    return true;
  }

  return false;
};

export const walletsConfig = ({
  chainId,
  connect,
  onSuccess,
}: {
  chainId: number;
  connect: any;
  onSuccess: any;
}) => {
  const qrCode = createQrCode(chainId, connect, onSuccess);
  return [
    {
      id: "metamask",
      title: "Metamask",
      icon: "/images/metamask.png",
      get installed() {
        return isMetamaskInstalled();
      },
      connectorId: WalletType.METAMASK_WALLET,
      deepLink: "https://metamask.app.link/dapp/devx-market.fncy.world/",
      qrCode,
      downloadLink: "https://metamask.app.link/dapp/devx-market.fncy.world/",
    },
  ];
};

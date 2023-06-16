import { TOKENS } from "@shared/wagmi/constants/variable";
import { atom } from "recoil";
import ethereumLogoUrl from "@shared/assets/image/ethereum-logo.png";

interface SelectedToken {
  from: {
    tokenName: TOKENS | "" | string;
    tokenSymbol: string | "";
    tokenImgUrl: string | "";
    tokenPerUsd: string | "";
    value?: string | "";
    calculatedValue?: string | "";
  };
  to: {
    tokenName: TOKENS | "" | string;
    tokenSymbol: string | "";
    tokenImgUrl: string | "";
    tokenPerUsd: string | "";
    value?: string | "";
  };
}

export const selectedTokenAtom = atom<SelectedToken>({
  key: "selectedTokenAtom",
  default: {
    from: {
      tokenName: TOKENS.ETH,
      tokenSymbol: "Ether",
      tokenImgUrl: ethereumLogoUrl,
      tokenPerUsd: "1000",
      value: "",
    },
    to: {
      tokenName: "",
      tokenSymbol: "",
      tokenImgUrl: "",
      tokenPerUsd: "",
      value: "",
    },
  },
});

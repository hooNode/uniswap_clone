import { atom } from "recoil";

export type CurrChainType =
  | "ethereum"
  | "polygon"
  | "optimism"
  | "arbitrum"
  | "celo"
  | "bnb";

export const currentChainWithNoAddress = atom<CurrChainType>({
  key: "currentChainWithNoAddress",
  default: "ethereum",
});

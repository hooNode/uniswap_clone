import { useRecoilValue } from "recoil";
import { currentChainWithNoAddress } from "recoils/chain";
import { useAccount, useNetwork } from "wagmi";

export default function useCurrChain() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const currChainWithNoAddress = useRecoilValue(currentChainWithNoAddress);

  return address && chain?.name ? chain.name : currChainWithNoAddress;
}

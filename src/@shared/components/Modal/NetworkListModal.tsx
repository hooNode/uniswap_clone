import styled from "@emotion/styled";
import useCurrChain from "@shared/hooks/useCurrChain";
import { CheckSVG } from "@shared/utils/CommonSVG";
import { SUPPORTED_CHAINS } from "@shared/wagmi/constants/variable";
import { RefObject } from "react";
import { useSetRecoilState } from "recoil";
import { CurrChainType, currentChainWithNoAddress } from "recoils/chain";
import { Portal } from "../ModalLayout/Portal";

interface Props {
  componentRef: RefObject<HTMLDivElement>;
}

export default function NetworkListModal({ componentRef }: Props) {
  const currChain = useCurrChain();

  const setCurrChainWithNoAddress = useSetRecoilState(
    currentChainWithNoAddress
  );

  const onClickRow = (chainId: CurrChainType) => {
    setCurrChainWithNoAddress(chainId);
  };
  return (
    <Portal componentRef={componentRef}>
      <Styles.ModalWrapper>
        {SUPPORTED_CHAINS.map((chain, index) => {
          return (
            <Styles.ChainRow
              onClick={() => onClickRow(chain.id as CurrChainType)}
              key={index}
            >
              <Styles.ImageContainer src={chain.logoUrl} alt={"chain-type"} />
              <span>{chain.name}</span>
              {currChain === chain.id && <CheckSVGComponent />}
            </Styles.ChainRow>
          );
        })}
      </Styles.ModalWrapper>
    </Portal>
  );
}

const CheckSVGComponent = styled(CheckSVG)`
  position: absolute;
  right: 4px;
  width: 24px;

  & > :nth-of-type(2) {
    stroke: ${({ theme }) => theme.accentActive};
  }
`;

const Styles = {
  ModalWrapper: styled.div`
    position: absolute;
    top: 58px;
    right: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    box-shadow: 0 4px 12px 0 #00000026;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.backgroundOutline};
    background-color: ${({ theme }) => theme.backgroundSurface};
    border-radius: 12px;
    font-weight: 300;
    width: 258px;
    height: 282px;
    padding: 8px;
  `,
  ChainRow: styled.button`
    all: unset;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${({ theme }) => theme.textPrimary};
    height: 44px;
    width: 240px;
    border-radius: 12px;
    transition: background 125ms ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.hoverState};
    }
  `,

  ImageContainer: styled.img`
    width: 20px;
    margin-left: 8px;
    margin-right: 12px;
  `,
};

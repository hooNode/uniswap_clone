import styled from "@emotion/styled";
import useCurrChain from "@shared/hooks/useCurrChain";
import { ArrowDownSVG } from "@shared/utils/CommonSVG";
import { useEffect, useMemo, useRef, useState } from "react";
import ethereumLogoUrl from "../../assets/image/ethereum-logo.png";
import arbitrumLogoUrl from "../../assets/svg/arbitrum_logo.svg";
import bnbLogo from "../../assets/svg/bnb-logo.svg";
import celoLogo from "../../assets/svg/celo_logo.svg";
import optimismLogoUrl from "../../assets/svg/optimistic_ethereum.svg";
import polygonMaticLogo from "../../assets/svg/polygon-matic-logo.svg";
import SVGConverter from "../SVGConverter";
import NetworkListModal from "../Modal/NetworkListModal";

export default function CurrentNetwork() {
  const currChain = useCurrChain();
  const [isToggleOn, setIsToggleOn] = useState(false);
  const networkListRef = useRef<HTMLDivElement>(null);
  // const networkListModalRef = useRef<HTMLDivElement>(null);

  const SelectedChainType = useMemo(() => {
    switch (currChain) {
      case "ethereum":
        return ethereumLogoUrl;
      case "polygon":
        return polygonMaticLogo;
      case "optimism":
        return optimismLogoUrl;
      case "arbitrum":
        return arbitrumLogoUrl;
      case "celo":
        return celoLogo;
      case "bnb":
        return bnbLogo;
    }
  }, [currChain]);

  const onClickOutside = (e: MouseEvent) => {
    if (!networkListRef.current?.contains(e.target as Node))
      setIsToggleOn(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <>
      <Wrapper ref={networkListRef}>
        <ButtonBody
          onClick={() => {
            setIsToggleOn((prev) => !prev);
          }}
          className={`${isToggleOn ? "toggle" : ""}`}
        >
          <ImageContainer src={SelectedChainType} alt={"currChain"} />
          <SVGConverter
            className={`textSecondary ${isToggleOn ? "toggle" : ""}`}
            SVGComponent={ArrowDownSVG}
          />
        </ButtonBody>
        {isToggleOn && <NetworkListModal componentRef={networkListRef} />}
      </Wrapper>
    </>
  );
}

const ImageContainer = styled.img`
  width: 20px;
`;

const Wrapper = styled.div`
  position: relative;

  cursor: pointer;
`;

const ButtonBody = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  height: 40px;
  padding: 1px 6px;
  border-radius: 8px;
  transition: background 125ms ease-in-out;

  &.toggle,
  &:active {
    background-color: ${({ theme }) => theme.accentActiveSoft};
  }
  &:hover {
    background-color: ${({ theme }) => theme.hoverDefault};
  }
`;

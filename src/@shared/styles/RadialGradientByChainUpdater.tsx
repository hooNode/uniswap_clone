import useCurrChain from "@shared/hooks/useCurrChain";
import { CHAIN_TYPE } from "@shared/wagmi/constants/variable";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { themeAtom } from "recoils/theme";

const initialStyles = {
  width: "200vw",
  height: "200vh",
  transform: "translate(-50vw, -100vh)",
};
const backgroundResetStyles = {
  width: "100vw",
  height: "100vh",
  transform: "unset",
};

type TargetBackgroundStyles =
  | typeof initialStyles
  | typeof backgroundResetStyles;

const backgroundRadialGradientElement = document.getElementById(
  "background-radial-gradient"
);
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[
        key as keyof typeof backgroundResetStyles
      ] = value;
    }
  });

export default function RadialGradientByChainUpdater(): null {
  const currChain = useCurrChain();
  const darkMode = useRecoilValue(themeAtom);

  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return;
    }

    switch (currChain) {
      case CHAIN_TYPE.ARBITRUM: {
        setBackground(backgroundResetStyles);
        const arbitrumLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(205, 232, 251, 0.7) 0%, rgba(252, 243, 249, 0.6536) 49.48%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
        const arbitrumDarkGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(34, 30, 48, 0.6536) 49.48%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
        backgroundRadialGradientElement.style.background = darkMode
          ? arbitrumDarkGradient
          : arbitrumLightGradient;
        break;
      }
      case CHAIN_TYPE.OPTIMISM: {
        setBackground(backgroundResetStyles);
        const optimismLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(255, 251, 242, 0.8) 0%, rgba(255, 244, 249, 0.6958) 50.52%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
        const optimismDarkGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(62, 46, 56, 0.8) 0%, rgba(44, 31, 45, 0.6958) 50.52%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
        backgroundRadialGradientElement.style.background = darkMode
          ? optimismDarkGradient
          : optimismLightGradient;
        break;
      }
      case CHAIN_TYPE.POLYGON: {
        setBackground(backgroundResetStyles);
        const polygonLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0.2) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%), #FFFFFF";
        const polygonDarkGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0.2) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%), #0D0E0E";
        backgroundRadialGradientElement.style.background = darkMode
          ? polygonDarkGradient
          : polygonLightGradient;
        break;
      }
      case CHAIN_TYPE.CELO: {
        setBackground(backgroundResetStyles);
        const celoLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(186, 228, 210, 0.7) 0%, rgba(252, 243, 249, 0.6536) 49.48%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
        const celoDarkGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(20, 49, 37, 0.29) 0%, rgba(12, 31, 23, 0.6536) 49.48%, rgba(31, 33, 40, 0) 100%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
        backgroundRadialGradientElement.style.background = darkMode
          ? celoDarkGradient
          : celoLightGradient;
        break;
      }
      case CHAIN_TYPE.BNB: {
        setBackground(backgroundResetStyles);
        const bscLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(242 , 186, 8, 0.1) 0%, rgba(238, 182, 6, 0.08) 50%, rgba(140, 185, 11, 0) 100%), #FFFFFF";
        const bscDarkGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(169, 132, 17, 0.1) 0%, rgba(128, 100, 14, 0.08) 50%, rgba(140, 185, 11, 0) 100%), #0D0E0E";
        backgroundRadialGradientElement.style.background = darkMode
          ? bscDarkGradient
          : bscLightGradient;
        break;
      }
      default: {
        setBackground(initialStyles);
        const defaultLightGradient =
          "radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 226, 0.51) 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
        const defaultDarkGradient =
          "linear-gradient(180deg, #202738 0%, #070816 100%)";
        backgroundRadialGradientElement.style.background = darkMode
          ? defaultDarkGradient
          : defaultLightGradient;
      }
    }
    // eslint-disable-next-line
  }, [darkMode, currChain]);
  return null;
}

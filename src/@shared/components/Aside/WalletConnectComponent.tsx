import styled from "@emotion/styled";
import { ArrowDownSVG } from "@shared/utils/CommonSVG";
import { LightningBoltIcon } from "@shared/utils/UniswapSVG";
import appLogoUrl from "../../assets/image/app_Icon.png";
import { ReactComponent as CoinBaseUrl } from "../../assets/svg/coinbaseWalletIcon.svg";
import { ReactComponent as MetamaskUrl } from "../../assets/svg/metamask.svg";
import { ReactComponent as WalletconnectUrl } from "../../assets/svg/walletConnectIcon.svg";
import { useRef, useState } from "react";
import WalletConnectSettingModal from "../Modal/WalletConnectSettingModal";

interface Props {
  onCloseModal: () => void;
  isToggled: boolean;
}

export default function WalletConnectComponent({
  onCloseModal,
  isToggled,
}: Props) {
  const [isSettingToggled, setIsSettingToggeld] = useState(false);
  const walletComponentRef = useRef<HTMLDivElement>(null);

  const onClickSettingToggle = () => {
    setIsSettingToggeld((prev) => !prev);
  };

  return (
    <Styles.Wrapper className={`${isToggled ? "toggled" : ""}`}>
      <Styles.Handler onClick={onCloseModal}>
        <ArrowDonwSVGCompent />
      </Styles.Handler>
      <Styles.WalletBody ref={walletComponentRef}>
        <div className="header">
          <span className="title">Connect a wallet</span>
          <div className="settings" onClick={onClickSettingToggle}>
            <LightningSVGCompent />
          </div>
        </div>
        <div className="body">
          <div className="wallet uniswap">
            <img src={appLogoUrl} alt="wallet" />
            <span>Uniswap Wallet</span>
          </div>
          <div className="wallet metamask">
            <MetamaskUrl />
            <span>Metamsk</span>
          </div>
          <div className="wallet walletconnect">
            <WalletconnectUrl />
            <span>WalletConnect</span>
          </div>
          <div className="wallet coinbase">
            <CoinBaseUrl />
            <span>Coinbase Wallet</span>
          </div>
        </div>
        <div className="footer">
          <span>
            지갑을 연결하면 Uniswap Labs에 동의하는 것입니다.
            <strong>&nbsp;서비스 약관</strong> 그리고 그것에 동의
            <strong>&nbsp;개인 정보 정책</strong>. (마지막 업데이트 11.17.22)
          </span>
        </div>
      </Styles.WalletBody>
      {isSettingToggled && (
        <WalletConnectSettingModal
          componentRef={walletComponentRef}
          onToggle={onClickSettingToggle}
        />
      )}
    </Styles.Wrapper>
  );
}

const ArrowDonwSVGCompent = styled(ArrowDownSVG)`
  transform: rotate(-90deg);
  path {
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;
const LightningSVGCompent = styled(LightningBoltIcon)`
  path {
    fill: none;
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;

const Styles = {
  Wrapper: styled.aside`
    position: absolute;
    top: 8px;
    right: 0px;
    display: flex;
    height: calc(100vh - 16px);
    z-index: ${({ theme }) => theme.zIndex.modal + 1};
    transform: translateX(384px);
    transition: transform 200ms ease-in-out;
    &.toggled {
      transform: translateX(-8px);
    }
    @media screen and (min-width: 1440px) {
      transform: translateX(454px);
    }
  `,
  Handler: styled.div`
    padding: 24px 28px 24px 14px;
    width: 64px;
    height: 100%;
    border-radius: 20px 0px 0px 20px;
    cursor: pointer;
    margin-left: 0;
    transition: all 250ms ease;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0);

    &:hover {
      background-color: rgba(118, 118, 118, 0.05);
      transform: translateX(8px);
    }
  `,
  WalletBody: styled.div`
    position: relative;
    padding: 16px;
    z-index: 2;
    width: 320px;
    background-color: ${({ theme }) => theme.backgroundSurface};
    border: 1px solid ${({ theme }) => theme.backgroundOutline};
    color: ${({ theme }) => theme.textPrimary};
    height: 100%;
    overscroll-behavior: contain;
    border-radius: 12px;
    @media screen and (min-width: 1440px) {
      width: 390px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      span {
        font-size: 16px;
        font-weight: 400;
        color: ${({ theme }) => theme.textPrimary};
      }
      .settings {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.stateOverlayPressed};
        cursor: pointer;
        transition: background 125ms linear;
        &:hover {
          background-color: ${({ theme }) => theme.stateOverlayHover};
        }
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      .wallet {
        height: 76px;
        width: 100%;
        background-color: ${({ theme }) => theme.hoverDefault};
        transition: background 125ms linear;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 18px;
        &:hover {
          background-color: ${({ theme }) => theme.hoverState};
        }
        > img {
          width: 40px;
          height: 40px;
          border-radius: 12px;
        }
        > svg {
          width: 40px;
          height: 40px;
        }
        > span {
          font-size: 16px;
          font-weight: 500;
          color: ${({ theme }) => theme.textPrimary};
          padding: 0 8px;
        }

        &.uniswap {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        &.coinbase {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
      }
    }
    .footer {
      width: 100%;
      display: flex;
      margin-top: 12px;
      > span {
        font-size: 12px;
        font-weight: 300;
        line-height: 130%;
        color: ${({ theme }) => theme.textTertiary};
        width: 100%;
        text-align: left;
        word-break: break-all;
        strong {
          color: ${({ theme }) => theme.textSecondary};
          cursor: pointer;
          transition: color 125ms linear;
          &:hover {
            color: ${({ theme }) => theme.backgroundInteractive};
          }
        }
      }
    }
  `,
};

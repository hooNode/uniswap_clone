import styled from "@emotion/styled";
import { LightningBoltIcon } from "@shared/utils/UniswapSVG";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { onToggleConnectModalAtom } from "recoils/modal";
import SwapSettingModal from "../Modal/SwapSettingModal";

export default function SwapHeader() {
  const [isOnSettingModal, setIsOnSettingModal] = useState(false);
  const [isSettingAPIToggled, setIsSettingAPIToggled] = useState(false);
  const [option, setOption] = useState<"API" | "CLIENT">("API");
  const [deadline, setDeadline] = useState<string>("");
  const [slippageType, setSlippageType] = useState<"Default" | "Custom">(
    "Default"
  );
  const [slippagePercent, setSlippagePercent] = useState<string>("");

  const settingRef = useRef<HTMLDivElement>(null);
  const [onToggleConnectModal, setOnToggleConnectModal] = useRecoilState(
    onToggleConnectModalAtom
  );

  return (
    <Styles.Wrapper>
      <div className="title">
        <span className="title-main">스왑</span>
        <span
          className={`purchase ${onToggleConnectModal ? "toggled" : ""}`}
          onClick={() => setOnToggleConnectModal(true)}
        >
          구입하다
        </span>
      </div>
      <div
        className={`swap-settings ${isOnSettingModal ? "toggled" : ""}`}
        onClick={() => setIsOnSettingModal((prev) => !prev)}
        ref={settingRef}
      >
        <LightningSVGCompent />
      </div>
      {isOnSettingModal && (
        <SwapSettingModal
          componentRef={settingRef}
          setIsModalOpened={setIsOnSettingModal}
          deadline={deadline}
          setDeadline={setDeadline}
          setIsSettingAPIToggled={setIsSettingAPIToggled}
          isSettingAPIToggled={isSettingAPIToggled}
          option={option}
          setOption={setOption}
          slippageType={slippageType}
          setSlippageType={setSlippageType}
          slippagePercent={slippagePercent}
          setSlippagePercent={setSlippagePercent}
        />
      )}
    </Styles.Wrapper>
  );
}

const LightningSVGCompent = styled(LightningBoltIcon)`
  path {
    fill: none;
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;

const Styles = {
  Wrapper: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 32px;
    .title {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 12px;
      &-main {
        color: ${({ theme }) => theme.textPrimary};
      }
      .purchase {
        color: ${({ theme }) => theme.textSecondary};
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.textTertiary};
        }
        &.toggled {
          color: ${({ theme }) => theme.backgroundInteractive};
        }
      }
    }

    .swap-settings {
      padding: 6px 12px;
      cursor: pointer;
      &.toggled,
      &:hover {
        path {
          fill: none;
          stroke: ${({ theme }) => theme.textTertiary};
        }
      }
    }
  `,
};

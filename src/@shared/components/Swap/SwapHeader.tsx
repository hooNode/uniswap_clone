import styled from "@emotion/styled";
import { LightningBoltIcon } from "@shared/utils/UniswapSVG";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { onToggleConnectModalAtom } from "recoils/modal";
import SwapSettingModal from "../Modal/SwapSettingModal";
import { bigNumber, numberFormat } from "@shared/utils/number";
import { Settings } from "react-feather";
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
        className={`swap-settings ${isOnSettingModal ? "toggled" : ""} ${
          slippagePercent
            ? bigNumber(slippagePercent).eq("0.1")
              ? "nomal"
              : "warn"
            : ""
        }`}
        onClick={() => {
          setTimeout(() => {
            setIsOnSettingModal((prev) => !prev);
          }, 0);
        }}
        ref={settingRef}
      >
        <div className="warn-container">
          {slippagePercent && (
            <span className="warn-component">
              {numberFormat(slippagePercent, 2)}%&nbsp;slippage
            </span>
          )}
          <SettingsSVGCompent />
        </div>
      </div>

      {isOnSettingModal && (
        <SwapSettingModal
          componentRef={settingRef}
          isOnSettingModal={isOnSettingModal}
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

const SettingsSVGCompent = styled(Settings)`
  width: 20px;
  circle {
    stroke: ${({ theme }) => theme.textSecondary};
  }
  path {
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
      cursor: pointer;
      .warn-container {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 16px;
        gap: 8px;
      }
      &.nomal {
        .warn-container {
          background-color: ${({ theme }) => theme.accentTextLightPrimary};
          .warn-component {
            font-size: 12px;
            color: ${({ theme }) => theme.textTertiary};
          }
          &:hover {
            background-color: ${({ theme }) => theme.hoverDefault};
            .warn-component {
              color: ${({ theme }) => theme.backgroundInteractive};
            }
            circle {
              stroke: ${({ theme }) => theme.textTertiary};
            }
            path {
              stroke: ${({ theme }) => theme.textTertiary};
            }
          }
        }
      }
      &.warn {
        .warn-container {
          background-color: ${({ theme }) => theme.accentWarningSoft};
          .warn-component {
            font-size: 12px;
            color: ${({ theme }) => theme.accentWarning};
          }
          &:hover {
            circle {
              stroke: ${({ theme }) => theme.textSecondary};
            }
            path {
              stroke: ${({ theme }) => theme.textSecondary};
            }
          }
        }
      }
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

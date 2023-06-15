import styled from "@emotion/styled";
import { bigNumber, numberFormat } from "@shared/utils/number";
import { useMemo, useRef, useState } from "react";
import { Settings } from "react-feather";
import { useRecoilState } from "recoil";
import { onToggleConnectModalAtom } from "recoils/modal";
import SwapSettingModal from "../Modal/SwapSettingModal";
export default function SwapHeader() {
  const [isOnSettingModal, setIsOnSettingModal] = useState(false);
  const swapSettings = useMemo(() => {
    return localStorage?.getItem("swap-settings")
      ? JSON.parse(localStorage.getItem("swap-settings") as string)
      : {
          realDeadline: "30",
          slippageType: "Default",
          realSlippagePercent: "0.10",
          option: "ACTIVE",
        };
    // eslint-disable-next-line
  }, [localStorage?.getItem("swap-settings")]);
  const [isSettingAPIToggled, setIsSettingAPIToggled] = useState(
    swapSettings.option === "ACTIVE"
  );
  const [option, setOption] = useState<"API" | "CLIENT" | "ACTIVE">(
    swapSettings.option || "ACTIVE"
  );
  const [deadline, setDeadline] = useState<string>(
    swapSettings.realDeadline === "30" ? "" : swapSettings.realDeadline
  );
  const [realDeadline, setRealDeadline] = useState<string>(
    swapSettings.realDeadline || "30"
  );
  const [slippageType, setSlippageType] = useState<"Default" | "Custom">(
    swapSettings.slippageType || "Default"
  );
  const [slippagePercent, setSlippagePercent] = useState<string>(
    bigNumber(swapSettings.realSlippagePercent).eq("0.1")
      ? ""
      : numberFormat(swapSettings.realSlippagePercent, 2)
  );
  const [realSlippagePercent, setRealSlippagePercent] = useState<string>(
    JSON.parse(localStorage?.getItem("swap-settings") || "")
      .realSlippagePercent || "0.10"
  );

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
          realSlippagePercent && slippageType === "Custom"
            ? bigNumber(realSlippagePercent).eq("0.1")
              ? "nomal"
              : "warn"
            : ""
        }`}
        onClick={() => {
          setTimeout(() => {
            if (isOnSettingModal) {
              localStorage.setItem(
                "swap-settings",
                JSON.stringify({
                  realSlippagePercent,
                  realDeadline: realDeadline.slice(0, 4),
                  slippageType,
                  option,
                })
              );
            }
            setIsOnSettingModal((prev) => !prev);
          }, 0);
        }}
        ref={settingRef}
      >
        <div className="warn-container">
          {realSlippagePercent && slippageType === "Custom" && (
            <span className="warn-component">
              {numberFormat(realSlippagePercent, 2)}%&nbsp;slippage
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
          realSlippagePercent={realSlippagePercent}
          setRealSlippagePercent={setRealSlippagePercent}
          realDeadline={realDeadline}
          setRealDeadline={setRealDeadline}
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
        padding: 4px 12px;
        border-radius: 16px;
        gap: 8px;
      }
      &.nomal {
        .warn-container {
          background-color: ${({ theme }) => theme.accentTextLightPrimary};
          .warn-component {
            font-size: 12px;
            font-weight: 300;
            color: ${({ theme }) => theme.textTertiary};
          }
        }
      }
      &.warn {
        .warn-container {
          background-color: ${({ theme }) => theme.accentWarningSoft};
          .warn-component {
            font-size: 12px;
            font-weight: 300;
            color: ${({ theme }) => theme.accentWarning};
          }
        }
      }
      &.toggled,
      &:hover {
        &.nomal {
          .warn-container {
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
        &.warn {
          .warn-container {
            background-color: ${({ theme }) =>
              theme.accentWarningPressedBackground};
            .warn-component {
              color: ${({ theme }) => theme.accentWarningPressedColor};
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
    }
  `,
};

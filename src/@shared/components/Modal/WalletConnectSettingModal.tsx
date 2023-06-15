import styled from "@emotion/styled";
import { DARKMODE_MEDIA_QUERY } from "@shared/styles/Theme";
import { BackArrowIcon } from "@shared/utils/UniswapSVG";
import { RefObject, useState } from "react";
import { Moon, Sun } from "react-feather";
import { useSetRecoilState } from "recoil";
import { themeAtom } from "recoils/theme";
import { Portal } from "../ModalLayout/Portal";
import Toggle from "../Common/Toggle";

interface Props {
  componentRef: RefObject<HTMLElement>;
  onToggle: () => void;
}

export default function WalletConnectSettingModal({
  componentRef,
  onToggle,
}: Props) {
  const setIsDarkMode = useSetRecoilState(themeAtom);
  const [themeMode, setThemeMode] = useState(
    localStorage?.getItem("theme") || "default"
  );
  const [isToggledPrice, setIsToggledPrice] = useState(false);
  const onTogglePrice = () => {
    setIsToggledPrice((prev) => !prev);
  };

  const onSetThemeMode = (mode: "default" | "light" | "dark") => {
    localStorage?.setItem("theme", mode);
    setThemeMode(mode);
    if (mode === "default") {
      setIsDarkMode(DARKMODE_MEDIA_QUERY.matches);
      return;
    }
    if (mode === "light") {
      setIsDarkMode(false);
      return;
    }
    if (mode === "dark") {
      setIsDarkMode(true);
      return;
    }
  };

  return (
    <Portal componentRef={componentRef}>
      <Styles.Wrapper>
        <Styles.Title>
          <ArrowBackSVGComponent onClick={onToggle} />
          <span>설정</span>
        </Styles.Title>
        <Styles.Contents>
          <div className="content-title">
            <span>기본 설정</span>
          </div>
          <div className="content-body">
            <div className="content-body-item">
              <span>테마</span>
              <div className="theme">
                <div
                  className={`theme-item ${
                    themeMode === "default" ? "current" : ""
                  }`}
                  onClick={() => onSetThemeMode("default")}
                >
                  자동
                </div>
                <div
                  className={`theme-item ${
                    themeMode === "light" ? "current" : ""
                  }`}
                  onClick={() => onSetThemeMode("light")}
                >
                  <SunSVGComponent />
                </div>
                <div
                  className={`theme-item ${
                    themeMode === "dark" ? "current" : ""
                  }`}
                  onClick={() => onSetThemeMode("dark")}
                >
                  <MoonSVGComponent />
                </div>
              </div>
            </div>
            <div className="content-body-item">
              <span>소액 잔액 숨기기</span>

              <Toggle isToggled={isToggledPrice} onToggle={onTogglePrice} />
            </div>
          </div>
        </Styles.Contents>
      </Styles.Wrapper>
    </Portal>
  );
}

const SunSVGComponent = styled(Sun)`
  width: 20px;
  height: 20px;
  line,
  circle {
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;
const MoonSVGComponent = styled(Moon)`
  width: 20px;
  height: 20px;
  path {
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;
const ArrowBackSVGComponent = styled(BackArrowIcon)`
  position: absolute;
  left: 0;
  fill: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: all 125ms ease-in-out;
  &:hover {
    fill: ${({ theme }) => theme.textSecondary};
  }
`;

const Styles = {
  Wrapper: styled.div`
    width: inherit;
    background-color: inherit;
    height: inherit;
    border: inherit;
    border-radius: inherit;
    padding: inherit;

    position: absolute;
    top: 0;
    right: 0;
    z-index: ${({ theme }) => theme.zIndex.modal + 2};
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.textPrimary};
  `,
  Title: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 4px;
    margin-bottom: 24px;
  `,
  Contents: styled.div`
    display: flex;
    flex-direction: column;
    .content-title {
      margin-bottom: 24px;
      > span {
        color: ${({ theme }) => theme.textTertiary};
      }
    }
    .content-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      &-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        > span {
          font-size: 14px;
          color: ${({ theme }) => theme.textPrimary};
        }

        .theme {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 5px;
          border-radius: 16px;
          border: 1px solid ${({ theme }) => theme.backgroundOutline};
          &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 60px;
            /* padding: 8px 10px; */
            cursor: pointer;
            border-radius: 12px;
            transition: background-color 125ms ease-in-out;
            font-size: 16px;
            color: ${({ theme }) => theme.textSecondary};
            &:hover {
              color: ${({ theme }) => theme.textPrimary};
              background-color: ${({ theme }) => theme.hoverState};
              path {
                stroke: ${({ theme }) => theme.textPrimary};
              }
              line,
              circle {
                stroke: ${({ theme }) => theme.textPrimary};
              }
            }

            &.current {
              color: ${({ theme }) => theme.accentAction};
              background-color: ${({ theme }) => theme.accentActionSoft};
              path {
                stroke: ${({ theme }) => theme.accentAction};
              }
              line,
              circle {
                stroke: ${({ theme }) => theme.accentAction};
              }
            }
          }
        }
      }
    }
  `,
};

import styled from "@emotion/styled";
import { ArrowDownSVG } from "@shared/utils/CommonSVG";
import {
  bigNumber,
  numberFormat,
  numberValidCheck,
} from "@shared/utils/number";
import React, {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { HelpCircle } from "react-feather";
import Toggle from "../Common/Toggle";
import { Portal } from "../ModalLayout/Portal";
import { AlertTriangle } from "react-feather";

interface SettingAPIProps {
  isSettingAPIToggled: boolean;
  setIsSettingAPIToggled: React.Dispatch<React.SetStateAction<boolean>>;
  option: "API" | "CLIENT" | "ACTIVE";
  setOption: React.Dispatch<React.SetStateAction<"API" | "CLIENT" | "ACTIVE">>;
}

const SettingsAPI = ({
  setIsSettingAPIToggled,
  isSettingAPIToggled,
  option,
  setOption,
}: SettingAPIProps) => {
  const [firstRendered, setFirstRendered] = useState(true);
  const onToggle = () => {
    setIsSettingAPIToggled((prev) => !prev);
  };

  useEffect(() => {
    if (firstRendered) setFirstRendered(false);

    if (isSettingAPIToggled) setOption("ACTIVE");
    else {
      if (firstRendered) {
        setOption(
          JSON.parse(localStorage.getItem("swap-settings") as string).option
        );
      } else {
        setOption("API");
      }
    }
    // eslint-disable-next-line
  }, [isSettingAPIToggled]);
  return (
    <>
      <div className="setting">
        <div className="setting-title">
          <span>자동 라우터 API</span>
          <span>더 빠른 견적을 받으려면 Uniswap Labs API를 사용하십시오.</span>
        </div>
        <Toggle onToggle={onToggle} isToggled={isSettingAPIToggled} />
      </div>

      {!isSettingAPIToggled && (
        <div className="other-mode">
          <div className={`sub-setting`} onClick={() => setOption("API")}>
            <div className="sub-setting-title">
              <span>유니스왑 API</span>
              <span>
                Uniswap Labs 라우팅 API를 사용하여 Uniswap 프로토콜에서 최적의
                경로를 찾습니다.
              </span>
            </div>
            <button className={`${option === "API" ? "picked" : ""}`}>
              <span />
            </button>
          </div>
          <div className={`sub-setting`} onClick={() => setOption("CLIENT")}>
            <div className="sub-setting-title">
              <span>유니스왑 클라이언트</span>
              <span>
                브라우저를 통해 Uniswap 프로토콜에서 최적의 경로를 찾습니다.
                높은 대기 시간과 가격이 발생할 수 있습니다.
              </span>
            </div>
            <button className={`${option === "CLIENT" ? "picked" : ""}`}>
              <span />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface SettingsSlippageProps {
  slippageType: "Default" | "Custom";
  setSlippageType: React.Dispatch<React.SetStateAction<"Default" | "Custom">>;
  slippagePercent: string;
  setSlippagePercent: React.Dispatch<React.SetStateAction<string>>;
  isOnSettingModal: boolean;
  realSlippagePercent: string;
  setRealSlippagePercent: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsSlippage = ({
  slippageType,
  setSlippageType,
  slippagePercent,
  setSlippagePercent,
  isOnSettingModal,
  realSlippagePercent,
  setRealSlippagePercent,
}: SettingsSlippageProps) => {
  const [isToggled, setIsToggled] = useState(!!slippagePercent);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorState, setErrorState] = useState(false);
  const [warningStatue, setWarningStatue] = useState(false);

  const onToggle = () => {
    setIsToggled((prev) => !prev);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.includes(".")) {
      if (value.split(".")[1].length > 2) return;
    }

    if (!numberValidCheck(value)) {
      return;
    }
    if (value === "") setSlippageType("Default");
    setSlippagePercent(value);
  };

  const onClickType = (type: "Default" | "Custom") => {
    setSlippageType(type);
  };

  useEffect(() => {
    if (slippageType === "Default") {
      setSlippagePercent("");
    }
    // eslint-disable-next-line
  }, [slippageType]);

  useEffect(() => {
    if (slippagePercent !== "") {
      setSlippageType("Custom");
    }

    if (bigNumber(slippagePercent).gt("50")) {
      setErrorState(true);
      return;
    } else {
      setErrorState(false);
    }
    if (slippagePercent === "") {
      setRealSlippagePercent("0.10");
      return;
    }
    setRealSlippagePercent(slippagePercent);
    // eslint-disable-next-line
  }, [slippagePercent]);

  useEffect(() => {
    if (bigNumber(realSlippagePercent).eq("0.1")) {
      setWarningStatue(false);
    } else {
      setWarningStatue(true);
    }
  }, [realSlippagePercent]);

  const onClickOutside = (event: MouseEvent) => {
    if (!inputRef?.current?.contains(event.target as HTMLElement)) {
      if (bigNumber(slippagePercent).gt("50")) {
        setSlippagePercent(numberFormat(realSlippagePercent, 2));
        setErrorState(false);
        return;
      }
      if (bigNumber(slippagePercent).eq("0.1")) {
        setSlippagePercent("");
        return;
      }

      if (slippagePercent === "") {
        return;
      }

      setSlippagePercent(numberFormat(slippagePercent, 2));
    }
  };

  useEffect(() => {
    if (slippageType === "Default" || !isOnSettingModal) {
      return () => {
        window.removeEventListener("click", onClickOutside);
      };
    }

    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
    // eslint-disable-next-line
  }, [slippagePercent, errorState, slippageType]);

  return (
    <>
      <div className="setting">
        <div className="setting-title">
          <span>
            최대 가격 변동
            <HelpCircleSVGComponent />
          </span>
        </div>
        <div
          className={`toggle-component ${isToggled ? "toggled" : ""}`}
          onClick={onToggle}
        >
          <span>
            {slippageType === "Default"
              ? "자동"
              : numberFormat(realSlippagePercent, 2)}
          </span>
          <ArrowDownSVGComponent />
        </div>
      </div>
      <div
        className={`overflow-component ${
          isToggled && warningStatue && slippageType !== "Default" ? "warn" : ""
        } ${isToggled ? "toggled" : ""} `}
      >
        <div className={`optional-slippage ${errorState ? "error" : ""}`}>
          <div className="slippage-type">
            <div
              className={`slippage-type-item ${
                slippageType === "Default" ? "current" : ""
              }`}
              onClick={() => onClickType("Default")}
            >
              자동
            </div>
            <div
              className={`slippage-type-item ${
                slippageType === "Custom" ? "current" : ""
              }`}
              onClick={() => onClickType("Custom")}
            >
              사용자 정의
            </div>
          </div>
          <div className="slippage-input">
            <input
              placeholder="0.10"
              value={slippagePercent}
              onChange={onChange}
              ref={inputRef}
            />
            <span className="input-placeholder">%</span>
          </div>
        </div>

        <div className="warning-message">
          <CautionTriangle />
          <span>귀하의 거래는 선불이고 불리한 거래를 초래할 수 있습니다.</span>
        </div>
      </div>
    </>
  );
};

interface DeadlineProps {
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
  isOnSettingModal: boolean;
  realDeadline: string;
  setRealDeadline: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsDeadline = ({
  deadline,
  setDeadline,
  isOnSettingModal,
  realDeadline,
  setRealDeadline,
}: DeadlineProps) => {
  const [isToggled, setIsToggled] = useState(deadline !== "");

  const [errorState, setErrorState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onToggle = () => {
    setIsToggled((prev) => !prev);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value || value === "0") {
      setDeadline("");
      return;
    }

    const reg = new RegExp("^\\d*$");

    const isNum = reg.test(value);
    if (isNum) {
      setDeadline(value);
    }
  };

  const onClickOutside = (event: MouseEvent) => {
    if (!inputRef?.current?.contains(event.target as HTMLElement)) {
      let fixedNumber = deadline;
      if (errorState) {
        if (bigNumber(deadline).gt("4320")) {
          fixedNumber = fixedNumber.slice(0, 4);
        }

        if (bigNumber(fixedNumber).gt("4320")) {
          fixedNumber = fixedNumber.slice(0, 3);
        }
        setDeadline(fixedNumber);
        setErrorState(false);
      } else {
        if (deadline === "30") {
          setDeadline("");
        }
      }
    }
  };

  useEffect(() => {
    if (!errorState || !isOnSettingModal) {
      return () => window.removeEventListener("click", onClickOutside);
    }
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
    // eslint-disable-next-line
  }, [deadline, errorState]);

  useEffect(() => {
    if (bigNumber(deadline).gt("4320")) {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
    if (deadline === "") {
      setRealDeadline("30");
      return;
    }
    setRealDeadline(deadline);
    // eslint-disable-next-line
  }, [deadline]);
  return (
    <>
      <div className="setting">
        <div className="setting-title">
          <span>
            거래 마감 시간
            <HelpCircleSVGComponent />
          </span>
        </div>
        <div
          className={`toggle-component ${isToggled ? "toggled" : ""}`}
          onClick={onToggle}
        >
          <span>{realDeadline.slice(0, 4)}</span>
          <ArrowDownSVGComponent />
        </div>
      </div>

      <div
        className={`overflow-component deadline ${isToggled ? "toggled" : ""}`}
        ref={inputRef}
      >
        <div className={`optional-deadline ${errorState ? "error" : ""}`}>
          <input
            className="deadline-input"
            placeholder={"30"}
            value={deadline}
            onChange={onChange}
          />
          <span className="deadline-input-placeholder">분</span>
        </div>
      </div>
    </>
  );
};

interface Props {
  componentRef: RefObject<HTMLElement>;
  isOnSettingModal: boolean;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  deadline: string;
  setDeadline: React.Dispatch<React.SetStateAction<string>>;
  isSettingAPIToggled: boolean;
  setIsSettingAPIToggled: React.Dispatch<React.SetStateAction<boolean>>;
  option: "API" | "CLIENT" | "ACTIVE";
  setOption: React.Dispatch<React.SetStateAction<"API" | "CLIENT" | "ACTIVE">>;
  slippageType: "Default" | "Custom";
  setSlippageType: React.Dispatch<React.SetStateAction<"Default" | "Custom">>;
  slippagePercent: string;
  setSlippagePercent: React.Dispatch<React.SetStateAction<string>>;
  realSlippagePercent: string;
  setRealSlippagePercent: React.Dispatch<React.SetStateAction<string>>;
  realDeadline: string;
  setRealDeadline: React.Dispatch<React.SetStateAction<string>>;
}

export default function SwapSettingModal({
  componentRef,
  isOnSettingModal,
  setIsModalOpened,
  deadline,
  setDeadline,
  isSettingAPIToggled,
  setIsSettingAPIToggled,
  option,
  setOption,
  slippageType,
  setSlippageType,
  slippagePercent,
  setSlippagePercent,
  realSlippagePercent,
  setRealSlippagePercent,
  realDeadline,
  setRealDeadline,
}: Props) {
  const onClickOutside = (e: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(e.target as HTMLElement)
    ) {
      setTimeout(() => {
        localStorage.setItem(
          "swap-settings",
          JSON.stringify({
            realSlippagePercent,
            realDeadline: realDeadline.slice(0, 4),
            slippageType,
            option,
          })
        );
        setIsModalOpened(false);
      }, 0);
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("click", onClickOutside);
    };
    // eslint-disable-next-line
  }, [realSlippagePercent, realDeadline, option, slippageType]);
  return (
    <Portal componentRef={componentRef}>
      <Styles.Wrapper>
        <Styles.SettingModalRow>
          <SettingsAPI
            setIsSettingAPIToggled={setIsSettingAPIToggled}
            isSettingAPIToggled={isSettingAPIToggled}
            option={option}
            setOption={setOption}
          />
        </Styles.SettingModalRow>
        <Row />
        <Styles.SettingModalRow>
          <SettingsSlippage
            slippageType={slippageType}
            setSlippageType={setSlippageType}
            slippagePercent={slippagePercent}
            setSlippagePercent={setSlippagePercent}
            isOnSettingModal={isOnSettingModal}
            realSlippagePercent={realSlippagePercent}
            setRealSlippagePercent={setRealSlippagePercent}
          />
        </Styles.SettingModalRow>
        <Row />
        <Styles.SettingModalRow>
          <SettingsDeadline
            deadline={deadline}
            setDeadline={setDeadline}
            isOnSettingModal={isOnSettingModal}
            realDeadline={realDeadline}
            setRealDeadline={setRealDeadline}
          />
        </Styles.SettingModalRow>
      </Styles.Wrapper>
    </Portal>
  );
}

const ArrowDownSVGComponent = styled(ArrowDownSVG)`
  width: 24px;
  height: 24px;
  margin-left: 2px;
  path {
    stroke-width: 2px;
    stroke: ${({ theme }) => theme.textPrimary};
  }
`;
const HelpCircleSVGComponent = styled(HelpCircle)`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`;

const CautionTriangle = styled(AlertTriangle)`
  width: 16px;
  height: 24px;
  color: ${({ theme }) => theme.accentWarning};

  > path {
    stroke: ${({ theme }) => theme.accentWarning} !important;
  }
`;

const Row = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundOutline};
  height: 1px;
`;

const Styles = {
  Wrapper: styled.div`
    position: absolute;
    z-index: 9;
    display: flex;
    flex-direction: column;
    gap: 16px;
    right: 0;
    width: 322px;
    margin-top: 10px;
    padding: 16px;
    background-color: ${({ theme }) => theme.backgroundSurface};
    border: 1px solid ${({ theme }) => theme.backgroundOutline};
    border-radius: 16px;
    cursor: default;
    box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px,
      rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
  `,

  SettingModalRow: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: ${({ theme }) => theme.textTertiary};
    .setting {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        max-width: 220px;
        gap: 4px;
        & > :nth-of-type(1) {
          text-align: left;
          display: flex;
          align-items: center;
        }
        & > :nth-of-type(2) {
          font-size: 12px;
          text-align: left;
        }
      }

      .toggle-component {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.textPrimary};
        cursor: pointer;
        > svg {
          transform: rotate(0);
          transition: transform 125ms linear;
        }
        &.toggled {
          > svg {
            transform: rotate(180deg);
          }
        }
      }
    }
    .other-mode {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2px;
      & > :nth-of-type(1) {
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      }
      & > :nth-of-type(2) {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      .sub-setting {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        gap: 4px;
        color: ${({ theme }) => theme.textPrimary};
        background-color: ${({ theme }) => theme.backgroundModule};
        cursor: pointer;
        &-title {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 4px;
          > span {
            max-width: 230px;
          }
          & :nth-of-type(1) {
          }
          & :nth-of-type(2) {
            font-size: 12px;
            color: ${({ theme }) => theme.textTertiary};
          }
        }

        > button {
          align-items: center;
          background: transparent;
          border: 2px solid ${({ theme }) => theme.backgroundOutline};
          border-radius: 50%;
          display: flex;
          outline: none;
          padding: 5px;
          width: fit-content;
          cursor: pointer;
          > span {
            background: transparent;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            opacity: 1;
          }

          &.picked {
            border: 2px solid ${({ theme }) => theme.accentAction};
            > span {
              background: ${({ theme }) => theme.accentAction};
            }
          }
        }
      }
    }

    .overflow-component {
      height: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
      transition: height 125ms linear;

      &.toggled {
        height: 40px;
      }
      &.warn {
        height: 80px;
      }

      .warning-message {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;

        & > span {
          font-size: 12px;
          word-break: break-all;
          color: ${({ theme }) => theme.accentWarning};
        }
      }
    }

    .optional-deadline {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 8px 16px;
      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.backgroundOutline};

      &.error {
        border: 1px solid ${({ theme }) => theme.accentFailureSoft};
        .deadline-input {
          color: ${({ theme }) => theme.accentFailure};
        }
      }
      .deadline-input {
        all: unset;
        width: calc(100% - 30px);
        text-align: right;

        color: ${({ theme }) => theme.textPrimary};
        &::placeholder {
          color: ${({ theme }) => theme.backgroundInteractive};
        }
      }
      .deadline-input-placeholder {
        color: ${({ theme }) => theme.textPrimary};
      }
    }
    .optional-slippage {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;

      &.error {
        .slippage-input {
          border: 1px solid ${({ theme }) => theme.accentFailureSoft};
          > input {
            color: ${({ theme }) => theme.accentFailure};
          }
        }
      }

      .slippage-type {
        display: flex;
        align-items: center;
        width: 160px;
        height: 40px;
        padding: 4px;
        border: 1px solid ${({ theme }) => theme.backgroundOutline};
        border-radius: 16px;
        &-item {
          padding: 6px 12px;
          border-radius: 12px;
          color: ${({ theme }) => theme.textPrimary};
          cursor: pointer;
          &.current {
            background-color: ${({ theme }) => theme.backgroundInteractive};
            cursor: default;
          }
        }
      }

      .slippage-input {
        display: flex;
        width: 116px;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.backgroundOutline};
        > input {
          all: unset;
          color: ${({ theme }) => theme.textPrimary};
          width: 100%;
          text-align: right;

          &::placeholder {
            color: ${({ theme }) => theme.backgroundInteractive};
          }
        }
        .input-placeholder {
          color: ${({ theme }) => theme.textPrimary};
        }
      }
    }
  `,
};

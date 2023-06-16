import styled from "@emotion/styled";
import {
  ArrowRightIcon,
  ClockIcon,
  TrendingArrow,
} from "@shared/utils/UniswapSVG";
import { ABLE_TO_USE_TOKENS } from "@shared/wagmi/constants/variable";
import { RefObject, useEffect, useMemo, useState } from "react";
import { Portal } from "../ModalLayout/Portal";
import { numberFormat, numberFormatComma } from "@shared/utils/number";

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  onCloseModal: () => void;
}

export default function SearchResultModal({
  componentRef,
  onCloseModal,
}: Props) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const searchResult = useMemo(() => {
    const recentArr = JSON.parse(
      localStorage.getItem("recent") || "[]"
    ) as string[];

    const recentFilteredArr = recentArr.map((recent) => {
      return ABLE_TO_USE_TOKENS.filter((el) => el.tokenName === recent)[0];
    });

    return [...recentFilteredArr, ...ABLE_TO_USE_TOKENS];

    // eslint-disable-next-line
  }, [localStorage.getItem("recent")]);

  const onClickRow = (tokenName: string) => {
    if (
      localStorage.getItem("recent") === null ||
      !localStorage.getItem("recent")
    ) {
      localStorage.setItem("recent", JSON.stringify([tokenName]));
      onCloseModal();
      return;
    }

    const recentArr = JSON.parse(localStorage.getItem("recent")!) as string[];
    if (recentArr.indexOf(tokenName) === 0) {
      onCloseModal();
      return;
    }

    recentArr.unshift(tokenName);
    const sliceArr = recentArr.slice(0, 2);
    localStorage.setItem("recent", JSON.stringify(sliceArr));
    onCloseModal();
    return;
  };

  const onPressKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      if (hoveredIndex <= 0) {
        setHoveredIndex(searchResult.length - 1);
        return;
      }
      setHoveredIndex((prev) => prev - 1);
    }
    if (e.key === "ArrowDown") {
      if (hoveredIndex === searchResult.length - 1) {
        setHoveredIndex(0);
        return;
      }
      setHoveredIndex((prev) => prev + 1);
    }

    if (e.key === "Enter") {
      onClickRow(searchResult[hoveredIndex].tokenName);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onPressKey);

    return () => {
      window.removeEventListener("keydown", onPressKey);
    };
    // eslint-disable-next-line
  }, [hoveredIndex]);

  return (
    <Portal componentRef={componentRef}>
      <Styles.ModalWrapper onMouseLeave={() => setHoveredIndex(-1)}>
        {JSON.parse(localStorage?.getItem("recent") || "[]").length > 0 && (
          <Styles.SearchedListRow>
            <div className="title">
              <ClockIcon />
              <span>최근 검색</span>
            </div>

            {JSON.parse(localStorage.getItem("recent")!).map(
              (recent: string, index: number) => {
                const token = ABLE_TO_USE_TOKENS.filter(
                  (el) => el.tokenName === recent
                )[0];

                return (
                  <div
                    className={`result-item ${
                      hoveredIndex === index ? "hoverd" : ""
                    }`}
                    key={index}
                    onClick={() => onClickRow(token.tokenName)}
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <div className="result-item-left">
                      <img src={token.tokenImgUrl} alt="token" />
                      <div className="result-item-left-info">
                        <span>{token.tokenName}</span>
                        <span>{token.tokenSymbol}</span>
                      </div>
                    </div>
                    <div className="result-item-right">
                      <span>${numberFormat(token.tokenPerUsd, 2)}</span>
                      <span>
                        <ArrowRightSVG />
                        {`${numberFormat(0, 2)}%`}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </Styles.SearchedListRow>
        )}
        <Styles.SearchedListRow>
          <div className="title">
            <TrendingArrow />
            <span>인기있는 토큰</span>
          </div>

          {ABLE_TO_USE_TOKENS.map((token, index) => {
            return (
              <div
                className={`result-item  ${
                  hoveredIndex ===
                  index +
                    JSON.parse(localStorage?.getItem("recent") || "[]").length
                    ? "hoverd"
                    : ""
                }`}
                key={index}
                onClick={() => onClickRow(token.tokenName)}
                onMouseEnter={() =>
                  setHoveredIndex(
                    index +
                      JSON.parse(localStorage?.getItem("recent") || "[]").length
                  )
                }
              >
                <div className="result-item-left">
                  <img src={token.tokenImgUrl} alt="token" />
                  <div className="result-item-left-info">
                    <span>{token.tokenName}</span>
                    <span>{token.tokenSymbol}</span>
                  </div>
                </div>
                <div className="result-item-right">
                  <span>${numberFormat(token.tokenPerUsd, 2)}</span>
                  <span>
                    <ArrowRightSVG />
                    {`${numberFormat(0, 2)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </Styles.SearchedListRow>
      </Styles.ModalWrapper>
    </Portal>
  );
}

const ArrowRightSVG = styled(ArrowRightIcon)`
  fill: ${({ theme }) => theme.accentSuccess};
  padding: 2px;
  width: 24px;
  height: 24px;
  transform: rotate(-45deg);
`;

const Styles = {
  ModalWrapper: styled.div`
    position: absolute;
    top: 32px;
    left: 0;
    display: flex;
    flex-direction: column;

    width: inherit;
    background-color: ${({ theme }) => theme.backgroundSurface};
    padding: 12px 0;
    box-shadow: 0px 14px 14px 0px #00000026;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    gap: 20px;
  `,

  SearchedListRow: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .title {
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
      font-weight: 300;
      widows: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 16px;
    }

    .result-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;

      cursor: pointer;
      &.hoverd {
        background-color: ${({ theme }) => theme.hoverDefault};
      }

      &-left {
        display: flex;
        align-items: center;
        gap: 8px;
        > img {
          width: 36px;
        }
        &-info {
          display: flex;
          flex-direction: column;
          & > :nth-of-type(1) {
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme.textPrimary};
          }
          & > :nth-of-type(2) {
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.textSecondary};
          }
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        & > :nth-of-type(1) {
          font-size: 16px;
          font-weight: 500;
          color: ${({ theme }) => theme.textPrimary};
        }
        & > :nth-of-type(2) {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 400;
          color: ${({ theme }) => theme.accentSuccess};
        }
      }
    }
  `,
};

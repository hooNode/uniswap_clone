import styled from "@emotion/styled";
import { bigNumber, numberFormatComma } from "@shared/utils/number";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowDown } from "react-feather";
import { useRecoilState } from "recoil";
import { selectedTokenAtom } from "recoils/token";
import SwapComponent from "./components/SwapComponent";

export const calculateTokenAmount = ({
  amount,
  toUsdPerPrice,
  fromUsdPerPrice,
  fommat = true,
}: {
  amount?: string;
  toUsdPerPrice?: string;
  fromUsdPerPrice?: string;
  fommat?: boolean;
}) => {
  if (!toUsdPerPrice || !fromUsdPerPrice || !amount) return "";
  const plainString = amount.replaceAll(",", "");
  return fommat
    ? numberFormatComma(
        bigNumber(fromUsdPerPrice)
          .dividedBy(toUsdPerPrice)
          .multipliedBy(plainString)
          .toString(),
        18
      )
    : bigNumber(fromUsdPerPrice)
        .dividedBy(toUsdPerPrice)
        .multipliedBy(plainString)
        .toString();
};

export default function SwapBody() {
  const [selectedToken, setSelectedToken] = useRecoilState(selectedTokenAtom);
  const [recentChanged, setRecentChanged] = useState<"FROM" | "TO">("FROM");

  const onChangeFromValue = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue;
    const { value } = e.target;
    const regex = new RegExp(/^\d*[.]?\d*$/g);

    if (!regex.test(value)) return;

    let [integer, decimals] = value?.split(".");
    integer = integer?.replace(/(^0{2})/, "0");
    integer = integer?.replace(/(^0[1-9]+)/, integer.slice(1));

    if (value.includes(".")) {
      inputValue = [integer, decimals].join(".");
    } else {
      inputValue = integer;
    }

    setSelectedToken({
      to: {
        ...selectedToken.to,
        ...(selectedToken.to.tokenPerUsd && {
          value: inputValue
            ? calculateTokenAmount({
                amount: inputValue,
                toUsdPerPrice: selectedToken.to.tokenPerUsd,
                fromUsdPerPrice: selectedToken.from.tokenPerUsd,
              })
            : numberFormatComma(selectedToken.to.value, 18),
        }),
      },
      from: { ...selectedToken.from, value: inputValue },
    });

    setRecentChanged("FROM");
  };
  const onChangeToValue = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue;
    const { value } = e.target;
    const regex = new RegExp(/^\d*[.]?\d*$/g);

    if (!regex.test(value)) return;

    let [integer, decimals] = value?.split(".");
    integer = integer?.replace(/(^0{2})/, "0");
    integer = integer?.replace(/(^0[1-9]+)/, integer.slice(1));

    if (value.includes(".")) {
      inputValue = [integer, decimals].join(".");
    } else {
      inputValue = integer;
    }
    setSelectedToken({
      to: { ...selectedToken.to, value: inputValue },
      from: {
        ...selectedToken.from,
        ...(selectedToken.to.tokenPerUsd && {
          value: inputValue
            ? calculateTokenAmount({
                amount: inputValue,
                toUsdPerPrice: selectedToken.from.tokenPerUsd,
                fromUsdPerPrice: selectedToken.to.tokenPerUsd,
              })
            : numberFormatComma(selectedToken.from.value, 18),
        }),
      },
    });
    setRecentChanged("TO");
  };

  const onClickExchangeSwapToken = () => {
    if (recentChanged === "FROM") {
      setSelectedToken({
        from: {
          ...selectedToken.to,

          value: selectedToken.from.value
            ? calculateTokenAmount({
                amount: selectedToken.from.value,
                toUsdPerPrice: selectedToken.to.tokenPerUsd,
                fromUsdPerPrice: selectedToken.from.tokenPerUsd,
              })
            : calculateTokenAmount({
                amount: selectedToken.to.value,
                toUsdPerPrice: selectedToken.from.tokenPerUsd,
                fromUsdPerPrice: selectedToken.to.tokenPerUsd,
                fommat: false,
              }),
        },
        to: { ...selectedToken.from, value: selectedToken.from.value },
      });
    } else {
      setSelectedToken({
        from: {
          ...selectedToken.to,
          value: selectedToken.to.value,
        },
        to: {
          ...selectedToken.from,
          value: selectedToken.to.value
            ? calculateTokenAmount({
                amount: selectedToken.to.value,
                toUsdPerPrice: selectedToken.from.tokenPerUsd,
                fromUsdPerPrice: selectedToken.to.tokenPerUsd,
              })
            : calculateTokenAmount({
                amount: selectedToken.from.value,
                toUsdPerPrice: selectedToken.from.tokenPerUsd,
                fromUsdPerPrice: selectedToken.to.tokenPerUsd,
                fommat: false,
              }),
        },
      });
    }
    setRecentChanged((prev) => (prev === "FROM" ? "TO" : "FROM"));
  };

  return (
    <Styles.Wrapper>
      <SwapComponent onChangeValue={onChangeFromValue} type={"FROM_LIST"} />
      <Styles.Row>
        <div className="row-component" onClick={onClickExchangeSwapToken}>
          <ArrowDownSVG />
        </div>
      </Styles.Row>
      <SwapComponent onChangeValue={onChangeToValue} type={"TO_LIST"} />
    </Styles.Wrapper>
  );
}

const ArrowDownSVG = styled(ArrowDown)`
  width: 16px;
  height: 16px;
  polyline,
  line {
    stroke: ${({ theme }) => theme.textTertiary};
  }
`;

const Styles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    margin: -18px auto;
    z-index: 1;

    .row-component {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      width: 40px;
      height: 40px;
      background-color: ${({ theme }) => theme.SwapButtonState};
      border-radius: 12px;
      border: 4px solid ${({ theme }) => theme.backgroundSurface};

      &:hover {
        background-color: ${({ theme }) => theme.SwapButtonHoverState};
      }
      cursor: pointer;
    }
  `,
};

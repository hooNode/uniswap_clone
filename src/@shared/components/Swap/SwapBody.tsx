import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import SwapComponent from "./components/SwapComponent";
import { ArrowDown } from "react-feather";
import { ABLE_TO_USE_TOKENS, TOKENS } from "@shared/wagmi/constants/variable";

export default function SwapBody() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const onChangeFromValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };
  const onChangeToValue = (e: ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
  };
  return (
    <Styles.Wrapper>
      <SwapComponent value={fromValue} onChangeValue={onChangeFromValue} />
      <Styles.Row>
        <div className="row-component">
          <ArrowDownSVG />
        </div>
      </Styles.Row>
      <SwapComponent value={toValue} onChangeValue={onChangeToValue} />
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

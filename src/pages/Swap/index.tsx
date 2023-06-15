import styled from "@emotion/styled";
import SwapBody from "@shared/components/Swap/SwapBody";
import SwapHeader from "@shared/components/Swap/SwapHeader";
import React from "react";

export default function index() {
  return (
    <Styles.Wrapper>
      <Styles.SwapMainComponent>
        <Styles.SwapHeader>
          <SwapHeader />
        </Styles.SwapHeader>
        <Styles.SwapBody>
          <SwapBody />
        </Styles.SwapBody>
        <Styles.SwapFooter></Styles.SwapFooter>
      </Styles.SwapMainComponent>
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  `,
  SwapMainComponent: styled.div`
    width: 464px;
    height: 324px;
    border-radius: 16px;
    margin-top: 68px;
    padding: 12px 8px;
    background-color: ${({ theme }) => theme.backgroundSurface};
    border: 1px solid ${({ theme }) => theme.backgroundOutline};
  `,

  SwapHeader: styled.header`
    margin-bottom: 10px;
  `,
  SwapBody: styled.article``,
  SwapFooter: styled.div``,
};

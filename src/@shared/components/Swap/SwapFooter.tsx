import styled from "@emotion/styled";
import React from "react";
import { useSetRecoilState } from "recoil";
import { onToggleConnectModalAtom } from "recoils/modal";

export default function SwapFooter() {
  const setOnToggleConnectModal = useSetRecoilState(onToggleConnectModalAtom);
  const onClick = () => {
    setOnToggleConnectModal(true);
  };
  return <Styles.Wrapper onClick={onClick}>지갑 연결</Styles.Wrapper>;
}

const Styles = {
  Wrapper: styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.accentActionSoft};
    color: ${({ theme }) => theme.accentAction};
    font-size: 20px;
    font-weight: 400;
    padding: 16px;
    border: 1px solid transparent;
    border-radius: 20px;
    transition: background 125ms linear;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${({ theme }) => theme.hoverButtonState};
    }

    &:active {
      background-color: ${({ theme }) => theme.hoverActiveState};
    }
  `,
};

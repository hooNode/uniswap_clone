import React from "react";
import styled from "@emotion/styled";

interface Props {
  onClick: () => void;
}

export default function LoginButton({ onClick }: Props) {
  return <ButtonWrapper onClick={onClick}>Connect</ButtonWrapper>;
}

const ButtonWrapper = styled.button`
  background-color: ${({ theme }) => theme.accentActionSoft};
  height: 40px;
  color: ${({ theme }) => theme.accentAction};
  font-weight: 500;
  font-size: 16px;
  padding: 10px 12px;
  border-radius: 9999px;

  transition: color 125ms ease-in;

  &:hover {
    color: ${({ theme }) => theme.accentActionSoft};
  }
`;

import styled from "@emotion/styled";
import { ArrowDownSVG } from "@shared/utils/CommonSVG";
import { ChangeEvent } from "react";

interface Props {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SwapComponent({ value, onChangeValue }: Props) {
  return (
    <Styles.Wrapper>
      <Styles.SwapContents>
        <Styles.SwapInput>
          <input placeholder="0" value={value} onChange={onChangeValue}></input>
          <div className="selected-token">
            <div>‡</div>
            <span>asdf</span>
            <ArrowDownSVGComponent />
          </div>
        </Styles.SwapInput>
        <Styles.Token></Styles.Token>
      </Styles.SwapContents>
      <Styles.Price />
    </Styles.Wrapper>
  );
}

const ArrowDownSVGComponent = styled(ArrowDownSVG)`
  width: 20px;
  path {
    stroke-width: 2.5px;
  }
`;

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundModule};
    color: ${({ theme }) => theme.textSecondary};

    border-radius: 12px;
    height: 96px;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid ${({ theme }) => theme.backgroundFloating};
    }
  `,

  SwapContents: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SwapInput: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    > input {
      all: unset;
      font-weight: 300;
      height: 44px;
      font-size: 36px;
      width: 100%;
      color: ${({ theme }) => theme.textPrimary};
      &::placeholder {
        color: ${({ theme }) => theme.textTertiary};
      }
    }
    .selected-token {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({ theme }) => theme.textPrimary};
      border-radius: 16px;
      font-size: 24px;
      font-weight: 400;
      padding: 4px 8px 4px 4px;
      height: 32px;
      gap: 8px;
      cursor: pointer;
      -webkit-box-pack: justify;
      background-color: ${({ theme }) => theme.SwapButtonState};

      &:hover {
        background-color: ${({ theme }) => theme.hoverState};
      }
    }
  `,
  Token: styled.div``,
  Price: styled.div`
    width: 100%;
    padding-top: 8px;
    min-height: 20px;
    line-height: 24px;
  `,
};

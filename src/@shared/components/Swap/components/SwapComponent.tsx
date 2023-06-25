import styled from "@emotion/styled";
import SwapListModal from "@shared/components/Modal/SwapListModal";
import { ArrowDownSVG } from "@shared/utils/CommonSVG";
import { bigNumber, numberFormatComma } from "@shared/utils/number";
import { ChangeEvent, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedTokenAtom } from "recoils/token";

export type SwapModalListType = "NONE" | "FROM_LIST" | "TO_LIST";
interface Props {
  type: Omit<SwapModalListType, "NONE">;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SwapComponent({ onChangeValue, type }: Props) {
  const [isOnSwapTokenListModal, setIsOnSwapTokenListModal] =
    useState<SwapModalListType>("NONE");
  const selectedTokenObject = useRecoilValue(selectedTokenAtom);

  const selectedToken = useMemo(() => {
    return selectedTokenObject[type === "FROM_LIST" ? "from" : "to"];
    // eslint-disable-next-line
  }, [
    selectedTokenObject.from.tokenName,
    selectedTokenObject.to.tokenName,
    selectedTokenObject.to.value,
    selectedTokenObject.from.value,
  ]);

  const onClickOpenModal = () => {
    if (type === "FROM_LIST") {
      setIsOnSwapTokenListModal("FROM_LIST");
    } else {
      setIsOnSwapTokenListModal("TO_LIST");
    }
  };
  const onClickCloseModal = () => {
    setIsOnSwapTokenListModal("NONE");
  };

  return (
    <Styles.Wrapper>
      <Styles.SwapContents>
        <Styles.SwapInput>
          <input
            placeholder="0"
            value={selectedToken?.value || ""}
            onChange={onChangeValue}
          ></input>
          <div
            className={`selected-token ${
              selectedToken?.tokenName ? "" : "empty"
            }`}
            onClick={onClickOpenModal}
          >
            {selectedToken?.tokenImgUrl && (
              <img src={selectedToken.tokenImgUrl} alt="token" />
            )}
            <span>{selectedToken?.tokenName || "토큰 선택"}</span>
            <ArrowDownSVGComponent />
          </div>
        </Styles.SwapInput>
      </Styles.SwapContents>
      <Styles.Price>
        {selectedToken?.value && selectedToken?.tokenPerUsd && (
          <>
            $
            {numberFormatComma(
              bigNumber(selectedToken.value.replaceAll(",", ""))
                .multipliedBy(selectedToken.tokenPerUsd)
                .toString(),
              18
            )}
          </>
        )}
      </Styles.Price>

      <SwapListModal
        onCloseModal={onClickCloseModal}
        modalType={isOnSwapTokenListModal}
      />
    </Styles.Wrapper>
  );
}

const ArrowDownSVGComponent = styled(ArrowDownSVG)`
  width: 20px;
  path {
    stroke: ${({ theme }) => theme.textPrimary};
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
      text-overflow: ellipsis;
      overflow: hidden;

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
      font-size: 20px;
      font-weight: 500;
      padding: 4px 8px 4px 4px;
      height: 32px;
      gap: 8px;

      cursor: pointer;
      background-color: ${({ theme }) => theme.SwapButtonState};
      transition: all 125ms ease-in-out;
      > span {
        width: auto;
        white-space: nowrap;
        align-items: center;
        text-align: center;
      }
      > img {
        width: 24px;
      }

      &.empty {
        color: white;

        background-color: ${({ theme }) => theme.accentAction};
        &:hover {
          background-color: ${({ theme }) => theme.hoverToggleState};
        }
        > span {
          margin-left: 8px;
        }
        > svg {
          path {
            stroke: white;
          }
        }
      }
      &:hover {
        background-color: ${({ theme }) => theme.hoverState};
      }
    }
  `,
  Price: styled.div`
    width: 100%;
    min-height: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 300;
    font-size: 14px;
  `,
};

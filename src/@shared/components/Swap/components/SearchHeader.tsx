import styled from "@emotion/styled";
import { SearchSVG } from "@shared/utils/CommonSVG";
import { ABLE_TO_USE_TOKENS, TOKENS } from "@shared/wagmi/constants/variable";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import { useRecoilState } from "recoil";
import { selectedTokenAtom } from "recoils/token";
import { SwapModalListType } from "./SwapComponent";
import { calculateTokenAmount } from "../SwapBody";

interface Props {
  onCloseModal: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: SwapModalListType;
}

export default function SearchHeader({
  onCloseModal,
  value,
  onChange,
  type,
}: Props) {
  const [isInputToggled, setIsInputToggled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [selectedToken, setSelectedToken] = useRecoilState(selectedTokenAtom);

  const onClickToken = (name: TOKENS) => {
    const selected = ABLE_TO_USE_TOKENS.filter(
      (token) => token.tokenName === name
    )[0];
    if (type === "FROM_LIST") {
      if (!selectedToken.from.tokenName) {
        setSelectedToken({
          from: {
            ...selected,
            value: calculateTokenAmount({
              amount: selectedToken.to.value,
              toUsdPerPrice: selected.tokenPerUsd,
              fromUsdPerPrice: selectedToken.to.tokenPerUsd,
            }),
          },
          to: { ...selectedToken.to },
        });
        onCloseModal();
        return;
      }

      if (selected.tokenName === selectedToken.to.tokenName) {
        setSelectedToken({
          from: { ...selectedToken.to },
          to: { ...selectedToken.from },
        });
        onCloseModal();
        return;
      }
      setSelectedToken({
        from: {
          ...selected,
          value: calculateTokenAmount({
            amount: selectedToken.to.value,
            toUsdPerPrice: selected.tokenPerUsd,
            fromUsdPerPrice: selectedToken.to.tokenPerUsd,
          }),
        },
        to: { ...selectedToken.to },
      });
    }
    if (type === "TO_LIST") {
      if (!selectedToken.to.tokenName) {
        setSelectedToken({
          to: {
            ...selected,
            value: calculateTokenAmount({
              amount: selectedToken.from.value,
              toUsdPerPrice: selected.tokenPerUsd,
              fromUsdPerPrice: selectedToken.from.tokenPerUsd,
            }),
          },
          from: { ...selectedToken.from },
        });
        onCloseModal();
        return;
      }

      if (selected.tokenName === selectedToken.from.tokenName) {
        setSelectedToken({
          from: { ...selectedToken.to },
          to: { ...selectedToken.from },
        });
        onCloseModal();
        return;
      }
      setSelectedToken({
        to: {
          ...selected,
          value: calculateTokenAmount({
            amount: selectedToken.from.value,
            toUsdPerPrice: selected.tokenPerUsd,
            fromUsdPerPrice: selectedToken.from.tokenPerUsd,
          }),
        },
        from: { ...selectedToken.from },
      });
    }

    onCloseModal();
  };

  const onClickInput = () => {
    inputRef?.current?.focus();
  };

  const onClickOutside = (e: MouseEvent) => {
    if (inputContainerRef?.current?.contains(e.target as HTMLElement))
      setIsInputToggled(true);
    else setIsInputToggled(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("click", onClickOutside);
    };
  }, []);
  return (
    <Styles.Wrapper>
      <Styles.Title>
        <span>토큰 선택</span>
        <XSVGComponent onClick={onCloseModal} />
      </Styles.Title>
      <Styles.SearchBar
        onClick={onClickInput}
        className={`${isInputToggled ? "toggle" : ""}`}
        ref={inputContainerRef}
      >
        <SearchSVGComponent />
        <input
          placeholder="이름 검색 혹은 주소 붙여넣기"
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
      </Styles.SearchBar>
      <Styles.DefaultList>
        {ABLE_TO_USE_TOKENS.map((token, index) => {
          return (
            <div
              className={`token-item ${
                type !== "NONE" &&
                selectedToken[type === "FROM_LIST" ? "from" : "to"]
                  .tokenName === token.tokenName
                  ? "selected"
                  : ""
              }`}
              key={index}
              onClick={() => onClickToken(token.tokenName)}
            >
              <img src={token.tokenImgUrl} alt="token" />
              <span>{token.tokenName}</span>
            </div>
          );
        })}
      </Styles.DefaultList>
    </Styles.Wrapper>
  );
}

const XSVGComponent = styled(X)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const SearchSVGComponent = styled(SearchSVG)`
  width: 24px;
  height: 24px;
  width: 16px;
  circle {
    stroke: ${({ theme }) => theme.textSecondary};
    stroke-width: 2px;
  }
  path {
    stroke: ${({ theme }) => theme.textSecondary};
  }
`;

const Styles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 16px;
  `,
  Title: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  SearchBar: styled.div`
    width: 100%;
    height: 40px;
    background-color: ${({ theme }) => theme.hoverDefault};
    border: 1px solid ${({ theme }) => theme.backgroundOutline};
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 12px;
    cursor: text;

    &.toggle {
      background-color: ${({ theme }) => theme.backgroundSurface};
    }

    > input {
      all: unset;
      width: 100%;
      font-weight: 300;
      &::placeholder {
        color: ${({ theme }) => theme.textTertiary};
        font-weight: 300;
      }
    }
  `,
  DefaultList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    width: 100%;
    .token-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px 6px 6px;
      margin: 4px;

      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.backgroundOutline};
      > img {
        width: 24px;
      }

      &.selected {
        color: ${({ theme }) => theme.accentActive};
        border: 1px solid ${({ theme }) => theme.accentActive};
        background-color: ${({ theme }) => theme.accentActiveSoft};
      }

      &:hover {
        background-color: ${({ theme }) => theme.hoverDefault};
      }
      cursor: pointer;
    }
  `,
};

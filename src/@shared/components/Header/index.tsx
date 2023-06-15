import styled from "@emotion/styled";
import { mediaqQueryMax } from "@shared/styles/helpers";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoSVG, MoreSVG, SearchSVG } from "../../utils/CommonSVG";
import CurrentNetwork from "./CurrentNetwork";
import LoginButton from "./LoginButton";
import MoreListModal from "../Modal/MoreListModal";
import SearchResultModal from "../Modal/SearchResultModal";
import WalletConnectComponent from "../Aside/WalletConnectComponent";
import { useRecoilState } from "recoil";
import { onToggleConnectModalAtom } from "recoils/modal";

const NavItems = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const moreListRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (e: MouseEvent) => {
    if (!moreListRef.current?.contains(e.target as Node)) setIsToggleOn(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);
  return (
    <>
      <NavLink to={"/"} className="logo" onClick={() => {}}>
        <StyledLogo />
      </NavLink>
      <MenuItem
        className={`${
          window.location.pathname.includes("swap") ? "activate" : ""
        }`}
      >
        스왑
      </MenuItem>
      <MenuItem
        className={`${
          window.location.pathname.includes("token") ? "activate" : ""
        }`}
      >
        토큰
      </MenuItem>
      <MenuItem
        className={`${
          window.location.pathname.includes("nft") ? "activate" : ""
        }`}
      >
        NFTs
      </MenuItem>
      <MenuItem
        className={`${
          window.location.pathname.includes("pool") ? "activate" : ""
        } pool`}
      >
        Pools
      </MenuItem>
      <div className="position" ref={moreListRef}>
        <MenuItem onClick={() => setIsToggleOn((prev) => !prev)}>
          <StyledMore className={`${isToggleOn ? "toggle" : ""}`} />
        </MenuItem>
        {isToggleOn && <MoreListModal componentRef={moreListRef} />}
      </div>
    </>
  );
};

const SearchBar = ({
  onChange,
  onHover,
  outHover,
  inputValue,
  searchBarRef,
  searchInputRef,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onHover: () => void;
  outHover: () => void;
  inputValue: string;
  searchBarRef: RefObject<HTMLDivElement>;
  searchInputRef: RefObject<HTMLInputElement>;
}) => {
  return (
    <InputComponent
      onMouseOver={onHover}
      onMouseOut={outHover}
      ref={searchBarRef}
    >
      <div className="left-input">
        <SearchSVG />
        <input
          placeholder="검색 토큰 및 NFT 컬렉션"
          value={inputValue}
          onChange={onChange}
          ref={searchInputRef}
        />
      </div>
      <div className="search-tab">{"/"}</div>
    </InputComponent>
  );
};

export default function Header() {
  const [scrollPostion, setScrollPosition] = useState("INIT");
  const [inputValue, setInputValue] = useState("");
  const [isInputHover, setIsInputHover] = useState(false);
  const [onToggleSearchBar, setOnToggleSearchBar] = useState(false);
  const [onToggleConnectModal, setOnToggleConnectModal] = useRecoilState(
    onToggleConnectModalAtom
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("/")) return;
    setInputValue(e.target.value);
  };

  const onInputhover = () => {
    setIsInputHover(true);
  };
  const outInputhover = () => {
    setIsInputHover(false);
  };

  const onPressKey = (e: KeyboardEvent) => {
    if (e.key === "/") {
      searchInputRef?.current?.focus();
      setOnToggleSearchBar(true);
    }
    if (e.key === "Escape") {
      setOnToggleSearchBar(false);
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      setScrollPosition(window.scrollY > 0 ? "NOT_TOP" : "TOP");
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  useEffect(() => {
    const onClickOutsideSearchBar = (e: MouseEvent) => {
      if (!searchRef?.current?.contains(e.target as HTMLElement))
        setOnToggleSearchBar(false);

      if (searchRef?.current?.contains(e.target as HTMLElement)) {
        searchInputRef?.current?.focus();
      }
    };
    window.addEventListener("click", onClickOutsideSearchBar);
    return () => {
      window.removeEventListener("click", onClickOutsideSearchBar);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onPressKey);

    return () => {
      window.removeEventListener("keydown", onPressKey);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Styles.Wrapper
      className={
        scrollPostion === "TOP" || scrollPostion === "INIT"
          ? "headerTopPositoin"
          : ""
      }
    >
      <Styles.Navigation>
        <NavItems />
      </Styles.Navigation>
      <Styles.Search onClick={() => setOnToggleSearchBar(true)} ref={searchRef}>
        <SearchBar
          onChange={onChange}
          inputValue={inputValue}
          onHover={onInputhover}
          outHover={outInputhover}
          searchBarRef={searchBarRef}
          searchInputRef={searchInputRef}
        />
        <div className={`gradation ${onToggleSearchBar ? "toggled" : ""}`}>
          <div
            className={`gradation-area  ${isInputHover ? "inputHover" : ""} `}
          />
        </div>
      </Styles.Search>
      {onToggleSearchBar && (
        <SearchResultModal
          componentRef={searchBarRef}
          onCloseModal={() => setOnToggleSearchBar(false)}
        />
      )}
      <Styles.UserStatus>
        <CurrentNetwork />
        <LoginButton onClick={() => setOnToggleConnectModal((prev) => !prev)} />
        <WalletConnectComponent
          onCloseModal={() => setOnToggleConnectModal((prev) => !prev)}
          isToggled={onToggleConnectModal}
        />
      </Styles.UserStatus>
    </Styles.Wrapper>
  );
}

const StyledLogo = styled(LogoSVG)`
  fill: ${({ theme }) => theme.textPrimary};
  width: 30px;
  height: 30px;
`;

const StyledMore = styled(MoreSVG)`
  transform: rotate(90deg);
  width: 16px;
  height: 16px;

  > path {
    fill: ${({ theme }) => theme.textSecondary};
    transition: all 125ms ease-out;
  }

  &.toggle {
    > path {
      fill: ${({ theme }) => theme.textPrimary};
    }
  }
`;

const MenuItem = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 12px;
  line-height: 24px;
  cursor: pointer;
  .position {
    position: relative;
  }
  &:hover {
    background-color: ${({ theme }) => theme.stateOverlayHover};
  }

  ${mediaqQueryMax("xl")} {
    &.pool {
      display: none;
    }
  }

  &.activate {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const InputComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 12;

  .left-input {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    > input {
      all: unset;
      display: block;
      font-weight: 300;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;

      &::placeholder {
        color: ${({ theme }) => theme.textSecondary};
      }
    }
    > svg {
      width: 16px;
      circle {
        stroke: ${({ theme }) => theme.textSecondary};
        stroke-width: 2px;
      }
      path {
        stroke: ${({ theme }) => theme.textSecondary};
      }
    }
  }
  .search-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(173, 188, 255, 0.24);
    color: rgb(152, 161, 192);
    font-size: 12px;
    height: 20px;
    width: 20px;
    border-radius: 4px;
  }

  padding: 0 16px;
  width: 640px;
  max-width: 640px;
  ${mediaqQueryMax("xxxl")} {
    width: 520px;
    max-width: 520px;
  }
  ${mediaqQueryMax("xxl")} {
    width: 480px;
    max-width: 480px;
  }
  ${mediaqQueryMax("xl")} {
    width: 360px;
    max-width: 360px;
  }
  ${mediaqQueryMax("navSearchInputVisible")} {
    display: none;
  }
`;

const Styles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 12px;
    height: ${({ theme }) => theme.height.header};

    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(210, 217, 238);
    &.headerTopPositoin {
      background-color: transparent;
      border-bottom: transparent;
    }
  `,
  Navigation: styled.div`
    display: flex;
    flex: 1 1;
    align-items: center;
    margin-left: 12px;
    font-size: 16px;
    color: ${({ theme }) => theme.textSecondary};

    .logo {
      > img {
        width: 28px;
      }
      margin-right: 14px;
      cursor: pointer;
    }
    .more {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 24px;
      > img {
        transform: rotate(90deg);
      }
    }

    .position {
      position: relative;
    }
  `,

  Search: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1;
    width: auto;
    position: relative;
    .gradation {
      z-index: 10;
      width: 640px;
      max-width: 640px;
      height: 46px;
      backdrop-filter: blur(60px);
      background-color: ${({ theme }) => theme.searchBackground};
      border-radius: 12px;
      position: absolute;
      z-index: 11;
      &.toggled {
        background: ${({ theme }) => theme.backgroundSurface};
        box-shadow: 0 4px 12px 0 #00000026;
        transition: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        .gradation-area {
          border: 1px solid ${({ theme }) => theme.backgroundSurface};
          transition: none;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          &.inputHover,
          &:hover {
            border: 1px solid ${({ theme }) => theme.backgroundSurface};
          }
        }
      }
      .gradation-area {
        width: 100%;
        height: 100%;

        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.backgroundInteractive};
        background: linear-gradient(45deg, #4d5cdb, #ba30c6) border-box;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        transition: border 125ms linear;

        &.inputHover,
        &:hover {
          border: 1px solid transparent;
        }
      }
      ${mediaqQueryMax("xxxl")} {
        width: 520px;
        max-width: 520px;
      }
      ${mediaqQueryMax("xxl")} {
        width: 480px;
        max-width: 480px;
      }
      ${mediaqQueryMax("xl")} {
        width: 360px;
        max-width: 360px;
      }
      ${mediaqQueryMax("navSearchInputVisible")} {
        display: none;
      }
    }
  `,
  UserStatus: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 1;
    width: 120px;
    height: 46px;
    gap: 12px;
  `,
};

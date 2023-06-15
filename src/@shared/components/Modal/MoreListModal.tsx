import styled from "@emotion/styled";
import { RefObject } from "react";
import { Portal } from "../ModalLayout/Portal";
import { AppleLogoSVG } from "@shared/utils/CommonSVG";
import {
  ArrowRightIcon,
  BarChartIcon,
  GovernanceIcon,
  PoolIcon,
} from "@shared/utils/UniswapSVG";
import { useTheme } from "@emotion/react";
import { mediaqQueryMax } from "@shared/styles/helpers";

interface Props {
  componentRef: RefObject<HTMLDivElement>;
}

export default function MoreListModal({ componentRef }: Props) {
  const theme = useTheme();
  return (
    <Portal componentRef={componentRef}>
      <Styles.ModalWrapper>
        <Styles.ListRow className="pool">
          <PoolIcon width={24} height={24} color={theme.textPrimary} />
          <span>Pool</span>
        </Styles.ListRow>
        <Styles.ListRow>
          <StyledAppleLogo />
          <span>Download Uniswap Wallet</span>
        </Styles.ListRow>
        <Styles.ListRow>
          <GovernanceIcon width={24} height={24} color={theme.textPrimary} />
          <span>Vote in governance</span>
        </Styles.ListRow>
        <Styles.ListRow>
          <BarChartIcon width={24} height={24} color={theme.textPrimary} />
          <span>View more analytics</span>
        </Styles.ListRow>
        <Styles.RowBorderLine />
        <Styles.SubListRow>
          <span>Help center</span>
          <ArrowRightIcon />
        </Styles.SubListRow>
        <Styles.SubListRow>
          <span>Documentation</span>
          <ArrowRightIcon />
        </Styles.SubListRow>
        <Styles.SubListRow>
          <span>Feedback</span>
          <ArrowRightIcon />
        </Styles.SubListRow>
        <Styles.SubListRow>
          <span>Legal & Privacy</span>
          <ArrowRightIcon />
        </Styles.SubListRow>
      </Styles.ModalWrapper>
    </Portal>
  );
}

const StyledAppleLogo = styled(AppleLogoSVG)`
  fill: ${({ theme }) => theme.textPrimary};
  padding: 2px;
  width: 24px;
  height: 24px;
`;

const Styles = {
  ModalWrapper: styled.div`
    position: absolute;
    top: 58px;
    right: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    box-shadow: 0 4px 12px 0 #00000026;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.backgroundOutline};
    background-color: ${({ theme }) => theme.backgroundSurface};
    border-radius: 12px;
    width: max-content;
    padding: 8px;
    display: flex;
    flex-direction: column;
  `,

  ListRow: styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    color: ${({ theme }) => theme.textPrimary};
    height: 44px;
    gap: 8px;
    border-radius: 12px;
    transition: background 125ms ease-in-out;
    padding: 0 8px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.hoverDefault};
    }

    &.pool {
      ${mediaqQueryMax("xl")} {
        display: none;
      }
    }
  `,
  SubListRow: styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: 300;
    color: ${({ theme }) => theme.textSecondary};
    height: 36px;
    gap: 2px;
    border-radius: 12px;
    transition: background 125ms ease-in-out;
    padding: 0 8px;

    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.hoverDefault};
    }

    > svg {
      transform: rotate(-45deg);
    }
  `,
  RowBorderLine: styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.backgroundOutline};
    margin: 12px 0;
  `,
};

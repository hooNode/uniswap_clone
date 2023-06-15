import styled from "@emotion/styled";

interface Props {
  onToggle: () => void;
  isToggled: boolean;
}

export default function Toggle({ onToggle, isToggled }: Props) {
  return (
    <Styles.Wrapper
      onClick={onToggle}
      className={`${isToggled ? "toggled" : ""}`}
    >
      <Styles.CircleButton
        className={`${isToggled ? "toggled" : ""}`}
      ></Styles.CircleButton>
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.button`
    all: unset;
    position: relative;
    width: 65px;
    height: 34px;
    border-radius: 9999px;
    border: 1px solid ${({ theme }) => theme.backgroundOutline};
    display: flex;
    align-items: center;
    padding: 0 4px;
    cursor: pointer;

    &.toggled {
      background-color: ${({ theme }) => theme.accentActionSoft};
      border: 1px solid transparent;
    }
  `,
  CircleButton: styled.div`
    all: unset;
    position: absolute;
    right: calc(100% - 28px);
    border-radius: 9999px;
    border-radius: 50%;
    height: 24px;
    width: 24px;

    background-color: ${({ theme }) => theme.textTertiary};
    &:hover {
      background-color: ${({ theme }) => theme.textSecondary};
    }

    transition: right 125ms ease-in-out;
    &.toggled {
      right: calc(4px);
      background-color: ${({ theme }) => theme.accentAction};
      &:hover {
        background-color: ${({ theme }) => theme.hoverToggleState};
      }
    }
  `,
};

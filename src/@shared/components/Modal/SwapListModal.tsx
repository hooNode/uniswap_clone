import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Portal } from "../ModalLayout/Portal";
import SearchComponent from "../Swap/components/SearchComponent";
import { SwapModalListType } from "../Swap/components/SwapComponent";

interface Props {
  onCloseModal: () => void;
  modalType: SwapModalListType;
}

export default function SwapListModal({ onCloseModal, modalType }: Props) {
  const [isOpend, setIsOpend] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (modalType === "NONE") {
      setIsVisible(false);
      timeout = setTimeout(() => {
        setIsOpend(false);
      }, 125);
    } else {
      setIsVisible(true);
      setIsOpend(true);
    }

    return () => clearTimeout(timeout);
  }, [modalType]);

  if (modalType === "NONE" && !isOpend) return null;

  return (
    <Portal>
      <Styles.Wrapper className={`${isVisible ? "visible" : ""} `}>
        <Styles.ModalContainer>
          <SearchComponent onCloseModal={onCloseModal} modalType={modalType} />
        </Styles.ModalContainer>
        <Mask
          onClick={onCloseModal}
          className={`${isVisible ? "visible" : ""}`}
        />
      </Styles.Wrapper>
    </Portal>
  );
}

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: none;
  transition: background-color 125ms linear 0s;

  &.visible {
    background-color: rgba(13, 17, 28, 0.6);
  }
`;

const Styles = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${({ theme }) => theme.zIndex.modal + 2};
    opacity: 0;
    transition: opacity 125ms linear 0s;
    &.visible {
      opacity: 1;
    }
  `,
  ModalContainer: styled.div`
    background-color: ${({ theme }) => theme.backgroundSurface};
    border-radius: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 420px;
  `,
};

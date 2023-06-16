import React, { ChangeEvent, useState } from "react";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";
import { SwapModalListType } from "./SwapComponent";

interface Props {
  onCloseModal: () => void;
  modalType: SwapModalListType;
}

export default function SearchComponent({ onCloseModal, modalType }: Props) {
  const [tokenInputValue, setTokenInputValue] = useState("");
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenInputValue(e.target.value);
  };

  return (
    <>
      <SearchHeader
        onCloseModal={onCloseModal}
        value={tokenInputValue}
        onChange={onChangeInputValue}
        type={modalType}
      />
      <SearchList keyword={tokenInputValue} type={modalType} />
    </>
  );
}

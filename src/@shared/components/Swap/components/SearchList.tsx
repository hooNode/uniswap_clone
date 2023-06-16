import React, { useEffect } from "react";
import { SwapModalListType } from "./SwapComponent";

interface Props {
  keyword: string;
  type: SwapModalListType;
}

export default function SearchList({ keyword, type }: Props) {
  useEffect(() => {}, [keyword]);
  return <div></div>;
}

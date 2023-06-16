import { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

export const Portal = <T extends HTMLElement>({
  children,
  componentRef,
}: {
  children: ReactNode;
  componentRef?: RefObject<T>;
}) =>
  createPortal(
    children,
    componentRef ? (componentRef.current as T) : document.body
  );

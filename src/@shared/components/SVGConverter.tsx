import styled from "@emotion/styled";
import React from "react";

interface Props {
  className?: string;
  SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: string;
}

/** 
 * @param className [optional] should be toggle, textSecondary

*/
export default function SVGConverter({
  className,
  SVGComponent,
  width,
}: Props) {
  return (
    <SVGContainer className={className} width={width}>
      <SVGComponent />
    </SVGContainer>
  );
}

const SVGContainer = styled.div<{ width?: string }>`
  svg {
    width: ${({ width }) => (width ? width : "20px")};
    path {
      stroke: ${({ theme }) => theme.textPrimary};
    }
  }

  &.toggle {
    transform: rotate(180deg) translateY(3px);
  }

  &.textSecondary {
    svg {
      path {
        stroke: ${({ theme }) => theme.textSecondary};
      }
    }
  }
`;

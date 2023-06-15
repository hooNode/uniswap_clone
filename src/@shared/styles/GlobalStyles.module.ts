import { Theme, css } from "@emotion/react";

export const styles = (theme: Theme) => css`
  html body {
    color: ${theme.textPrimary};
    font-family: "Pretendard", sans-serif;
  }
`;

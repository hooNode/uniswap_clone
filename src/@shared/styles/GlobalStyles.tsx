import { Global } from "@emotion/react";
import { styles } from "./GlobalStyles.module";

export default function GlobalStyles() {
  return (
    <>
      <Global styles={styles} />
    </>
  );
}

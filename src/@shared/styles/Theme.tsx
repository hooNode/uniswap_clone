import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { themeAtom } from "recoils/theme";
import { darkTheme, lightTheme } from "./helpers";

export const DARKMODE_MEDIA_QUERY = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

export default function Theme({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useRecoilState(themeAtom);
  const changeDarkMode = (e: MediaQueryListEvent) => {
    setDarkMode(e.matches);
  };

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "default");
    }

    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      return () =>
        DARKMODE_MEDIA_QUERY.removeEventListener("change", changeDarkMode);
    } else if (localStorage.getItem("theme") === "light") {
      setDarkMode(false);
      return () =>
        DARKMODE_MEDIA_QUERY.removeEventListener("change", changeDarkMode);
    }

    DARKMODE_MEDIA_QUERY.addEventListener("change", changeDarkMode);

    // eslint-disable-next-line
  }, [localStorage.getItem("theme")]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}

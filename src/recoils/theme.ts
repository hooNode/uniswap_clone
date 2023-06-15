import { atom } from "recoil";

const DARKMODE_MEDIA_QUERY = window.matchMedia("(prefers-color-scheme: dark)");

export const themeAtom = atom({
  key: "themeAtom",
  default:
    !localStorage.getItem("theme") ||
    localStorage.getItem("theme") === "default"
      ? DARKMODE_MEDIA_QUERY.matches
      : localStorage.getItem("theme") === "dark",
});

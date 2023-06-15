export const breakPoint: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  navSearchInputVisible: 1100,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
};

/**
 * @param breakPoints sm: 640px, md: 768px, lg: 1024px, xl: 1280px, xxl: 1536px, xxxl: 1920px
 */
export const mediaqQueryMax = (
  breakPoints:
    | "sm"
    | "md"
    | "navSearchInputVisible"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
): string => {
  switch (breakPoints) {
    case "sm":
      return "@media screen and (max-width: 640px)";
    case "md":
      return "@media screen and (max-width: 768px)";
    case "lg":
      return "@media screen and (max-width: 1024px)";
    case "navSearchInputVisible":
      return "@media screen and (max-width: 1100px)";
    case "xl":
      return "@media screen and (max-width: 1280px)";
    case "xxl":
      return "@media screen and (max-width: 1536px)";
    case "xxxl":
      return "@media screen and (max-width: 1920px)";
  }
};

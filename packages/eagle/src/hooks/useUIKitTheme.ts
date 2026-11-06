import type { EagleTheme } from "@src/core/ConfigProvider";
import { useEffect, useLayoutEffect } from "react";

const useThemeEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

/**
 * Apply the application's theme to root CSS tokens. Call once at the host root
 * and pass the same theme to ConfigProvider; Islands should only use the provider.
 * Does not store preferences or restore the previous theme on unmount.
 */
export const useUIKitTheme = (theme: EagleTheme): void => {
  useThemeEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
};

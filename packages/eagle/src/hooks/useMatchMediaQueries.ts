import _ from "lodash";
import { useEffect, useState } from "react";

export enum LayoutMode {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
}
const ResponseArray: LayoutMode[] = [
  LayoutMode.XS,
  LayoutMode.SM,
  LayoutMode.MD,
  LayoutMode.LG,
];
const useMatchMediaQueries: (
  mode?: {
    [key in LayoutMode]: string;
  }
) => LayoutMode = (
  mode = {
    [LayoutMode.XS]: "1279px",
    [LayoutMode.SM]: "1536px",
    [LayoutMode.MD]: "2176px",
    [LayoutMode.LG]: "2304px",
  }
) => {
  const [sizeState, setSizeState] = useState<LayoutMode>(LayoutMode.XS);

  const listenerWindowResize = _.debounce(() => {
    const mediaQueries: Array<{
      mediaQueryList: MediaQueryList;
      mediaQueryMode: LayoutMode;
    }> = [];
    for (const mediaQueryMode of ResponseArray) {
      const responseValue = mode[mediaQueryMode];
      const mediaQueryList = window.matchMedia(`(min-width: ${responseValue})`);
      if (!mediaQueryList.matches) {
        break;
      }
      mediaQueries.push({
        mediaQueryMode,
        mediaQueryList: mediaQueryList,
      });
    }

    if (!mediaQueries.length) {
      if (sizeState !== LayoutMode.XS) {
        setSizeState(LayoutMode.XS);
      }
      return;
    }
    const topMatchMediaQuery = mediaQueries[mediaQueries.length - 1];
    if (topMatchMediaQuery.mediaQueryMode !== sizeState) {
      setSizeState(topMatchMediaQuery.mediaQueryMode);
    }
  });

  useEffect(() => {
    window.addEventListener("resize", listenerWindowResize);
    // Triggered once after rendered
    listenerWindowResize();
    return () => {
      window.removeEventListener("resize", listenerWindowResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return sizeState;
};

export default useMatchMediaQueries;

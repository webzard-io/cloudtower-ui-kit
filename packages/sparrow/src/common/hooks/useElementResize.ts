import _ from "lodash";
import { useEffect } from "react";

const transformToArray = (stringOrArray: unknown | unknown[]) => {
  return stringOrArray instanceof Array ? stringOrArray : [stringOrArray];
};

const onResizeElem = (
  element: HTMLElement | HTMLElement[],
  callback: () => void
) => {
  const els = transformToArray(element);

  // Save the element we are watching
  const data = {
    els,
    offsetWidth: els.map((el) => el.offsetWidth),
    offsetHeight: els.map((el) => el.offsetHeight),
    callback: callback,
  };

  const checkForChanges = () => {
    const nextOffsetWidth = data.els.map((el) => el.offsetWidth);
    const nextOffsetHeight = data.els.map((el) => el.offsetWidth);
    if (
      !_.isEqual(nextOffsetWidth, data.offsetWidth) ||
      _.isEqual(nextOffsetHeight, data.offsetHeight)
    ) {
      data.offsetWidth = nextOffsetWidth;
      data.offsetHeight = nextOffsetHeight;
      data.callback();
    }
  };

  // Listen to the element being checked for width and height changes
  const mutationObserver = new MutationObserver(checkForChanges);

  mutationObserver.observe(document.body, {
    attributes: true,
    subtree: true,
  });

  window.addEventListener("resize", checkForChanges);

  const disconnect = () => {
    window.removeEventListener("resize", checkForChanges);
    mutationObserver.disconnect();
  };

  return disconnect;
};

const useElementResize = (
  klass: string | string[] | React.RefObject<HTMLElement>,
  cb: () => void,
  depend?: unknown[]
) => {
  const klasses = transformToArray(klass);

  useEffect(() => {
    let els: HTMLElement[] = [];
    if (typeof klass === "object" && "current" in klass) {
      els = klass.current ? [klass.current] : [];
    } else {
      klasses.forEach((klass) => {
        const arr = Array.from(
          document.querySelectorAll(klass)
        ) as HTMLElement[];
        if (arr.length > 0) {
          els = [...els, ...arr];
        }
      });
    }

    if (!els.length) return;
    if (typeof ResizeObserver === "function") {
      const resizeObserver = new ResizeObserver(cb);
      els.forEach((el) => {
        resizeObserver.observe(el);
      });

      return () => resizeObserver.disconnect();
    } else {
      return onResizeElem(Array.from(els), cb);
    }
    // klass should be static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, ...(depend || [])]);
};

export default useElementResize;

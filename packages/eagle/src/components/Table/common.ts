import React, { useEffect, useMemo, useRef, useState } from "react";

function canScroll(el: Element, direction = "vertical"): boolean {
  const overflow = window.getComputedStyle(el).getPropertyValue("overflow");

  if (overflow === "hidden") return false;

  if (direction === "vertical") {
    return el.scrollHeight > el.clientHeight;
  } else if (direction === "horizontal") {
    return el.scrollWidth > el.clientWidth;
  }

  return false;
}

export const useTableBodyHasScrollBar = (
  tableBodyEl?: React.MutableRefObject<HTMLDivElement | null>,
  data?: unknown
): boolean => {
  const [hasScrollBar, setHasScrollBar] = useState<boolean>(false);
  const antTableBodyRef = useRef<Element>();
  const observeTableBodyResize = useMemo(
    () =>
      new ResizeObserver((entries) => {
        const target = entries[0].target;
        if (target) {
          setHasScrollBar(canScroll(target));
        }
      }),
    []
  );
  useEffect(() => {
    const tableWrapper = tableBodyEl?.current?.querySelector(".ant-table-body");
    if (tableWrapper) {
      if (antTableBodyRef.current) {
        observeTableBodyResize.unobserve(antTableBodyRef.current);
      }
      antTableBodyRef.current = tableWrapper;
      setHasScrollBar(canScroll(antTableBodyRef.current));
      observeTableBodyResize.observe(antTableBodyRef.current);
    }
    return () => {
      observeTableBodyResize.disconnect();
    };
  }, [tableBodyEl, data, observeTableBodyResize]);
  return hasScrollBar;
};

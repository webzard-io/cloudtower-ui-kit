import { MutableRefObject, useEffect, useState } from "react";

const threshold = new Array(101).fill(1).map((value, index) => index / 100);

export default function useElementIntersectionRatio<
  Current extends HTMLElement,
  Parent extends HTMLElement,
>(
  el: MutableRefObject<Current | null>,
  parent?: MutableRefObject<Parent | null>,
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setEntry(entries[0] || null);
      },
      {
        threshold,
        root: parent?.current || document.body,
        rootMargin: "-32px 0px 0px 0px",
      },
    );

    observer.observe(el.current);

    return () => {
      observer.disconnect();
    };
  }, [el, parent]);

  return entry;
}

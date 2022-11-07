import { useElementResize } from "@cloudtower/sparrow";
import { css } from "@linaria/core";
import cs from "classnames";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

const OverflowWrapper = css`
  display: inline-block;
`;

const HiddenStyle = css`
  visibility: hidden;
  position: absolute;
`;

const Overflow: React.FC<{
  overflow: React.ReactNode;
  offset?: number;
  depend?: string;
}> = (props) => {
  const { children, overflow, offset = 0, depend } = props;
  const wrapperRef = useRef<HTMLElement>(null);

  const [init, setInit] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);

  const handleOverflow = useCallback(() => {
    const elWidth = wrapperRef.current?.offsetWidth || 0;
    const parentWidth = wrapperRef.current?.parentElement?.offsetWidth || 0;
    setInit(false);
    if (!elWidth || !parentWidth) {
      setIsOverflow(false);
      return;
    }
    setIsOverflow(elWidth > parentWidth - offset);
  }, [offset]);

  useElementResize(wrapperRef, handleOverflow, []);

  useLayoutEffect(() => {
    setInit(true);
  }, [depend]);

  useLayoutEffect(() => {
    if (init) {
      handleOverflow();
    }
  }, [handleOverflow, init]);

  const showOverflow = !init && isOverflow;

  return (
    <>
      {
        <span
          className={cs(showOverflow && HiddenStyle, OverflowWrapper)}
          ref={wrapperRef}
        >
          {children}
        </span>
      }
      {showOverflow && <span>{overflow}</span>}
    </>
  );
};

export const ExtraOverflow: React.FC<{
  extraEl: (sliceEnd: number) => React.ReactNode;
  els: React.ReactNode[];
  className?: string;
  deps?: unknown[];
  reverse?: boolean;
}> = (props) => {
  const { els, extraEl, className, deps = [], reverse } = props;

  const wrapperRef = useRef<HTMLElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);
  const [sliceEnd, setSliceEnd] = useState(0);
  const [init, setInit] = useState(true);

  const handleOverflow = useCallback(() => {
    const els = Array.from(wrapperRef.current!.children) as HTMLElement[];
    if (els.length < 2) {
      setInit(false);
      setIsOverflow(false);
      return;
    }
    const parentWidth = wrapperRef.current!.offsetWidth;
    const extraEl = els[els.length - 1];
    const secondLastEl = els[els.length - 2];
    let childRange = 0;
    let endIndex = -1;

    if (reverse) {
      childRange =
        secondLastEl.offsetLeft + secondLastEl.offsetWidth - els[0].offsetLeft;

      endIndex = Array.from(els).findIndex((el) => {
        const range = el.offsetWidth + el.offsetLeft - els[0].offsetLeft;
        return range + extraEl.offsetWidth > parentWidth;
      });
    } else {
      childRange = secondLastEl.offsetLeft + secondLastEl.offsetWidth;

      endIndex = Array.from(els).findIndex((el) => {
        const range = el.offsetWidth + el.offsetLeft;
        return range + extraEl.offsetWidth > parentWidth;
      });
    }
    setInit(false);
    setIsOverflow(childRange > parentWidth);
    if (endIndex !== -1) {
      setSliceEnd(endIndex);
    }
  }, [reverse]);

  useLayoutEffect(() => {
    setInit(true);
  }, [els]);

  useLayoutEffect(() => {
    if (init) {
      handleOverflow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOverflow, init, ...deps]);

  if (init) {
    return (
      <span className={className} ref={wrapperRef}>
        {els}
        <>{extraEl(sliceEnd)}</>
      </span>
    );
  }

  if (isOverflow) {
    return (
      <span className={className} ref={wrapperRef}>
        {els.slice(0, sliceEnd)}
        <>{extraEl(sliceEnd)}</>
      </span>
    );
  }
  return (
    <span className={className} ref={wrapperRef}>
      {els}
    </span>
  );
};

export default Overflow;

import { cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { debounce, isNull } from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { EllipsisContentType } from "./tooltip.type";

type WrapperProps = Pick<EllipsisContentType, "maxHeight">;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .ellipsis-tooltip {
    max-height: ${(props) =>
      props.maxHeight ? `${props.maxHeight}px` : "unset"};
    text-overflow: clip;
    overflow: hidden;
  }
  .tips {
    color: #fff;
    opacity: 0.8;
  }
`;

const EllipsisTooltipContent = ({
  tooltip,
  maxHeight,
  contentWrapperClassName,
  ellipsisTips,
}: EllipsisContentType) => {
  const overFlowWrapperRef = useRef<HTMLDivElement>(null);
  const [showTips, setShowTips] = useState<boolean | null>(null);

  useEffect(() => {
    const wrapperEle = overFlowWrapperRef.current;
    let wrapperObserver: ResizeObserver;
    if (wrapperEle) {
      const handleVisibleTips = debounce(() => {
        setShowTips(wrapperEle.scrollHeight > (maxHeight || Infinity));
      }, 200);
      wrapperObserver = new ResizeObserver(handleVisibleTips);
      wrapperObserver.observe(wrapperEle);
    }
    return () => {
      wrapperObserver?.disconnect();
    };
  }, [maxHeight]);

  return (
    <Wrapper
      className={cx(
        contentWrapperClassName,
        isNull(showTips) && "eagle-ellipsis-content",
      )}
      maxHeight={maxHeight}
    >
      <div className="ellipsis-tooltip" ref={overFlowWrapperRef}>
        {tooltip}
      </div>
      {!!showTips && <span className="tips">{ellipsisTips}</span>}
    </Wrapper>
  );
};

export default EllipsisTooltipContent;

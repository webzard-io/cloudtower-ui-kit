import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import Tooltip from "@src/core/Tooltip";
import type { OverflowTooltipProps } from "@src/coreX/OverflowTooltip/overflowTooltip.type";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

const OverflowText = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SingleLineStyle = css`
  white-space: nowrap;
`;

const MultipleLine = styled.div<{
  lineClamp?: number;
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lineClamp = 2 }) => lineClamp};
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

const TooltipDefaultClass = css`
  .ant-tooltip-arrow {
    display: none;
  }
  .ant-tooltip-inner {
    background: $gray-a80-9;
    border-radius: 4px;
    &:has(.eagle-ellipsis-content) {
      visibility: hidden;
    }
  }
`;

const OverflowTooltip: React.FC<OverflowTooltipProps> = (props) => {
  const {
    content,
    className,
    onClick,
    multiLines,
    overlayClassName,
    ...restProps
  } = props;
  const tooltip: React.ReactNode = props.tooltip || content;
  const [ellipsis, setEllipsis] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const isMultiLine = multiLines && multiLines > 1;

  useEffect(() => {
    const ele = textRef.current;

    let observer: ResizeObserver;
    if (ele) {
      const handleResize = debounce(() => {
        if (isMultiLine) {
          setEllipsis(ele.scrollHeight > ele.offsetHeight);
        } else {
          setEllipsis(ele.scrollWidth > ele.offsetWidth);
        }
      }, 200);
      observer = new ResizeObserver(handleResize);
      observer.observe(ele);
    }
    return () => {
      observer?.disconnect();
    };
  });

  return (
    <Tooltip
      {...restProps}
      {...(!ellipsis && {
        visible: false,
      })}
      title={tooltip}
      overlayClassName={cx(TooltipDefaultClass, overlayClassName)}
    >
      {isMultiLine ? (
        <MultipleLine
          ref={textRef}
          className={cx(OverflowText, className)}
          lineClamp={multiLines}
          onClick={() => {
            onClick && onClick();
          }}
        >
          <span>{content}</span>
        </MultipleLine>
      ) : (
        <div
          ref={textRef}
          className={cx(OverflowText, SingleLineStyle, className)}
          onClick={() => {
            onClick && onClick();
          }}
        >
          <span>{content}</span>
        </div>
      )}
    </Tooltip>
  );
};

export default OverflowTooltip;

export * from "./overflowTooltip.type";

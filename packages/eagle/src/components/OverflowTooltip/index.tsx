import { css, cx } from "@linaria/core";
import React, { useEffect, useRef, useState } from "react";

import { OverflowTooltipProps } from "../../spec";
import Tooltip from "../Tooltip";

const OverflowText = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoWrap = css`
  white-space: nowrap;
`;

const OverflowTooltip: React.FC<OverflowTooltipProps> = (props) => {
  const { content, className, onClick, isMultiLine } = props;
  const tooltip: React.ReactNode = props.tooltip || content;
  const [ellipsis, setEllipsis] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const parentWidthRef = useRef(0);

  useEffect(() => {
    const ele = textRef.current;
    const parentElement = ele?.parentElement;
    if (!ellipsis && ele) widthRef.current = ele.scrollWidth;

    let observer: ResizeObserver;
    if (ele && parentElement) {
      observer = new ResizeObserver((entries) => {
        if (entries.length === 1) {
          const parentWidth = entries[0].contentRect.width >> 0;
          if (parentWidth !== parentWidthRef.current) {
            setEllipsis(parentWidth <= widthRef.current);
            parentWidthRef.current = parentWidth;
          }
        }
      });
      observer.observe(parentElement);
    }
    return () => {
      observer.disconnect();
    };
  });

  return (
    <Tooltip
      {...(!ellipsis && {
        visible: false,
      })}
      title={tooltip}
    >
      <div
        ref={textRef}
        className={cx(OverflowText, !isMultiLine && NoWrap, className)}
        onClick={() => {
          onClick && onClick();
        }}
      >
        <span>{content}</span>
      </div>
    </Tooltip>
  );
};

export default OverflowTooltip;

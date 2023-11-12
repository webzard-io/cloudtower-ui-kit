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

  useEffect(() => {
    const ele = textRef.current;

    let observer: ResizeObserver;
    if (ele) {
      observer = new ResizeObserver(() => {
        if (isMultiLine) {
          setEllipsis(ele.scrollHeight > ele.offsetHeight);
        } else {
          setEllipsis(ele.scrollWidth > ele.offsetWidth);
        }
      });
      observer.observe(ele);
    }
    return () => {
      observer?.disconnect();
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

import { useUIKit } from "@cloudtower/eagle";
import { css, cx } from "@linaria/core";
import React, { useState } from "react";

const OverflowText = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoWrap = css`
  white-space: nowrap;
`;

const OverflowTooltip: React.FC<{
  content: React.ReactNode;
  tooltip?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isMultiLine?: boolean;
}> = (props) => {
  const { content, className, onClick, isMultiLine } = props;
  const tooltip: React.ReactNode = props.tooltip || content;
  const [isEllipsis, setIsEllipsis] = useState(false);
  const UIKit = useUIKit();

  const renderDivEl = (node?: HTMLDivElement | null) => {
    if (!node) return;
    if (isMultiLine) {
      setIsEllipsis(node?.scrollHeight > node?.offsetHeight);
    } else {
      setIsEllipsis(node?.scrollWidth > node?.offsetWidth);
    }
  };

  if (isEllipsis) {
    return (
      <UIKit.tooltip title={tooltip}>
        <div
          ref={renderDivEl}
          className={cx(OverflowText, !isMultiLine && NoWrap, className)}
          onClick={() => {
            onClick && onClick();
          }}
        >
          <span>{content}</span>
        </div>
      </UIKit.tooltip>
    );
  }
  return (
    <div
      ref={renderDivEl}
      className={cx(OverflowText, !isMultiLine && NoWrap, className)}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {content}
    </div>
  );
};

export default OverflowTooltip;

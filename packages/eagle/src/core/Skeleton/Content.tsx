import { css } from "@linaria/core";
import { Animation, Keyframes } from "@src/styles/token/animation";
import { Color } from "@src/styles/token/color";
import cx from "classnames";
import React from "react";

const SkeletonContentStyle = css`
  &.skeleton-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 2px;
    background: ${Color.fill.neutral["trans-2"]};
    overflow: hidden;

    & > .skeleton-shimmer {
      width: 200%;
      height: 200%;
      transform: rotate(15deg);
      position: absolute;
      top: -50%;
      flex-shrink: 0;
      opacity: 0.8;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 15%,
        ${Color.white["white-a60"]} 50%,
        rgba(255, 255, 255, 0) 85%
      );

      animation: ${Animation.shimmer};
    }

    ${Keyframes.shimmer}
  }
`;

export type SkeletonContentProps = {
  width?: string;
  height?: string;
  className?: string;
};

const SkeletonContent: React.FC<SkeletonContentProps> = (props) => {
  const { width = "100%", height = "100%", className } = props;

  return (
    <div
      className={cx("skeleton-box", SkeletonContentStyle, className)}
      style={{
        width,
        height,
      }}
    >
      <div className="skeleton-shimmer" />
    </div>
  );
};
export default SkeletonContent;

import { css } from "@linaria/core";
import cs from "classnames";
import React, { useLayoutEffect, useRef } from "react";

import { ICircleProgressProps } from "./stepProgress.type";

const CircleProgressStyle = css`
  --color: white;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color);

  .circle-inner {
    position: relative;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .circle-content {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
    background: linear-gradient(to right, var(--color) 50%, white 50%);
    transform: rotate(180deg);
  }

  .circle-child {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    margin-left: 50%;
    transform-origin: left;
    background: white;
    transform: rotate(0deg);
  }
`;

export const CircleProgress: React.FC<ICircleProgressProps> = (props) => {
  const { percent, color = "#0080ff", className } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    wrapperRef.current?.style.setProperty("--color", color);
  }, [color]);

  useLayoutEffect(() => {
    let deg = 0;
    const childStyle = childRef.current!.style;

    if (percent <= 0.5) {
      deg = 180 * (percent / 0.5);
      childStyle.background = "white";
    } else {
      deg = 180 * ((percent - 0.5) / 0.5);
      childStyle.background = color;
    }
    childStyle.transform = `rotate(${deg}deg)`;
  }, [percent, color]);

  return (
    <div className={cs(CircleProgressStyle, className)} ref={wrapperRef}>
      <div className="circle-inner">
        <div className="circle-content" />
        <div className="circle-child" ref={childRef} />
      </div>
    </div>
  );
};

export * from "./stepProgress.type";

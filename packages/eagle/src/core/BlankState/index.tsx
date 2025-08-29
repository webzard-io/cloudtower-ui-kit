import { cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";
import React from "react";

import { Button } from "..";
import { BlankStateWrapper } from "./style";
import { IBlankStateProps, SizeType } from "./type";

const SIZE_FONT_MAP: Record<
  SizeType,
  {
    title: string;
    desc?: string;
  }
> = {
  large: {
    title: Typo.Display.d2_bold_title,
    desc: Typo.Label.l2_regular,
  },
  medium: {
    title: Typo.Display.d3_bold_title,
    desc: Typo.Label.l3_regular,
  },
  small: {
    title: Typo.Heading.h2_bold_title,
    desc: Typo.Label.l4_regular,
  },
  area: {
    title: Typo.Heading.h2_bold_title,
    desc: Typo.Label.l4_regular,
  },
  xSmall: {
    title: Typo.Heading.h2_regular_title,
  },
};

const BlankState = (props: IBlankStateProps) => {
  const {
    className,
    style,
    width,
    height,
    title,
    description,
    action,
    backgroundColor,
    size = "medium",
  } = props;
  const fontStyle = SIZE_FONT_MAP[size];
  const buttonSize = size === "large" || size === "medium" ? "middle" : "small";

  return (
    <div
      className={cx(className, BlankStateWrapper, size, backgroundColor)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...(style || {}),
      }}
    >
      <div className={cx("title", fontStyle.title)}>{title}</div>
      {size !== "xSmall" && description ? (
        <div className={cx("desc", fontStyle.desc)}>{description}</div>
      ) : null}
      {action ? (
        <Button
          type="ordinary"
          size={buttonSize}
          className={cx("action-button", buttonSize)}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ) : null}
    </div>
  );
};

export default BlankState;

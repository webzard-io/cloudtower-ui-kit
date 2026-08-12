import { Loading8GradientBlueIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { Color } from "@src/styles/token/color";
import cs from "classnames";
import React from "react";

import { LegendColor, LegendComponentType, LegendShapes } from "./legend.type";

export const LegendPresetColors: LegendColor[] = [
  "blue",
  "red",
  "yellow",
  "green",
  "gray",
  "purple",
];

const LegendStyle = css`
  $prefix: ui-kit-status-legend;
  margin: 0;
  border-radius: 20px;
  padding: 2px 10px;
  height: 22px;
  display: flex;
  align-items: center;

  &.ui-kit-status-legend.on-tint {
    color: $text-neutral-ontint;
  }
  &.tag-hover {
    cursor: pointer;
  }

  &.#{$prefix} {
    color: $text-neutral-primary;
    .#{$prefix}-icon {
      margin-right: 6px;
    }
    .#{$prefix}-number {
      margin-left: 8px;
      color: ${Color.text.neutral.tertiary};
      &.#{$prefix}-number.on-tint {
        color: $text-neutral-ontint;
      }
    }
    &.eagle-legend-blue {
      .#{$prefix}-icon {
        background-color: $fill-outstanding-base;
      }
    }
    &.eagle-legend-red {
      .#{$prefix}-icon {
        background-color: $fill-serious-base;
      }
    }
    &.eagle-legend-yellow {
      .#{$prefix}-icon {
        background-color: $fill-notice-base;
      }
    }
    &.eagle-legend-green {
      .#{$prefix}-icon {
        background-color: $fill-positive-base;
      }
    }
    &.eagle-legend-gray {
      .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
        background-color: $gray-70;
      }
    }
    &.eagle-legend-purple {
      .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
        background-color: $purple-50;
      }
    }
  }
`;

const StatusCodeCircle = styled.i`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
`;

const StatusCodeSquare = styled.i`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  display: inline-block;
`;

export const LegendIcon: React.FC<{
  shape: LegendShapes;
}> = ({ shape }) => {
  switch (shape) {
    case "loading":
      return (
        <Icon
          className="ui-kit-status-legend-icon ui-kit-status-legend-icon-loading"
          iconWidth={8}
          iconHeight={8}
          isRotate
          src={Loading8GradientBlueIcon}
        />
      );
    case "square":
      return <StatusCodeSquare className="ui-kit-status-legend-icon" />;
    case "circle":
      return <StatusCodeCircle className="ui-kit-status-legend-icon" />;
  }
};

const ColorMap: Record<string, LegendColor> = {
  success: "green",
  danger: "red",
  warning: "yellow",
};

const Legend: LegendComponentType = ({
  label,
  color = "gray",
  className,
  hoverable = false,
  children,
  number,
  shape = "circle",
  onTintMode = false,
  ...props
}) => {
  const computedColor = ColorMap[color] || color;

  const content = (
    <>
      {label || children}
      {!!number && (
        <span
          className={cs(
            css`
              color: ${Color.text.neutral.tertiary};
            `,
            "ui-kit-status-legend-number",
            {
              "on-tint": onTintMode,
            },
          )}
        >
          {number}
        </span>
      )}
    </>
  );

  return (
    <div
      {...props}
      className={cs(
        className,
        LegendStyle,
        Typo.Label.l4_regular,
        "ui-kit-status-legend",
        {
          [`eagle-legend-${computedColor}`]:
            shape !== "loading" && LegendPresetColors.includes(computedColor),
          "tag-hover": hoverable,
          "on-tint": onTintMode,
        },
      )}
      color={computedColor}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e, props.key);
        }
      }}
    >
      <LegendIcon shape={shape} />
      <OverflowTooltip
        content={content}
        tooltip={content}
        className={css`
          flex: 1;
        `}
      />
    </div>
  );
};

export default Legend;

export * from "./legend.type";

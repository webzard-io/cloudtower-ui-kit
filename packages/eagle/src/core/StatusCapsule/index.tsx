import { Loading8GradientBlueIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import { Color } from "@src/styles/token/color";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import {
  StatusCapsuleColor,
  StatusCapsuleComponentType,
} from "./statusCapsule.type";

export const StatusPresetColors: StatusCapsuleColor[] = [
  "blue",
  "red",
  "yellow",
  "green",
  "gray",
];

const StatusCapsuleStyle = css`
  $prefix: ui-kit-status-capsule;
  margin: 0;
  border-radius: 20px;
  padding: 2px 10px;
  height: 22px;

  &.ant-tag.#{$prefix}.off-white {
    background-color: $fill-neutral-trans-1 !important;
    &.tag-hover:hover,
    &.__pseudo-states-hover {
      background-color: $fill-neutral-trans-2 !important;
    }
  }
  &.ant-tag.#{$prefix} {
    color: $text-neutral-primary;
    .#{$prefix}-icon {
      margin-right: 6px;
    }
    .#{$prefix}-number {
      margin-left: 8px;
      color: ${Color.text.neutral.tertiary};
    }
    &.ant-tag-blue {
      background-color: $fill-outstanding-light;
      .#{$prefix}-icon {
        background-color: $fill-outstanding-base;
      }
      &.tag-hover:hover,
      &.__pseudo-states-hover {
        background-color: $fill-outstanding-light-hover;
      }
    }
    &.ant-tag-red {
      background-color: $fill-serious-light;
      .#{$prefix}-icon {
        background-color: $fill-serious-base;
      }
      &.tag-hover:hover,
      &.__pseudo-states-hover {
        background-color: $fill-serious-light-hover;
      }
    }
    &.ant-tag-yellow {
      background-color: $fill-notice-light;
      .#{$prefix}-icon {
        background-color: $fill-notice-base;
      }
      &.tag-hover:hover,
      &.__pseudo-states-hover {
        background-color: $fill-notice-light-hover;
      }
    }
    &.ant-tag-green {
      background-color: $fill-positive-light;
      .#{$prefix}-icon {
        background-color: $fill-positive-base;
      }
      &.tag-hover:hover,
      &.__pseudo-states-hover {
        background-color: $fill-positive-light-hover;
      }
    }
    &.ant-tag-gray {
      background-color: $fill-neutral-trans-2;
      .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
        background-color: $gray-70;
      }
      &.tag-hover:hover,
      &.__pseudo-states-hover {
        background-color: $fill-neutral-trans-3-trans-2-hover;
      }
    }
  }
`;

const StatusCode = styled.i`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
`;

export const StatusIcon: React.FC<{
  loading?: boolean;
}> = ({ loading }) => {
  if (loading) {
    return (
      <Icon
        className="ui-kit-status-capsule-icon ui-kit-status-capsule-icon-loading"
        iconWidth={8}
        iconHeight={8}
        isRotate
        src={Loading8GradientBlueIcon}
      />
    );
  }
  return <StatusCode className="ui-kit-status-capsule-icon" />;
};

const ColorMap: Record<string, StatusCapsuleColor> = {
  success: "green",
  danger: "red",
  warning: "yellow",
};

const StatusCapsule: StatusCapsuleComponentType = ({
  color = "gray",
  className,
  loading,
  hoverable = false,
  children,
  offWhiteMode,
  number,
  ...props
}) => {
  const computedColor = ColorMap[color] || color;

  return (
    <AntdTag
      {...props}
      className={cs(
        className,
        StatusCapsuleStyle,
        Typo.Label.l4_regular,
        "ui-kit-status-capsule",
        {
          [`ant-tag-${computedColor}`]:
            StatusPresetColors.includes(computedColor),
          "tag-hover": hoverable,
          "off-white": offWhiteMode,
        },
      )}
      closable={false}
      color={computedColor === "gray" ? undefined : computedColor}
    >
      <StatusIcon loading={loading} />
      {children}
      {!!number && (
        <span className="ui-kit-status-capsule-number">{number}</span>
      )}
    </AntdTag>
  );
};

export default StatusCapsule;

export * from "./statusCapsule.type";

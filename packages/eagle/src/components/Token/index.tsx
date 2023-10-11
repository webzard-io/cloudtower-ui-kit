import { XmarkRemoveSmall16RegularInheritIcon } from "@cloudtower/icons-react";
import { css, LinariaClassName } from "@linaria/core";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { TokenColor, TokenComponentType } from "../../spec";
import { IconStyle } from "./style";
import Icon from "../Icon";
import { Typo } from "../Typo";

export const PresetColors: TokenColor[] = [
  "blue",
  "red",
  "yellow",
  "green",
  "gray",
];

const Size: Record<"small" | "medium" | "large", LinariaClassName> = {
  small: css`
    padding: 0 8px;
    border-radius: 4px;
  `,
  medium: css`
    padding: 2px 8px;
    border-radius: 3px;
  `,
  large: css`
    padding: 3px 8px;
    border-radius: 2px;
  `,
};

// TODO: remove margin-right after token field
const TokenStyle = css`
  &.ant-tag:hover {
    opacity: unset;
  }
  &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
    margin: 0;
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    border: none;
    & .ant-tag-close-icon {
      width: 16px;
      height: 16px;
      color: inherit;
      margin-left: 4px;
      opacity: 0.6;
      display: inline-flex;
      &:hover {
        opacity: 1;
      }
    }
    &.ant-tag-blue {
      color: $fills-light-general-general;
      background-color: $fills-light-general-general-light;
    }
    &.ant-tag-red {
      color: $fills-light-serious-serious;
      background-color: $fills-light-serious-serious-light;
    }
    &.ant-tag-yellow {
      color: $fills-light-notice-notice-dark;
      background-color: $fills-light-notice-notice-light;
    }
    &.ant-tag-green {
      color: $fills-light-positive-positive-dark;
      background-color: $fills-light-positive-positive-light;
    }
    &.ant-tag-gray {
      color: $text-light-super;
      background-color: $fills-element-light-container-general;
    }

    &.ui-kit-token-checked {
      color: $text-light-on-tint;
      &.ant-tag-red {
        background-color: $fills-light-serious-serious;
      }
      &.ant-tag-yellow {
        background-color: $fills-light-notice-notice;
      }
      &.ant-tag-green {
        background-color: $fills-light-positive-positive;
      }
      &.ant-tag-blue {
        background-color: $fills-light-general-general;
      }
      &.ant-tag-gray {
        background-color: $gray-70;
      }
    }
  }
`;

const Token: TokenComponentType = ({
  size = "small",
  color = "gray",
  className,
  icon,
  checked,
  children,
  ...props
}) => {
  return (
    <AntdTag
      {...props}
      className={cs(
        className,
        Size[size],
        TokenStyle,
        {
          [Typo.Label.l4_regular]: size === "small" || size === "medium",
          [Typo.Label.l3_regular]: size === "large",
          [`ant-tag-${color}`]: PresetColors.includes(color),
        },
        "ui-kit-token",
        checked && "ui-kit-token-checked",
      )}
      closeIcon={
        <Icon
          className="selected-icon"
          src={XmarkRemoveSmall16RegularInheritIcon}
          iconHeight={16}
          iconWidth={16}
        />
      }
      color={color === "gray" ? undefined : color}
    >
      {icon && <span className={cs("ui-kit-tag-icon", IconStyle)}>{icon}</span>}
      {children}
    </AntdTag>
  );
};

export default Token;

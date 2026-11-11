import { XmarkRemoveSmall16RegularInheritIcon } from "@cloudtower/icons-react";
import { css, LinariaClassName } from "@linaria/core";
import Icon from "@src/core/Icon";
import { IconStyle } from "@src/core/Token/style";
import Tooltip from "@src/core/Tooltip";
import { Typo } from "@src/core/Typo";
import { Tag as AntdTag } from "antd";
import cs from "classnames";
import React from "react";

import { TokenColor, TokenType } from "./token.type";
export const TokenPresetColors: TokenColor[] = [
  "blue",
  "red",
  "yellow",
  "green",
  "gray",
  "purple",
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
      color: var(--fill-outstanding-base);
      background-color: rgba(0, 136, 255, 0.1);
    }
    &.ant-tag-red {
      color: var(--fill-serious-base);
      background-color: rgba(255, 74, 74, 0.1);
    }
    &.ant-tag-yellow {
      color: var(--fill-notice-dark);
      background-color: rgba(255, 187, 0, 0.1);
    }
    &.ant-tag-green {
      color: var(--fill-positive-dark);
      background-color: rgba(30, 201, 127, 0.1);
    }
    &.ant-tag-gray {
      color: var(--text-neutral-super);
      background-color: var(--fill-neutral-trans-2);
    }
    &.ant-tag-purple {
      color: var(--text-colorful-purple);
      background-color: var(--fill-purple-light);
    }

    &.ui-kit-token-checked {
      color: var(--text-neutral-ontint);
      &.ant-tag-red {
        background-color: var(--fill-serious-base);
      }
      &.ant-tag-yellow {
        background-color: var(--fill-notice-base);
      }
      &.ant-tag-green {
        background-color: var(--fill-positive-base);
      }
      &.ant-tag-blue {
        background-color: var(--fill-outstanding-base);
      }
      &.ant-tag-gray {
        background-color: var(--gray-gray-70);
      }
      &.ant-tag-purple {
        background-color: var(--fill-purple-base);
      }
    }
  }
`;

const Token = React.forwardRef<HTMLDivElement, TokenType>(
  (
    {
      size = "small",
      color = "gray",
      className,
      icon,
      checked,
      children,
      tooltipConfig,
      ...props
    },
    ref,
  ) => {
    return (
      <AntdTag
        {...props}
        ref={ref}
        className={cs(
          className,
          Size[size],
          TokenStyle,
          {
            [Typo.Label.l4_regular]: size === "small" || size === "medium",
            [Typo.Label.l3_regular]: size === "large",
            [`ant-tag-${color}`]: TokenPresetColors.includes(color),
          },
          "ui-kit-token",
          checked && "ui-kit-token-checked",
        )}
        closeIcon={
          <Tooltip
            title={tooltipConfig?.title}
            {...(!tooltipConfig?.title && {
              visible: false,
            })}
          >
            <Icon
              className="selected-icon"
              src={XmarkRemoveSmall16RegularInheritIcon}
              iconHeight={16}
              iconWidth={16}
            />
          </Tooltip>
        }
        color={color === "gray" ? undefined : color}
      >
        {icon && (
          <span className={cs("ui-kit-tag-icon", IconStyle)}>{icon}</span>
        )}
        {children}
      </AntdTag>
    );
  },
);
export default Token;

export * from "./token.type";

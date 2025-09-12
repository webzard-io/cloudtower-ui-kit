import { css, cx } from "@linaria/core";
import type { TooltipProps } from "@src/core";
import Tooltip from "@src/core/Tooltip";
import type { Property } from "csstype";
import React from "react";

export type UnderlineTooltipProps = TooltipProps & {
  /**
   * 设置在 tooltip 触发元素下显示下划线的属性
   */
  /**
   * 设置下划线类型
   * @default dashed
   */
  style?: Property.BorderBottomStyle;
  /**
   * 设置下划线颜色
   * @default rgba(107, 128, 167, 0.6)
   */
  color?: Property.BorderBottomColor;
  /**
   * 设置下划线宽度，如果类型为 number 时单位为 px
   * @default 1px
   */
  width?: Property.BorderBottomWidth;
  /**
   * 设置内容文字颜色
   *
   */
  contentColor?: "black" | "gray";
  /**
   * 用于设定用户自定义颜色，与 color 冲突，同时设置的情况下 color 不生效
   */
  customContentColor?: string;
  /**
   * 下划线内容元素样式
   */
  underlineContentClassName?: string;
  /**
   * 是否为链接
   */
  link?: boolean;
};

export const UnderlineTooltipStyle = css`
  &.content {
    cursor: default !important;
    &.link {
      cursor: pointer !important;
      &:hover {
        color: $text-colorful-outstanding;
      }
    }
    &.black {
      color: $text-neutral-primary;
    }
    &.gray {
      color: $text-neutral-secondary;
    }
  }
`;

const UnderlineTooltip: React.FC<UnderlineTooltipProps> = (props) => {
  const {
    style = "dashed",
    color = "rgba(107, 128, 167, 0.6)",
    width = "1px",
    contentColor,
    customContentColor,
    link,
    underlineContentClassName,
    title,
    children,
    className,
    ...rest
  } = props;

  return (
    <Tooltip
      className={cx(UnderlineTooltipStyle, className)}
      title={title || children}
      {...rest}
    >
      <span
        className={cx(
          "content",
          !customContentColor && contentColor,
          link && "link",
          underlineContentClassName,
        )}
        style={{
          borderBottomColor: color,
          borderBottomStyle: style,
          borderBottomWidth: width,
          color: customContentColor,
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default UnderlineTooltip;

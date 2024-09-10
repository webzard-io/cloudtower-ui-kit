import { LinariaClassName } from "@linaria/core";
import { TooltipProps as AntdTooltipProps } from "antd/lib/tooltip";

export type TooltipProps = AntdTooltipProps & {
  /**
   * @deprecated `followMouse` 属性被弃用。followMouse 未被使用，且实现效果存在闪烁问题
   */
  followMouse?: boolean;
};

export type EllipsisContentType = {
  /**
   * tooltip content 内容
   */
  tooltip: React.ReactNode;
  /**
   * 内容区的最大高度
   *
   * e.g. 文本限制行数 = 行数 * line-height
   */
  maxHeight?: number;
  /**
   * 自定义样式类名
   */
  contentWrapperClassName?: LinariaClassName;
  /**
   * 多行溢出省略提示
   */
  ellipsisTips?: string;
};

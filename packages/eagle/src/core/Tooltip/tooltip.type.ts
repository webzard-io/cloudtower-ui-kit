import { TooltipProps as AntdTooltipProps } from "antd/lib/tooltip";

export type TooltipProps = AntdTooltipProps & {
  /**
   * @deprecated `followMouse` 属性被弃用。followMouse 未被使用，且实现效果存在闪烁问题
   */
  followMouse?: boolean;
};

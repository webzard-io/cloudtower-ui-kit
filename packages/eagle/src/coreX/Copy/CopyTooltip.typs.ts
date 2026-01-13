import { TooltipProps } from "@src/core/Tooltip";

export interface CopyTooltipProps {
  /** 复制文本 */
  text: string;
  /** 复制前提示文本 */
  beforeTooltip?: string;
  /** 复制后提示文本 */
  afterTooltip?: string;
  /** Tooltip 组件的属性 */
  tooltipProps?: Omit<TooltipProps, "title">;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

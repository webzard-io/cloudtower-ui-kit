import { AbstractTooltipProps } from "antd/lib/tooltip";

export type OverflowTooltipProps = AbstractTooltipProps & {
  /**
   * 文本内容
   */
  content: React.ReactNode;
  /**
   * 自定义样式类名
   */
  className?: string;
  /**
   * 当文本溢出省略时，鼠标悬停显示的 tooltip 内容，如不指定，默认展示完整的文本内容
   */
  tooltip?: React.ReactNode;
  /**
   * 多行溢出省略，指定大于 1 的数字时，会在文字超过指定的行数时省略溢出内容，并显示 tooltip
   */
  multiLines?: number;

  /**
   * 点击事件处理函数
   */
  onClick?: () => void;
};

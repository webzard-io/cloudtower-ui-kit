import { CSSProperties } from "react";

export type SizeType = "large" | "medium" | "small" | "area" | "xSmall";

export interface IBlankStateProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
  /**
   * 大小类型，对应设计稿，默认‘medium’
   */
  size?: SizeType;
  /**
   * 自定义宽度
   */
  width?: string | number;
  /**
   * 自定义高度
   */
  height?: string | number;
  /**
   * 空白状态背景颜色，默认无背景颜色。
   */
  backgroundColor?: "gray" | "white";
  /**
   * 标题
   */
  title: string;
  /**
   * 描述信息
   */
  description?: string;
  /**
   * 操作按钮
   */
  action?: {
    /**
     * 操作按钮文字
     */
    label: string;
    /**
     * 操作按钮点击事件
     */
    onClick: () => void;
  };
}

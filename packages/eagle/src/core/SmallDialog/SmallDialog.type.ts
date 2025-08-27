import { ButtonProps } from "@src/core/Button";
import React from "react";

export interface SmallDialogProps {
  /** 弹窗宽度 */
  width?: number | string;
  /** 弹窗标题 */
  title: React.ReactNode;
  /** 自定义标题 */
  TitleRender?: React.FC<{ title?: React.ReactNode }>;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 确认按钮文案 */
  okText?: string;
  /** 是否显示确认按钮 */
  showOk?: boolean;
  /** 点击确认按钮回调 */
  onOk?: (popModal: () => void) => void;
  /** 点击取消按钮或关闭弹窗回调 */
  onCancel?: (popModal: () => void) => void;
  /** 是否可点击遮罩层关闭 */
  maskClosable?: boolean;
  /** 是否显示右上角关闭按钮 */
  closable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义footer类名 */
  footerClassName?: string;
  /** 确认按钮属性，优先使用 okText */
  okButtonProps?: ButtonProps;
  /** 取消按钮属性，优先使用 cancelText */
  cancelButtonProps?: ButtonProps;
  children?: React.ReactNode;
  /** 展示在 modal footer 的错误文案 */
  error?: React.ReactNode;
  /** 是否展示在 modal footer 的错误图标, 默认展示 */
  showFooterErrorIcon?: boolean;
  /** 确认按钮加载状态 */
  confirmLoading?: boolean;
  /** 是否初始化中 */
  initializing?: boolean;
  /** 初始化错误内容 */
  initializingError?: string | React.ReactNode;
  /** 初始化骨架屏行数 */
  initializingSkeletonRows?: number;
}

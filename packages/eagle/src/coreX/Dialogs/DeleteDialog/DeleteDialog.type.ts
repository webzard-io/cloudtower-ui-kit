export interface DeleteDialogProps {
  /** 弹窗标题 */
  title: React.ReactNode;
  /** 主要描述文本 */
  description?: React.ReactNode;
  /** 辅助说明文本 */
  secondaryDesc?: React.ReactNode;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 确认按钮文案 */
  okText?: string;
  /** 点击确认按钮回调 */
  onOk?: (popModal: () => void) => void;
  /** 点击取消按钮或关闭弹窗回调 */
  onCancel?: (popModal: () => void) => void;
  /** 自定义类名 */
  className?: string;
  /** 确认按钮加载状态 */
  confirmLoading?: boolean;
  /** 展示在 modal footer 的错误文案 */
  error?: React.ReactNode;
  /** 是否展示在 modal footer 的错误图标, 默认展示 */
  showFooterErrorIcon?: boolean;
}

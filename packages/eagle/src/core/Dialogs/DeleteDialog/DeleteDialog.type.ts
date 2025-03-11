export interface DeleteDialogProps {
  /** 弹窗标题 */
  title: React.ReactNode;
  /** 主要描述文本 */
  description?: React.ReactNode;
  /** 辅助说明文本 */
  helperText?: React.ReactNode;
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
}

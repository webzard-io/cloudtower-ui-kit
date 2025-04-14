export type RejectReason = string;
export type RejectContent = Record<string, RejectReason[]>;

export enum RejectDialogType {
  Single = "RejectSingle",
  All = "RejectAll",
  Part = "RejectPart",
  Custom = "RejectCustom",
}

interface BaseRejectDialogProps {
  /** 弹窗标题 */
  title: React.ReactNode;
  /** 补充描述文本 */
  description?: React.ReactNode;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 点击取消按钮或关闭弹窗回调 */
  onCancel?: (popModal: () => void) => void;
  /** 弹窗宽度 */
  width?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义footer类名 */
  footerClassName?: string;
}

interface SingleRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Single;
  /** 拒绝原因，可以是单个字符串或字符串数组 */
  content: string | string[];
}

interface MultiAllRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.All;
  /** 灰色的进一步描述 */
  secondaryDesc?: React.ReactNode;
  /** 多个对象的拒绝原因，格式为 { [对象名]: string[] } */
  content: RejectContent;
}

interface MultiPartialRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Part;
  /** 灰色的进一步描述 */
  secondaryDesc?: React.ReactNode;
  /** 多个对象的拒绝原因，格式为 { [对象名]: string[] } */
  content: Record<string, string[]>;
  /** 部分拒绝时的额外说明 */
  partialDescription: React.ReactNode;
  /** 确认按钮文案 */
  okText?: string;
  /** 点击确认按钮回调 */
  onOk?: (popModal: () => void) => void;
}

interface CustomRejectDialogProps extends BaseRejectDialogProps {
  type: RejectDialogType.Custom;
  /** 自定义内容 */
  customContent: React.ReactNode;
  /** 确认按钮文案 */
  okText?: string;
}

export type RejectDialogProps =
  | SingleRejectDialogProps
  | MultiAllRejectDialogProps
  | MultiPartialRejectDialogProps
  | CustomRejectDialogProps;

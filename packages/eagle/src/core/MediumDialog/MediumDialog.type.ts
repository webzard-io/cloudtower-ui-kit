import { SmallDialogProps } from "../SmallDialog/SmallDialog.type";

export interface MediumDialogProps extends SmallDialogProps {
  /** 内容是否尽可能占满视窗，用于适配中型弹窗的非常规尺寸 */
  isContentFull?: boolean;
}

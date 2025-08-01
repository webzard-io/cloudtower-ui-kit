import { ImmersiveDialogProps } from "@src/core/ImmersiveDialog/type";

export type WizardDialogProps = ImmersiveDialogProps & {
  /** 当前步骤 */
  step?: number;
  /** 步骤配置数组 */
  steps?: {
    /** 步骤标题 */
    title: string;
    /** 步骤内容渲染 */
    children: React.ReactNode;
  }[];
  /** 是否隐藏步骤 */
  hideSteps?: boolean;
  /** 左侧自定义内容 */
  left?: React.ReactNode;
  /** 右侧自定义内容 */
  right?: React.ReactNode;
  /** 是否销毁其他步骤内容 */
  destroyOtherStep?: boolean;
  /** 上一步的文本 */
  prevText?: string;
  /** 上一步的回调 */
  onPrevStep?: (step: number) => void;
  /** 下一步的文本 */
  nextText?: string;
  /** 下一步的回调 */
  onNextStep?: (step: number) => void | boolean;
  /** 步骤改变时的回调 */
  onStepChange?: (step: number) => void;
};

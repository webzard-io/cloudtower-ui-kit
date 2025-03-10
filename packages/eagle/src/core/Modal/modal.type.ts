import { ModalProps as AntdModalProps } from "antd/lib/modal";

export type WizardSteps = {
  /** 步骤标题 */
  title: string;
  /** 步骤内容渲染 */
  render: React.ReactNode;
  /**
   * 自定义上一步按钮文本
   */
  prevText?: string | React.ReactNode;
  /**
   * 自定义上一步按钮事件处理
   * @returns void
   */
  onPrev?: () => void;
  /** 自定义确认按钮文本 */
  okText?: string | React.ReactNode;
  /** 确认按钮点击事件处理 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 是否禁用当前步骤 */
  disabled?: boolean;
}[];

export type ModalProps = Omit<AntdModalProps, "okType"> & {
  /** 确认按钮加载状态 */
  confirmLoading?: boolean;
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 错误信息展示 */
  error?: string | React.ReactNode;
  /** 是否使用普通模式 */
  normal?: boolean;
  /** 模态框内容 */
  children?: React.ReactNode;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 是否显示确认按钮 */
  showOk?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 向导模式配置 */
  wizard?:
    | {
        /** 当前步骤 */
        step: number;
        /** 步骤改变时的回调 */
        onStepChange?: (step: number) => void;
        /** 步骤配置数组 */
        steps: WizardSteps;
        /** 是否隐藏左侧区域 */
        hideLeft?: boolean;
        /** 右侧自定义内容 */
        right?: React.ReactNode;
        /** 是否销毁其他步骤内容 */
        destroyOtherStep?: boolean;
        /** 是否禁用上一步操作 */
        disablePrevStep?: boolean;
      }
    | boolean;
  /** 是否隐藏底部按钮边框 */
  hideFooterButtonBorder?: boolean;
};

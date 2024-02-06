import { ModalProps as AntdModalProps } from "antd/lib/modal";

export type WizardSteps = {
  title: string;
  render: React.ReactNode;
  prevText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}[];

export type ModalProps = Omit<AntdModalProps, "okType"> & {
  confirmLoading?: boolean;
  fullscreen?: boolean;
  error?: string | React.ReactNode;
  normal?: boolean;
  children?: React.ReactNode;
  showCancel?: boolean;
  showOk?: boolean;
  wizard?:
    | {
        step: number;
        onStepChange?: (step: number) => void;
        steps: WizardSteps;
        hideLeft?: boolean;
        right?: React.ReactNode;
        destroyOtherStep?: boolean;
        disablePrevStep?: boolean;
      }
    | boolean;
};

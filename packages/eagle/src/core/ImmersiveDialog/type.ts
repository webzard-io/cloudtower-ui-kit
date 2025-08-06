import { ButtonProps } from "@src/core/Button";
import { ModalProps as AntdModalProps } from "antd/lib/modal";

export type ImmersiveDialogProps = React.PropsWithChildren<
  AntdModalProps & {
    /** 自定义关闭图标 */
    closeIcon?: React.ReactNode;
    /** 是否显示取消按钮 */
    showCancel?: boolean;
    /** 取消按钮的文本 */
    cancelText?: string;
    /** 取消按钮的属性 */
    cancelButtonProps?: ButtonProps;
    /** 是否显示确定按钮 */
    showOk?: boolean;
    /** 确定按钮的文本 */
    okText?: string;
    /** 确定按钮的 loading */
    okLoading?: boolean;
    /** 确定按钮的属性 */
    okButtonProps?: ButtonProps;
    /** 错误信息 */
    error?: React.ReactNode;
    /** 确定按钮的回调 */
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /** 是否内容占满 */
    isContentFull?: boolean;
    /** 左侧自定义内容 */
    left?: React.ReactNode;
    /** 右侧自定义内容 */
    right?: React.ReactNode;
    /** 底部左侧的操作区域 */
    footerLeftAction?: React.ReactNode;
  }
>;

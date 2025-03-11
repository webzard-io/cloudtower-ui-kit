import { CloseCircleFilled } from "@ant-design/icons";
import { css, cx } from "@linaria/core";
import { usePopModal } from "@src/core/KitStoreProvider";
import { Modal } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";

import Button from "../Button";
import { Typo } from "../Typo";

const DialogStyle = css`
  width: 492px !important;
  margin: 40px auto !important;
  padding-bottom: 0 !important;

  .ant-modal-content {
    background: $backgrounds-light-primary;
    border-radius: 16px;
  }

  .ant-modal-header {
    padding: 32px 40px 0;
    border-bottom: none;
    border-radius: 16px 16px 0 0;
  }

  .ant-modal-close {
    right: 40px;
    top: 32px;
  }

  .ant-modal-body {
    padding: 32px 40px;
    min-height: 160px;
    max-height: calc(
      100vh - 80px - 64px - var(--header-height) - var(--footer-height)
    );
    overflow-y: auto;
  }

  .ant-modal-footer {
    padding: 24px 40px;
    margin-top: 0;
    border-top: none;
    box-shadow: 0px 1px 0px 0px #e1e6f199 inset;
  }
`;

interface SmallDialogProps {
  /** 弹窗标题 */
  title: React.ReactNode;
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
  /** 确认按钮属性，优先使用 okText */
  okButtonProps?: ButtonProps;
  /** 取消按钮属性，优先使用 cancelText */
  cancelButtonProps?: ButtonProps;
  children?: React.ReactNode;
}

const SmallDialog: React.FC<SmallDialogProps> = ({
  title,
  cancelText = "关闭",
  okText = "确定",
  showOk = true,
  onOk,
  onCancel,
  maskClosable = true,
  closable = true,
  className,
  okButtonProps,
  cancelButtonProps,
  children,
}) => {
  const popModal = usePopModal();

  const handleClose = () => {
    if (onCancel) {
      onCancel(popModal);
    } else {
      popModal();
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk(popModal);
    } else {
      popModal();
    }
  };

  return (
    <Modal
      visible
      title={<span className={Typo.Display.d2_bold_title}>{title}</span>}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button type="ghost" onClick={handleClose} {...cancelButtonProps}>
            {cancelText}
          </Button>
          {showOk && (
            <Button type="primary" onClick={handleOk} {...okButtonProps}>
              {okText}
            </Button>
          )}
        </div>
      }
      onCancel={handleClose}
      closable={closable}
      maskClosable={maskClosable}
      className={cx(DialogStyle, className)}
      closeIcon={<CloseCircleFilled />}
    >
      {children}
    </Modal>
  );
};

export default SmallDialog;

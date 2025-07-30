import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkCloseBold24SecondaryIcon,
  XmarkCloseBold24TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { Antd5Flex, Button, Icon, Typo } from "@src/core";
import { usePopModal } from "@src/core/KitStoreProvider";
import { Modal } from "antd";
import React from "react";
import cls from "classnames";
import OverflowTooltip from "../../coreX/OverflowTooltip";
import { Show } from "../../coreX/Show";
import { SmallDialogProps } from "./SmallDialog.type";
import {
  DialogStyle,
  FooterStyle,
  ErrorTextStyle,
  CloseIconStyle,
} from "./SmallDialog.style";

const DefaultTitleRender: React.FC<{ title?: React.ReactNode }> = ({
  title,
}) => {
  return <span className={cls(Typo.Display.d2_bold_title)}>{title}</span>;
};
export const SmallDialog: React.FC<SmallDialogProps> = ({
  title,
  TitleRender,
  cancelText = "关闭",
  okText = "确定",
  showOk = true,
  onOk,
  onCancel,
  maskClosable = true,
  closable = true,
  className,
  footerClassName,
  okButtonProps,
  cancelButtonProps,
  children,
  showFooterErrorIcon = true,
  error,
  confirmLoading,
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

  const CustomTitleRender = TitleRender || DefaultTitleRender;

  return (
    <Modal
      visible
      title={<CustomTitleRender title={title} />}
      footer={
        <div
          className={cls(FooterStyle, footerClassName, {
            "has-error": !!error,
          })}
        >
          <Show condition={!!error}>
            <Antd5Flex
              gap={4}
              align="center"
              className={cx(ErrorTextStyle, Typo.Label.l3_regular)}
            >
              <Show condition={showFooterErrorIcon}>
                <Icon
                  src={ExclamationErrorCircleFill16RedIcon}
                  iconHeight={16}
                  iconWidth={16}
                />
              </Show>
              <OverflowTooltip multiLines={3} content={error} tooltip={error} />
            </Antd5Flex>
          </Show>
          <Antd5Flex>
            <Button
              type={showOk ? "quiet" : "ordinary"}
              onClick={handleClose}
              className={Typo.Label.l2_bold_title}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
            {showOk && (
              <Button
                type="primary"
                onClick={handleOk}
                loading={confirmLoading}
                {...okButtonProps}
              >
                {okText}
              </Button>
            )}
          </Antd5Flex>
        </div>
      }
      onCancel={handleClose}
      closable={closable}
      maskClosable={maskClosable}
      className={cx(DialogStyle, className)}
      closeIcon={
        <Icon
          src={XmarkCloseBold24TertiaryIcon}
          className={CloseIconStyle}
          iconHeight={24}
          iconWidth={24}
          hoverSrc={XmarkCloseBold24SecondaryIcon}
        />
      }
    >
      {children}
    </Modal>
  );
};

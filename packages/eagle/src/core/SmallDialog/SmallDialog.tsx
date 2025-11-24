import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkCloseBold24SecondaryIcon,
  XmarkCloseBold24TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { Antd5Flex, Button, Icon, Typo } from "@src/core";
import { usePopModal } from "@src/core/KitStoreProvider";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Modal } from "antd";
import cls from "classnames";
import React from "react";

import OverflowTooltip from "../../coreX/OverflowTooltip";
import { Show } from "../../coreX/Show";
import {
  CloseIconStyle,
  DialogStyle,
  ErrorTextStyle,
  FooterStyle,
} from "./SmallDialog.style";
import { SmallDialogProps } from "./SmallDialog.type";
import {
  ModelContentSkeleton,
  ModelInitializingError,
  ModelTitleSkeleton,
} from "./SmallDialog.widget";

const DefaultTitleRender: React.FC<{ title?: React.ReactNode }> = ({
  title,
}) => {
  return <span className={cls(Typo.Display.d2_bold_title)}>{title}</span>;
};

export const SmallDialog: React.FC<SmallDialogProps> = ({
  width = 492,
  title,
  TitleRender,
  cancelText,
  okText,
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
  hideFooter = false,
  showFooterErrorIcon = true,
  error,
  confirmLoading,
  initializing,
  initializingError,
  initializingSkeletonRows,
}) => {
  const { t } = useParrotTranslation();
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
  const defaultTitle = initializingError ? t("common.load_failed") : "";
  const defaultCancelText = showOk ? t("common.cancel") : t("common.close");
  const defaultOkText = initializingError
    ? t("common.retry")
    : t("common.confirm");

  return (
    <Modal
      visible
      width={width}
      title={
        initializing ? (
          <ModelTitleSkeleton />
        ) : (
          <CustomTitleRender title={title || defaultTitle} />
        )
      }
      footer={
        initializing ? null : hideFooter ? (
          <div></div>
        ) : (
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
                <OverflowTooltip
                  multiLines={3}
                  content={error}
                  tooltip={error}
                />
              </Antd5Flex>
            </Show>
            <Antd5Flex>
              <Button
                type={showOk ? "quiet" : "ordinary"}
                onClick={handleClose}
                className={Typo.Label.l2_bold_title}
                {...cancelButtonProps}
              >
                {cancelText || defaultCancelText}
              </Button>
              {showOk && (
                <Button
                  type="primary"
                  onClick={handleOk}
                  loading={confirmLoading}
                  {...okButtonProps}
                >
                  {okText || defaultOkText}
                </Button>
              )}
            </Antd5Flex>
          </div>
        )
      }
      onCancel={handleClose}
      closable={closable}
      maskClosable={maskClosable}
      className={cls(DialogStyle, className, {
        "initializing-error": initializingError,
        "no-footer": hideFooter,
      })}
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
      {initializing ? (
        <ModelContentSkeleton num={initializingSkeletonRows} />
      ) : initializingError ? (
        <ModelInitializingError error={initializingError} />
      ) : (
        children
      )}
    </Modal>
  );
};

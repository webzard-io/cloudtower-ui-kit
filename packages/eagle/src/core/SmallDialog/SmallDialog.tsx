import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkCloseBold24SecondaryIcon,
  XmarkCloseBold24TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import { Antd5Flex, Button, Icon, Skeleton, Typo, Space } from "@src/core";
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
  InitializingTitleSkeletonStyle,
  InitializingContentStyle,
  InitializingErrorStyle,
} from "./SmallDialog.style";
import useParrotTranslation from "@src/hooks/useParrotTranslation";

const DefaultTitleRender: React.FC<{ title?: React.ReactNode }> = ({
  title,
}) => {
  return <span className={cls(Typo.Display.d2_bold_title)}>{title}</span>;
};

const InitializingTitle: React.FC = () => {
  return (
    <div className={InitializingTitleSkeletonStyle}>
      <Skeleton.Content />
    </div>
  );
};

const InitializingContent: React.FC<{ num?: number }> = ({ num = 2 }) => {
  return (
    <Space direction="vertical" size={16} className={InitializingContentStyle}>
      {Array.from({ length: num }).map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          <Skeleton.Content />
        </div>
      ))}
    </Space>
  );
};

const InitializingError: React.FC<{
  error?: string | React.ReactNode;
}> = ({ error }) => {
  const { t } = useParrotTranslation();

  return (
    <div className={InitializingErrorStyle}>
      <p className={Typo.Display.d3_bold_title}>
        {t("components.initializing_failed")}
      </p>
      <p className={Typo.Label.l3_regular}>{error}</p>
    </div>
  );
};

export const SmallDialog: React.FC<SmallDialogProps> = ({
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
  showFooterErrorIcon = true,
  error,
  confirmLoading,
  initializing,
  initializingError,
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
  const defaultCancelText = initializingError
    ? t("common.cancel")
    : t("common.close");
  const defaultOkText = initializingError
    ? t("common.retry")
    : t("common.confirm");

  return (
    <Modal
      visible
      title={
        initializing ? (
          <InitializingTitle />
        ) : (
          <CustomTitleRender title={title || defaultTitle} />
        )
      }
      footer={
        initializing ? null : (
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
        <InitializingContent />
      ) : initializingError ? (
        <InitializingError error={initializingError} />
      ) : (
        children
      )}
    </Modal>
  );
};

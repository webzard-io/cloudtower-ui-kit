import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkCloseBold24SecondaryIcon,
  XmarkCloseBold24TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import { usePopModal } from "@src/core/KitStoreProvider";
import { Typo } from "@src/core/Typo";
import { default as Icon } from "@src/core/Icon";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Modal as AntdModal } from "antd";
import cls from "classnames";
import React, { useMemo } from "react";
import {
  ModelInitializingError,
  ModelTitleSkeleton,
  ModelContentSkeleton,
} from "../SmallDialog/SmallDialog.widget";
import {
  BodyStyle,
  CancelButtonStyle,
  CloseIconStyle,
  ErrorIconStyle,
  ErrorStyle,
  ErrorTextStyle,
  FooterButtonRightStyle,
  FooterButtonStyle,
  FooterStyle,
  FullContentStyle,
  ImmersiveDialogStyle,
  MultiAreaBodyStyle,
  MultiAreaStyle,
  TitleStyle,
} from "./styles";
import { ImmersiveDialogProps } from "./type";

export function ImmersiveDialog(props: ImmersiveDialogProps) {
  const {
    className,
    title,
    children,
    footerLeftAction,
    left,
    right,
    leftClassName,
    rightClassName,
    closeIcon,
    footer,
    showCancel = true,
    showOk = true,
    confirmLoading,
    okButtonProps,
    cancelButtonProps,
    okText,
    cancelText,
    error,
    showFooterErrorIcon = true,
    visible = true,
    isContentFull,
    onCancel,
    onOk,
    initializing,
    initializingError,
    ...restProps
  } = props;
  const { t } = useParrotTranslation();
  const popModal = usePopModal();

  const defaultTitle = initializingError ? t("common.load_failed") : "";
  const defaultCancelText = showOk ? t("common.cancel") : t("common.close");
  const defaultOkText = initializingError
    ? t("common.retry")
    : t("common.confirm");

  const _cancelText = useMemo(() => {
    let text = cancelText || defaultCancelText;

    return text;
  }, [cancelText, defaultCancelText]);

  const _confirmText = useMemo(() => {
    let text = okText || defaultOkText;

    return text;
  }, [okText, defaultOkText]);

  const finalFooter = useMemo(() => {
    if (initializing) {
      return null;
    }

    return (
      footer || (
        <div className={FooterStyle}>
          <div className={FooterButtonStyle}>
            {footerLeftAction}
            {error && (
              <>
                <span className={cx(ErrorStyle, Typo.Label.l2_regular)}>
                  {showFooterErrorIcon && (
                    <ExclamationErrorCircleFill16RedIcon
                      className={ErrorIconStyle}
                    />
                  )}
                  <OverflowTooltip
                    className={ErrorTextStyle}
                    multiLines={3}
                    content={error}
                    tooltip={error}
                  />
                </span>
              </>
            )}
          </div>
          <div className={FooterButtonRightStyle}>
            {showCancel ? (
              <Button
                size="large"
                type="quiet"
                className={CancelButtonStyle}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  popModal();
                  onCancel?.(e);
                }}
                {...cancelButtonProps}
              >
                <span className={Typo.Label.l1_bold_title}>{_cancelText}</span>
              </Button>
            ) : null}
            {showOk ? (
              <Button
                size="large"
                onClick={(e) => {
                  onOk?.(e);
                }}
                type="primary"
                loading={confirmLoading}
                {...okButtonProps}
              >
                {_confirmText}
              </Button>
            ) : null}
          </div>
        </div>
      )
    );
  }, [
    initializing,
    footer,
    footerLeftAction,
    error,
    showFooterErrorIcon,
    showCancel,
    cancelButtonProps,
    _cancelText,
    showOk,
    confirmLoading,
    okButtonProps,
    _confirmText,
    popModal,
    onCancel,
    onOk,
  ]);

  return (
    <AntdModal
      width="calc(100% - 20px)"
      title={
        initializing ? (
          <ModelTitleSkeleton />
        ) : (
          <span className={cx(Typo.Display.d1_bold_title, TitleStyle)}>
            {title || defaultTitle}
          </span>
        )
      }
      className={cls(
        ImmersiveDialogStyle,
        isContentFull ? FullContentStyle : MultiAreaStyle,
        className,
        {
          "initializing-error": initializingError,
        },
      )}
      closeIcon={
        closeIcon ?? (
          <Icon
            src={XmarkCloseBold24TertiaryIcon}
            className={CloseIconStyle}
            iconHeight={24}
            iconWidth={24}
            hoverSrc={XmarkCloseBold24SecondaryIcon}
          />
        )
      }
      footer={finalFooter}
      onCancel={(e) => {
        popModal();
        onCancel?.(e);
      }}
      visible={visible}
      destroyOnClose
      {...restProps}
    >
      <div className={cx(BodyStyle, isContentFull ? "" : MultiAreaBodyStyle)}>
        {initializing || initializingError ? (
          <>
            <div className="middle">
              {initializing ? (
                <ModelContentSkeleton num={4} />
              ) : (
                <ModelInitializingError error={initializingError} />
              )}
            </div>
          </>
        ) : (
          <>
            {isContentFull ? null : (
              <div className={cx("left", leftClassName)}>{left}</div>
            )}
            <div className="middle">{children}</div>
            {isContentFull ? null : (
              <div className={cx("right", rightClassName)}>{right}</div>
            )}
          </>
        )}
      </div>
    </AntdModal>
  );
}

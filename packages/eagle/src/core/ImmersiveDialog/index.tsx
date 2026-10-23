import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkCloseBold24SecondaryIcon,
  XmarkCloseBold24TertiaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import { default as Icon } from "@src/core/Icon";
import { usePopModal } from "@src/core/KitStoreProvider";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Modal as AntdModal } from "antd";
import cls from "classnames";
import React, { useCallback, useMemo } from "react";

import {
  ModelContentSkeleton,
  ModelInitializingError,
  ModelTitleSkeleton,
} from "../SmallDialog/SmallDialog.widget";
import { useDialogInitialization } from "../SmallDialog/useDialogInitialization";
import {
  BodyStyle,
  CancelButtonStyle,
  CloseButtonStyle,
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

/**
 * 统一沉浸式弹窗的初始化展示、footer 和关闭入口，关闭锁定不接管业务主动出栈。
 * @param props 弹窗布局、初始化状态与操作配置
 */
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
    closeDisabled = false,
    closable = true,
    keyboard,
    maskClosable,
    footer,
    showCancel = true,
    showOk = true,
    confirmLoading,
    okButtonProps,
    cancelButtonProps,
    okText,
    cancelText,
    error,
    hideFooter = false,
    showFooterErrorIcon = true,
    visible = true,
    isContentFull,
    onCancel,
    onOk,
    initializeOnce,
    initializing: initializingProp,
    initializingError: initializingErrorProp,
    "data-testid": dataTestId,
    ...restProps
  } = props;
  const { t } = useParrotTranslation();
  const popModal = usePopModal();
  const { initializing, initializingError } = useDialogInitialization({
    initializeOnce,
    initializing: initializingProp,
    initializingError: initializingErrorProp,
  });
  const sub = useCallback(
    (suffix: string) => (dataTestId ? `${dataTestId}-${suffix}` : undefined),
    [dataTestId],
  );

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

    if (hideFooter) return <div></div>;

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
                data-testid={sub("cancel")}
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
                data-testid={sub("ok")}
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
    hideFooter,
    footer,
    footerLeftAction,
    error,
    showFooterErrorIcon,
    showCancel,
    sub,
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
      data-testid={dataTestId}
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
          "no-footer": hideFooter,
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
            data-testid={sub("close")}
          />
        )
      }
      footer={finalFooter}
      onCancel={(e) => {
        // 关闭锁定必须先于弹窗出栈，避免底层意外触发取消时提前卸载。
        if (closeDisabled) return;
        popModal();
        onCancel?.(e);
      }}
      visible={visible}
      destroyOnClose
      {...restProps}
      closable={closable && !closeDisabled}
      keyboard={closeDisabled ? false : keyboard}
      // 保留遮罩鼠标事件以清理 rc-dialog 的按下状态，关闭锁定由 onCancel 统一拦截。
      maskClosable={maskClosable}
    >
      {closeDisabled && closable ? (
        <Button
          type="quiet"
          disabled
          aria-label={t("common.close")}
          className={cx("ant-modal-close", CloseButtonStyle)}
          data-testid={sub("close")}
        >
          {closeIcon ?? (
            <Icon
              src={XmarkCloseBold24TertiaryIcon}
              iconHeight={24}
              iconWidth={24}
            />
          )}
        </Button>
      ) : null}
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

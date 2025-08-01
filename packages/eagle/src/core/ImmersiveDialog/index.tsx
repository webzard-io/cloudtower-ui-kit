import {
  ExclamationErrorCircleFill16RedIcon,
  XmarkClose24BoldSecondaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import { usePopModal } from "@src/core/KitStoreProvider";
import { Typo } from "@src/core/Typo";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Modal as AntdModal } from "antd";
import React, { useMemo } from "react";

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
    closeIcon,
    footer,
    showCancel = true,
    showOk = true,
    okLoading,
    okButtonProps,
    cancelButtonProps,
    okText,
    cancelText,
    error,
    visible = true,
    isContentFull,
    onCancel,
    onOk,
    ...restProps
  } = props;
  const { t } = useParrotTranslation();
  const popModal = usePopModal();

  const _confirmText = useMemo(() => {
    let text = okText || t("common.confirm");

    return text;
  }, [okText, t]);
  const finalFooter = useMemo(() => {
    return (
      footer || (
        <div className={FooterStyle}>
          <div className={FooterButtonStyle}>
            {footerLeftAction}
            {error && (
              <>
                <span className={cx(ErrorStyle, Typo.Label.l2_regular)}>
                  <ExclamationErrorCircleFill16RedIcon
                    className={ErrorIconStyle}
                  />
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
                {cancelText || t("common.cancel")}
              </Button>
            ) : null}
            {showOk ? (
              <Button
                onClick={(e) => {
                  onOk?.(e);
                }}
                type="primary"
                loading={okLoading}
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
    footerLeftAction,
    _confirmText,
    cancelButtonProps,
    cancelText,
    error,
    footer,
    okButtonProps,
    okLoading,
    onCancel,
    onOk,
    popModal,
    showCancel,
    showOk,
    t,
  ]);

  return (
    <AntdModal
      width="calc(100% - 20px)"
      title={
        <span className={cx(Typo.Display.d1_bold_title, TitleStyle)}>
          {title}
        </span>
      }
      className={cx(
        ImmersiveDialogStyle,
        isContentFull ? FullContentStyle : MultiAreaStyle,
        className,
      )}
      closeIcon={
        closeIcon ?? (
          <span className={CloseIconStyle}>
            <XmarkClose24BoldSecondaryIcon />
          </span>
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
        {isContentFull ? null : <div className="left">{left}</div>}
        <div className="middle">{children}</div>
        {isContentFull ? null : <div className="right">{right}</div>}
      </div>
    </AntdModal>
  );
}

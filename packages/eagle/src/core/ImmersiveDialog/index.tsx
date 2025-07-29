import {
  ArrowChevronLeft16BoldBlueIcon,
  ExclamationErrorCircleFill16RedIcon,
  XmarkClose24BoldSecondaryIcon,
} from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button, { ButtonProps } from "@src/core/Button";
import { usePopModal } from "@src/core/KitStoreProvider";
import Steps from "@src/core/Steps";
import { Typo } from "@src/core/Typo";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import { Modal as AntdModal } from "antd";
import { ModalProps as AntdModalProps } from "antd/lib/modal";
import React, { useEffect, useMemo, useState } from "react";

import {
  BodyStyle,
  CloseIconStyle,
  ErrorStyle,
  FooterButtonRightStyle,
  FooterButtonStyle,
  FooterStyle,
  ImmersiveDialogStyle,
  NormalStyle,
  StepStyle,
  TitleStyle,
  WizardBodyStyle,
  WizardStyle,
} from "./styles";

export type ImmersiveDialogProps = React.PropsWithChildren<
  AntdModalProps & {
    /** 是否为向导模式 */
    wizard?: boolean;
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
    /** 当前步骤 */
    step?: number;
    /** 步骤配置数组 */
    steps?: {
      /** 步骤标题 */
      title: string;
      /** 步骤内容渲染 */
      children: React.ReactNode;
    }[];
    /** 左侧自定义内容 */
    left?: React.ReactNode;
    /** 右侧自定义内容 */
    right?: React.ReactNode;
    /** 错误信息 */
    error?: React.ReactNode;
    /** 是否销毁其他步骤内容 */
    destroyOtherStep?: boolean;
    /** 上一步的文本 */
    prevText?: string;
    /** 上一步的回调 */
    onPrevStep?: (step: number) => void;
    /** 下一步的文本 */
    nextText?: string;
    /** 下一步的回调 */
    onNextStep?: (step: number) => void | boolean;
    /** 步骤改变时的回调 */
    onStepChange?: (step: number) => void;
    /** 确定按钮的回调 */
    onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }
>;

function ImmersiveDialog(props: ImmersiveDialogProps) {
  const {
    className,
    wizard,
    title,
    steps,
    step,
    children,
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
    prevText,
    nextText,
    error,
    visible = true,
    destroyOtherStep,
    onCancel,
    onOk,
    onStepChange,
    onPrevStep,
    onNextStep,
    ...restProps
  } = props;
  const { t } = useParrotTranslation();
  const popModal = usePopModal();
  const [_step, _setStep] = useState(step || 0);

  const stepVal = useMemo(() => step ?? _step, [step, _step]);
  const _confirmText = useMemo(() => {
    let text = okText || t("common.confirm");

    if (steps?.length && wizard) {
      text =
        stepVal < steps.length - 1 ? nextText || t("common.next_step") : text;
    }

    return text;
  }, [okText, t, steps?.length, wizard, stepVal, nextText]);
  const content = useMemo(() => {
    if (wizard) {
      if (destroyOtherStep) {
        return steps?.[stepVal]?.children || children;
      }

      return (
        steps?.map((s, index) => (
          <div
            key={s.title}
            style={{
              display: stepVal === index ? "block" : "none",
              height: "100%",
              width: "100%",
              overflow: "auto",
            }}
          >
            {s.children}
          </div>
        )) || children
      );
    }

    return children;
  }, [wizard, steps, stepVal, children, destroyOtherStep]);
  const finalFooter = useMemo(() => {
    return (
      footer || (
        <div className={FooterStyle}>
          <div className={FooterButtonStyle}>
            {stepVal > 0 ? (
              <Button
                type="link"
                onClick={() => {
                  const newStep = stepVal - 1;

                  _setStep(newStep);
                  onPrevStep?.(newStep);
                  onStepChange?.(newStep);
                }}
              >
                <ArrowChevronLeft16BoldBlueIcon style={{ marginRight: 8 }} />
                {prevText || t("common.prev_step")}
              </Button>
            ) : null}
            {error && (
              <>
                <span className={cx(ErrorStyle, Typo.Label.l2_regular)}>
                  <ExclamationErrorCircleFill16RedIcon
                    style={{ marginRight: 4, flexShrink: 0 }}
                  />
                  <span>{error}</span>
                </span>
              </>
            )}
          </div>
          <div className={FooterButtonRightStyle}>
            {showCancel ? (
              <Button
                type="quiet"
                style={{ fontWeight: "bold" }}
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
                  if (stepVal < (steps?.length || 0) - 1 && wizard) {
                    const newStep = stepVal + 1;
                    const prevent = onNextStep?.(newStep) === false;

                    if (!prevent) {
                      _setStep(newStep);
                      onStepChange?.(newStep);
                    }
                  } else {
                    onOk?.(e);
                  }
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
    _confirmText,
    cancelButtonProps,
    cancelText,
    error,
    footer,
    okButtonProps,
    okLoading,
    onCancel,
    onNextStep,
    onOk,
    onPrevStep,
    onStepChange,
    popModal,
    prevText,
    showCancel,
    showOk,
    stepVal,
    steps?.length,
    t,
    wizard,
  ]);

  useEffect(() => {
    if (step) {
      _setStep(step);
    }
  }, [step]);

  return (
    <AntdModal
      width="calc(100vw - 20px)"
      title={
        <span className={cx(Typo.Display.d1_bold_title, TitleStyle)}>
          {title}
        </span>
      }
      className={cx(
        ImmersiveDialogStyle,
        wizard ? WizardStyle : NormalStyle,
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
      <div className={cx(wizard && WizardBodyStyle, BodyStyle)}>
        {wizard ? (
          <div className="left">
            {left ||
              (steps && steps.length > 0 ? (
                <Steps
                  containerClassname={StepStyle}
                  current={stepVal}
                  onChange={(value) => {
                    _setStep(value);
                    onStepChange?.(value);
                  }}
                  direction="vertical"
                  stepsConfig={steps.map((s) => ({
                    title: s.title,
                  }))}
                />
              ) : null)}
          </div>
        ) : null}
        <div className="middle">{content}</div>
        {wizard ? <div className="right">{right}</div> : null}
      </div>
    </AntdModal>
  );
}

export default ImmersiveDialog;

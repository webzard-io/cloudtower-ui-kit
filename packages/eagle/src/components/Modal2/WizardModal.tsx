import { CheckOutlined } from "@ant-design/icons";
import { parrotI18n } from "@cloudtower/parrot";
import { Steps } from "antd";
import cs from "classnames";
import { isNil } from "lodash";
import React, { useContext, useMemo, useRef } from "react";

import { kitContext, WizardModalType } from "../../spec";
import { FullView, WizardBody } from "../Styled";
import { Typo } from "../Typo";
import BaseModal from "./Modal";
import { FullViewErrorStyle } from "./styled";

const WizardModal: React.FC<WizardModalType> = (props) => {
  const kit = useContext(kitContext);

  const {
    fullscreen = true,
    children,
    onCancel,
    onOk,
    footer,
    footerError,
    showCancel = true,
    showOk = true,
    cancelButtonProps,
    okButtonProps,
    confirmLoading,
    okLoading,
    okText = parrotI18n.t("common.confirm"),
    cancelText = parrotI18n.t("common.cancel"),
    step,
    steps,
    disablePrevStep,
    onStepChange,
    destroyOtherStep,
    right,
    stepsPosition = "side",
    contentError,
    ...wizardModalProps
  } = props;

  /* Set transition className */
  const transitionClass = useRef<
    "modal-zoom" | "modal-send" | "fullscreen-modal" | ""
  >(fullscreen ? "fullscreen-modal" : "modal-zoom");

  const prevText = useMemo(() => {
    let text: React.ReactNode = (
      <span>&lt; {parrotI18n.t("common.prev_step")}</span>
    );

    if (steps[step]) {
      if (typeof steps[step].prevText === "string") {
        text = <span>&lt; {steps[step].prevText}</span>;
      } else if (steps[step].prevText !== undefined) {
        text = steps[step].prevText;
      }
    }

    return text;
  }, [steps, step]);

  const stepsRef = useRef<React.ReactNode[]>([]);
  if (!destroyOtherStep && steps[step]) {
    stepsRef.current[step] = steps[step].render;
  }

  const _okText = useMemo(() => {
    let text = okButtonProps?.children || okText;

    if (steps[step]) {
      text =
        step < steps.length - 1
          ? steps[step].okText || parrotI18n.t("common.next_step")
          : steps[step].okText || text;
    }
    return text;
  }, [okButtonProps, okText, steps, step]);

  const getFooter = () => {
    if (isNil(footer)) {
      return (
        <>
          <div className="modal-footer-left">
            {!disablePrevStep && step !== 0 && (
              <span
                className="prev-step"
                onClick={() => onStepChange?.(step - 1)}
              >
                {prevText}
              </span>
            )}
            {typeof contentError === "string" ? (
              <FullView className={FullViewErrorStyle}>
                <p className={Typo.Display.d2_bold_title}>
                  {parrotI18n.t("common.load_failed")}
                </p>
                <p className={Typo.Label.l1_regular_title}>
                  {parrotI18n.t("common.error_message")}:&nbsp;
                  <span>{contentError}</span>
                </p>
              </FullView>
            ) : (
              contentError
            )}
          </div>
          <div className="modal-footer-btn-group">
            {showCancel && (
              <kit.button
                type="quiet"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  onCancel?.(e);
                  transitionClass.current = fullscreen ? "" : "modal-zoom";
                }}
                className={cs(cancelButtonProps?.className)}
                {...cancelButtonProps}
              >
                {cancelText}
              </kit.button>
            )}
            {showOk && (
              <kit.button
                onClick={(e) => {
                  onOk?.(e);
                  if (steps[step]) {
                    steps[step].onOk?.(e);
                  }
                  transitionClass.current = fullscreen ? "" : "modal-send";
                }}
                type="primary"
                loading={confirmLoading || okLoading}
                {...okButtonProps}
              >
                {_okText}
              </kit.button>
            )}
          </div>
        </>
      );
    }

    return footer;
  };

  if (stepsPosition === "side")
    return (
      <BaseModal
        onCancel={onCancel}
        className={cs(fullscreen && "wizard")}
        fullscreen
        {...wizardModalProps}
        footer={getFooter()}
      >
        <WizardBody>
          <div className="left">
            <Steps
              style={{ minWidth: 192 }}
              current={step}
              onChange={(value) => onStepChange?.(value)}
              direction="vertical"
            >
              {steps.map((s, idx) => (
                <Steps.Step
                  key={idx}
                  title={
                    <>
                      {idx >= step ? (
                        <span className="step-index">{idx + 1}</span>
                      ) : (
                        <CheckOutlined className="step-index" />
                      )}
                      {s.title}
                    </>
                  }
                  disabled={
                    s.disabled ||
                    idx > step ||
                    (disablePrevStep && idx !== step)
                  }
                />
              ))}
            </Steps>
          </div>
          <div className="middle">
            {children}
            {destroyOtherStep
              ? steps[step].render
              : stepsRef.current.map((stepRender, index) => (
                  <div
                    key={index}
                    style={{
                      display: index === step ? "block" : "none",
                    }}
                  >
                    {stepRender}
                  </div>
                ))}
          </div>
          {right && <div className="right">{right}</div>}
        </WizardBody>
      </BaseModal>
    );

  return (
    <BaseModal
      onCancel={onCancel}
      className={cs(fullscreen && "wizard")}
      fullscreen
      {...wizardModalProps}
      footer={getFooter()}
    >
      <div className="horizontal-steps-wrapper">
        <kit.steps
          stepsConfig={steps.map((step) => ({
            disabled: step.disabled,
            title: step.title,
          }))}
          current={step}
          showStepCount
        />
      </div>
      <div className="horizontal-content-wrapper">
        {children}
        {destroyOtherStep
          ? steps[step].render
          : stepsRef.current.map((stepRender, index) => (
              <div
                key={index}
                style={{
                  display: index === step ? "block" : "none",
                }}
              >
                {stepRender}
              </div>
            ))}
      </div>
    </BaseModal>
  );
};

export default WizardModal;

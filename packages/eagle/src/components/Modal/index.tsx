import { XmarkCloseFill24PrimaryIcon } from "@cloudtower/icons-react";
import { Modal as AntdModal } from "antd";
import cs from "classnames";
import React, { useMemo, useRef } from "react";

import useParrotTranslation from "../../hooks/useParrotTranslation";
import { ModalProps } from "../../spec";
import { KitRootState, ModalActions } from "../../store";
import Button from "../Button";
import { useKitDispatch, useKitSelector } from "../KitStoreProvider";
import Steps from "../Steps";
import { WizardBody } from "../Styled";

const Modal: React.FC<ModalProps> = (props) => {
  const { t } = useParrotTranslation();

  const {
    error,
    okText = t("common.confirm"),
    cancelText = t("common.cancel"),
    confirmLoading,
    okButtonProps,
    onOk,
    cancelButtonProps,
    onCancel,
    maskClosable = false,
    normal = true,
    className,
    fullscreen,
    wizard,
    footer,
    width,
    showCancel = true,
    showOk = true,
    afterClose,
    ...restProps
  } = props;

  const stack = useKitSelector<KitRootState["modal"]["stack"]>(
    (state) => state.modal.stack,
  );
  const id = useKitSelector<KitRootState["modal"]["closeId"]>(
    (state) => state.modal.closeId,
  );
  const dispatch = useKitDispatch();

  const idRef = useRef(stack[stack.length - 1]?.id);
  const transitionClass = useRef<
    "modal-zoom" | "modal-send" | "fullscreen-modal" | ""
  >(fullscreen ? "fullscreen-modal" : "modal-zoom");

  const confirmText = useMemo(() => {
    let text = okButtonProps?.children || okText;

    if (wizard && typeof wizard === "object" && wizard.steps[wizard.step]) {
      const { step, steps } = wizard;
      text =
        step < steps.length - 1
          ? steps[step].okText || t("common.next_step")
          : steps[step].okText || text;
    }
    return text;
  }, [okButtonProps?.children, okText, t, wizard]);

  const prevText = useMemo(() => {
    let text: React.ReactNode = <span>&lt; {t("common.prev_step")}</span>;

    if (wizard && typeof wizard === "object" && wizard.steps[wizard.step]) {
      const { step, steps } = wizard;

      if (typeof steps[step].prevText === "string") {
        text = <span>&lt; {steps[step].prevText}</span>;
      } else if (steps[step].prevText !== undefined) {
        text = steps[step].prevText;
      }
    }

    return text;
  }, [t, wizard]);

  const stepsRef = useRef<React.ReactNode[]>([]);

  if (
    wizard &&
    typeof wizard === "object" &&
    !wizard.destroyOtherStep &&
    wizard.steps[wizard.step]
  ) {
    stepsRef.current[wizard.step] = wizard.steps[wizard.step].render;
  }

  return (
    <AntdModal
      maskClosable={maskClosable}
      className={cs(
        className,
        fullscreen && "fullscreen",
        fullscreen && wizard && "wizard",
        !fullscreen && normal && "normal-modal",
      )}
      width={fullscreen ? "calc(100vw - 16px)" : width || (normal ? 460 : "")}
      onCancel={(e) => {
        onCancel?.(e);
        transitionClass.current = fullscreen ? "" : "modal-zoom";
      }}
      closeIcon={<XmarkCloseFill24PrimaryIcon />}
      destroyOnClose
      focusTriggerAfterClose={false}
      transitionName={transitionClass.current}
      {...restProps}
      afterClose={() => {
        afterClose?.();
        dispatch({ type: ModalActions.REMOVE_MODAL, id: idRef.current });
      }}
      visible={idRef.current !== id}
      footer={
        <div className="footer-content">
          {footer === undefined ? (
            <>
              <div className="modal-footer-left">
                {wizard &&
                  typeof wizard === "object" &&
                  !wizard.disablePrevStep &&
                  wizard.step !== 0 && (
                    <span
                      className="prev-step"
                      onClick={() => wizard.onStepChange?.(wizard.step - 1)}
                    >
                      {prevText}
                    </span>
                  )}
                {error && (
                  <>
                    {/* TODO: error may be an element */}
                    {/* <Icon type="exclamation-circle" theme="filled" /> */}
                    <span className="modal-error">{error}</span>
                  </>
                )}
              </div>
              <div className="modal-footer-btn-group">
                {showCancel && (
                  <Button
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
                  </Button>
                )}
                {showOk && (
                  <Button
                    onClick={(e) => {
                      onOk?.(e);
                      if (
                        typeof wizard === "object" &&
                        wizard.steps[wizard.step]
                      ) {
                        wizard.steps[wizard.step].onOk?.(e);
                      }
                      transitionClass.current = fullscreen ? "" : "modal-send";
                    }}
                    type="primary"
                    loading={confirmLoading}
                    {...okButtonProps}
                  >
                    {confirmText}
                  </Button>
                )}
              </div>
            </>
          ) : (
            footer
          )}
        </div>
      }
    >
      {wizard && typeof wizard === "object" ? (
        <WizardBody>
          <div className="left">
            {wizard.hideLeft ? null : (
              <Steps
                current={wizard.step}
                onChange={(value) => wizard.onStepChange?.(value)}
                direction="vertical"
                stepsConfig={wizard.steps.map((s) => ({
                  title: s.title,
                  disabled: s.disabled,
                }))}
              />
            )}
          </div>
          <div className="middle">
            {restProps.children}
            {wizard.destroyOtherStep
              ? wizard.steps[wizard.step].render
              : stepsRef.current.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: index === wizard.step ? "block" : "none",
                    }}
                  >
                    {step}
                  </div>
                ))}
          </div>
          {wizard.right && <div className="right">{wizard.right}</div>}
        </WizardBody>
      ) : (
        restProps.children
      )}
    </AntdModal>
  );
};

export default Modal;

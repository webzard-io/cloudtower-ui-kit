import { ArrowChevronLeft16BoldBlueIcon } from "@cloudtower/icons-react";
import { cx } from "@linaria/core";
import Button from "@src/core/Button";
import { ImmersiveDialog } from "@src/core/ImmersiveDialog";
import Steps from "@src/core/Steps";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React, { useEffect, useMemo, useState } from "react";

import {
  PrevIconStyle,
  RightPanelStyle,
  StepContentStyle,
  StepStyle,
} from "./styles";
import { WizardDialogProps } from "./type";

export function WizardDialog(props: WizardDialogProps) {
  const {
    className,
    steps,
    step,
    children,
    hideSteps,
    destroyOtherStep,
    prevText,
    nextText,
    onPrevStep,
    onNextStep,
    onStepChange,
    left,
    right,
    rightClassName,
    okText,
    onOk,
    "data-testid": dataTestId,
    ...restProps
  } = props;
  const { t } = useParrotTranslation();
  const [_step, _setStep] = useState(step || 0);

  const stepVal = useMemo(() => step ?? _step, [step, _step]);
  const content = useMemo(() => {
    if (destroyOtherStep) {
      return steps?.[stepVal]?.children || children;
    }

    return (
      steps?.map((s, index) => (
        <div
          key={s.title}
          className={StepContentStyle}
          style={{
            display: stepVal === index ? "block" : "none",
          }}
        >
          {s.children}
        </div>
      )) || children
    );
  }, [children, destroyOtherStep, steps, stepVal]);
  const _confirmText = useMemo(() => {
    let text = okText || t("common.confirm");

    if (steps?.length) {
      text =
        stepVal < steps.length - 1 ? nextText || t("common.next_step") : text;
    }

    return text;
  }, [okText, t, steps?.length, stepVal, nextText]);

  useEffect(() => {
    if (step) {
      _setStep(step);
    }
  }, [step]);

  return (
    <ImmersiveDialog
      className={className}
      data-testid={dataTestId}
      footerLeftAction={
        stepVal > 0 ? (
          <Button
            type="link"
            data-testid={dataTestId ? `${dataTestId}-prev` : undefined}
            onClick={() => {
              const newStep = stepVal - 1;

              _setStep(newStep);
              onPrevStep?.(newStep);
              onStepChange?.(newStep);
            }}
          >
            <ArrowChevronLeft16BoldBlueIcon className={PrevIconStyle} />
            {prevText || t("common.prev_step")}
          </Button>
        ) : null
      }
      left={
        left ||
        (steps && steps.length > 0 && !hideSteps ? (
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
              "data-testid": s["data-testid"],
            }))}
          />
        ) : null)
      }
      right={right}
      okText={_confirmText}
      onOk={(e) => {
        if (stepVal < (steps?.length || 0) - 1) {
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
      rightClassName={cx(RightPanelStyle, rightClassName)}
      {...restProps}
      isContentFull={false}
    >
      {content}
    </ImmersiveDialog>
  );
}

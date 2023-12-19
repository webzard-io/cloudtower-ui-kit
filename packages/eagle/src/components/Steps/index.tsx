import { CheckmarkDoneSuccessCorrect16SecondaryIcon } from "@cloudtower/icons-react";
import { Steps as AntdSteps } from "antd";
import { StepProps } from "antd/lib/steps";
import cs from "classnames";
import React, { useLayoutEffect, useRef, useState } from "react";

import { IStepsProps } from "../../spec";
import Tooltip from "../Tooltip";
import {
  HorizontalStepContentStyle,
  HorizontalStyle,
  StepsStyle,
  VerticalStepContentStyle,
  VerticalStyle,
} from "./style";

type StepContentProps = {
  current: number;
  step: StepProps;
  index: number;
  isVerticalMode: boolean;
  preview: boolean;
};

const StepTitle: React.FC<StepContentProps> = (props) => {
  const { current, step, index, isVerticalMode, preview } = props;
  const textRef = useRef<HTMLSpanElement>(null);
  const [tooltipEnable, setTooltipEnable] = useState<{ visible?: boolean }>({
    visible: false,
  });
  const showCompletedIcon = !preview && index < current;

  useLayoutEffect(() => {
    if (
      textRef.current &&
      textRef.current.offsetWidth < textRef.current.scrollWidth
    ) {
      setTooltipEnable({});
    }
  }, [textRef]);

  return (
    <Tooltip {...tooltipEnable} title={step.title}>
      <div
        className={
          isVerticalMode ? VerticalStepContentStyle : HorizontalStepContentStyle
        }
      >
        <span className="step-item-prefix-container">
          {showCompletedIcon ? (
            <CheckmarkDoneSuccessCorrect16SecondaryIcon />
          ) : (
            index + 1
          )}
        </span>
        <span ref={textRef} className="step-item-title">
          <span className="step-item-title">{step.title}</span>
        </span>
      </div>
    </Tooltip>
  );
};

const Steps: React.FC<IStepsProps> = (props) => {
  const {
    stepsConfig,
    direction,
    containerClassname,
    current = 0,
    disabled,
    preview = false,
    ...stepsProps
  } = props;
  const isVerticalMode = direction === "vertical";
  const isPreviewMode = isVerticalMode && preview;

  return (
    <div
      className={cs(
        containerClassname,
        StepsStyle,
        isVerticalMode ? VerticalStyle : HorizontalStyle,
      )}
    >
      <AntdSteps
        {...stepsProps}
        direction={direction}
        current={current}
        type="default"
      >
        {stepsConfig?.length
          ? stepsConfig.map((step, index) => (
              <AntdSteps.Step
                key={index}
                {...step}
                disabled={isPreviewMode ? false : disabled ?? index > current}
                className={cs(
                  step.className,
                  isPreviewMode ? "preview-mode" : "",
                )}
                title={
                  <StepTitle
                    index={index}
                    step={step}
                    current={current}
                    isVerticalMode={isVerticalMode}
                    preview={isPreviewMode}
                  />
                }
              />
            ))
          : props.children}
      </AntdSteps>
    </div>
  );
};

export default Steps;

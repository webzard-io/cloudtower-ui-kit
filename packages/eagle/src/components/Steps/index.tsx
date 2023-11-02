import { CheckmarkDoneSuccessCorrect16SecondaryRegularIcon } from "@cloudtower/icons-react";
import { Steps as AntdSteps } from "antd";
import { StepProps } from "antd/lib/steps";
import cs from "classnames";
import React from "react";

import { IStepsProps } from "../../spec";
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
};

const StepTitle: React.FC<StepContentProps> = (props) => {
  const { current, step, index, isVerticalMode } = props;

  return (
    <div
      className={
        isVerticalMode ? VerticalStepContentStyle : HorizontalStepContentStyle
      }
    >
      <span className="step-item-prefix-container">
        {index < current ? (
          <CheckmarkDoneSuccessCorrect16SecondaryRegularIcon />
        ) : (
          index + 1
        )}
      </span>
      {step.title}
    </div>
  );
};

const Steps: React.FC<IStepsProps> = (props) => {
  const {
    stepsConfig,
    direction,
    containerClassname,
    current = 0,
    disabled,
    ...stepsProps
  } = props;
  const isVerticalMode = direction === "vertical";

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
                disabled={disabled || index > current}
                title={
                  <StepTitle
                    index={index}
                    step={step}
                    current={current}
                    isVerticalMode={isVerticalMode}
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

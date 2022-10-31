import { IStepsPorps } from "@cloudtower/sparrow";
import { styled } from "@linaria/react";
import { Steps as AntdSteps } from "antd";
import { StepProps } from "antd/lib/steps";
import React from "react";

const StepsContainer = styled.div`
  $item: ant-steps-item;
  @mixin rightTriangle($color: $fills-light-trans-1) {
    content: "";
    width: 0;
    height: 0;
    border: 13px solid transparent;
    position: absolute;
    top: 0;
    border-left: 8px solid $color;
  }
  .ant-steps-horizontal.ant-steps-label-horizontal {
    flex-direction: row;
    justify-content: stretch;
    .#{$item} {
      padding: 0;
      margin-right: 4px;
      flex: 1;
      overflow: visible;
      &-tail,
      &-icon {
        display: none;
      }
      .#{$item}-content {
        width: 100%;
        min-height: unset;
        .#{$item}-title {
          height: 26px;
          line-height: 26px;
          width: 100%;
          text-align: center;
          padding: 0;
          font-size: 12px;
          font-weight: normal;
          .step-count {
            margin-right: 10px;
          }
          &::after {
            display: none;
          }
        }
      }
      &:first-child {
        .#{$item}-container {
          border-radius: 4px 0 0 4px;
        }
      }
      &:last-child {
        margin-right: 0;
        .#{$item}-container {
          border-radius: 0 4px 4px 0;
        }
      }
      &:not(&:last-child) {
        &::after {
          @include rightTriangle();
          right: -21px;
          z-index: 2;
        }
      }
      &:not(&:first-child) {
        &::before {
          @include rightTriangle(#fff);
          left: 0;
        }
      }
    }
    .#{$item}-active {
      .#{$item}-container {
        background-color: $fills-light-general-general-light;
      }
      &::after {
        border-left-color: $fills-light-general-general-light !important;
      }
      .#{$item}-title {
        color: $blue-80;
      }
    }
    .#{$item}-wait,
    .#{$item}-finish {
      .#{$item}-container {
        background-color: $fills-light-trans-1;
      }
      .#{$item}-title {
        color: $gray-a60-8;
      }
    }
  }
  .ant-steps:not(.ant-steps-dot):not(.ant-steps-navigation):not(.ant-steps-vertical)
    .#{$item} {
    padding: 0;
  }
`;

const Steps: React.FC<IStepsPorps> = (props) => {
  const { stepsConfig, containerClassname, showStepCount, ...stepsProps } =
    props;

  const titleWithCount = (_step: StepProps, count: number): React.ReactNode => (
    <>
      {showStepCount ? <span className="step-count">{count}</span> : null}
      {_step.title}
    </>
  );

  return (
    <StepsContainer className={containerClassname}>
      <AntdSteps {...stepsProps} type="default">
        {stepsConfig?.length
          ? stepsConfig.map((step, index) => (
              <AntdSteps.Step
                key={index}
                {...step}
                title={titleWithCount(step, index + 1)}
              />
            ))
          : props.children}
      </AntdSteps>
    </StepsContainer>
  );
};

export default Steps;

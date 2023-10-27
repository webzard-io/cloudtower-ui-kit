import { CheckmarkDoneSuccessCorrect16SecondaryIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Steps as AntdSteps } from "antd";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { IStepsProps, StepProps } from "../../spec";
import Truncate from "../Truncate";
import {
  BEFORE_BORDER_WIDTH,
  FIRST_STEP_WITH_ICON_MAX_TEXT_WIDTH,
  MAX_TRUNCATE_LEN,
  NON_TEXT_WIDTH,
  STEP_ITEM_CONTAINER_MIN_WIDTH,
  STEP_SPACE,
} from "./const";

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
  .#{$item}-container {
    min-width: 60px;
  }
  .#{$item}-disabled {
    cursor: not-allowed !important;
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
          div {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            column-gap: 4px;
          }
          height: 26px;
          line-height: 26px;
          width: 100%;
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
          padding-left: 8px;
          padding-right: 4px;
          border-radius: 4px 0 0 4px;
        }
      }
      &:last-child {
        margin-right: 0;
        .#{$item}-container {
          padding-right: 8px;
          padding-left: 12px;
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
      &:not(:first-child):not(:last-child) {
        .#{$item}-container {
          padding: 0 4px 0 12px;
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
        color: $text-colorful-outstanding;
      }
    }
    .#{$item}-finish {
      cursor: pointer;
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
  .ant-steps:not(.ant-steps-dot):not(.ant-steps-navigation):not(
      .ant-steps-vertical
    )
    .#{$item} {
    padding: 0;
  }
`;

const StepContentStyle = css`
  width: 100%;
  .step-item-prefix-container {
    display: inline-flex;
    align-items: center;
    width: 18px;
    height: 18px;
    justify-content: center;
  }
  .step-item-text {
    display: inline-block;
  }
`;

type StepContentProps = {
  showStepCount: boolean;
  current: number;
  step: StepProps;
  index: number;
  len: number;
};

const StepContent: React.FC<StepContentProps> = (props) => {
  const { showStepCount, current, step, index, len } = props;
  const stepRef = useRef(null);
  const count = index + 1;

  return (
    <div className={StepContentStyle} ref={stepRef}>
      {showStepCount ? (
        <span className="step-item-prefix-container">
          {count - 1 < current ? (
            <CheckmarkDoneSuccessCorrect16SecondaryIcon />
          ) : (
            count
          )}
        </span>
      ) : null}
      {len > 0 ? (
        <Truncate
          className="step-item-text"
          text={step.title}
          backLen={0}
          frontLen={len}
          len={len === MAX_TRUNCATE_LEN ? MAX_TRUNCATE_LEN : step.title.length}
        />
      ) : (
        step.title
      )}
    </div>
  );
};

const Steps: React.FC<IStepsProps> = (props) => {
  const {
    stepsConfig,
    containerClassname,
    current: defaultCurrent,
    disabled,
    ...stepsProps
  } = props;
  const [componentWidth, setComponentWidth] = useState(0);
  const [current, setCurrent] = useState(defaultCurrent || 0);

  const stepsRef = useRef<HTMLDivElement>(null);
  const totalStepCount = stepsConfig.length;

  useLayoutEffect(() => {
    const handleResize = () => {
      if (stepsRef.current) {
        const width = stepsRef.current.offsetWidth;
        setComponentWidth(width);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrent(defaultCurrent || 0);
  }, [defaultCurrent]);

  const currentMaxWidth = useMemo(() => {
    const stepWidth = STEP_ITEM_CONTAINER_MIN_WIDTH + STEP_SPACE;
    return componentWidth - (totalStepCount - 1) * stepWidth - NON_TEXT_WIDTH;
  }, [componentWidth, totalStepCount]);

  const StepItemLens = useMemo(() => {
    if (componentWidth) {
      const averageStepWidth =
        (componentWidth - STEP_SPACE * (totalStepCount - 1)) / totalStepCount;
      const virtualElement = document.createElement("div");
      virtualElement.style.visibility = "hidden";
      virtualElement.style.position = "absolute";
      virtualElement.style.whiteSpace = "nowrap";
      virtualElement.style.font = window
        .getComputedStyle(stepsRef.current!)
        .getPropertyValue("font");
      virtualElement.style.fontSize = "12px";
      document.body.appendChild(virtualElement);

      let currentStepTextWidth = averageStepWidth - NON_TEXT_WIDTH;
      let otherStepTextWidth = averageStepWidth - NON_TEXT_WIDTH;

      if (current >= 0 && current <= totalStepCount - 1) {
        const currentStepContent = (stepsConfig || [])[current || 0].title;
        virtualElement.textContent = currentStepContent as string;
        const currentStepContentWidth = virtualElement.offsetWidth;

        // 极端情况
        if (currentStepContentWidth > currentMaxWidth) {
          currentStepTextWidth = currentMaxWidth;
          otherStepTextWidth = FIRST_STEP_WITH_ICON_MAX_TEXT_WIDTH;
        } else if (currentStepContentWidth > currentStepTextWidth) {
          // 如果 current step 展示内容大于平均宽度，需要计算剩余 step 可用的宽度
          currentStepTextWidth = currentStepContentWidth;
          let currentStepWidth = currentStepContentWidth + NON_TEXT_WIDTH + 4;
          if (current === 0) {
            currentStepWidth = currentStepContentWidth + NON_TEXT_WIDTH;
          } else if (current === totalStepCount - 1) {
            currentStepWidth = currentStepContentWidth + NON_TEXT_WIDTH + 8;
          }
          otherStepTextWidth =
            (componentWidth - currentStepWidth) / (totalStepCount - 1) -
            NON_TEXT_WIDTH;
        }
      }

      // 获取需要截取的字符长度
      const getLen = (maxLen: number, content: string) => {
        virtualElement.textContent = content;
        const textWidth = virtualElement.offsetWidth;
        // 不需要截取
        if (textWidth <= maxLen) {
          return MAX_TRUNCATE_LEN;
        }

        let start = 0;
        let end = maxLen;
        let mid;
        while (start <= end) {
          mid = Math.floor((start + end) / 2);
          const truncatedText = content.slice(0, mid) + "...";
          virtualElement.textContent = truncatedText;
          const textWidth = virtualElement.offsetWidth;
          if (maxLen >= textWidth) {
            start = mid + 1;
          } else {
            end = mid - 1;
          }
        }
        return end;
      };
      const stepItemLens = stepsConfig?.map((step, idx) => {
        if (idx === current) {
          return getLen(currentStepTextWidth, step.title);
        } else {
          if (idx === 0) return getLen(otherStepTextWidth, step.title);
          if (idx === stepsConfig.length - 1)
            // 最后一个 Step 需要在第一个 Step 文字宽度的基础上减去凹陷区域宽度
            return getLen(otherStepTextWidth - BEFORE_BORDER_WIDTH, step.title);
          // 非两侧的 Step 因为两边间距都为 4，所以需要在第一个 Step 文字宽度的基础上加上多减去的 4px 边距，同时减去凹陷区域宽度
          return getLen(
            otherStepTextWidth + 4 - BEFORE_BORDER_WIDTH,
            step.title,
          );
        }
      });
      document.body.removeChild(virtualElement);
      return stepItemLens;
    }
    return [];
  }, [componentWidth, current, currentMaxWidth, stepsConfig, totalStepCount]);

  return (
    <StepsContainer ref={stepsRef} className={containerClassname}>
      <AntdSteps {...stepsProps} current={current} type="default">
        {stepsConfig?.length
          ? stepsConfig.map((step, index) => {
              return (
                <AntdSteps.Step
                  key={index}
                  {...step}
                  {...(index < current &&
                    !disabled && {
                      onClick: () => {
                        setCurrent(index);
                      },
                    })}
                  disabled={disabled || index > current}
                  title={
                    <StepContent
                      showStepCount
                      index={index}
                      step={step}
                      current={current}
                      len={StepItemLens[index]}
                    />
                  }
                />
              );
            })
          : props.children}
      </AntdSteps>
    </StepsContainer>
  );
};

export default Steps;

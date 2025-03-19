// eslint-disable react-hooks/rules-of-hooks
import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Button } from "antd";
import { Show } from "@src/coreX/Show";
import { css, cx } from "@linaria/core";
import { Typo } from "@src/core/Typo";

/**
 * * Show 条件渲染组件
 * * 根据条件决定显示内容还是备用内容
 * * 提供了一种声明式的方式来替代 JSX 中的条件渲染
 * * 支持布尔值条件和函数条件
 */
const meta = {
  component: Show,
  title: "CoreX/Show | 条件渲染",
};

export default meta;

type Story = StoryObj<typeof Show>;

// 示例样式
const ContentStyle = css`
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
`;

const SuccessContentStyle = css`
  background-color: $fills-light-positive-positive-light;
  color: $text-light-positive;
`;

const WarningContentStyle = css`
  background-color: $fills-light-notice-notice-light;
  color: $text-light-notice;
`;

const InfoContentStyle = css`
  background-color: $fills-light-general-general-light;
  color: $text-light-general;
`;

const DisableStyle = css`
  background-color: $fills-light-trans-3;
  color: $text-light-tertiary;
`;

/*
 * 基础用法 - 条件为 true
 */
export const BasicTrue: Story = {
  name: "基础用法 - 显示内容",
  args: {
    condition: true,
    children: (
      <div
        className={cx(ContentStyle, InfoContentStyle, Typo.Label.l3_regular)}
      >
        这是当条件为 true 时显示的内容
      </div>
    ),
    fallback: (
      <div className={cx(ContentStyle, DisableStyle, Typo.Label.l3_regular)}>
        这是当条件为 false 时显示的备用内容
      </div>
    ),
  },
};

/*
 * 基础用法 - 条件为 false
 */
export const BasicFalse: Story = {
  name: "基础用法 - 显示备用内容",
  args: {
    condition: false,
    children: (
      <div
        className={cx(ContentStyle, InfoContentStyle, Typo.Label.l3_regular)}
      >
        这是当条件为 true 时显示的内容
      </div>
    ),
    fallback: (
      <div className={cx(ContentStyle, DisableStyle, Typo.Label.l3_regular)}>
        这是当条件为 false 时显示的备用内容
      </div>
    ),
  },
};

/*
 * 函数条件用法
 */
export const FunctionCondition: Story = {
  name: "函数条件用法",
  args: {
    condition: () => Math.random() > 0.5, // 随机返回 true 或 false
    children: (
      <div
        className={cx(ContentStyle, SuccessContentStyle, Typo.Label.l3_regular)}
      >
        这是由函数条件决定显示的内容（刷新页面查看不同结果）
      </div>
    ),
    fallback: (
      <div
        className={cx(ContentStyle, WarningContentStyle, Typo.Label.l3_regular)}
      >
        这是由函数条件决定显示的备用内容（刷新页面查看不同结果）
      </div>
    ),
  },
};

/*
 * 无备用内容
 */
export const NoFallback: Story = {
  name: "无备用内容",
  args: {
    condition: false,
    children: (
      <div
        className={cx(ContentStyle, InfoContentStyle, Typo.Label.l3_regular)}
      >
        这是条件为 true 时显示的内容
      </div>
    ),
    // 不提供 fallback，将显示空内容
  },
};

/*
 * 交互示例
 */
export const Interactive = {
  name: "交互示例",
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
      <div>
        <Button
          type="primary"
          onClick={() => setIsVisible(!isVisible)}
          style={{ marginBottom: 16 }}
        >
          切换显示状态
        </Button>

        <Show
          condition={isVisible}
          fallback={
            <div
              className={cx(
                ContentStyle,
                WarningContentStyle,
                Typo.Label.l3_regular,
              )}
            >
              当前内容已隐藏，点击按钮可以重新显示内容。
            </div>
          }
        >
          <div
            className={cx(
              ContentStyle,
              SuccessContentStyle,
              Typo.Label.l3_semibold,
            )}
          >
            这是一段很长的内容，用于测试在各种条件下组件的表现。此内容只有在条件为真时才会显示。
            你可以通过点击上面的按钮来切换此内容的显示状态，体验组件的交互效果。
          </div>
        </Show>
      </div>
    );
  },
};

/*
 * 复杂嵌套用法
 */
export const NestedShows = {
  name: "复杂嵌套用法",
  render: () => {
    const [level, setLevel] = useState(1);

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            onClick={() => setLevel(1)}
            type={level === 1 ? "primary" : "default"}
            style={{ marginRight: 8 }}
          >
            级别 1
          </Button>
          <Button
            onClick={() => setLevel(2)}
            type={level === 2 ? "primary" : "default"}
            style={{ marginRight: 8 }}
          >
            级别 2
          </Button>
          <Button
            onClick={() => setLevel(3)}
            type={level === 3 ? "primary" : "default"}
          >
            级别 3
          </Button>
        </div>

        <Show condition={level >= 1}>
          <div
            className={cx(
              ContentStyle,
              InfoContentStyle,
              Typo.Label.l3_regular,
            )}
          >
            <p className={Typo.Label.l3_semibold}>级别 1 内容</p>
            <Show condition={level >= 2}>
              <div
                className={cx(
                  ContentStyle,
                  SuccessContentStyle,
                  Typo.Label.l3_regular,
                )}
              >
                <p className={Typo.Label.l3_semibold}>级别 2 内容</p>
                <Show condition={level >= 3}>
                  <div
                    className={cx(
                      ContentStyle,
                      WarningContentStyle,
                      Typo.Label.l3_regular,
                    )}
                  >
                    <p className={Typo.Label.l3_semibold}>级别 3 内容</p>
                    <p>这是最深层级的内容，只有在级别 3 时显示。</p>
                  </div>
                </Show>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    );
  },
};

/*
 * 与其它组件结合使用
 */
export const CombinedWithOtherComponents = {
  name: "与其它组件结合使用",
  render: () => {
    const [hasData, setHasData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoad = () => {
      setIsLoading(true);

      // 模拟加载数据
      setTimeout(() => {
        setHasData(true);
        setIsLoading(false);
      }, 1500);
    };

    const handleReset = () => {
      setHasData(false);
    };

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={handleLoad}
            loading={isLoading}
            disabled={hasData || isLoading}
            style={{ marginRight: 8 }}
          >
            加载数据
          </Button>
          <Button onClick={handleReset} disabled={!hasData || isLoading}>
            重置
          </Button>
        </div>

        <Show condition={isLoading}>
          <div
            className={cx(
              ContentStyle,
              InfoContentStyle,
              Typo.Label.l3_regular,
            )}
          >
            数据加载中，请稍候...
          </div>
        </Show>
        {!isLoading && (
          <Show condition={hasData}>
            <div
              className={cx(
                ContentStyle,
                SuccessContentStyle,
                Typo.Label.l3_regular,
              )}
            >
              <p className={Typo.Heading.h2_bold_title}>数据加载成功</p>
              <p>这里是加载的数据内容，可以是表格、列表或其他内容展示形式。</p>
              <p>在实际应用中，这里可能会渲染从后端获取的数据。</p>
            </div>
            <div
              className={cx(ContentStyle, DisableStyle, Typo.Label.l3_regular)}
            >
              <p className={Typo.Heading.h2_regular_title}>暂无数据</p>
              <p>点击"加载数据"按钮加载内容</p>
            </div>
          </Show>
        )}
      </div>
    );
  },
};

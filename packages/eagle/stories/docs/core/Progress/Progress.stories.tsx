import { css } from "@linaria/core";
import Progress from "@src/core/Progress";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

type Story = StoryObj<React.FC<ProgressProps>>;

/**
 * 基础进度条，表明事物正在加载的状态与进度，用于渲染或加载数据时间较长的场景。
 *
 * 基础进度条宽度默认为 220px
 */
const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/Progress | 进度条/BaseProgress | 基础进度条",
  component: Progress,
  decorators: [
    (Story) => {
      return (
        <div
          className={css`
            width: 600px;
            display: flex;
            row-gap: 20px;
            flex-direction: column;
            padding-bottom: 40px;
          `}
        >
          {<Story />}
        </div>
      );
    },
  ],

  parameters: {
    controls: { include: ["status", "indeterminate", "percent", "size"] },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A8292&mode=dev",
    },
  },
};

export const Base: Story = {
  name: "Variants | 变体",
  render: (props) => {
    return (
      <>
        <div
          className={css`
            width: 350px;
            > div {
              display: flex;
              span {
                flex: 1;
              }
            }
          `}
        >
          <Title>Small</Title>
          <div>
            <span>In Progress</span>
            <Progress type="base" percent={50} status="active" />
          </div>
          <div>
            <span>Success</span>
            <Progress type="base" percent={100} status="success" />
          </div>
          <div>
            <span>Failed</span>
            <Progress type="base" percent={50} status="failed" />
          </div>
          <div>
            <span>Notice / Paused</span>
            <Progress type="base" percent={50} status="paused" />
          </div>
          <div>
            <span>Not Start</span>
            <Progress type="base" percent={0} status="active" />
          </div>
          <div>
            <span>Indeterminate</span>
            <Progress indeterminate type="base" percent={0} status="active" />
          </div>
        </div>

        <div
          className={css`
            width: 350px;
            > div {
              display: flex;
              span {
                flex: 1;
              }
            }
          `}
        >
          <Title>Large</Title>
          <div>
            <span>In Progress</span>
            <Progress size="large" type="base" percent={50} status="active" />
          </div>
          <div>
            <span>Success</span>
            <Progress size="large" type="base" percent={100} status="success" />
          </div>
          <div>
            <span>Failed</span>
            <Progress size="large" type="base" percent={50} status="failed" />
          </div>
          <div>
            <span>Notice / Paused</span>
            <Progress size="large" type="base" percent={50} status="paused" />
          </div>
          <div>
            <span>Not Start</span>
            <Progress size="large" type="base" percent={0} status="active" />
          </div>
          <div>
            <span>Indeterminate</span>
            <Progress
              size="large"
              indeterminate
              type="base"
              percent={0}
              status="active"
            />
          </div>
        </div>
      </>
    );
  },
  args: {},
  parameters: {
    controls: { include: [] },
  },
};

/**
 *
 * 当指定 indeterminate 为 true 时，表示进度不明确，此时没有具体进度，仅表示事物正在加载
 *
 * 设置 indeterminate 后，status、percent 等参数均会失效
 *
 * 参考[Loading Progress Indicator](https://www.figma.com/file/xfGf2oCgsi1s2EvFPNyJd8/Pattern%EF%BC%9A%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81?node-id=788%3A22232&mode=dev)
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    type: "base",
  },
};

export default meta;

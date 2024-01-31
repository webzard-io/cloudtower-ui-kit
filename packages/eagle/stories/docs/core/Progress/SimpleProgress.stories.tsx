import { css } from "@linaria/core";
import { Progress } from "@src/core/Progress";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

type Story = StoryObj<React.FC<ProgressProps>>;

const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/Progress | 进度条/SimpleProgress | 简单进度条",
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
    controls: { include: ["status", "percent", "size"] },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A7869&mode=dev",
    },
  },
};

export default meta;

/**
 * 简单进度条有 Single Row 和 Double Rows 两种布局情况
 */
export const Basic: Story = {
  name: "Basic | 布局",
  render: (props) => {
    return (
      <>
        <Progress
          leftTop="3.35 GiB / 5.36 GiB"
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          {...props}
        />
        <Progress
          rightBottom={["3.35 GiB / 5.36 GiB"]}
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          {...props}
        />
      </>
    );
  },
  args: {
    status: "active",
    percent: 12,
    size: "small",
  },
};

/**
 * 容器宽度不足时，Step name 截断打点（…）；Hover 显示 Tooltip，在 Tooltip 内展示完整 Step name。
 */
export const Simple: Story = {
  name: "Truncate | 溢出截断",
  args: {
    rightBottom: [],
    leftTop: exampleContent,
    leftBottom: ["1.21 MiB/s", "剩余 25 分钟"],
    percent: 12,
    status: "active",
  },
  argTypes: {},
};

export const Variants: Story = {
  name: "Variants | 变体",
  render: (props) => {
    return (
      <>
        <Title>Single Row</Title>
        <Progress
          {...props}
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          rightBottom={["3.35 GiB / 5.36 GiB"]}
          status="active"
        />
        <Progress
          {...props}
          leftBottom={["已暂停"]}
          rightBottom={["3.35 GiB / 5.36 GiB"]}
          status="paused"
        />
        <Title>Double Rows</Title>
        <Progress
          {...props}
          leftTop="3.35 GiB / 5.36 GiB"
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          status="active"
        />
        <Progress
          {...props}
          leftTop="3.35 GiB / 5.36 GiB"
          leftBottom={["已暂停"]}
          status="paused"
        />
        <Progress
          {...props}
          leftTop="step name"
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          status="active"
        />
        <Progress
          {...props}
          leftTop="step name"
          leftBottom={["已暂停"]}
          status="paused"
        />
        <Progress
          {...props}
          leftTop="step name"
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          status="active"
        />
        <Progress
          {...props}
          leftTop="step name"
          leftBottom={["1.21 MiB/s", "剩余 25 分钟"]}
          status="paused"
        />
      </>
    );
  },
  parameters: {
    controls: { include: ["percent", "size"] },
  },
  args: {
    percent: 12,
    size: "small",
  },
};

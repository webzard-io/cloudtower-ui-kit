import {
  LogCollection16GrayIcon,
  Placeholder16Icon,
  PoweroffShutdownStop16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Progress from "@src/core/Progress";
import { Area, TitleArea } from "@src/core/Progress/Area";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";

type Story = StoryObj<React.FC<ProgressProps>>;

const exampleContent = loremIpsum({
  count: 1,
  units: "paragraphs",
});

const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/Progress | 进度条/RichProgress | 富格式进度条",
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
    design: {
      type: "figma",
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A7968&mode=dev",
    },
  },
};

export default meta;

export const Basic: Story = {
  name: "Basic | 构成",
  args: {
    type: "rich",
    leftTop: (
      <TitleArea tag={{ children: "Label" }} subtitle="Label" title="Label" />
    ),
    rightTop: (
      <Area
        items={[
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "link",
            children: "Label",
          },
        ]}
      />
    ),
    leftBottom: ["Label", "Label", "Label"],
    rightBottom: (
      <Area
        items={[
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "link",
            children: "Label",
          },
        ]}
      />
    ),
    percent: 50,
    status: "active",
  },
};

/**
 * 空间不足时，leftTop 区域会按**Title 占剩余空间的 2/3，Subtitle 占 1/3**的方式截断打点（…）；
 *
 * Hover 被截断的对象，在 Tooltip 内显示完整文案。
 */
export const TruncateTitle: StoryObj<{}> = {
  name: "Truncate | Title 溢出截断",
  args: {
    type: "rich",
    leftTop: (
      <TitleArea
        tag={{ children: "Label" }}
        subtitle={exampleContent}
        title={exampleContent}
      />
    ),
    leftBottom: ["Label", "Label", "Label"],
    rightTop: (
      <Area
        items={[
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "link",
            children: "Label",
          },
        ]}
      />
    ),
    percent: 50,
    status: "active",
    rightBottom: (
      <Area
        items={[
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "iconField",
            children: "Label",
            src: Placeholder16Icon,
          },
          {
            type: "link",
            children: "Label",
          },
        ]}
      />
    ),
  },
};

/**
 * 空间不足时，leftBottom 区域也会进行溢出截断，如果 rightBottom 有内容，则超出一行溢出，如果 rightBottom 无内容，则超出两行溢出
 */
export const TruncateDescription: StoryObj<{}> = {
  name: "Truncate | Description 溢出截断",
  render: () => {
    return (
      <>
        <Progress
          type="rich"
          leftTop={
            <TitleArea
              tag={{ children: "Label" }}
              subtitle="Label"
              title="Label"
            />
          }
          leftBottom={[
            loremIpsum({
              count: 2,
              units: "paragraphs",
            }),
          ]}
          rightTop={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "Label",
                  src: Placeholder16Icon,
                },
                {
                  type: "link",
                  children: "Label",
                },
              ]}
            />
          }
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          leftTop={
            <TitleArea
              tag={{ children: "Label" }}
              subtitle="Label"
              title="Label"
            />
          }
          rightBottom={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "Label",
                  src: Placeholder16Icon,
                },
                {
                  type: "iconField",
                  children: "Label",
                  src: Placeholder16Icon,
                },
                {
                  type: "link",
                  children: "Label",
                },
              ]}
            />
          }
          leftBottom={[exampleContent]}
          rightTop={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "Label",
                  src: Placeholder16Icon,
                },
                {
                  type: "link",
                  children: "Label",
                },
              ]}
            />
          }
          percent={50}
          status="active"
        />
      </>
    );
  },
};

/**
 * 各变体内部，均支持上述 optional 的构成元素。以下列出常见情况：
 */
export const Variants: StoryObj<{}> = {
  name: "Variants | 变体",
  render: () => {
    const OperationProgress = () => {
      const [status, setStatus] = useState<ProgressProps["status"]>("active");

      return (
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightTop={
            <Area
              items={[
                {
                  status,
                  type: "iconField",
                  children: status,
                },
              ]}
            />
          }
          rightBottom={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "停止",
                  src: PoweroffShutdownStop16GradientGrayIcon,
                  className: css`
                    &:hover {
                      cursor: pointer;
                    }
                  `,
                  onClick: () => {
                    setStatus("failed");
                  },
                },
                {
                  type: "iconField",
                  children: "查看日志",
                  src: LogCollection16GrayIcon,
                },
              ]}
            />
          }
          percent={50}
          status={status}
        />
      );
    };

    return (
      <>
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label"]}
          rightTop={"Label"}
          percent={0}
          status="active"
        />
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightBottom={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "Label",
                  src: Placeholder16Icon,
                },
              ]}
            />
          }
          rightTop={
            <Area
              items={[
                {
                  status: "active",
                  type: "iconField",
                  children: "Label",
                },
              ]}
            />
          }
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightTop={
            <Area
              items={[
                {
                  status: "success",
                  type: "iconField",
                  children: "Label",
                },
              ]}
            />
          }
          percent={100}
          status="success"
        />
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightTop={
            <Area
              items={[
                {
                  status: "failed",
                  type: "iconField",
                  children: "Label",
                },
              ]}
            />
          }
          percent={50}
          status="failed"
        />
        <Progress
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightTop={
            <Area
              items={[
                {
                  status: "paused",
                  type: "iconField",
                  children: "Label",
                },
                {
                  type: "link",
                  children: "Label",
                },
              ]}
            />
          }
          percent={100}
          status="paused"
        />
      </>
    );
  },
  args: {},
  argTypes: {},
};

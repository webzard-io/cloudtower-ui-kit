import {
  LogCollection16GrayIcon,
  PoweroffShutdownStop16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Progress from "@src/core/Progress";
import { Area, TitleArea } from "@src/core/Progress/Area";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Meta, StoryObj } from "@storybook/react";
import { Progress as AProgress } from "antd5";
import { loremIpsum } from "lorem-ipsum";
import React from "react";
const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/Progress",
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
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A8292&mode=dev",
    },
  },
};

export const Basic: StoryObj<{}> = {
  render: () => {
    return (
      <>
        {(["success", "failed", "paused", "active"] as const).map((status) => {
          return (
            <div>
              <div>
                <Progress type="base" percent={100} status={status} />
                <Progress
                  type="base"
                  size="large"
                  percent={100}
                  status={status}
                />
              </div>
              <div>
                <Progress type="base" percent={50} status={status} />
                <Progress
                  type="base"
                  size="large"
                  percent={50}
                  status={status}
                />
              </div>
            </div>
          );
        })}
      </>
    );
  },
  args: {},
  argTypes: {},
};

/**
 * 简单进度条
 */
export const Simple: StoryObj<{}> = {
  name: "Simple | 简单进度条",
  render: () => {
    return (
      <>
        <AProgress percent={100} />
        <Progress
          title="3.35 GiB / 5.36 GiB"
          operation={[]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          title="3.35 GiB / 5.36 GiB"
          operation={[]}
          description={["已暂停"]}
          percent={12}
          status="paused"
        />

        <Progress
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          operation={["3.35 GiB / 5.36 GiB"]}
          percent={12}
          status="active"
        />
        <Progress
          description={["已暂停"]}
          operation={["3.35 GiB / 5.36 GiB"]}
          percent={12}
          status="paused"
        />

        <Progress
          title="step name"
          operation={[]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          title="step name"
          operation={["3.35 GiB / 5.36 GiB"]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          title={exampleContent}
          operation={[]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
      </>
    );
  },
  args: {},
  argTypes: {},
};

/**
 * 富格式进度条可以展示更丰富的内容
 */
export const Rich: StoryObj<{}> = {
  name: "Rich | 富格式进度条",
  render: () => {
    return (
      <>
        <AProgress percent={100} />
        <Progress
          type="rich"
          title="Label"
          description={["label"]}
          statusText={"Not Start"}
          percent={0}
          status="active"
        />
        <Progress
          type="rich"
          title="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "active",
                  type: "iconField",
                  content: "Loading",
                },
              ]}
            />
          }
          operation={
            <Area
              items={[
                {
                  type: "iconField",
                  content: "停止",
                  src: PoweroffShutdownStop16GradientGrayIcon,
                },
                {
                  type: "iconField",
                  content: "查看日志",
                  src: LogCollection16GrayIcon,
                },
              ]}
            />
          }
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          title="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "success",
                  type: "iconField",
                  content: "Succeeded",
                },
              ]}
            />
          }
          percent={100}
          status="success"
        />
        <Progress
          type="rich"
          title="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "failed",
                  type: "iconField",
                  content: "Failed",
                },
              ]}
            />
          }
          percent={50}
          status="failed"
        />
        <Progress
          type="rich"
          title="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "paused",
                  type: "iconField",
                  content: "Paused",
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

        <Progress
          type="rich"
          title="Label"
          description={["label"]}
          statusText={"active"}
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          title="Label"
          description={["label"]}
          statusText={"active"}
          percent={100}
          status="active"
        />
        <Progress
          type="rich"
          title={
            <TitleArea
              tag={{ children: "Tag", color: "blue" }}
              subtitle="Subtitle"
              title="Label"
            />
          }
          description={["label1", "label2", "label3"]}
          statusText="In Progress"
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          title={
            <TitleArea
              tag={{ children: "Tag", color: "blue" }}
              subtitle={exampleContent}
              title={exampleContent}
            />
          }
          description={["label1", "label2", "label3"]}
          statusText="In Progress"
          percent={50}
          status="active"
        />

        {/* <Progress type='rich' title='Label' statusText='Succeeded' percent={100} status='Success' />
            <Progress type='rich' title='Label' statusText='Failed' percent={50} status='Failed' />
            <Progress type='rich' title='Label' statusText='Paused' percent={100} status='Paused' /> */}
      </>
    );
  },
  args: {},
  argTypes: {},
};

export default meta;

import {
  LogCollection16GrayIcon,
  PoweroffShutdownStop16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Progress from "@src/core/Progress";
import { Area, InfoArea } from "@src/core/Progress/Area";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/Progress | 进度条",
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
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A8292&mode=dev",
    },
  },
};

/**
 * 基础进度条，表明事物正在加载的状态与进度
 *
 * 进度条宽度默认为 220px，处于 active 时会有动效，参考：[加载状态](https://www.figma.com/file/xfGf2oCgsi1s2EvFPNyJd8/Pattern%EF%BC%9A%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81?node-id=788%3A22232&mode=dev)
 */
export const Base: StoryObj<{}> = {
  name: "Base | 基础进度条",
  render: () => {
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
        </div>
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
        <Progress
          info="3.35 GiB / 5.36 GiB"
          operation={[]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          info="3.35 GiB / 5.36 GiB"
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
          info="step name"
          operation={[]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          info="step name"
          operation={["3.35 GiB / 5.36 GiB"]}
          description={["1.21 MiB/s", "剩余 25 分钟"]}
          percent={12}
          status="active"
        />
        <Progress
          info={exampleContent}
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
        <Progress
          type="rich"
          info="Label"
          description={["label"]}
          statusText={"Not Start"}
          percent={0}
          status="active"
        />
        <Progress
          type="rich"
          info="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "active",
                  type: "iconField",
                  children: "Loading",
                },
              ]}
            />
          }
          operation={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "停止",
                  src: PoweroffShutdownStop16GradientGrayIcon,
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
          status="active"
        />
        <Progress
          type="rich"
          info="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "success",
                  type: "iconField",
                  children: "Succeeded",
                },
              ]}
            />
          }
          percent={100}
          status="success"
        />
        <Progress
          type="rich"
          info="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "failed",
                  type: "iconField",
                  children: "Failed",
                },
              ]}
            />
          }
          percent={50}
          status="failed"
        />
        <Progress
          type="rich"
          info="Label"
          description={["label", "label"]}
          statusText={
            <Area
              items={[
                {
                  status: "paused",
                  type: "iconField",
                  children: "Paused",
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
          info="Label"
          description={["label"]}
          statusText={"active"}
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          info="Label"
          description={["label"]}
          statusText={"active"}
          percent={100}
          status="active"
        />
        <Progress
          type="rich"
          info={
            <InfoArea
              tag={{ children: "Tag" }}
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
          info={
            <InfoArea
              tag={{ children: "Tag" }}
              subtitle={exampleContent}
              title={exampleContent}
            />
          }
          description={["label1", "label2", "label3"]}
          statusText="In Progress"
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          info={
            <InfoArea
              tag={{ children: "Tag" }}
              subtitle="Subtitle"
              title="Title"
            />
          }
          description={[exampleContent]}
          statusText="In Progress"
          percent={50}
          status="active"
        />
        <Progress
          type="rich"
          info={
            <InfoArea
              tag={{ children: "Tag" }}
              subtitle="Subtitle"
              title="Title"
            />
          }
          operation={
            <Area
              items={[
                {
                  type: "iconField",
                  children: "停止",
                  src: PoweroffShutdownStop16GradientGrayIcon,
                },
                {
                  type: "iconField",
                  children: "查看日志",
                  src: LogCollection16GrayIcon,
                },
              ]}
            />
          }
          description={[exampleContent]}
          statusText="In Progress"
          percent={50}
          status="active"
        />
        {/* <Progress type='rich' info='Label' statusText='Succeeded' percent={100} status='Success' />
            <Progress type='rich' info='Label' statusText='Failed' percent={50} status='Failed' />
            <Progress type='rich' info='Label' statusText='Paused' percent={100} status='Paused' /> */}
      </>
    );
  },
  args: {},
  argTypes: {},
};

export default meta;

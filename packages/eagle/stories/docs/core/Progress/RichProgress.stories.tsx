import { Placeholder16Icon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Progress from "@src/core/Progress";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Area, TitleArea } from "@src/core/Progress/progress.widgets";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

type Story = StoryObj<React.FC<ProgressProps>>;

const exampleContent = loremIpsum({
  count: 1,
  units: "paragraphs",
});

/**
 * 富格式进度条支持四个可定制的区域，用于描述更丰富的进度信息
 */
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
    controls: { include: ["status", "percent", "size"] },
    // https://github.com/storybookjs/storybook/issues/19575
    docs: { source: { type: "code" } },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A7968&mode=dev",
    },
  },
};

export default meta;

/**
 * Rich Progress 由 Base Progress 和上下左右四个可定制部分组成，它们分别是：
 *
 * - leftTop：展示 Title 相关的内容，Title 是必须的，如果需要 Tag+Title+Subtitle 的组合，可以使用 TitleArea 组件，参考 Widgets 部分
 *
 * - rightTop：展示 Status 相关的内容，表明状态的 status 部分是必须的，由 icon + text 组成，如果不需要 icon，可以直接传递 string 给 rightTop，如果需要配置 icon 请使用 Widgets 提供的 iconFiled
 *
 * - leftBottom：通常用于展示一些描述信息，直接传递字符串数组会通过 「·」 进行连接，可以满足大部分场景。也支持通过 Area 或者自己定制
 *
 * - rightBottom：通常展示一些操作相关的内容，支持通过 Area 或者自己定制
 *
 * 需要特别注意设计稿上 Icon 后跟的是 Link 文本(有 hover 样式)还是只读文本，前者对应 Widgets 中的 Link 组件，后者对应 IconField 组件
 */
export const Basic: Story = {
  name: "Basic | 构成",
  args: {
    type: "rich",
    size: "small",
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
            type: "link",
            children: "Label",
            prefixIcon: <Placeholder16Icon />,
          },
          {
            type: "link",
            children: "Label",
            prefixIcon: <Placeholder16Icon />,
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
export const TruncateTitle: Story = {
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
            type: "link",
            children: "Label",
            prefixIcon: <Placeholder16Icon />,
          },
          {
            type: "link",
            children: "Label",
            prefixIcon: <Placeholder16Icon />,
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
export const TruncateDescription: Story = {
  name: "Truncate | Description 溢出截断",
  render: (props) => {
    return (
      <>
        <Progress
          {...props}
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
        />
        <Progress
          {...props}
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
                  type: "link",
                  children: "Label",
                  prefixIcon: <Placeholder16Icon />,
                },
                {
                  type: "link",
                  children: "Label",
                  prefixIcon: <Placeholder16Icon />,
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
        />
      </>
    );
  },
  args: {
    size: "small",
    percent: 50,
    status: "active",
  },
};

/**
 * 各变体内部，均支持上述 optional 的构成元素。以下列出常见情况：
 */
export const Variants: Story = {
  name: "Variants | 变体",
  render: (props) => {
    return (
      <>
        <Progress
          {...props}
          type="rich"
          leftTop="Label"
          leftBottom={["Label"]}
          rightTop={"Label"}
          percent={0}
          status="active"
        />
        <Progress
          {...props}
          type="rich"
          leftTop="Label"
          leftBottom={["Label", "Label"]}
          rightBottom={
            <Area
              items={[
                {
                  type: "link",
                  children: "Label",
                  prefixIcon: <Placeholder16Icon />,
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
          {...props}
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
          {...props}
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
          {...props}
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
  parameters: {
    controls: { include: ["size"] },
  },
  args: {
    size: "small",
  },
};

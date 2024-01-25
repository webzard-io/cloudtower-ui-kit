import { LogCollection16GrayIcon } from "@cloudtower/icons-react";
import { Area, InfoArea } from "@src/core/Progress/Area";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

const meta: Meta<typeof Area> = {
  title: "Core/Progress | 进度条/Components",
  component: Area,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/7k3VQ5bzWqn4TCbZR5MgmV/Progress-Bar%E4%B8%A8%E8%BF%9B%E5%BA%A6%E6%9D%A1?node-id=4011%3A8292&mode=dev",
    },
  },
};

export default meta;

/**
 * InfoArea 一般用于传递给 Progress 的 info 属性，它由 Tag(可选)、title(必须)、subtitle(可选)组成
 *
 * 如果只需要 title，请考虑直接传递给 info 字符串
 */
export const Info: StoryObj<{}> = {
  name: "InfoArea",
  render: () => {
    return (
      <>
        <InfoArea
          tag={{ children: "Tag", color: "blue" }}
          subtitle="Subtitle"
          title="Label"
        />
        <InfoArea
          tag={{ children: "Tag", color: "blue" }}
          subtitle={exampleContent}
          title={exampleContent}
        />
      </>
    );
  },
  args: {},
  argTypes: {},
};

/**
 * Area 可以通过配置拼接对应的组件，用于展示 Progress 的其它区域
 *
 * Area 提供五种类型的组件分别是 "tag"、"title"、"description"、"link"、"iconField";
 */
export const Components: StoryObj<{}> = {
  name: "Area",
  render: () => {
    return (
      <>
        <Area
          split="dot"
          items={[
            {
              type: "tag",
              children: "Tag",
            },
            {
              type: "title",
              children: "Title",
            },
            {
              type: "description",
              children: "Description",
            },
            {
              type: "link",
              children: "Link",
            },
            {
              type: "iconField",
              src: LogCollection16GrayIcon,
              children: "Icon Field",
            },
          ]}
        />
        <Area
          gap={8}
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
      </>
    );
  },
  args: {},
  argTypes: {},
};

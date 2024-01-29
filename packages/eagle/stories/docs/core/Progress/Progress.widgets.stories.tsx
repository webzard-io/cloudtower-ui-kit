import { Placeholder16Icon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Area, TitleArea } from "@src/core/Progress/progress.widgets";
import { TagProps } from "@src/spec";
import { Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React from "react";

const exampleContent = loremIpsum({
  count: 2,
  units: "paragraphs",
});

const meta: Meta<typeof Area> = {
  title: "Core/Progress | 进度条/Widgets | 小部件",
  component: Area,
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
};

export default meta;

/**
 * TitleArea 一般用于传递给 Progress 的 leftTop 属性，它由 Tag(可选)、title(必须)、subtitle(可选)组成
 *
 * 如果只需要 title，请考虑直接传递给 leftTop 字符串
 */
export const TitleAreaWidget: StoryObj<typeof TitleArea> = {
  name: "TitleArea",
  render: (props) => {
    return <TitleArea {...props} />;
  },
  args: {
    tag: { children: "Label" } as TagProps,
    subtitle: exampleContent,
    title: exampleContent,
  },
  parameters: {
    controls: { include: ["tag", "title", "subtitle"] },
  },
  argTypes: {},
};

/**
 * Area 可以通过配置拼接对应的组件，用于展示 Progress 的其它区域
 *
 * Area 提供五种类型的组件分别是 "tag"、"title"、"description"、"link"、"iconField"
 *
 * 其中 iconFiled 类型的组件内置了四种预置的效果与 progress 状态匹配，直接传递相应的 status 即可。也可以通过 src 来实现自定义的 icon
 */
export const AreaWidget: StoryObj<typeof Area> = {
  name: "Area",
  render: (props) => {
    return (
      <>
        <div>
          <Title>Area</Title>
          <Area {...props} />
        </div>
        <div>
          <Title>Area IconField</Title>
          <Area
            gap={8}
            items={["success", "failed", "paused", "active"].map((status) => ({
              status,
              type: "iconField",
              children: "Label",
            }))}
          />
        </div>
      </>
    );
  },
  parameters: {
    controls: { exclude: ["className"] },
  },
  args: {
    split: "dot",
    gap: 2,
    items: [
      {
        type: "tag",
        children: "Label",
      },
      {
        type: "title",
        children: "Label",
      },
      {
        type: "description",
        children: "Label",
      },
      {
        type: "link",
        children: "Label",
      },
      {
        type: "iconField",
        src: Placeholder16Icon,
        children: "Label",
      },
    ],
  },
};

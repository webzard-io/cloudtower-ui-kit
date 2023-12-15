import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { SidebarSubtitleComponentType } from "../../spec/base";
import SidebarSubtitle from ".";

const meta: Meta<SidebarSubtitleComponentType> = {
  title: "CoreX/SidebarSubtitle",
  component: SidebarSubtitle,
  parameters: {
    docs: {
      description: {
        component:
          "SidebarSubtitle 基于 **Typo.Heading.h3_regular_upper** 封装。会将传入 title 转换为大写，通常用于侧边栏标题",
      },
    },
  },
  argTypes: {},
};

export default meta;

export const Basic: StoryObj<SidebarSubtitleComponentType> = {
  render: ({ title }) => {
    return <SidebarSubtitle title={title} />;
  },
  args: {
    title: "Sidebar",
  },
};

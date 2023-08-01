import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Pagination } from "antd";
import { Calendar } from "antd";
import React from "react";

import UIKitProvider from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UIKitProvider",
  component: UIKitProvider,
} as ComponentMeta<typeof UIKitProvider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UIKitProvider> = (args) => {
  return (
    <div>
      <h1>
        通过修改 antdConfig 可以调整 antd 组件相关配置，如 i18n
        显示、message提示。
      </h1>
      <UIKitProvider {...args}>{args.children}</UIKitProvider>
    </div>
  );
};

export const Chinese = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Chinese.args = {
  children: (
    <div>
      <Pagination defaultCurrent={6} total={500} />
      <Calendar />
    </div>
  ),
  lng: "zh-CN",
};

export const English = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
  children: (
    <div>
      <Pagination defaultCurrent={6} total={500} />
      <Calendar />
    </div>
  ),
};

import { parrotI18n } from "@cloudtower/parrot";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Byte from "../src/components/Byte";
import TimeZoneSelect from "../src/components/TimeZoneSelect";
import UIKitProvider from "../src/UIKitProvider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UIKitProvider",
  component: UIKitProvider,
} as ComponentMeta<typeof UIKitProvider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UIKitProvider> = (args) => {
  return (
    <div>
      <button
        onClick={() => {
          parrotI18n.changeLanguage("en-US");
        }}
      >
        英语
      </button>
      <button
        onClick={() => {
          parrotI18n.changeLanguage("zh-CN");
        }}
      >
        中文
      </button>
      <UIKitProvider {...args}>{args.children}</UIKitProvider>
    </div>
  );
};

export const ChangeLng = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ChangeLng.args = {
  children: (
    <div>
      <Byte rawValue={-1} />
      <TimeZoneSelect value={undefined} onChange={() => {}} />
    </div>
  ),
};

import { parrotI18n } from "@cloudtower/parrot";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "antd";
import React, { ReactNode } from "react";

import { createBatchMessageMethods } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Message",
  component: Button,
} as ComponentMeta<typeof Button>;

const patterMap = {
  "common.error_message": {
    batchKey: "common.error_message",
    patterns: [new RegExp("^错误信息"), new RegExp("^Error Message")],
  },
};

const batchHelper = (content: ReactNode) => {
  let batchKey: string | undefined;
  for (const key of Object.keys(patterMap)) {
    if (patterMap[key]?.patterns.some((p) => p.test(String(content)))) {
      batchKey = patterMap[key]?.batchKey;
      break;
    }
  }

  return {
    batchKey,
    content: batchKey == null ? content : parrotI18n.t(batchKey),
  };
};

const message = createBatchMessageMethods(batchHelper);

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => {
  return <Button {...args}>click here</Button>;
};

export const info = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
info.args = {
  onClick: () => {
    message.info(parrotI18n.t("common.error_message"));
  },
};

export const warning = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
warning.args = {
  onClick: () => {
    message.warning(parrotI18n.t("common.error_message"));
  },
};

import { parrotI18n } from "@cloudtower/parrot";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "antd";
import React, { ReactNode } from "react";

import UIKitProvider, { useUIKit } from "../../UIKitProvider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Message",
  component: UIKitProvider,
} as ComponentMeta<typeof UIKitProvider>;

const patterMap = {
  "common.error_message": {
    batchKey: "common.error_message",
    patterns: [new RegExp("^错误信息"), new RegExp("^Error Message")],
  },
};

const batchHelper = {
  getBatchKey: (content: ReactNode) => {
    let batchKey: string | undefined;
    for (const key of Object.keys(patterMap)) {
      if (patterMap[key]?.patterns.some((p) => p.test(String(content)))) {
        batchKey = patterMap[key]?.batchKey;
        break;
      }
    }
    return batchKey;
  },
  getBatchContent: (batchKey: string, count: number) => {
    return parrotI18n.t(batchKey);
  },
};

let i = 0;
const TestMessage = () => {
  const UIKit = useUIKit();

  return (
    <>
      <Button
        onClick={() => {
          UIKit.message.info(parrotI18n.t("common.error_message") + i++);
        }}
      >
        click here
      </Button>
      <Button
        onClick={() => {
          UIKit.message.warning(parrotI18n.t("common.error_message") + i++);
        }}
      >
        click here
      </Button>
      <Button
        onClick={() => {
          UIKit.message.success(parrotI18n.t("common.error_message") + i++);
        }}
      >
        click here
      </Button>
      <Button
        onClick={() => {
          UIKit.message.error(parrotI18n.t("common.error_message") + i++);
        }}
      >
        click here
      </Button>
    </>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UIKitProvider> = (args) => {
  return (
    <UIKitProvider {...args}>
      <TestMessage />
    </UIKitProvider>
  );
};

export const simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
simple.args = {};

export const batchInfo = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
batchInfo.args = {
  message: {
    batch: batchHelper,
  },
};

export const maxCount = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
maxCount.args = {
  message: {
    maxCount: 5,
  },
};

export const batchWithMaxCount = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
batchWithMaxCount.args = {
  message: {
    batch: batchHelper,
    maxCount: 2,
  },
};

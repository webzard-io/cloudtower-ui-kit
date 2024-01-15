import { parrotI18n } from "@cloudtower/parrot";
import UIKitProvider, { useUIKit } from "@src/UIKitProvider";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "antd";
import React, { ReactNode } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Message",
  component: UIKitProvider,
} as ComponentMeta<typeof UIKitProvider>;

const patterMap = {
  "common.error_message": {
    batchKey: "test.error_message_batch",
    patterns: [new RegExp("^错误信息"), new RegExp("^Error Message")],
  },
};

const batchHelper = {
  getBatchKey: (content: ReactNode) => {
    let batchKey: string | undefined;
    for (const key of Object.keys(patterMap)) {
      // @ts-ignore
      if (patterMap[key]?.patterns.some((p) => p.test(String(content)))) {
        // @ts-ignore
        batchKey = patterMap[key]?.batchKey;
        break;
      }
    }
    return batchKey;
  },
  getBatchContent: (batchKey: string, count: number) => {
    return parrotI18n.t(batchKey, { count });
  },
};

let i = 0;
const TestMessage = () => {
  const UIKit = useUIKit();

  return (
    <>
      <Button
        onClick={() => {
          const handler = setInterval(() => {
            UIKit.message.info(parrotI18n.t("common.error_message") + i++);
          }, 1000);
          setTimeout(() => {
            clearInterval(handler);
          }, 10000);
        }}
      >
        Emit one every second for 10 seconds
      </Button>
      <Button
        onClick={() => {
          const handler = setInterval(() => {
            UIKit.message.info(parrotI18n.t("common.error_message") + i++);
          }, 210);
          setTimeout(() => {
            clearInterval(handler);
          }, 10000);
        }}
      >
        Emit one every 210ms for 10 seconds
      </Button>
      <Button
        onClick={() => {
          Array(30)
            .fill(undefined)
            .forEach((v, index) => {
              UIKit.message.info(parrotI18n.t("common.error_message") + index);
            });
          setTimeout(() => {
            Array(30)
              .fill(undefined)
              .forEach((v, index) => {
                UIKit.message.info(
                  parrotI18n.t("common.error_message") + index
                );
              });
          }, 100);
        }}
      >
        batch 60 message
      </Button>
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
      <Button
        onClick={() => {
          let count = 0;
          UIKit.message.error("测试开始，请切换到其他标签页，10s 后切换回来");
          const handler = setInterval(() => {
            console.log("count", count++);
            UIKit.message.info(parrotI18n.t("common.error_message"));
          }, 3000);

          setTimeout(() => {
            clearInterval(handler);
            UIKit.message.info("不让batch显示");
            UIKit.message.warn("不让batch显示");
            console.log("切换回来");
          }, 13000);
        }}
      >
        complex test case
      </Button>
      <Button
        onClick={() => {
          new Array(3).fill("").forEach(() => {
            UIKit.message.info(parrotI18n.t("common.error_message"));
          });
        }}
      >
        complex test case next step
      </Button>
      <Button
        onClick={() => {
          new Array(9).fill("").forEach(() => {
            UIKit.message.info(parrotI18n.t("common.error_message"));
          });

          setTimeout(() => {
            UIKit.message.error(parrotI18n.t("common.error_message"));
            setTimeout(() => {
              UIKit.message.warn(parrotI18n.t("common.error_message"));
              window.addEventListener("visibilitychange", () => {
                if (!document.hidden) {
                  UIKit.message.info(parrotI18n.t("common.error_message"));
                }
              });
            }, 2000);
          }, 3000);
        }}
      >
        complex test case2
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

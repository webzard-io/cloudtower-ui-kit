import { parrotI18n } from "@cloudtower/parrot";
import UIKitProvider, { useMessage } from "@src/UIKitProvider";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import { Button } from "antd";
import React, { ReactNode } from "react";

/**
 * * 从顶部弹出消息的组件。
 * * 默认拥有 info warning success 三种样式。
 * * 可以通过 UIKitProvider 配置批量消息的折叠
 */
const meta = {
  title: "Core/Message | 消息弹窗",
  argTypes: {
    message: {
      type: {
        name: "object",
        value: {
          maxCount: {
            name: "boolean",
          },
        },
      },
      description: "配置消息的最大显示数量，与消息折叠的功能。",
    },
  },
} satisfies CoreMeta<typeof UIKitProvider>;

export default meta;

type Story = StoryObj<typeof UIKitProvider>;

const BasicInfoButton = () => {
  const message = useMessage();
  return (
    <Button
      onClick={() => {
        message.info(parrotI18n.t("common.error_message"));
      }}
    >
      Show A Message
    </Button>
  );
};

export const BasicInfo: Story = {
  name: "显示基本消息",
  render: () => {
    return <BasicInfoButton />;
  },
};

const BasicWarningButton = () => {
  const message = useMessage();
  return (
    <Button
      onClick={() => {
        message.warning(parrotI18n.t("common.message"));
      }}
    >
      Show A Message
    </Button>
  );
};

export const BasicWarning: Story = {
  name: "显示告警消息",
  render: () => {
    return <BasicWarningButton />;
  },
};

const BasicErrorButton = () => {
  const message = useMessage();
  return (
    <Button
      onClick={() => {
        message.error(parrotI18n.t("common.message"));
      }}
    >
      Show A Message
    </Button>
  );
};

export const BasicError: Story = {
  name: "显示错误消息",
  render: () => {
    return <BasicErrorButton />;
  },
};

const MessageButton = (args: any) => {
  return (
    <UIKitProvider {...args}>
      <BasicInfoButton />
    </UIKitProvider>
  );
};

export const MaxCount: Story = {
  name: "最大消息显示",
  args: {
    message: {
      maxCount: 1,
    },
  },
  render: (args) => {
    return <MessageButton {...args} />;
  },
};

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

export const BatchMessage: Story = {
  name: "同类消息折叠",
  args: {
    message: {
      batch: batchHelper,
    },
  },
  render: (args) => {
    return <MessageButton {...args} />;
  },
};

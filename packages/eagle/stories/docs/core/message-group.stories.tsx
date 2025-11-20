import { parrotI18n } from "@cloudtower/parrot";
import { BasicCTError, InputNumber, Switch, useMessage } from "@src/core";
import UIKitProvider, { IProps } from "@src/UIKitProvider";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import { Button, message as AntdMessage, Space } from "antd";
import React, { ReactNode, useState } from "react";

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
          top: {
            name: "number",
          },
        },
      },
      description: "配置消息的最大显示数量，与消息折叠的功能。",
    },
  },
} satisfies CoreMeta<typeof UIKitProvider>;

export default meta;

type Story = StoryObj<typeof UIKitProvider>;

const BasicInfoButton: React.FC<{
  infoContent?: Parameters<typeof AntdMessage.info>[0];
}> = ({ infoContent }) => {
  const message = useMessage();
  return (
    <Button
      onClick={() => {
        message.info(infoContent ?? parrotI18n.t("common.error_message"));
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

const MessageButton: React.FC<
  IProps & {
    infoContent?: Parameters<typeof AntdMessage.info>[0];
  }
> = ({ infoContent, ...args }) => {
  return (
    <UIKitProvider
      {...args}
      config={{
        config: {
          CTErrorI18nNs: "CustomCTError",
        },
      }}
    >
      <BasicInfoButton infoContent={infoContent} />
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

const CustomTopPositionStory = (args: any) => {
  const [enable, setEnable] = useState(false);
  const [duration, setDuration] = useState(3);

  return (
    <>
      <Space direction="vertical" size={16}>
        <Space size={8}>
          <Switch checked={enable} onChange={setEnable}>
            开启自定义高度（58px）
          </Switch>
          <div>
            <span style={{ marginRight: 8 }}>消息停留时间</span>
            <InputNumber
              value={duration}
              onChange={(val) => setDuration(Number(val))}
            />
            <span>秒</span>
          </div>
        </Space>

        <UIKitProvider
          {...args}
          message={{
            ...args.message,
            top: enable ? 58 : 8,
            duration,
          }}
        >
          <BasicInfoButton />
        </UIKitProvider>
      </Space>
    </>
  );
};
export const CustomTopPosition: Story = {
  name: "自定义顶部位置",
  render: (args) => {
    return <CustomTopPositionStory {...args} />;
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

export const CTError: Story = {
  name: "响应 cloudtower error code",
  args: {
    message: {
      batch: batchHelper,
    },
  },
  render: (args) => {
    return (
      <MessageButton
        {...args}
        infoContent={
          <BasicCTError
            error={{
              code: "CUSTOM_ERROR",
            }}
          />
        }
      />
    );
  },
};

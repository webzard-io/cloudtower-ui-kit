import React from "react";
import { ConfigProvider, Divider, RadioGroup } from "@src/core";
import Calendar from "@src/core/Calendar";
import { ParrotLngs } from "@cloudtower/parrot";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Calendar> = {
  title: "Core/Calendar",
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          "* 日期组件\n* antd 4.5 组件, 使用参考[antd 文档](https://4x-ant-design.antgroup.com/components/calendar-cn/)",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  args: {
    fullscreen: false,
  },
};

/**
 * 出于 ant design 的特性，单独的日期组件的国际化搭配 ConfigProvider 中配置
 * 参考： https://4x.ant.design/components/date-picker-cn/#%E5%9B%BD%E9%99%85%E5%8C%96%E9%85%8D%E7%BD%AE
 */
export const Intl: Story = {
  name: "国际化",
  args: {
    fullscreen: false,
  },
  render: (props) => {
    return (
      <ConfigProvider>
        <Calendar {...props} />
      </ConfigProvider>
    );
  },
};

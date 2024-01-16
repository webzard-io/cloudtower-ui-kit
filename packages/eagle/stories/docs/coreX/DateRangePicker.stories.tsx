import DateRangePicker from "@src/coreX/DateRangePicker";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";

const Template = (props: Parameters<typeof DateRangePicker>[0]) => {
  return (
    <DateRangePicker
      value={{
        unit: "d",
        value: 100,
      }}
      mode="absolute"
      {...props}
    />
  );
};

const meta: Meta<typeof DateRangePicker> = {
  title: "CoreX/DateRangePicker",
  component: Template,
  parameters: {
    docs: {
      description: {
        component: "时间范围选择器",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Demo: Story = {
  parameters: {
    docs: {
      description: {
        story: "简单的时间选择器",
      },
    },
  },
};

export const WithRange: Story = {
  parameters: {
    docs: {
      description: {
        story: "附带有时间范围显示，与可选范围设置",
      },
    },
  },
  args: {
    mode: "absolute",
    value: [dayjs("2023-06-01"), dayjs("2023-12-01")],
    minDate: dayjs("2023-06-01"),
    maxDate: dayjs("2023-12-01"),
  },
};

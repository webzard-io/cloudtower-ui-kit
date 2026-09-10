import DateRangePicker, {
  DateRangePickerValue,
  PickerDateRange,
} from "@src/coreX/DateRangePicker";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import React, { useState } from "react";

const Template = (props: Parameters<typeof DateRangePicker>[0]) => {
  const [value, setValue] = useState<PickerDateRange>([
    dayjs().month(5).date(1).startOf("day"),
    dayjs().month(11).date(1).endOf("day"),
  ]);

  return (
    <DateRangePicker
      value={value}
      onChange={(type, time, range) => {
        setValue(range);
      }}
      mode="absolute"
      {...props}
    />
  );
};

const FutureTemplate = (props: Parameters<typeof DateRangePicker>[0]) => {
  const [value, setValue] = useState<DateRangePickerValue>({
    unit: "M",
    value: 2,
    type: "future",
  });

  return (
    <DateRangePicker
      value={value}
      type="future"
      mode={["relative", "absolute"]}
      onChange={(type, time, range) => {
        setValue(type === "absolute" ? range : time);
      }}
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
    minDate: dayjs().month(5).date(1).startOf("day"),
    maxDate: dayjs().month(11).date(1).endOf("day"),
  },
};

export const WithRelative: Story = {
  parameters: {
    docs: {
      description: {
        story: "自定义相对时间选项",
      },
    },
  },
  args: {
    mode: ["relative", "absolute"],
    minDate: dayjs().month(5).date(1).startOf("day"),
    maxDate: dayjs().month(11).date(1).endOf("day"),
    relativeTimeSelectOptions: [
      {
        unit: "h",
        value: 1,
      },
      {
        unit: "h",
        value: 2,
      },
      {
        unit: "M",
        value: 6,
      },
    ],
  },
};

export const WithMaxRange: Story = {
  parameters: {
    docs: {
      description: {
        story: "自定义最大可选范围",
      },
    },
  },
  args: {
    mode: ["relative", "absolute"],
    minDate: dayjs().month(5).date(1).startOf("day"),
    maxDate: dayjs().month(11).date(1).endOf("day"),
    maxRange: "31d",
    relativeTimeSelectOptions: [
      {
        unit: "h",
        value: 1,
      },
      {
        unit: "h",
        value: 2,
      },
      {
        unit: "M",
        value: 6,
      },
    ],
  },
};

export const WithFutureTime: Story = {
  parameters: {
    docs: {
      description: {
        story: "未来时间模式，支持未来相对时间和默认一年内的绝对时间选择",
      },
    },
  },
  render: (args) => <FutureTemplate {...args} />,
  args: {
    type: "future",
    relativeTimeSelectOptions: [
      {
        unit: "M",
        value: 1,
      },
      {
        unit: "M",
        value: 2,
      },
      {
        unit: "M",
        value: 3,
      },
      {
        unit: "M",
        value: 6,
      },
      {
        unit: "y",
        value: 1,
      },
    ],
  },
};

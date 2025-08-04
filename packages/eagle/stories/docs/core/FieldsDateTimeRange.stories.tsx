import FieldsDateTimeRange from "@src/core/Fields/FieldsDateTimeRange";
import { Meta, StoryObj } from "@storybook/react";
import { RangePickerProps } from "antd/lib/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { range } from "lodash";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/FieldsDateTimeRange",
  component: FieldsDateTimeRange,
} as Meta;

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};

// 48小时时间限制的配置
const disabledDate48Hour = (current: Dayjs) => {
  // 向前取整到天，禁用3天前的日期
  return current && current < dayjs().subtract(2, "day").startOf("day");
};

const disabledTime48Hour: RangePickerProps["disabledTime"] = (date, type) => {
  if (type === "start" && date) {
    const now = dayjs();
    const targetDate = dayjs(date as any);
    const twoDaysAgo = now.subtract(2, "day");

    // 如果选择的日期是前天，限制小时选择
    if (targetDate.isSame(twoDaysAgo, "day")) {
      const limitHour = twoDaysAgo.hour();
      return {
        disabledHours: () => range(0, limitHour),
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }

    // 如果选择的日期是昨天，允许选择所有时间
    if (targetDate.isSame(now.subtract(1, "day"), "day")) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }
  }

  return {};
};

export const Simple: StoryObj<typeof FieldsDateTimeRange> = {
  // @ts-ignore
  render: FieldsDateTimeRange,
  args: {
    input: {
      name: "inputName",
      onBlur: () => {
        console.log("onBlur");
      },
      onChange: () => {
        console.log("onChange");
      },
      onFocus: () => {
        console.log("onFocus");
      },
      value: [dayjs(), dayjs().add(1, "day")],
      disabledTime: disabledRangeTime,
    },
    meta: {},
  },
};

export const With48HourLimit: StoryObj<typeof FieldsDateTimeRange> = {
  name: "48小时时间限制",
  // @ts-ignore
  render: FieldsDateTimeRange,
  args: {
    input: {
      name: "inputName",
      onBlur: () => {
        console.log("onBlur");
      },
      onChange: () => {
        console.log("onChange");
      },
      onFocus: () => {
        console.log("onFocus");
      },
      value: [dayjs(), dayjs().add(1, "day")],
      disabledDate: disabledDate48Hour,
      disabledTime: disabledTime48Hour,
    },
    meta: {},
  },
};

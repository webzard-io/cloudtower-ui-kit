import { GraphType, RenderChart } from "@cloudtower/eagle";
import { antdKit } from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import mockMetric from "../mockMetric";
import mockMetric2 from "../mockMetric2";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "RenderChart",
  component: RenderChart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <kitContext.Provider value={antdKit}>
          <Story />
        </kitContext.Provider>
      );
    },
  ],
} as ComponentMeta<typeof RenderChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RenderChart> = (args) => (
  <RenderChart {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  mode: "legend",
  showLegend: true,
  metricName: "hello",
  metric: mockMetric,
  syncId: "abc",
  height: 200,
  type: GraphType.Area,
  dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
  showXAxis: true,
  tooltipProps: {
    format: () => {
      return "hello tooltip";
    },
  },
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
  mode: "legend",
  showLegend: true,
  metricName: "hello",
  metric: mockMetric2,
  syncId: "abc",
  height: 200,
  type: GraphType.Area,
  dateRange: [
    dayjs("2022-12-21T13:35:01.234Z"),
    dayjs("2022-12-22T13:35:01.234Z"),
  ],
  showXAxis: true,
  tooltipProps: {
    format: function (payload: Payload<number, string>): string {
      const { name, value: rawValue } = payload;
      if (Number.isFinite(rawValue)) {
        return `${name}: ${rawValue}`;
      }
      return "-";
    },
  },
};

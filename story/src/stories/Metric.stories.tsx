import { GraphType, Metric } from "@cloudtower/eagle";
import { antdKit } from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";

import mockMetric from "../mockMetric";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Metric",
  component: Metric,
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
} as ComponentMeta<typeof Metric>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Metric> = (args) => <Metric {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  showPointer: true,
  uuid: "abc",
  chartProps: {
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: mockMetric,
    height: 200,
    range: "2h",
    type: GraphType.Area,
    dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
    now: new Date("2022-12-13 18:00").getTime(),
    showXAxis: true,
    tooltipProps: {
      format: () => {
        return "hello tooltip";
      },
    },
    actionsProps: {
      show: true,
      info: {
        max: "hello",
        current: "hello current",
      },
    },
  },
};

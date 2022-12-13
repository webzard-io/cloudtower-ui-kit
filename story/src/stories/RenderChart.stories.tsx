import { RenderChart } from "@cloudtower/eagle";
import { GraphType, MetricUnit } from "@cloudtower/eagle/generated/react-hooks";
import { antdKit } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import areaChartData from "../areaChartData";
import sample_streams from "../sample_streams";

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
  metric: "hello",
  uuid: "abc",
  height: 200,
  range: "1h",
  type: GraphType.Area,
  formatLegendItemName: () => {
    return "hello legend";
  },
  getDeselectedValueWithSuffix: () => {
    return "hello suffix";
  },
  metricLegendData: [],
  metricUnit: MetricUnit.Count,
  getColorsByMetric: () => {
    return "#ABCABC";
  },
  metricColors: ["#ABCABC"],
  metricType: "hellometricType",
  step: 1,
  deselectedIndex: [],
  areaChartData: areaChartData,
  streams: sample_streams,
};

import { Metric } from "@cloudtower/eagle";
import { MetricUnit } from "@cloudtower/eagle/generated/react-hooks";
import { antdKit } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

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
  metric: "test",
  formatLegendItemName: () => {
    return "hello legend";
  },
  getDeselectedValueWithSuffix: () => {
    return "hello suffix";
  },
  chartData: {
    metrics: {
      dropped: false,
      step: 1,
      unit: MetricUnit.Count,
    },
  },
  topkData: {
    metrics: {
      dropped: false,
      step: 1,
      unit: MetricUnit.Count,
    },
  },
  getColorsByMetric: () => {
    return "#ABCABC";
  },
  metricColors: ["#ABCABC"],
  metricType: "hellometricType",
  step: 1,
  deselectedIndex: [1],
};

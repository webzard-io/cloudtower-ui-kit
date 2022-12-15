import { RenderChart } from "@cloudtower/eagle";
import { GraphType } from "@cloudtower/eagle/generated/react-hooks";
import { antdKit } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";

import mockMetric from "../mockMetric";

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
  uuid: "abc",
  height: 200,
  range: "2h",
  type: GraphType.Area,
  getColorsByMetric: () => {
    return "#ABCABC";
  },
  metricColors: ["#ABCABC"],
  deselectedIndex: [],
  dateRange: [dayjs("2022-12-13 16:00"), dayjs("2022-12-13 18:00")],
  now: new Date("2022-12-13 18:00").getTime(),
};

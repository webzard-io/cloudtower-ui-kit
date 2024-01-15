import Metric from "@src/core/Metric";
import {
  filterOverlappingMetric,
  getXAxisDomain,
  tickFormatter,
  xaxisCal,
} from "@src/core/Metric/metric";
import mockMetric from "@src/core/Metric/mockMetric";
import mockMetric2 from "@src/core/Metric/mockMetric2";
import { DateRange, GraphType } from "@src/core/Metric/type";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import dayjs from "dayjs";
import React from "react";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Metric",
  component: Metric,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
} as ComponentMeta<typeof Metric>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Metric> = (args) => <Metric {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const dateRange1: DateRange = [
  dayjs("2022-12-13 16:00"),
  dayjs("2022-12-13 18:00"),
];
const domain1 = getXAxisDomain(dateRange1, dateRange1[1].valueOf());

Primary.args = {
  showPointer: true,
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: filterOverlappingMetric(mockMetric, dateRange1),
    height: 200,
    type: GraphType.Area,
    xAxisProps: {
      domain: domain1,
      ticks: xaxisCal(domain1[1], dateRange1),
      tickFormatter: (tick) => tickFormatter(tick, dateRange2),
    },
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

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const dateRange2: DateRange = [
  dayjs("2022-12-21T13:35:01.234Z"),
  dayjs("2022-12-22T13:35:01.234Z"),
];
const domain2 = getXAxisDomain(dateRange2, dateRange2[1].valueOf());

Secondary.args = {
  chartProps: {
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: filterOverlappingMetric(mockMetric2, dateRange2),
    syncId: "abc",
    height: 200,
    type: GraphType.Area,
    xAxisProps: {
      domain: domain2,
      ticks: xaxisCal(domain2[1], dateRange2),
      tickFormatter: (tick) => tickFormatter(tick, dateRange2),
    },
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
  },
};

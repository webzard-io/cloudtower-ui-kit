import {
  DateRange,
  filterDataOverlapping,
  getMs,
  getXAxisDomain,
  GraphType,
  Metric,
  tickFormatter,
  xaxisCal,
} from "@cloudtower/eagle";
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
const dateRange1: DateRange = [
  dayjs("2022-12-13 16:00"),
  dayjs("2022-12-13 18:00"),
];
const domain1 = getXAxisDomain(dateRange1, dateRange1[1].valueOf());
const range1 = getMs(dateRange1);

Primary.args = {
  showPointer: true,
  chartProps: {
    syncId: "abc",
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: {
      ...mockMetric,
      sample_streams: mockMetric.sample_streams.map((stream) => ({
        ...stream,
        points: filterDataOverlapping(
          stream.points,
          dateRange1[0].valueOf(),
          range1 / stream.step,
          stream.step,
          stream.tolerance
        ),
      })),
    },
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
const range2 = getMs(dateRange2);

Secondary.args = {
  chartProps: {
    mode: "legend",
    showLegend: true,
    metricName: "hello",
    metric: {
      ...mockMetric2,
      sample_streams: mockMetric2.sample_streams.map((stream) => ({
        ...stream,
        points: filterDataOverlapping(
          stream.points,
          dateRange2[0].valueOf(),
          range2 / stream.step,
          stream.step,
          stream.tolerance
        ),
      })),
    },
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

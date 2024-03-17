import { css } from "@linaria/core";
import DonutChart, {
  DonutChartColor,
  IDonutChartProps,
} from "@src/core/DonutChart";
import { Color } from "@src/styles/token";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const defaultCenterStyle = css`
  position: absolute;
  top: 0;
  left: 35px;
  height: 100px;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**
 * * 高阶业务组件, 基于 rechart PieChart 组件封装 Donut chart 组件
 * * 组件 props 设计参考示例：https://recharts.org/en-US/examples/PieChartWithPaddingAngle
 * * 自定义 props 已在表格进行说明
 *
 */
const story: Meta<any> = {
  title: "Core/DonutChart",
  component: DonutChart,
};

export default story;

type IDonutChartStoryProps = IDonutChartProps & { width: number };

const defaultData = [
  {
    name: "test1",
    value: 2,
    tooltip: "tooltip",
  },
  {
    name: "test2",
    value: 3,
    tooltip: "tooltip",
  },
  {
    name: "test3",
    value: 3,
    tooltip: "tooltip",
  },
  {
    name: "test4",
    value: 3,
  },
];
export const Default: StoryObj<IDonutChartStoryProps> = ({
  color,
}: {
  color: DonutChartColor;
}) => {
  return (
    <DonutChart
      centerRender={<div className={defaultCenterStyle}>test</div>}
      color={color}
      data={defaultData}
    />
  );
};
Default.args = {
  color: DonutChartColor.BLUE,
};

export const OtherDisplay: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        centerRender={<div className={defaultCenterStyle}>test</div>}
        color={color}
        data={[
          ...defaultData,
          {
            name: "test5",
            value: 2,
          },
        ]}
        otherData={[
          {
            name: "text",
            value: 1,
          },
        ]}
      />
    </div>
  );
};
OtherDisplay.args = {
  color: DonutChartColor.BLUE,
  width: 300,
};

export const centerRender: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        centerRender={{
          number: 9999,
          text: "统计项统计项统计项统计项",
        }}
        color={color}
        data={defaultData}
        otherData={[
          {
            name: "otherTip1",
            value: 2,
          },
          {
            name: "otherTip2",
            value: 2,
          },
        ]}
      />
    </div>
  );
};
centerRender.args = {
  color: DonutChartColor.GREEN,
  width: 300,
};

export const Collapse: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        centerRender={{
          number: 9999,
          text: "统计项统计项统计项统计项",
        }}
        color={color}
        data={[
          {
            name: "test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0test0",
            value: 3,
          },
          ...defaultData,
          {
            name: "test5",
            value: 3,
            tooltip: "tooltip",
          },
          {
            name: "test6test6test6test6test6test6test6",
            value: 3,
            tooltip: "tooltip",
          },
        ]}
        collapseText="及以上"
      />
    </div>
  );
};
Collapse.args = {
  color: DonutChartColor.BLUE,
  width: 300,
};

export const TextCollapse: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        centerRender={{
          number: 9999,
          text: "统计项统计项统计项统计项",
        }}
        color={color}
        data={[
          ...defaultData,
          {
            name: "test5test5test5test5test5test5test5",
            value: 3,
            tooltip: "tooltip",
          },
          {
            name: "test6test6test6test6test6test6test6",
            value: 3,
            tooltip: "tooltip",
          },
        ]}
        collapseText="及以上"
      />
    </div>
  );
};
TextCollapse.args = {
  color: DonutChartColor.BLUE,
  width: 300,
};

export const CustomSize: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        color={color}
        height={120}
        width={180}
        outerRadius={55}
        data={[
          ...defaultData,
          {
            name: "test5test5test5test5test5test5test5",
            value: 3,
            tooltip: "tooltip",
          },
          {
            name: "test6test6test6test6test6test6test6",
            value: 3,
            tooltip: "tooltip",
          },
        ]}
        collapseText="及以上"
        showLegend={false}
      />
    </div>
  );
};
CustomSize.args = {
  color: DonutChartColor.BLUE,
  width: 300,
};

export const Duality: StoryObj<IDonutChartStoryProps> = ({
  color,
  width,
}: {
  color: DonutChartColor;
  width: number;
}) => {
  return (
    <div style={{ width }}>
      <DonutChart
        color={color}
        widthPadding={false}
        data={[
          {
            name: "test1",
            value: 2,
            tooltip: "tooltip",
            color: Color.chart.yellow["yellow-9"],
          },
          {
            name: "test2",
            value: 3,
            tooltip: "tooltip",
            color: Color.chart.green["green-5"],
          },
        ]}
      />
    </div>
  );
};
Duality.args = {
  color: DonutChartColor.BLUE,
  width: 300,
};

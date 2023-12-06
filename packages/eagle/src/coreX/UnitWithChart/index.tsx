import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import React from "react";

import Bit from "../../components/Bit";
import BitPerSecond from "../../components/BitPerSecond";
import Bps from "../../components/Bps";
import Byte from "../../components/Byte";
import Empty from "../../components/Empty";
import Frequency from "../../components/Frequency";
import Percent from "../../components/Percent";
import Second from "../../components/Second";
import Speed from "../../components/Speed";
import BarChart from "../BarChart";
import DonutChart from "../DonutChart";

const units = {
  Percent,
  Byte,
  Frequency,
  Speed,
  Bps,
  BitPerSecond,
  Bit,
  Second,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

type Size = "small" | "medium" | "large";

export type ChartType = "donutChart" | "barChart";

const BarChartWrapper = css`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);

  .chart {
    display: inline-block;
    width: 100%;
  }
`;

export const UnitWrapper = css`
  width: 40px;

  .unit {
    color: $text-light-primary !important;
  }
`;

type SizeTypes = {
  width: number;
  height: number;
  barSize: number;
  innerRadius: number;
  outerRadius: number;
};

const Sizes: Record<Size, SizeTypes> = {
  small: {
    width: 22,
    height: 22,
    barSize: 4,
    innerRadius: 8,
    outerRadius: 16,
  },
  medium: {
    width: 50,
    height: 50,
    barSize: 8,
    innerRadius: 18,
    outerRadius: 34,
  },
  large: {
    width: 100,
    height: 100,
    barSize: 15,
    innerRadius: 40,
    outerRadius: 70,
  },
};

export interface IUnitWithChartProps {
  rawValue?: number | null;
  total?: number | null;
  data?: {
    label: string;
    color: string;
    value: number;
  }[];
  unit: keyof typeof units;
  color?: string;
  size?: Size;
  chartType?: ChartType;
  saturated?: boolean;
}

const UnitWithChart: React.FC<IUnitWithChartProps> = ({
  rawValue,
  total,
  unit,
  color = "#0080FF",
  size = "small",
  chartType = "donutChart",
  data,
  saturated,
}) => {
  if (typeof rawValue !== "number" || typeof total !== "number") {
    return <Empty />;
  }
  const Unit = units[unit];
  return (
    <Wrapper className="unit-chart">
      {chartType === "barChart" && (
        <span className={BarChartWrapper}>
          <span className="chart">
            <BarChart data={data || []} total={total} />
          </span>
        </span>
      )}
      <span className={UnitWrapper}>
        {unit === "Percent" ? (
          <Percent rawValue={rawValue} decimals={1} saturated={saturated} />
        ) : (
          <Unit rawValue={rawValue} />
        )}
      </span>
      {chartType === "donutChart" && (
        <DonutChart
          data={[
            {
              used: rawValue / total,
              fill: color,
            },
          ]}
          dataKey="used"
          {...Sizes[size]}
        />
      )}
    </Wrapper>
  );
};

export default UnitWithChart;

import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import Bit from "@src/core/Bit";
import BitPerSecond from "@src/core/BitPerSecond";
import Bps from "@src/core/Bps";
import Byte from "@src/core/Byte";
import BytePerSecond from "@src/core/BytePerSecond";
import Empty from "@src/core/Empty";
import Frequency from "@src/core/Frequency";
import Percent from "@src/core/Percent";
import Second from "@src/core/Second";
import Speed from "@src/core/Speed";
import BarChart from "@src/coreX/BarChart";
import DeprecatedDonutChart from "@src/coreX/DeprecatedDonutChart";
import React from "react";

const units = {
  Percent,
  Byte,
  BytePerSecond,
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
  min-width: 40px;

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
        <DeprecatedDonutChart
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

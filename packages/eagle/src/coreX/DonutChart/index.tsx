import React from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

export interface IDonutChartProps {
  data: Array<object>;
  dataKey: string;
  width: number;
  height: number;
  barSize: number;
  innerRadius: number;
  outerRadius: number;
}

const DonutChart: React.FC<IDonutChartProps> = ({
  data,
  dataKey,
  width,
  height,
  barSize,
  innerRadius,
  outerRadius,
}) => (
  <RadialBarChart
    data={data}
    width={width}
    height={height}
    innerRadius={innerRadius}
    outerRadius={outerRadius}
    barSize={barSize}
    startAngle={90}
    endAngle={-270}
  >
    <PolarAngleAxis type="number" domain={[0, 1]} radiusAxisId={0} />
    <RadialBar
      isAnimationActive={false}
      background
      dataKey={dataKey}
      radiusAxisId={0}
    />
  </RadialBarChart>
);

export default DonutChart;

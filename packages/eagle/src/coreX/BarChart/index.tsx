import { css } from "linaria";
import React from "react";

import { IBarChartProps } from "../../spec/type";
import { formatPercent } from "../../utils/tower";

const StackBar = css`
  height: 8px;
  box-sizing: border-box;
  border-radius: 2px;
  background: #f5f7fa;
  display: flex;
  width: 100%;
  overflow: hidden;

  .stack-bar-item + .stack-bar-item {
    margin-left: 1px;
  }
`;

export function getWidth(input: number) {
  const { value, unit } = formatPercent(input);
  return value + unit;
}

const BarChart: React.FC<IBarChartProps> = ({ data, total }) => (
  <div className={StackBar}>
    {(data || []).map((item) => {
      const { value, color } = item;
      const width = total === 0 ? 0 : getWidth((100 * value) / total);
      return (
        <div
          className="stack-bar-item"
          style={{
            width: width,
            background: color,
            display: width === 0 || width === "0%" ? "none" : "inline-block",
          }}
        />
      );
    })}
  </div>
);

export default BarChart;

import { css } from "@linaria/core";
import { formatPercent } from "@src/utils/tower";
import React, { CSSProperties, useMemo } from "react";
import cs from "classnames";

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

const useShapeStyle = (shape: "stripes" | "fill", color: string) => {
  return useMemo(() => {
    switch (shape) {
      case "stripes":
        return {
          backgroundImage: `linear-gradient(-45deg, 
                ${color} 25%, 
                transparent 25%, 
                transparent 50%, 
                ${color} 50%, 
                ${color} 75%, 
                transparent 75%, 
                transparent)`,
          backgroundSize: "4px 4px",
        };
      default:
        return {
          backgroundColor: color,
        };
    }
  }, [color, shape]);
};

export function getWidth(input: number) {
  const { value, unit } = formatPercent(input);
  return value + unit;
}

export interface IBarChartProps {
  data: Array<{
    value: number;
    color: string;
    shape?: "stripes" | "fill";
  }>;
  total: number;
  className?: string;
}

const BarItem = (props: {
  color: string;
  shape: "stripes" | "fill";
  style?: CSSProperties;
  className?: string;
}) => {
  const { color, shape, style, className } = props;
  const shapeStyle = useShapeStyle(shape, color);

  return (
    <div
      className={className}
      style={{
        ...shapeStyle,
        ...style,
      }}
    />
  );
};

const BarChart: React.FC<IBarChartProps> = ({ data, total, className }) => {
  return (
    <div className={cs(StackBar, className)}>
      {(data || []).map((item, index) => {
        const { value, color, shape = "fill" } = item;
        const width = total === 0 ? 0 : getWidth((100 * value) / total);
        return (
          <BarItem
            className="stack-bar-item"
            key={index}
            shape={shape}
            color={color}
            style={{
              width: width,
              display: value === 0 || total === 0 ? "none" : "inline-block",
            }}
          />
        );
      })}
    </div>
  );
};

export default BarChart;

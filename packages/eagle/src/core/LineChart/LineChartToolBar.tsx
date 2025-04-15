import LineChartActions from "@src/core/LineChart/LineChartActions";
import LineChartLegend from "@src/core/LineChart/LineChartLegend";
import {
  ILineChartILegend,
  ILineChartMetricStream,
} from "@src/core/LineChart/type";
import { DropdownProps } from "antd5";
import React from "react";

const LineChartToolBar = ({
  showLegend,
  streams,
  metricName,
  deselected,
  hovering,
  onLegendClick,
  onLegendHover,
  legends,
  actionsProps,
  dropdownProps,
  hoveringSelf,
}: {
  showLegend?: boolean;
  streams: ILineChartMetricStream[];
  metricName: string;
  deselected: string[];
  hovering: string[];
  hoveringSelf: string[];
  onLegendClick: (id: string) => void;
  onLegendHover: (method: "enter" | "leave", id: string) => void;
  legends: ILineChartILegend[];
  actionsProps?: {
    show?: boolean;
    label: string | React.ReactNode;
  };
  dropdownProps?: DropdownProps;
}) => {
  return (
    <div className="metric-toolbar">
      {showLegend && (
        <LineChartLegend
          streams={streams}
          metricName={metricName}
          deselected={deselected}
          hovering={hovering}
          onClick={onLegendClick}
          legends={legends}
          onHover={onLegendHover}
          hovereringSelf={hoveringSelf}
        />
      )}
      {actionsProps?.show && (
        <LineChartActions dropdownProps={dropdownProps} {...actionsProps} />
      )}
    </div>
  );
};

export default LineChartToolBar;

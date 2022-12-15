import { ChartState, useKitSelector } from "@cloudtower/eagle/kit/smartx";
import _ from "lodash";
import React from "react";

const Pointer: React.FC<{
  metricWidth: number | undefined;
  uuid: string;
}> = ({ uuid = "", metricWidth }) => {
  const pointers = useKitSelector<ChartState["pointers"]>((state) =>
    _.get(state, "chart.pointers")
  );

  if (!pointers?.[uuid]) {
    return null;
  }
  const { left = 0, text } = pointers[uuid]!;
  // avoid pointer moving out of chart area.
  let dis = -99999999;
  const threshold = 50;
  if (metricWidth) {
    if (left <= threshold) {
      dis = threshold;
    } else if (left >= metricWidth - threshold) {
      dis = metricWidth - threshold;
    } else {
      dis = left;
    }
  }
  return (
    <div
      style={{
        transform: `translate(${dis}px)`,
        position: "absolute",
        whiteSpace: "nowrap",
      }}
    >
      <div className="pointer-wrapper">{text}</div>
    </div>
  );
};

export default Pointer;

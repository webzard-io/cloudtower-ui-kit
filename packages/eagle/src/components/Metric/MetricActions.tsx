import { parrotI18n } from "@cloudtower/parrot";
import React from "react";

const MetricActions: React.FC<{
  info: { current: string; max: string };
  dropdown?: React.ReactNode;
}> = (props) => {
  const { info, dropdown } = props;
  const { current, max } = info;

  return (
    <div className="metric-extra">
      <div>
        <span className="info-item">
          {parrotI18n.t("metric.max")}：{max}
        </span>
        <span className="info-item">
          {parrotI18n.t("metric.current")}：{current}
        </span>
      </div>
      {dropdown}
    </div>
  );
};

export default MetricActions;

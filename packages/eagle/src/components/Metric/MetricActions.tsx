import React from "react";
import { useTranslation } from "react-i18next";

const MetricActions: React.FC<{
  info: { current: string; max: string };
  dropdown?: React.ReactNode;
}> = (props) => {
  const { info, dropdown } = props;
  const { current, max } = info;

  const { t } = useTranslation();

  return (
    <div className="metric-extra">
      <div>
        <span className="info-item">
          {t("metric.max")}：{max}
        </span>
        <span className="info-item">
          {t("metric.current")}：{current}
        </span>
      </div>
      {dropdown}
    </div>
  );
};

export default MetricActions;

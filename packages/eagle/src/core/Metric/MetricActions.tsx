import useParrotTranslation from "@src/hooks/useParrotTranslation";
import React from "react";

const MetricActions: React.FC<{
  info: { current: string; max: string };
  dropdown?: React.ReactNode;
}> = (props) => {
  const { info, dropdown } = props;
  const { current, max } = info;

  const { t } = useParrotTranslation();

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

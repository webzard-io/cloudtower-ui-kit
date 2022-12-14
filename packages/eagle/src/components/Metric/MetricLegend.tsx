import { DoubleRightOutlined } from "@ant-design/icons";
import { Maybe, MetricStream } from "@cloudtower/eagle/generated/react-hooks";
import { ExtraOverflow } from "@cloudtower/eagle/kit/smartx";
import { Truncate } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { Menu } from "antd";
import cs from "classnames";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  ColorBlockStyle,
  ExtraResource,
  LegendItemStyle,
  LegendStyle,
} from "./styled";
import { FormatName, IMetricData } from "./type";

export const ColorBlock: React.FC<{
  background: string;
}> = ({ background }) => (
  <div className={cs(ColorBlockStyle, "color-block")} style={{ background }} />
);

export type GetDeselectedValueWithSuffix = (
  type: string | undefined,
  data: IMetricData,
  metricName: string,
  sample_stream?: MetricStream
) => string;
interface IProps {
  streams: MetricStream[];
  metricName: string;
  deselected: string[];
  onClick: (id: string) => void;
  service?: Maybe<string>;
  onLabelsChange?: (labels: string[]) => void;
  formatLegendItemName: FormatName;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix;
  data: IMetricData[];
  metricColors: string[];
  metricType: string;
}

// TODO: when too many, refer to the fisheye
const MetricLegend = (props: IProps) => {
  const {
    streams,
    metricName,
    deselected,
    onClick,
    service,
    metricType,
    onLabelsChange,
    formatLegendItemName,
    getDeselectedValueWithSuffix,
    data,
    metricColors,
  } = props;
  const kit = useContext(kitContext);

  useEffect(() => {
    let labels: string[] = [];
    if (data && data.length > 0) {
      labels = data.map((d, idx) =>
        formatLegendItemName({
          type: metricType,
          data: d,
          service,
          metricName,
          t: parrotI18n.t,
          streams,
          dIndex: idx,
        })
      );
    }
    onLabelsChange?.(labels);
  }, [
    data,
    metricType,
    service,
    metricName,
    streams,
    onLabelsChange,
    formatLegendItemName,
  ]);

  return (
    <ExtraOverflow
      className={LegendStyle}
      extraEl={(end) => (
        <kit.dropdown
          overlayClassName={ExtraResource}
          overlay={
            <Menu>
              {data.slice(end).map((d, idx) => {
                if (!d) {
                  return null;
                }
                const deselectedValue = getDeselectedValueWithSuffix(
                  metricType,
                  d,
                  metricName,
                  streams[end + idx]
                );
                return (
                  <Menu.Item
                    className={cs(
                      LegendItemStyle,
                      deselected.includes(deselectedValue) && "deselected"
                    )}
                    key={d.id}
                    onClick={() => onClick(deselectedValue)}
                  >
                    <ColorBlock background={metricColors[end + idx]} />
                    <span>
                      {formatLegendItemName({
                        type: metricType,
                        data: d,
                        service,
                        metricName,
                        t: parrotI18n.t,
                        streams,
                        dIndex: end + idx,
                      })}
                    </span>
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <DoubleRightOutlined rotate={90} />
        </kit.dropdown>
      )}
      els={data.map((d, index) => {
        if (!d) {
          return null;
        }
        const deselectedValue = getDeselectedValueWithSuffix(
          metricType,
          d,
          metricName,
          streams[index]
        );
        return (
          <div
            className={cs(
              LegendItemStyle,
              deselected.includes(deselectedValue) && "deselected"
            )}
            key={d.id}
            onClick={() => onClick(deselectedValue)}
          >
            <ColorBlock background={metricColors[index]} />
            <span>
              <Truncate
                text={formatLegendItemName({
                  type: metricType,
                  data: d,
                  service,
                  metricName,
                  t: parrotI18n.t,
                  streams,
                  dIndex: index,
                })}
                len={50}
                backLen={20}
              />
            </span>
          </div>
        );
      })}
    />
  );
};

export const LegendComponent: React.FC<{
  metricName: string;
  onLabelsChange?: (labels: string[]) => void;
  getColorsByMetric: (metricName: string) => string;
}> = (props) => {
  const { metricName, onLabelsChange, getColorsByMetric } = props;
  const { i18n } = useTranslation();
  const name = i18n.td(`metric.${metricName}`);
  const color = getColorsByMetric(metricName);

  if (typeof onLabelsChange === "function") {
    onLabelsChange([name]);
  }

  return (
    <div className={cs(LegendItemStyle, "legend-component")}>
      <ColorBlock background={color} />
      <span>{name}</span>
    </div>
  );
};

export default MetricLegend;

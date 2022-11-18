import { DoubleRightOutlined } from "@ant-design/icons";
import { Maybe, MetricStream } from "@cloudtower/eagle/generated/react-hooks";
import { ExtraOverflow } from "@cloudtower/eagle/kit/smartx";
import { Truncate } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { css } from "@linaria/core";
import { getMetricQueryType } from "@tower/utils";
import { Menu } from "antd";
import cs from "classnames";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getColorsByMetric, metricColors } from "./metric";
import { FormatName } from "./type";

const LegendStyle = css`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  .ant-dropdown-trigger {
    margin-left: auto;
    font-size: 12px;
  }
`;

const LegendItemStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }
  &.deselected {
    opacity: 0.4;

    .color-block {
      background: #b4beca !important;
    }
  }
`;

const ColorBlockStyle = css`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-right: 8px;
`;

const ExtraResource = css`
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin: 0;
  }
`;

export const ColorBlock: React.FC<{
  background: string;
}> = ({ background }) => (
  <div className={cs(ColorBlockStyle, "color-block")} style={{ background }} />
);

export type GetDeselectedValueWithSuffix<MetricData extends { id: string }> = (
  type: string | undefined,
  data: MetricData,
  metricName: string,
  sample_stream?: MetricStream
) => string;
interface IProps<MetricData extends { id: string }> {
  sample_streams: MetricStream[];
  metricName: string;
  deselected: string[];
  onClick: (id: string) => void;
  service?: Maybe<string>;
  resourceType?: Maybe<string>;
  onLabelsChange?: (labels: string[]) => void;
  formatLegendItemName: FormatName<MetricData>;
  getDeselectedValueWithSuffix: GetDeselectedValueWithSuffix<MetricData>;
  data: MetricData[];
}

// TODO: when too many, refer to the fisheye
const MetricLegend = <MetricData extends { id: string }>(
  props: IProps<MetricData>
) => {
  const {
    sample_streams,
    metricName,
    deselected,
    onClick,
    service,
    resourceType,
    onLabelsChange,
    formatLegendItemName,
    getDeselectedValueWithSuffix,
    data,
  } = props;
  const kit = useContext(kitContext);

  const metricType = getMetricQueryType(metricName, resourceType || "");

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
          sample_streams,
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
    sample_streams,
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
                  sample_streams[end + idx]
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
                        sample_streams,
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
          sample_streams[index]
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
                  sample_streams,
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
  metric: string;
  onLabelsChange?: (labels: string[]) => void;
}> = (props) => {
  const { metric, onLabelsChange } = props;
  const { i18n } = useTranslation();
  const name = i18n.td(`metric.${metric}`);
  const color = getColorsByMetric(metric);

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

import { DoubleRightOutlined } from "@ant-design/icons";
import { ExtraOverflow } from "@cloudtower/eagle/kit/smartx";
import { Truncate } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { css } from "@linaria/core";
import { getMetricQueryType } from "@tower/utils";
import { Maybe, MetricStream } from "@tower/utils/lib/generated/types";
import { Menu } from "antd";
import cs from "classnames";
import { TFunction } from "i18next";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getColorsByMetric, metricColors } from "./metric";
import { FormatName, IMetricData } from "./type";

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

const getDeselectedValueWithSuffix = (
  type: string | undefined,
  data: IMetricData,
  metricName: string,
  sample_stream?: MetricStream
) => {
  const result = getDeselectedValue(type, data, metricName, sample_stream);
  let suffix = "";
  if (
    metricName.includes("_read_write_") &&
    sample_stream?.labels?.metric_name
  ) {
    suffix = sample_stream?.labels.metric_name.includes("_write_")
      ? "-write"
      : "-read";
  }
  return `${result}${suffix}`;
};

const getDeselectedValue = (
  type: string | undefined,
  data: IMetricData,
  metricName: string,
  sample_stream?: MetricStream
) => {
  if (!data) {
    return "";
  }
  switch (metricName) {
    case "host_cpu_temperature_celsius":
      return data.local_id + data.cpu;
    default:
      break;
  }

  switch (type) {
    case "host":
    case "scvm": {
      if (metricName.includes("_network_ping_packet")) {
        return data.local_id + "_" + (sample_stream?.labels?.to_hostname || "");
      }
      return data.local_id;
    }
    case "zbs_chunk":
      return data.chunk_id;
    case "host_service":
      return data.local_id;
    case "host_network":
      return data.name + data.host.local_id;
    case "vm_network":
      return (data.mac_address || "") + data.vm.local_id;
    case "disk":
    case "scvm_disk":
      return `${data.name}${data.host?.local_id}`;
    case "iscsi_lun":
      return data.zbs_volume_id + sample_stream?.labels?.instance;
    case "nvmf_namespace":
      return data.zbs_volume_id + sample_stream?.labels?.instance;
    default:
      return data.local_id;
  }
};

const formatName: FormatName = (params) => {
  const { type, data, service, metricName, t, sample_streams, dIndex } = params;
  if (!data) {
    return "";
  }
  const readWriteRender = readWrite({
    metricName,
    t,
    sample_streams,
    dIndex,
  });
  switch (metricName) {
    case "host_cpu_temperature_celsius":
      return `[${data.name}]${data.cpu}`;
    case "host_network_ping_packet_loss_percent":
      return `[${data.name}] to [${sample_streams[dIndex].labels.to_hostname}]`;
    default:
      break;
  }

  switch (type) {
    case "host_network":
      return `[${data.host?.name || t("enum.VmStatus_UNKNOWN")}]${
        data.name
      }${readWriteRender}`;
    case "vm_network":
      return `[${data.vm?.name || t("enum.VmStatus_UNKNOWN")}]${
        data.name
      }${readWriteRender}`;
    case "host_service":
      return `${data.name}/${service}${readWriteRender}`;
    case "disk":
      return `${data.host?.name || t("enum.VmStatus_UNKNOWN")}/${
        data.name
      }${readWriteRender}`;
    case "scvm":
      return `${data.scvm_name}`;
    case "scvm_disk":
      return `${data.host?.scvm_name || t("enum.VmStatus_UNKNOWN")}/${
        data.name
      }${readWriteRender}`;
    case "scvm_network":
      return `[${data.host.scvm_name}] ${data.name}`;
    case "iscsi_lun":
      return `${data.name}/${
        sample_streams[dIndex].labels.instance?.split(":")[0]
      }${readWriteRender}`;
    case "nvmf_namespace":
      return `${data.name}/${
        sample_streams[dIndex].labels.instance?.split(":")[0]
      }${readWriteRender}`;
    case "zone":
      return `${
        data.is_preferred
          ? t("zone.primary_to_second")
          : t("zone.second_to_primary")
      }`;
    default:
      return `${data.name}${readWriteRender}`;
  }
};

const readWrite = (params: {
  metricName: string;
  t: TFunction;
  sample_streams: MetricStream[];
  dIndex: number;
}) => {
  const { metricName, t, sample_streams, dIndex } = params;
  if (metricName.includes("read_write")) {
    if (sample_streams[dIndex].labels.metric_name?.includes("_write_")) {
      return `-${t("metric.write")}`;
    } else {
      return `-${t("metric.read")}`;
    }
  }
  return "";
};

// TODO: when too many, refer to the fisheye
const MetricLegend: React.FC<{
  sample_streams: MetricStream[];
  metricName: string;
  deselected: string[];
  onClick: (id: string) => void;
  service?: Maybe<string>;
  resourceType?: Maybe<string>;
  onLabelsChange?: (labels: string[]) => void;
  formatLegendItemName?: FormatName;
  data: IMetricData[];
}> = (props) => {
  const {
    sample_streams,
    metricName,

    deselected,
    onClick,
    service,
    resourceType,
    onLabelsChange,
    formatLegendItemName,
    data,
  } = props;
  const kit = useContext(kitContext);

  const metricType = getMetricQueryType(metricName, resourceType || "");

  const _formatName = formatLegendItemName || formatName;

  useEffect(() => {
    let labels: string[] = [];
    if (data && data.length > 0) {
      labels = data.map((d, idx) =>
        _formatName({
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
    _formatName,
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
                    key={`${d?.id}_${
                      d?.local_id || d?.chunk_id || d?.mac_address
                    }_${idx}`}
                    onClick={() => onClick(deselectedValue)}
                  >
                    <ColorBlock background={metricColors[end + idx]} />
                    <span>
                      {_formatName({
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
            key={`${d?.id}_${
              d?.local_id || d?.chunk_id || d?.mac_address
            }_${index}`}
            onClick={() => onClick(deselectedValue)}
          >
            <ColorBlock background={metricColors[index]} />
            <span>
              <Truncate
                text={_formatName({
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

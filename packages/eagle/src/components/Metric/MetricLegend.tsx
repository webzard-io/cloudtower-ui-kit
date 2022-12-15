import { DoubleRightOutlined } from "@ant-design/icons";
import { MetricStream } from "@cloudtower/eagle/generated/react-hooks";
import { ExtraOverflow } from "@cloudtower/eagle/kit/smartx";
import { Truncate } from "@cloudtower/eagle/kit/smartx";
import { kitContext } from "@cloudtower/eagle/kit/specify";
import { Menu } from "antd";
import cs from "classnames";
import React, { useContext } from "react";

import {
  ColorBlockStyle,
  ExtraResource,
  LegendItemStyle,
  LegendStyle,
} from "./styled";
import { ILegend, IMetricData } from "./type";

export const ColorBlock: React.FC<{
  background?: string;
}> = ({ background }) => (
  <div className={cs(ColorBlockStyle, "color-block")} style={{ background }} />
);

export type GetDeselectedValueWithSuffix = (
  type: string | undefined,
  data: IMetricData,
  metricName: string,
  sample_stream?: MetricStream
) => string;

export interface IMetricLegendProps {
  streams: MetricStream[];
  metricName: string;
  deselected: string[];
  onClick: (id: string) => void;
  legends: ILegend[];
}

const MetricLegend = (props: IMetricLegendProps) => {
  const { deselected, onClick, legends } = props;
  const kit = useContext(kitContext);

  return (
    <ExtraOverflow
      className={LegendStyle}
      extraEl={(end) => (
        <kit.dropdown
          overlayClassName={ExtraResource}
          overlay={
            <Menu>
              {legends.slice(end).map((legend, idx) => {
                return (
                  <Menu.Item
                    className={cs(
                      LegendItemStyle,
                      deselected.includes(legend.id) && "deselected"
                    )}
                    key={legend.id}
                    onClick={() => onClick(legend.id)}
                  >
                    <ColorBlock background={legend.bgColor} />
                    <span>{legend.name}</span>
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <DoubleRightOutlined rotate={90} />
        </kit.dropdown>
      )}
      els={legends.map((legend) => {
        return (
          <div
            className={cs(
              LegendItemStyle,
              deselected.includes(legend.id) && "deselected"
            )}
            key={legend.id}
            onClick={() => onClick(legend.id)}
          >
            <ColorBlock background={legend.bgColor} />
            <span>
              <Truncate text={legend.name} len={50} backLen={20} />
            </span>
          </div>
        );
      })}
    />
  );
};

export const LegendComponent: React.FC<ILegend> = (props) => {
  const { name, bgColor } = props;

  return (
    <div className={cs(LegendItemStyle, "legend-component")}>
      <ColorBlock background={bgColor} />
      <span>{name}</span>
    </div>
  );
};

export default MetricLegend;

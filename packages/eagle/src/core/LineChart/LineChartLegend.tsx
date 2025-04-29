import {
  ArrowChevronDown16BlueIcon,
  ArrowChevronDown16SecondaryIcon,
  ArrowChevronUp16BlueIcon,
} from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import {
  ExtraResource,
  LegendItemsStyle,
  LegendItemsStyleDropdown,
  LegendStyle,
  LineChartColorBlockStyle,
} from "@src/core/LineChart/styled";
import {
  ILineChartILegend,
  ILineChartMetricStream,
} from "@src/core/LineChart/type";
import { ExtraOverflow } from "@src/core/Overflow";
import Truncate from "@src/core/Truncate";
import { Antd5Dropdown } from "@src/index";
import { Menu } from "antd";
import cs from "classnames";
import React from "react";

export const LineChartColorBlock: React.FC<{
  background?: string;
  borderd?: boolean;
}> = ({ background, borderd = false }) => (
  <div
    className={cs(
      LineChartColorBlockStyle,
      "color-block",
      borderd && "borderd",
    )}
    style={{ background }}
  />
);

export interface ILineChartLegendProps {
  streams: ILineChartMetricStream[];
  metricName: string;
  deselected: string[];
  hovering: string[];
  hovereringSelf: string[];
  onClick: (id: string) => void;
  onHover: (method: "enter" | "leave", id: string) => void;
  legends: ILineChartILegend[];
}

const LineChartLegend = (props: ILineChartLegendProps) => {
  const { deselected, onClick, legends, onHover, hovering, hovereringSelf } =
    props;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <ExtraOverflow
      className={LegendStyle}
      extraEl={(end) => (
        <Antd5Dropdown
          overlayClassName={ExtraResource}
          trigger={["click"]}
          onVisibleChange={setIsDropdownOpen}
          overlay={
            <Menu>
              {legends.slice(end).map((legend, idx) => {
                return (
                  <Menu.Item
                    className={cs(
                      LegendItemsStyleDropdown,
                      deselected.includes(legend.id) && "deselected",
                      hovering.includes(legend.id) && "hovering",
                      hovereringSelf.includes(legend.id) && "hoverering-self",
                    )}
                    key={legend.id}
                    onClick={() => onClick(legend.id)}
                    onMouseEnter={() => onHover("enter", legend.id)}
                    onMouseLeave={() => onHover("leave", legend.id)}
                  >
                    <LineChartColorBlock background={legend.color} />
                    <span className="legend-name">{legend.name}</span>
                  </Menu.Item>
                );
              })}
            </Menu>
          }
        >
          <Icon
            alt={"arrowChevronDownSmall16Secondary"}
            className="dropdown-trigger"
            src={ArrowChevronDown16SecondaryIcon}
            hoverSrc={ArrowChevronDown16BlueIcon}
            activeSrc={ArrowChevronUp16BlueIcon}
            active={isDropdownOpen}
          />
        </Antd5Dropdown>
      )}
      els={legends.map((legend) => {
        return (
          <div
            className={cs(
              LegendItemsStyle,
              deselected.includes(legend.id) && "deselected",
              hovering.includes(legend.id) && "hovering",
              hovereringSelf.includes(legend.id) && "hoverering-self",
            )}
            key={legend.id}
            onMouseEnter={() => onHover("enter", legend.id)}
            onMouseLeave={() => onHover("leave", legend.id)}
            onClick={() => onClick(legend.id)}
          >
            <LineChartColorBlock background={legend.color} />
            <span className="legend-name">
              <Truncate text={legend.name} len={50} backLen={20} />
            </span>
          </div>
        );
      })}
    />
  );
};

const LegendComponent: React.FC<ILineChartILegend> = (props) => {
  const { name, color } = props;

  return (
    <div className={cs(LegendItemsStyle, "legend-component")}>
      <LineChartColorBlock background={color} />
      <span className="legend-name">{name}</span>
    </div>
  );
};

export default LineChartLegend;

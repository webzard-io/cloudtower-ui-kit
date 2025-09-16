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

  // check if the event is from or involves the icon suffix area
  const shouldSkipHover = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const relatedTarget = (e as any).relatedTarget as HTMLElement;

    // check if the event target is in the icon suffix wrapper
    const isFromIconSuffix = target?.closest(".icon-suffix-wrapper") !== null;
    const isToIconSuffix =
      relatedTarget?.closest(".icon-suffix-wrapper") !== null;

    // if the mouse is moving between the icon suffix area and other areas, skip the hover event
    return isFromIconSuffix || isToIconSuffix;
  };

  const handleMouseEnter = (legendId: string) => (e: React.MouseEvent) => {
    if (!shouldSkipHover(e)) {
      onHover("enter", legendId);
    }
  };

  const handleMouseLeave = (legendId: string) => (e: React.MouseEvent) => {
    if (!shouldSkipHover(e)) {
      onHover("leave", legendId);
    }
  };

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
                      hovering?.includes(legend.id) && "hovering",
                      hovereringSelf.includes(legend.id) && "hoverering-self",
                    )}
                    key={legend.id}
                    onClick={() => onClick(legend.id)}
                    onMouseEnter={() => handleMouseEnter(legend.id)}
                    onMouseLeave={() => handleMouseLeave(legend.id)}
                  >
                    <LineChartColorBlock background={legend.color} />
                    <span className="legend-name">
                      <Truncate text={legend.name} len={50} backLen={20} />
                    </span>

                    <div className="icon-suffix-wrapper">
                      {legend.iconSuffix}
                    </div>
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
              hovering?.includes(legend.id) && "hovering",
              hovereringSelf.includes(legend.id) && "hoverering-self",
            )}
            key={legend.id}
            onMouseEnter={handleMouseEnter(legend.id)}
            onMouseLeave={handleMouseLeave(legend.id)}
            onClick={() => onClick(legend.id)}
          >
            <LineChartColorBlock background={legend.color} />
            <span className="legend-name">
              <Truncate text={legend.name} len={50} backLen={20} />
            </span>
            <div className="icon-suffix-wrapper">{legend.iconSuffix}</div>
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

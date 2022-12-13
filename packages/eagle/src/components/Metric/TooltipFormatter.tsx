import { MetricUnit } from "@cloudtower/eagle/generated/react-hooks";
import { ChartState, useKitSelector } from "@cloudtower/eagle/kit/smartx";
import React from "react";
import { TooltipProps } from "recharts";
import { Payload as TooltipPayload } from "recharts/types/component/DefaultTooltipContent";

import { transformDataAndUnit, UNIT_FORMATTER } from "./metric";
import { ColorBlock, LegendComponent } from "./MetricLegend";
import { TooltipColumn, TooltipWrapper } from "./styled";

const TOWER_PERCENT = "%";

const TooltipFormatter: React.FC<
  TooltipProps<number, string> & {
    uuid: string;
    deselectedIndex: number[];
    isLegend: boolean;
    metricName: string;
    getColorsByMetric: (metricName: string) => string;
  }
> = (props) => {
  const {
    active,
    payload,
    uuid,
    deselectedIndex,
    isLegend,
    metricName,
    getColorsByMetric,
  } = props;
  const resourceData = useKitSelector<ChartState["resourceData"]>(
    (state) => state.chart.resourceData
  );

  if (!active || !payload?.length) {
    return null;
  }

  const sortArr = payload
    .slice()
    .sort((a, b) => (b.value as number) - (a.value as number));
  const transformColumnValue = (
    payloads: readonly TooltipPayload<number, string>[] | undefined,
    index = 0
  ) => {
    if (!payloads?.length) return "";
    const { payload } =
      payloads.find(
        (payload) => payload.name === `v${payload.name === "v" ? "" : index}`
      ) || {};
    if (!payload) return "-";
    const { unit, value } = transformDataAndUnit(
      payload.unit,
      "v" in payload ? payload.v : payload[`v${index}`]
    );
    const baseUnit = UNIT_FORMATTER[payload.unit as unknown as MetricUnit]?.[1];
    const formattedValue =
      value !== -Infinity
        ? value.toFixed(unit === baseUnit && unit !== TOWER_PERCENT ? 0 : 2)
        : "-";
    if (
      [
        MetricUnit.Count,
        MetricUnit.Ratio,
        MetricUnit.Percent,
        MetricUnit.Load,
        MetricUnit.Temperature,
      ].includes(payload.unit)
    ) {
      return formattedValue + unit;
    }
    return formattedValue + " " + unit;
  };

  if (!isLegend) {
    return (
      <TooltipWrapper>
        <TooltipColumn>
          <LegendComponent
            metricName={metricName}
            getColorsByMetric={getColorsByMetric}
          />
          <div className="column-value">{transformColumnValue(payload)}</div>
        </TooltipColumn>
      </TooltipWrapper>
    );
  }

  const data = resourceData[uuid];
  return (
    <TooltipWrapper>
      {sortArr?.map((item) => {
        const displayIndex = Number((item.name || "").slice(1));
        return deselectedIndex.includes(displayIndex) ? null : (
          <TooltipColumn key={displayIndex}>
            <div>
              <ColorBlock background={item.color!} />
              {data && data[displayIndex]?.name}
            </div>
            <div className="column-value">
              {transformColumnValue(payload, displayIndex)}
            </div>
          </TooltipColumn>
        );
      })}
    </TooltipWrapper>
  );
};

export default TooltipFormatter;

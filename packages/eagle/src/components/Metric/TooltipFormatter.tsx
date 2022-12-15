import { MetricUnit } from "@cloudtower/eagle/generated/react-hooks";
import React from "react";
import { TooltipProps } from "recharts";
import { Payload as TooltipPayload } from "recharts/types/component/DefaultTooltipContent";

import { transformDataAndUnit, UNIT_FORMATTER } from "./metric";
import { ColorBlock } from "./MetricLegend";
import { TooltipColumn, TooltipWrapper } from "./styled";
import { ILegend } from "./type";

const TOWER_PERCENT = "%";

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

const TooltipFormatter: React.FC<
  TooltipProps<number, string> & {
    uuid: string;
    deselectedIndex: number[];
    legends: ILegend[];
  }
> = (props) => {
  const { active, payload, deselectedIndex, legends } = props;

  if (!active || !payload?.length) {
    return null;
  }

  const sortArr = payload
    .slice()
    .sort((a, b) => (b.value as number) - (a.value as number));

  return (
    <TooltipWrapper>
      {sortArr.map((item, index) => {
        const displayIndex = Number((item.name || "").slice(1));
        return deselectedIndex.includes(displayIndex) ? null : (
          <TooltipColumn key={displayIndex}>
            <div>
              <ColorBlock background={legends[index]?.bgColor} />
              {legends[index]?.name}
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

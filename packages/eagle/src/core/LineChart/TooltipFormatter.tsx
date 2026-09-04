import { styled } from "@linaria/react";
import { LineChartColorBlock } from "@src/core/LineChart/LineChartLegend";
import { TooltipColumn, TooltipWrapper } from "@src/core/LineChart/styled";
import { ILineChartLegend } from "@src/core/LineChart/type";
import { getLineChartMetricPayloadMatches } from "@src/core/LineChart/utils";
import dayjs from "dayjs";
import React from "react";
import { TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import { Typo } from "../Typo";

const TooltipTitle = styled.div`
  color: $text-light-on-tint;
`;

export interface ILineChartTooltipItem {
  id: string;
  color?: string;
  label?: React.ReactNode;
  value?: React.ReactNode;
}

export const LineChartTooltipContent: React.FC<{
  title: React.ReactNode;
  items: ILineChartTooltipItem[];
}> = ({ title, items }) => {
  return (
    <TooltipWrapper>
      <TooltipTitle className={Typo.Label.l4_bold_title}>{title}</TooltipTitle>
      {items.map((item) => {
        return (
          <TooltipColumn key={item.id}>
            <div>
              <LineChartColorBlock background={item.color} borderd />
              {item.label}
            </div>
            <div className="column-value">{item.value}</div>
          </TooltipColumn>
        );
      })}
    </TooltipWrapper>
  );
};

const TooltipFormatter: React.FC<
  TooltipProps<number, string> & {
    deselected: string[];
    legends: ILineChartLegend[];
    format: (payload: Payload<number, string>) => string;
  }
> = (props) => {
  const { active, payload, deselected, legends, format } = props;

  if (!active || !payload?.length) {
    return null;
  }

  const metricPayloads = getLineChartMetricPayloadMatches(payload, legends);
  const titlePayload = metricPayloads[0]?.payload?.payload;

  if (!titlePayload) {
    return null;
  }

  const items = metricPayloads
    .sort((a, b) => (b.payload.value as number) - (a.payload.value as number))
    .flatMap((item) => {
      if (deselected.includes(item.legend.id)) {
        return [];
      }

      return [
        {
          id: item.legend.id,
          color: item.legend.color,
          label: item.legend.name,
          value: format(item.payload),
        },
      ];
    });

  return (
    <LineChartTooltipContent
      title={dayjs(Number(titlePayload.t)).format("MM/DD HH:mm:ss")}
      items={items}
    />
  );
};

export default TooltipFormatter;

import { styled } from "@linaria/react";
import { LineChartColorBlock } from "@src/core/LineChart/LineChartLegend";
import { TooltipColumn, TooltipWrapper } from "@src/core/LineChart/styled";
import { ILineChartLegend } from "@src/core/LineChart/type";
import dayjs from "dayjs";
import React from "react";
import { TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import { Typo } from "../Typo";

const TooltipTitle = styled.div`
  color: $text-light-on-tint;
`;

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

  return (
    <TooltipWrapper>
      {
        <TooltipTitle className={Typo.Label.l4_bold_title}>
          {dayjs(Number(payload[0].payload.t)).format("MM/DD HH:mm:ss")}
        </TooltipTitle>
      }
      {payload
        .map((item) => {
          return {
            ...item,
            legend: legends.find((_legend, index) => `v${index}` === item.name),
          };
        })
        .sort((a, b) => (b.value as number) - (a.value as number))
        .map((item) => {
          return deselected.includes(item.legend?.id || "") ? null : (
            <TooltipColumn key={item.legend?.id}>
              <div>
                <LineChartColorBlock background={item.legend?.color} borderd />
                {item.legend?.name}
              </div>
              <div className="column-value">{format(item)}</div>
            </TooltipColumn>
          );
        })}
    </TooltipWrapper>
  );
};

export default TooltipFormatter;

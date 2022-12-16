import React from "react";
import { TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

import { ColorBlock } from "./MetricLegend";
import { TooltipColumn, TooltipWrapper } from "./styled";
import { ILegend } from "./type";

const TooltipFormatter: React.FC<
  TooltipProps<number, string> & {
    uuid: string;
    deselected: string[];
    legends: ILegend[];
    format: (payload: Payload<number, string>[]) => string;
  }
> = (props) => {
  const { active, payload, deselected, legends, format } = props;

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <TooltipWrapper>
      {payload
        .map((item, index) => {
          return {
            ...item,
            legend: legends[index],
          };
        })
        .sort((a, b) => (b.value as number) - (a.value as number))
        .map((item) => {
          return deselected.includes(item.legend.id) ? null : (
            <TooltipColumn key={item.legend.id}>
              <div>
                <ColorBlock background={item.legend.bgColor} />
                {item.legend.name}
              </div>
              <div className="column-value">{format(payload)}</div>
            </TooltipColumn>
          );
        })}
    </TooltipWrapper>
  );
};

export default TooltipFormatter;

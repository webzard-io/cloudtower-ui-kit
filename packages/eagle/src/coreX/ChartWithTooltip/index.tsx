import { styled } from "@linaria/react";
import _ from "lodash";
import React from "react";

import Bit from "../../components/Bit";
import BitPerSecond from "../../components/BitPerSecond";
import Bps from "../../components/Bps";
import Byte from "../../components/Byte";
import Frequency from "../../components/Frequency";
import Percent from "../../components/Percent";
import Second from "../../components/Second";
import Speed from "../../components/Speed";
import { TertiaryText } from "../../components/Styled";
import Tooltip from "../../components/Tooltip";
import { formatPercent } from "../../utils/tower";
import UnitWithChart, {
  ChartType,
  IUnitWithChartProps,
  UnitWrapper,
} from "../UnitWithChart";

const units = {
  Percent,
  Byte,
  Frequency,
  Speed,
  Bps,
  BitPerSecond,
  Bit,
  Second,
};

const ChartContent = styled.div`
  display: inline-block;
  width: 100%;
  .recharts-wrapper {
    margin-left: 4px;
  }
`;

const ChartTooltipContainer = styled.div`
  padding: 4px;
`;

const ChartTooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  line-height: 24px;
  color: #cccccc;
  white-space: nowrap;

  label {
    margin-right: 32px;
  }
`;

const ChartTooltipTitle = styled(ChartTooltipRow)`
  font-weight: bold;
  color: white;
`;

const SpaceStatus = styled.i<{
  color: string;
}>`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  display: inline-block;
  background: ${(props) => props.color};
  border: 1px solid $fills-light-white;
  box-sizing: content-box;
  margin-right: 6px;
`;

const PrimaryUnit = styled.div`
  & > :first-child {
    font-weight: bold;
    color: white;
    margin-right: 4px;
  }
`;

export interface ICWTProps {
  title: {
    label: string;
    value?: number | null;
  };
  items: {
    label: string;
    color: string;
    value: number;
    // Whether the value shall be saturated when shown as text and saturation is possible,
    // i.e. the percentage 120% may be saturated to 100%.
    // Defaults to use saturation if omitted.
    saturated?: boolean;
  }[];
  rawValue?: number | null;
  unit: IUnitWithChartProps["unit"];
  chartType?: ChartType;
  /**
   * pass the parameter if table cell unit different with tooltip
   */
  tableUnit?: IUnitWithChartProps["unit"];
  saturated?: boolean;
}

export type IChartWithUnitProps = {
  total: number;
  items: {
    label: string;
    color: string;
    value: number;
  }[];
  rawValue?: number | null;
  unit: IUnitWithChartProps["unit"];
  chartType?: ChartType;
  /**
   * pass the parameter if table cell unit different with tooltip
   */
  tableUnit?: IUnitWithChartProps["unit"];
};

export const ChartWithUnit: React.FC<IChartWithUnitProps> = (props) => {
  const { items, rawValue, unit, chartType, tableUnit, total } = props;
  const finalTableUnit = tableUnit ?? unit;

  const emptyDisplay = (rawValue?: number | null) => {
    if (_.isNil(rawValue)) {
      return <TertiaryText>-</TertiaryText>;
    }
    return finalTableUnit === "Percent" ? (
      // process 0.0%
      <span className={UnitWrapper}>
        <Percent rawValue={rawValue} decimals={1} />
      </span>
    ) : (
      rawValue
    );
  };

  return (
    <ChartContent>
      {rawValue || rawValue === 0 ? (
        <UnitWithChart
          unit={finalTableUnit}
          rawValue={
            chartType === "barChart"
              ? formatPercent((rawValue / total) * 100, 1).numberValue
              : rawValue
          }
          total={total}
          chartType={chartType}
          data={items}
        />
      ) : (
        emptyDisplay(rawValue)
      )}
    </ChartContent>
  );
};

const ChartWithTooltip: React.FunctionComponent<ICWTProps> = (props) => {
  const { title, items, rawValue, unit, chartType, tableUnit, saturated } =
    props;
  const KitUnit = units[unit];
  const total = title.value || 0;
  const finalTableUnit = tableUnit ?? unit;

  const emptyDisplay = (rawValue?: number | null) => {
    if (_.isNil(rawValue)) {
      return <TertiaryText>-</TertiaryText>;
    }
    return finalTableUnit === "Percent" ? (
      // process 0.0%
      <Percent rawValue={rawValue} decimals={1} />
    ) : (
      rawValue
    );
  };

  return (
    <Tooltip
      title={
        <ChartTooltipContainer>
          <ChartTooltipTitle>
            <label>{title.label}</label>
            <KitUnit rawValue={total} />
          </ChartTooltipTitle>
          {items.map((item) => (
            <ChartTooltipRow key={item.label}>
              <label>
                <SpaceStatus color={item.color} />
                <span>{item.label}</span>
              </label>
              <PrimaryUnit className="value">
                <KitUnit rawValue={item.value || 0} />
                <span>
                  (
                  {total
                    ? (item.value
                        ? formatPercent(
                            ((item.value || 0) / total) * 100,
                            1,
                            item.saturated ?? true
                          ).value
                        : 0) + "%"
                    : "-"}
                  )
                </span>
              </PrimaryUnit>
            </ChartTooltipRow>
          ))}
        </ChartTooltipContainer>
      }
      overlayStyle={{ maxWidth: 500, minWidth: 246 }}
    >
      <ChartContent>
        {total ? (
          rawValue ? (
            <UnitWithChart
              unit={finalTableUnit}
              rawValue={
                chartType === "barChart"
                  ? formatPercent(
                      (rawValue / total) * 100,
                      1,
                      saturated ?? true
                    ).numberValue
                  : rawValue
              }
              total={total}
              chartType={chartType}
              data={items}
              saturated={saturated}
            />
          ) : (
            emptyDisplay(rawValue)
          )
        ) : (
          emptyDisplay(null)
        )}
      </ChartContent>
    </Tooltip>
  );
};

export default ChartWithTooltip;

import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import useParrotTranslation from "@src/hooks/useParrotTranslation";
import cs from "classnames";
import { TFunction } from "i18next";
import React, { useMemo } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

import Tooltip from "../../core/Tooltip";
import { Typo } from "../../core/Typo";
import OverflowTooltip from "../../coreX/OverflowTooltip";
import { Color } from "../../styles/token";

export enum DonutChartColor {
  RED = "red",
  GREEN = "green",
  YeLLOW = "yellow",
  BLUE = "blue",
  PURPLE = "purple",
}

export type IDonutChartProps = {
  /**
   * 默认支持单色系展示，如果是单色系直接传入颜色类型
   */
  color?: DonutChartColor;
  /**
   * 支持自定义图形外部样式
   */
  className?: string;
  /**
   * 支持自定义图形宽度
   */
  width?: number;
  /**
   * 支持自定义图形的内半径
   */
  innerRadius?: number;
  /**
   * 支持自定义图形的外半径
   */
  outerRadius?: number;
  /**
   * 支持自定义图形高度
   */
  height?: number;
  /**
   * 支持自定义 tooltip 样式
   */
  overlayClassName?: string;
  /**
   * * centerRender 对应 Donut Chart 中间的展示
   * * 可直接传入 object 类型，object 中的 number 为数值， text为数值下面的文案展示
   * * 支持传入 ReactNode 自定义组件
   */
  centerRender?:
    | React.ReactElement
    | {
        number: number;
        text: string;
      };
  /**
   * * 图形展示的数据
   * * 数据合并展示规则：
   * * 如果 data 的长度不超过 5 并且没有 otherData 时，会全部展示
   * * 如果 data 的长度小于等于 4 并且有 otherData 时，会全部展示
   * * 如果 data 的长度大于 4 并且有 otherData 时，会将第 3 项之后的数据合并为一项，在 tooltip 中展示，
   * * 如果 data 的长度大于 5 不管是否有 otherData 会将第 4 项之后对 data 进行合并展示
   * * 如果有希望合并的数据，建议在传入数据时进行排序
   * * data 中每一项支持 onClick 事件，支持自定义颜色，当有自定义颜色时优先展示
   */
  data: {
    name: string;
    value: number;
    color?: string;
    tooltip?: string;
    onClick?: (name: string) => void;
  }[];
  /**
   * otherData中的数据会默认合并为其他，name 和 value 会在tooltip中展示详情
   */
  otherData?: {
    name: string;
    value: number;
  }[];
  /**
   * 当 data 数据合并时展示的文案
   */
  collapseText?: string;
  /**
   * 是否展示间隔, 当组件作为二元组件时传入false
   */
  widthPadding?: boolean;
  /**
   * 是否展示legend
   */
  showLegend?: boolean;
};

interface DonutChartWrapperProps {
  width: number;
}

const DonutChartWrapper = styled.div<DonutChartWrapperProps>`
  position: relative;
  max-width: 388px;
  min-width: 285px;
  .center {
    position: absolute;
    font-size: 12px;
    width: 80px;
    height: 100px;
    top: 0;
    left: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $text-light-primary;

    .number {
      font-size: 24px;
      font-weight: 700;
    }

    .text {
      padding: 0 5px;
      font-size: 12px;
      width: inherit;
      text-align: center;
    }
  }
  .recharts-wrapper {
    display: flex;
    .recharts-legend-wrapper {
      position: relative !important;
      min-width: calc(
        100% - ${(props: DonutChartWrapperProps) => `${props.width}`}px
      ) !important;
      left: 0 !important;
      bottom: 0 !important;
      display: flex;
      align-items: center;
      .recharts-default-legend {
        width: 100%;
      }
      li {
        width: 100%;
        margin-right: 0 !important;
        line-height: 18px;
        & > svg {
          border-radius: 2px;
        }
        & > .recharts-legend-item-text {
          min-width: 75px;
          max-width: 198px;
          width: calc(100% - 20px);
          margin-left: 2px;
          color: $text-light-primary !important;
          display: inline-flex;
          justify-content: space-between;
        }
      }
    }
  }
  .tooltip-text {
    maxwidth: calc(100% - 12px);
    cursor: pointer;
    border-bottom: 1px dashed $strokes-light-trans-4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .value {
    color: $text-neutral-secondary;
  }
`;

const TooltipDefaultClass = css`
  width: 140px;

  .item {
    margin: 6px auto;
    display: flex;
    justify-content: space-between;

    .name {
      width: 102px;
    }
  }
`;

const ColorMap = {
  [DonutChartColor.BLUE]: [
    Color.chart.blue["blue-9"],
    Color.chart.blue["blue-7"],
    Color.chart.blue["blue-5"],
    Color.chart.blue["blue-3"],
    Color.chart.blue["blue-1"],
  ],
  [DonutChartColor.GREEN]: [
    Color.chart.green["green-9"],
    Color.chart.green["green-7"],
    Color.chart.green["green-5"],
    Color.chart.green["green-3"],
    Color.chart.green["green-1"],
  ],
  [DonutChartColor.RED]: [
    Color.chart.red["red-9"],
    Color.chart.red["red-7"],
    Color.chart.red["red-5"],
    Color.chart.red["red-3"],
    Color.chart.red["red-1"],
  ],
  [DonutChartColor.YeLLOW]: [
    Color.chart.yellow["yellow-9"],
    Color.chart.yellow["yellow-7"],
    Color.chart.yellow["yellow-5"],
    Color.chart.yellow["yellow-3"],
    Color.chart.yellow["yellow-1"],
  ],
  [DonutChartColor.PURPLE]: [
    Color.chart.purple["purple-9"],
    Color.chart.purple["purple-7"],
    Color.chart.purple["purple-5"],
    Color.chart.purple["purple-3"],
    Color.chart.purple["purple-1"],
  ],
};

export const formatCollapse = (
  collapseData: {
    name: string;
    value: number;
  }[] = [],
) => {
  const value = collapseData.reduce((prev, next) => {
    return prev + next.value;
  }, 0);

  return {
    tooltip: collapseData,
    value,
  };
};

export const formatChartData = ({
  otherData,
  data,
  t,
  collapseText,
}: IDonutChartProps & {
  t: TFunction<"translation", undefined>;
}) => {
  if (otherData && data.length < 5) {
    return [
      ...data,
      {
        name: t("components.other"),
        value: formatCollapse(otherData)?.value,
        color: Color.gray["gray-40"],
        tooltip: formatCollapse(otherData)?.tooltip,
      },
    ];
  }
  if (otherData && data.length >= 5) {
    const remainData = data.slice(0, 3);
    const needCollapseData = data.slice(3, data.length);
    return [
      ...remainData,
      {
        name: data[3].name + collapseText,
        value: formatCollapse(needCollapseData)?.value,
        color: null,
        tooltip: formatCollapse(needCollapseData)?.tooltip,
      },
      {
        name: t("components.other"),
        value: formatCollapse(otherData)?.value,
        color: null,
        tooltip: formatCollapse(otherData)?.tooltip,
      },
    ];
  }
  if (data.length > 5) {
    const remainData = data.slice(0, 4);
    const needCollapseData = data.slice(4, data.length);
    return [
      ...remainData,
      {
        name: data[4].name + collapseText,
        value: formatCollapse(needCollapseData)?.value,
        color: null,
        tooltip: formatCollapse(needCollapseData)?.tooltip,
      },
    ];
  }

  return data;
};

const DonutChart: React.FC<IDonutChartProps> = ({
  data,
  centerRender,
  className,
  overlayClassName,
  color,
  otherData,
  collapseText,
  width = 148,
  height = 100,
  innerRadius = 45,
  outerRadius = 50,
  widthPadding = true,
  showLegend = true,
}) => {
  const initColorMap = color ? ColorMap[color] : [];
  const { t } = useParrotTranslation();
  const formatData = useMemo(() => {
    return formatChartData({ data, otherData, collapseText, t });
  }, [data, otherData, t, collapseText]);

  return (
    <DonutChartWrapper width={width}>
      <PieChart
        width={width}
        height={height}
        style={{ width: "100%" }}
        className={className}
        margin={{ left: 0, top: 0, right: 0, bottom: 0 }}
      >
        <Pie
          dataKey="value"
          data={formatData}
          innerRadius={innerRadius}
          outerRadius={outerRadius ?? height / 2}
          cx={width / 2}
          cy={height / 2}
          paddingAngle={widthPadding ? 4 : 0}
          blendStroke={!widthPadding}
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          {formatData.map((data, index) => (
            <Cell
              key={`cell-${index}`}
              fill={data?.color || initColorMap[index]}
            />
          ))}
        </Pie>
        {showLegend && (
          <Legend
            iconSize={8}
            iconType="square"
            layout="vertical"
            formatter={(name, _, index) => {
              const legendData = formatData[index];
              return legendData?.tooltip ? (
                <>
                  <Tooltip
                    overlayClassName={cs(TooltipDefaultClass, overlayClassName)}
                    title={
                      Array.isArray(legendData.tooltip) ? (
                        <>
                          <div className={Typo.Label.l4_bold}>
                            {legendData.name}
                          </div>
                          {legendData.tooltip.map((item) => (
                            <div className="item">
                              <span className="name">{item.name}</span>
                              <span className={Typo.Label.l4_bold}>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </>
                      ) : (
                        legendData.tooltip
                      )
                    }
                  >
                    <div className="tooltip-text">{legendData.name}</div>
                  </Tooltip>
                  <span className={cs(Typo.Label.l4_regular, "value")}>
                    {legendData.value}
                  </span>
                </>
              ) : (
                <>
                  <OverflowTooltip
                    content={legendData.name}
                    onClick={() => {
                      if ("onClick" in legendData) {
                        legendData.onClick?.(legendData.name);
                      }
                    }}
                  />
                  <span className={cs(Typo.Label.l4_regular, "value")}>
                    {legendData.value}
                  </span>
                </>
              );
            }}
          />
        )}
      </PieChart>
      {!!centerRender && (
        <div>
          {"text" in centerRender ? (
            <div className="center">
              <div className="number">{centerRender.number}</div>
              <OverflowTooltip className="text" content={centerRender.text} />
            </div>
          ) : (
            centerRender
          )}
        </div>
      )}
    </DonutChartWrapper>
  );
};

export default DonutChart;

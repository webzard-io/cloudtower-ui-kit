import { IEmptyProps } from "@src/core/Empty";
import {
  DurationUnitType,
  FormatDurationItem,
} from "@src/utils/formatDuration";

import { RawValue } from "../Units/units.type";

/**
 * Duration 组件的属性类型
 *
 * data-testid 在空态（Empty）和 noUnitOnZero 分支生效。
 * 默认渲染分支（多单位拼接）和 contentRender 分支返回 Fragment，不支持 data-testid。
 * 需要 data-testid 时，请在 Duration 外层自行包一层 wrapper 并设置 data-testid。
 * 使用 contentRender 时，也可在 contentRender 返回的根元素上自行设置 data-testid。
 */
export interface DurationProps extends Omit<RawValue, "decimals"> {
  /**
   * 最大展示单位数量，默认为 2
   * @default 2
   * @example
   * maxDisplayUnits={3} // 最多展示 3 个单位，如：1 day 1 hour 1 minute
   */
  maxDisplayUnits?: number;
  /**
   * 最小展示单位，默认为 "second"（秒）
   * @default "second"
   * @example
   * minUnit="minute" // 最小单位为分钟，秒数会被忽略
   */
  minUnit?: DurationUnitType;
  /**
   * Empty组件的配置属性
   */
  emptyProps?: IEmptyProps;

  /**
   * 自定义返回结果的渲染。
   * 当提供此函数时，将使用自定义渲染函数来渲染持续时间，而不是使用默认的渲染方式。
   * 注意：使用 contentRender 时，组件不会透传 data-testid，
   * 调用方需要在返回的根元素上自行设置 data-testid。
   * @param parts 格式化后的持续时间数组，每个元素包含 value 和 unit
   * @returns 自定义的 React 节点
   * @example
   * contentRender={(parts) => (
   *   <div data-testid="my-duration">
   *     {parts.map((part, i) => (
   *       <span key={i}>{part.value} {part.unit}</span>
   *     ))}
   *   </div>
   * )}
   */
  contentRender?: (parts: FormatDurationItem[]) => React.ReactNode;
  "data-testid"?: string;
}

import { IEmptyProps } from "../Empty";

/**
 * 基础数值单位展示的接口定义
 * @interface RawValue
 */
export interface RawValue {
  /**
   * 原始数值
   * @type {number | null}
   * @default undefined
   * @example
   * rawValue={1024} // 展示为 1024
   * rawValue={null} // 展示为空
   */
  rawValue?: number | null;
  /**
   * 保留小数位数
   * @type {number}
   * @default undefined
   * @example
   * decimals={2} // 1024.00
   */
  decimals?: number;
  /**
   * 当值为0时是否隐藏单位
   * @type {boolean}
   * @default false
   * @example
   * noUnitOnZero={true} // 0
   * noUnitOnZero={false} // 0 GB
   */
  noUnitOnZero?: boolean;
  /**
   * 是否使用缩写形式
   * @type {boolean}
   * @default false
   * @example
   * abbreviate={true} // 1 min
   * abbreviate={false} // 1 minute
   */
  abbreviate?: boolean;
  /**
   * 数值部分的自定义类名
   * @type {string}
   */
  valueClassName?: string;
  /**
   * 单位部分的自定义类名
   * @type {string}
   */
  unitClassName?: string;
}

/**
 * 百分比展示组件的属性类型
 * @type PercentFn
 */
export type PercentFn = React.FC<
  RawValue & {
    /**
     * 是否为饱和值（超过100%）
     * @type {boolean}
     * @default false
     * @example
     * saturated={true} // 显示为饱和状态
     */
    saturated?: boolean;
    /**
     * Empty组件的配置属性
     * @type {IEmptyProps}
     */
    emptyProps?: IEmptyProps;
  }
>;

/**
 * 通用单位展示组件的属性类型
 * @type UnitFn
 */
export type UnitFn = React.FC<
  RawValue & {
    /**
     * Empty组件的配置属性
     * @type {IEmptyProps}
     */
    emptyProps?: IEmptyProps;
  }
>;

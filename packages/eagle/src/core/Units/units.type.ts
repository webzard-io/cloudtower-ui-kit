import { IEmptyProps } from "../Empty";

export interface RawValue {
  /** 原始数值 */
  rawValue?: number | null;
  /** 保留小数位 */
  decimals?: number;
  /** 为 0 时是否显示单位 */
  noUnitOnZero?: boolean;
  /** 是否使用缩写单位 */
  abbreviate?: boolean;
  /** 指定数值显示的 class name */
  valueClassName?: string;
  /** 指定单位显示的 class name */
  unitClassName?: string;
}

export type PercentFn = React.FC<
  RawValue & {
    saturated?: boolean;
    emptyProps?: IEmptyProps;
  }
>;

export type UnitFnProps = RawValue & {
  /** 数值为空时，指定 Empty 组件的显示 */
  emptyProps?: IEmptyProps;
};

export type UnitFn = React.FC<UnitFnProps>;

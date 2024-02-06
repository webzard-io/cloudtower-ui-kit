import { IEmptyProps } from "../Empty";

export interface RawValue {
  rawValue?: number | null;
  decimals?: number;
  noUnitOnZero?: boolean;
  abbreviate?: boolean;
  valueClassName?: string;
  unitClassName?: string;
}

export type PercentFn = React.FC<
  RawValue & {
    saturated?: boolean;
    emptyProps?: IEmptyProps;
  }
>;

export type UnitFn = React.FC<
  RawValue & {
    emptyProps?: IEmptyProps;
  }
>;

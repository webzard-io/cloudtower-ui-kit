import { SegmentedProps as AntdSegmentedProps } from "antd5";

export interface ISegmentedControlProps
  extends Omit<AntdSegmentedProps, "ref"> {
  size?: "small" | "middle";
  /** Test ID for automated testing */
  "data-testid"?: string;
}

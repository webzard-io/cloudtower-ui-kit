import { RadioProps as AntdRadioProps } from "antd/lib/radio";
import { RadioButtonProps as AntdRadioButtonProps } from "antd/lib/radio/radioButton";

export type RadioProps = AntdRadioProps & {
  description?: React.ReactNode;
  compact?: boolean;
};

export type RadioButtonProps = AntdRadioButtonProps & {
  type?: "input" | "input-number";
  min?: number;
  max?: number;
  precision?: number;
  placeholder?: string;
  initialValue?: string | number;
  onInputChange?: (val: number | string | undefined) => void;
};

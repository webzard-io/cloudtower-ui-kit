import { SwitchProps as AntdSwitchProps } from "antd/lib/switch";

export type SwitchProps = Omit<AntdSwitchProps, "size"> & {
  size?: "small" | "default" | "large";
};

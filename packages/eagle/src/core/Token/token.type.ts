import { TagProps as AntdTagProps } from "antd/lib/tag";

export type TokenColor =
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "gray"
  | "purple";
export type TokenType = Omit<AntdTagProps, "closeIcon"> & {
  color?: TokenColor;
  size?: "small" | "medium" | "large";
  checked?: boolean;
  tooltipConfig?: {
    title: string;
  };
};
export type TokenComponentType = React.ForwardRefExoticComponent<
  TokenType & React.RefAttributes<HTMLDivElement>
>;

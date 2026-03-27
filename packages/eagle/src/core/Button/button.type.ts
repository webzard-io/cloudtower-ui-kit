import { SizeType } from "antd/es/config-provider/SizeContext";
import { ButtonProps as AntdButtonProps, ButtonType } from "antd/lib/button";

export type ButtonProps = {
  prefixIcon?: JSX.Element;
  hoverPrefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  hoverSuffixIcon?: JSX.Element;
  type?:
    | ButtonType
    | "secondary"
    | "tertiary"
    | "ordinary"
    | "ordinary-onTint"
    | "quiet";
} & Omit<AntdButtonProps, "type" | "icon">;

export type ButtonGroupType = {
  className?: string;
  "data-testid"?: string;
  size?: SizeType;
  options: Array<
    Omit<ButtonProps, "shape" | "size" | "icon"> & {
      key: string;
      title?: string;
      hideTitle?: boolean;
      icon?: JSX.Element;
    }
  >;
};

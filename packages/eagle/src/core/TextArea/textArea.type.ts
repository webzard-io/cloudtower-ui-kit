import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";

export interface TextAreaProps extends AntdTextAreaProps {
  error?: boolean;
  size?: "large" | "middle" | "small";
  autoSize?: AntdTextAreaProps["autoSize"];
  "data-testid"?: string;
  onFocusChangeHeight?: {
    onFocus: number;
    onBlur: number;
  };
}

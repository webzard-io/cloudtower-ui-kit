import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";

export interface TextAreaProps extends AntdTextAreaProps {
  error?: boolean;
  size?: "large" | "middle" | "small";
  autoSize?: AntdTextAreaProps["autoSize"];
  onFocusChangeHeight?: {
    onFocus: number;
    onBlur: number;
  };
}

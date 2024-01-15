import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { TextAreaProps } from "@src/spec";
import { Input as AntdInput } from "antd";
import cs from "classnames";
import React from "react";
const TextArea: React.FC<TextAreaProps> = ({
  className,
  error,
  size = "middle",
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  return (
    <AntdInput.TextArea
      {...props}
      className={cs(
        className,
        InputStyle,
        typo,
        error && "error",
        !props.autoSize && !props.onFocusChangeHeight && `textarea-${size}`,
        size === "large" && "ant-input-lg",
        size === "small" && "ant-input-sm"
      )}
    />
  );
};

export default TextArea;

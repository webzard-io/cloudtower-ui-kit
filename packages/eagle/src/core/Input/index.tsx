import { styled } from "@linaria/react";
import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { Input as AntdInput } from "antd";
import cs from "classnames";
import React from "react";

import { InputProps } from "./input.type";

const StyledAntdInput = styled(AntdInput)`
  .ant-input-sm {
    line-height: 18px;
  }
`;

const Input: React.FC<InputProps> = ({
  className,
  error,
  size = "middle",
  "data-testid": dataTestId,
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  const ref = React.useCallback(
    (instance: InstanceType<typeof AntdInput> | null) => {
      const el = instance?.input;
      if (!el) return;
      if (dataTestId) {
        el.setAttribute("data-testid", dataTestId);
      } else {
        el.removeAttribute("data-testid");
      }
    },
    [dataTestId],
  );
  return (
    <StyledAntdInput
      ref={ref}
      {...props}
      size={size}
      data-test={props.name}
      className={cs(className, InputStyle, typo, error ? "error" : "")}
    />
  );
};

export default Input;

export * from "./input.type";

import { styled } from "@linaria/react";
import { InputStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { Input } from "antd";
import { PasswordProps } from "antd/lib/input";
import cs from "classnames";
import React from "react";

export const AntdPasswordInputStyled = styled(Input.Password)`
  .ant-input-suffix {
    margin-left: 8px;
  }
  &.ant-input-affix-wrapper.ant-input-affix-wrapper-sm {
    padding: 2px 7px 2px 12px;
  }
`;

export type InputPasswordProps = PasswordProps & {
  /**
   * 使用变量控制是否显示 error 效果
   */
  error?: boolean;
  /**
   * 数据测试 id
   */
  "data-testid"?: string;
};

const InputPassword: React.FC<InputPasswordProps> = ({
  size = "small",
  error,
  className,
  "data-testid": dataTestId,
  ...props
}) => {
  const typo = {
    large: Typo.Label.l2_regular,
    middle: Typo.Label.l3_regular,
    small: Typo.Label.l4_regular,
  }[size];
  const ref = React.useCallback(
    (instance: React.ComponentRef<typeof AntdPasswordInputStyled> | null) => {
      const el = (instance as { input?: HTMLInputElement } | null)?.input;
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
    <AntdPasswordInputStyled
      ref={ref}
      {...props}
      size={size}
      className={cs(className, InputStyle, typo, error && "error")}
    />
  );
};

export default InputPassword;

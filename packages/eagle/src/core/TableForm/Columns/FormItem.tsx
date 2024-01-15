import { css } from "@linaria/core";
import { Form } from "antd";
import React from "react";

const FormItemStyle = css`
  &.ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-explain {
    display: none;
    min-height: 18px;
    margin-top: 5px;
    font-family: "Inter";
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }

  &.ant-form-item[class*="ant-form-item-has"]:not(
      .ant-form-item-has-error-leave
    ) {
    white-space: pre-wrap;
    .ant-form-item-explain {
      display: block;
    }
  }
`;

type FormItemProps = {
  validateStatus: "" | "success" | "warning" | "error" | "validating";
  message?: string;
};

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { validateStatus, message, children } = props;

  return (
    <Form.Item
      className={FormItemStyle}
      validateStatus={validateStatus}
      help={validateStatus && message ? message : undefined}
    >
      {children}
    </Form.Item>
  );
};

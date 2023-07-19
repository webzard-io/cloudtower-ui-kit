import { css } from "@linaria/core";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import cs from "classnames";
import React from "react";

const FormItemStyle = css`
  width: 100%;
  margin-bottom: 0 !important;
  flex-flow: nowrap !important;
  line-break: auto;

  & > .ant-form-item-label {
    text-align: left !important;
    padding-bottom: 0 !important;

    & > label {
      min-height: 32px;
      height: auto;
      font-size: 13px;
      color: rgba(44, 56, 82, 0.6);
      white-space: normal;
    }
  }

  &.ant-form-item-has-error .ant-input {
    border-color: #ff4d4f !important;
  }

  .ant-form-item-explain {
    margin-top: 4px;
    font-size: 12px;
  }

  .ant-form-item-extra {
    font-size: 12px;
    color: rgba(44, 56, 82, 0.6);
  }
`;

const FormItem: React.FC<FormItemProps> = (props) => {
  return (
    <Form.Item {...props} className={cs(FormItemStyle, props.className)} />
  );
};

export default FormItem;

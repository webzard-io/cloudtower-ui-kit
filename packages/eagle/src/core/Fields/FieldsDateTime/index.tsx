import { DatePicker } from "antd";
import React from "react";

import { FieldBaseProps } from "../fields.type";

const FieldsDateTime = ({
  input,
  "data-testid": dataTestId,
}: FieldBaseProps) => (
  <>
    <DatePicker
      data-testid={dataTestId}
      onFocus={() => input.onFocus?.()}
      onBlur={() => input.onBlur?.()}
      showTime
      defaultValue={input.value}
      onOk={input.onChange}
    />
  </>
);

export default FieldsDateTime;

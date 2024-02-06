import { DatePicker } from "antd";
import React from "react";

import { FieldBaseProps } from "../fields.type";

const FieldsDateTime = ({ input }: FieldBaseProps) => (
  <>
    <DatePicker
      onFocus={() => input.onFocus?.()}
      onBlur={() => input.onBlur?.()}
      showTime
      defaultValue={input.value}
      onOk={input.onChange}
    />
  </>
);

export default FieldsDateTime;

import { DatePicker } from "antd";
import React from "react";

import { FieldBaseProps } from "../../../spec";

const DateTime = ({ input }: FieldBaseProps) => (
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

export default DateTime;

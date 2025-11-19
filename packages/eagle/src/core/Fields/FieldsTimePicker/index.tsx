import { TimePickerProps } from "antd/lib/time-picker";
import React from "react";

import TimePicker from "../../TimePicker";
import { FieldBaseProps } from "../fields.type";
import { ConfigProvider } from "@src/core/ConfigProvider";

const FieldsTimePicker = ({
  input,
  meta,
  ...props
}: FieldBaseProps & TimePickerProps) => (
  <ConfigProvider>
    <TimePicker
      {...input}
      error={
        meta.touched &&
        (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
      }
      {...props}
    />
  </ConfigProvider>
);

export default FieldsTimePicker;

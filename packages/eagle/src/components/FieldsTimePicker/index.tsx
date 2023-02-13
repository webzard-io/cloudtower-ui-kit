import { TimePickerProps } from "antd/lib/time-picker";
import React from "react";

import { FieldBaseProps } from "../../spec";
import TimePicker from "../TimePicker";

const FieldsTimePicker = ({
  input,
  meta,
  ...props
}: FieldBaseProps & TimePickerProps) => (
  <>
    <TimePicker
      {...input}
      error={
        meta.touched &&
        (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
      }
      {...props}
    />
  </>
);

export default FieldsTimePicker;

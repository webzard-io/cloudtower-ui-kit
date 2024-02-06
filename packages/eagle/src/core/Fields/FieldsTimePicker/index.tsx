import { TimePickerProps } from "antd/lib/time-picker";
import React from "react";

import TimePicker from "../../TimePicker";
import { FieldBaseProps } from "../fields.type";

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

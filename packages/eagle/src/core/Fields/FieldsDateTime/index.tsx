import { DatePickerProps } from "antd/lib/date-picker";
import React from "react";

import DatePicker from "../../DatePicker";
import { FieldBaseProps } from "../fields.type";

const FieldsDateTime = ({
  input,
  meta,
  ...props
}: FieldBaseProps & DatePickerProps) => (
  <>
    <DatePicker
      {...input}
      error={
        meta.touched &&
        (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
      }
      {...props}
    />
  </>
);

export default FieldsDateTime;

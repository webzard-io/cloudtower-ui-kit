import { ConfigProvider } from "@src/core/ConfigProvider";
import { TimePickerProps } from "antd/lib/time-picker";
import React from "react";

import TimePicker from "../../TimePicker";
import { FieldBaseProps } from "../fields.type";

const FieldsTimePicker = ({
  input,
  meta,
  "data-testid": dataTestId,
  ...props
}: FieldBaseProps & TimePickerProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return (
    <ConfigProvider>
      <TimePicker
        {...inputWithTestId}
        error={
          meta.touched &&
          (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
        }
        {...props}
      />
    </ConfigProvider>
  );
};

export default FieldsTimePicker;

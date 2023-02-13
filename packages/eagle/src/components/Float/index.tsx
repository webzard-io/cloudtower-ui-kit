import React from "react";

import { FloatFieldProps } from "../../spec";
import InputNumber from "../InputNumber";

const Float = ({
  input,
  meta,
  onBlur,
  autoComplete = "off",
  ...props
}: FloatFieldProps) => (
  <>
    <InputNumber
      {...input}
      onBlur={(e) => (onBlur ? onBlur(input, e) : input.onBlur(e))}
      autoComplete={autoComplete}
      error={
        meta.touched &&
        (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
      }
      {...props}
    />
  </>
);

export default Float;

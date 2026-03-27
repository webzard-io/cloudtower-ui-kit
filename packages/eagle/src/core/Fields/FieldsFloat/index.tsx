import React from "react";

import { FloatFieldProps } from "../../../spec";
import InputNumber from "../../InputNumber";

const FieldsFloat = ({
  input,
  meta,
  onBlur,
  autoComplete = "off",
  "data-testid": dataTestId,
  ...props
}: FloatFieldProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return (
    <>
      <InputNumber
        {...inputWithTestId}
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
};

export default FieldsFloat;

import React from "react";

import { IntegerFieldProps } from "../../../spec";
import InputInteger from "../../InputInteger";

const FieldsInteger = ({
  meta,
  input,
  onBlur,
  "data-testid": dataTestId,
  ...props
}: IntegerFieldProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return (
    <>
      <InputInteger
        {...props}
        {...inputWithTestId}
        onBlur={(e) => (onBlur ? onBlur(input, e) : input.onBlur(e))}
        error={
          meta.touched &&
          (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
        }
      />
    </>
  );
};

export default FieldsInteger;

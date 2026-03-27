import React from "react";

import Input from "../../Input";
import { IntFieldProps } from "./fieldsInt.type";

const FieldsInt = ({
  input,
  meta,
  onBlur,
  autoComplete = "off",
  supportNegativeValue = false,
  "data-testid": dataTestId,
  ...props
}: IntFieldProps) => {
  const inputWithTestId = dataTestId
    ? { ...input, "data-testid": dataTestId }
    : input;
  return (
    <>
      <Input
        {...inputWithTestId}
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (supportNegativeValue) {
            if (value === "" || value === "-") {
              input.onChange(value);
            } else if (/^(-)?\d+$/.test(value)) {
              const v = parseInt(value);
              input.onChange(!Number.isNaN(v) ? v : undefined);
            }
          } else if (value === "" || /^\d+$/.test(value)) {
            const v = parseInt(value);
            input.onChange(!Number.isNaN(v) ? v : undefined);
          }
        }}
        onBlur={(e) => {
          onBlur ? onBlur(input, e) : input.onBlur(e);
        }}
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

export default FieldsInt;

export * from "./fieldsInt.type";

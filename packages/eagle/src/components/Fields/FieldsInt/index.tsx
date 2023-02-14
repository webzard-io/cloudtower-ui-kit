import React from "react";

import { IntFieldProps } from "../../../spec";
import Input from "../../Input";

const Int = ({
  input,
  meta,
  onBlur,
  autoComplete = "off",
  supportNegativeValue = false,
  ...props
}: IntFieldProps) => (
  <>
    <Input
      {...input}
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

export default Int;

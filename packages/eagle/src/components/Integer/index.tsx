import React from "react";

import { IntegerFieldProps } from "../../spec";
import InputInteger from "../InputInteger";

const Integer = ({ meta, input, onBlur, ...props }: IntegerFieldProps) => {
  return (
    <>
      <InputInteger
        {...props}
        {...input}
        onBlur={(e) => (onBlur ? onBlur(input, e) : input.onBlur(e))}
        error={
          meta.touched &&
          (meta.error || (!meta.dirtySinceLastSubmit && meta.submitError))
        }
      />
    </>
  );
};

export default Integer;

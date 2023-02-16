import React from "react";

import { FieldBaseProps } from "../../../spec";
import Checkbox from "../../Checkbox";

// TO-FIX
// onBlur onFocus in input is not needed.
const FieldsBoolean = ({ input, children, ...props }: FieldBaseProps) => {
  return (
    <>
      <Checkbox
        checked={Boolean(input.value)}
        onChange={(e) => input.onChange(e.target.checked)}
        {...props}
      >
        {children}
      </Checkbox>
    </>
  );
};

export default FieldsBoolean;

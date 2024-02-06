import React from "react";

import Checkbox from "../../Checkbox";
import { FieldBaseProps } from "../fields.type";

// FIXME
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

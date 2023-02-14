import React from "react";

import { FieldBaseProps } from "../../../spec";
import Checkbox from "../../Checkbox";

const KitBoolean = ({ input, children, ...props }: FieldBaseProps) => {
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

export default KitBoolean;

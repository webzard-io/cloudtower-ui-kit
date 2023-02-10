import React, { useContext } from "react";

import { kitContext, KitEnumProps } from "../../spec";

const Enum = ({
  meta: __,
  enumValues,
  emptyLabel,
  ...restProps
}: KitEnumProps) => {
  const kit = useContext(kitContext);
  return (
    <>
      <kit.select {...restProps}>
        {emptyLabel && <kit.option value="">{emptyLabel}</kit.option>}
        {enumValues.map((v) => {
          const item = typeof v === "string" ? { value: v, text: v } : v;
          return (
            <kit.option key={item.value} value={item.value} label={item.text}>
              {item.text}
            </kit.option>
          );
        })}
      </kit.select>
    </>
  );
};
export default Enum;

import { Select as AntdSelect } from "antd";
import React from "react";

import { KitEnumProps } from "../../../spec";
import KitSelect from "../../Select";
const Enum = ({
  meta: __,
  enumValues,
  emptyLabel,
  ...restProps
}: KitEnumProps) => {
  return (
    <>
      <KitSelect {...restProps}>
        {emptyLabel && (
          <AntdSelect.Option value="">{emptyLabel}</AntdSelect.Option>
        )}
        {enumValues.map((v) => {
          const item = typeof v === "string" ? { value: v, text: v } : v;
          return (
            <AntdSelect.Option
              key={item.value}
              value={item.value}
              label={item.text}
            >
              {item.text}
            </AntdSelect.Option>
          );
        })}
      </KitSelect>
    </>
  );
};
export default Enum;

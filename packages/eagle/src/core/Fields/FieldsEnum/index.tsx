import { Select as AntdSelect } from "antd";
import React from "react";

import Select from "../../Select";
import { EnumProps } from "./fieldsEnum.type";

const FieldsEnum = ({
  meta: __,
  enumValues,
  emptyLabel,
  ...restProps
}: EnumProps) => {
  return (
    <>
      <Select {...restProps}>
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
      </Select>
    </>
  );
};

export default FieldsEnum;

export * from "./fieldsEnum.type";

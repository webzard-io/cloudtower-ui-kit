import { Select as AntdSelect } from "antd";
import React from "react";

import LegacySelect from "../../LegacySelect";
import { EnumProps } from "./fieldsEnum.type";

const FieldsEnum = ({
  meta: __,
  enumValues,
  emptyLabel,
  "data-testid": dataTestId,
  ...restProps
}: EnumProps) => {
  return (
    <>
      <LegacySelect data-testid={dataTestId} {...restProps}>
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
      </LegacySelect>
    </>
  );
};

export default FieldsEnum;

export * from "./fieldsEnum.type";

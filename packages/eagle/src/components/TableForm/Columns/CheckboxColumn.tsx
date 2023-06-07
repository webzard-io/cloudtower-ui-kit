import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useCallback } from "react";

import { ColumnBodyCellProps } from "../types";

export const CheckboxColumnBodyCell: React.FC<
  Omit<ColumnBodyCellProps, "onChange"> & { onChange: (value: unknown) => void }
> = ({ data, column, index, onChange }) => {
  const value =
    data[index][column.key] === undefined
      ? column.defaultValue
      : data[index][column.key];

  const _onChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  const defaultChecked = column.defaultValue as boolean | undefined;

  return (
    <Checkbox
      checked={value}
      onChange={_onChange}
      defaultChecked={defaultChecked}
    />
  );
};

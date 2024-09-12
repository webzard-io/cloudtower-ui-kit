import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useCallback } from "react";

import Checkbox from "../../Checkbox";
import { ColumnBodyCellProps, ColumnHeaderCellProps } from "../types";

export const CheckboxColumnHeaderCell: React.FC<
  Omit<ColumnHeaderCellProps, "onChange" | "onBlur"> & {
    onChange: (value: any, shouldUpdateData?: boolean) => void;
  }
> = ({ onChange }) => {
  const _onChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChange(e.target.checked, true);
    },
    [onChange],
  );

  return <Checkbox style={{ marginTop: "4px" }} onChange={_onChange} />;
};

export const CheckboxColumnBodyCell: React.FC<
  Pick<ColumnBodyCellProps, "data" | "column" | "index"> & {
    onChange: (value: any) => void;
  }
> = ({ data, column, index, onChange }) => {
  const value =
    data[index][column.key] === undefined
      ? column.defaultValue
      : data[index][column.key];

  const _onChange = useCallback(
    (e: CheckboxChangeEvent) => {
      onChange(e.target.checked);
    },
    [onChange],
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

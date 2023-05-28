import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { useEffect, useState } from "react";

import { CheckboxStyle } from "../style";
import { ColumnBodyCellProps } from "../types";

export const CheckboxColumnBodyCell: React.FC<ColumnBodyCellProps> = ({
  data,
  column,
  index,
  onChange,
}) => {
  const [value, setValue] = useState<boolean>(
    data[index][column.key] === undefined
      ? column.defaultValue
      : data[index][column.key]
  );

  useEffect(() => {
    if (data[index][column.key] !== undefined) {
      setValue(data[index][column.key]);
    }
  }, [column.key, data, index]);

  const _onChange = (e: CheckboxChangeEvent) => {
    const newCell = { ...data[index], [column.key]: e.target.checked };
    const newData = [...data];
    newData[index] = newCell;
    if (onChange) {
      onChange(newData, index, column.key);
    }
  };

  return (
    <Checkbox className={CheckboxStyle} checked={value} onChange={_onChange} />
  );
};

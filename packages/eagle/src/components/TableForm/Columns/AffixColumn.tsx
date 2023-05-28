import { Input, Space } from "antd";
import React, { useState } from "react";

import { ColumnHeaderCellProps } from "../types";

export const AffixColumnHeaderCell: React.FC<ColumnHeaderCellProps> = ({
  data,
  column,
  onChange,
  onBlur,
}) => {
  const [suffix, setSuffix] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");

  const onPrefixBlur = () => {
    if (onBlur) {
      onBlur(column.key);
    }
  };
  const onSuffixBlur = () => {
    if (onBlur) {
      onBlur(column.key);
    }
  };
  const onPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrefix = e.target.value;

    setPrefix(newPrefix);
    if (onChange) {
      const newData = data.map((cell) => {
        return {
          ...cell,
          [column.key]: `${newPrefix}${cell[column.key] || ""}`,
        };
      });
      onChange(newData, column.key);
    }
  };
  const onSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSuffix = e.target.value;

    setSuffix(newSuffix);
    if (onChange) {
      const newData = data.map((cell) => {
        return {
          ...cell,
          [column.key]: `${cell[column.key] || ""}${newSuffix}`,
        };
      });
      onChange(newData, column.key);
    }
  };

  return (
    <Space>
      {!column.disablePrefix ? (
        <Input
          value={prefix}
          placeholder="前缀"
          onChange={onPrefixChange}
          onBlur={onPrefixBlur}
        />
      ) : undefined}

      {!column.disableSuffix ? (
        <Input
          value={suffix}
          placeholder="后缀"
          onChange={onSuffixChange}
          onBlur={onSuffixBlur}
        />
      ) : undefined}
    </Space>
  );
};

import { Input, Space } from "antd";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { ColumnHeaderCellProps } from "../types";

export const AffixColumnHeaderCell: React.FC<
  Omit<ColumnHeaderCellProps, "onChange" | "onBlur"> & {
    onChange: (value: any) => void;
    onBlur: () => void;
  }
> = ({ data, column, onChange, onBlur }) => {
  const [suffix, setSuffix] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const { t } = useTranslation();

  const onPrefixChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPrefix = e.target.value;
      setPrefix(newPrefix);
      onChange(newPrefix + suffix);
    },
    [suffix, onChange]
  );

  const onSuffixChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSuffix = e.target.value;
      setSuffix(newSuffix);
      onChange(prefix + newSuffix);
    },
    [prefix, onChange]
  );

  return (
    <Space>
      {!column.disablePrefix ? (
        <Input
          value={prefix}
          placeholder={t("components.prefix")}
          size="small"
          onChange={onPrefixChange}
          onBlur={onBlur}
        />
      ) : undefined}

      {!column.disableSuffix ? (
        <Input
          value={suffix}
          placeholder={t("components.suffix")}
          size="small"
          onChange={onSuffixChange}
          onBlur={onBlur}
        />
      ) : undefined}
    </Space>
  );
};

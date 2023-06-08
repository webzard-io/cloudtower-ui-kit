import { cx } from "@linaria/core";
import React, { useCallback, useState } from "react";

import { Typo } from "../Typo";
import { ColumnHeaderImpls } from "./Columns";
import { FormItem } from "./Columns/FormItem";
import { TitleStyle } from "./style";
import { ColumnHeaderCellProps } from "./types";
import { increaseLastNumber } from "./utils";

export const BatchInputListHeaderCell: React.FC<ColumnHeaderCellProps> = (
  props
) => {
  const { column, disabled, data, disableBatchFilling, onBlur, onChange } =
    props;

  const [errMsg, setErrMsg] = useState<string>();

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";

  const headerOnChange = useCallback(
    (value: unknown) => {
      const err = column.validator?.({ value, isHeader: true });
      setErrMsg(err || undefined);
      const shouldAutoIncrease =
        column.type !== "password" && column.autoIncrease;
      const newData = data.map((cell, rowIndex) => {
        return {
          ...cell,
          [column.key]:
            shouldAutoIncrease && typeof value === "string"
              ? increaseLastNumber(value, rowIndex)
              : value,
        };
      });
      onChange?.(newData, column.key);
    },
    [onChange, data, column]
  );

  const _onBlur = useCallback(() => {
    onBlur?.(column.key, errMsg);
  }, [column.key, onBlur, errMsg]);

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnHeaderImpls[column.type];
    return (
      <CellComponent
        {...props}
        column={column}
        onChange={headerOnChange}
        onBlur={_onBlur}
      />
    );
  };

  const renderCell = () =>
    column.render
      ? column.render({
          isHeader: true,
          disabled,
          onChange: headerOnChange,
          onBlur: _onBlur,
        })
      : renderDefaultComponent();

  return (
    <div
      className={cx("eagle-table-form-cell", `align-${column.align || "left"}`)}
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      <p className={cx(Typo.Label.l3_bold_title, TitleStyle)}>{column.title}</p>
      {disableBatchFilling ? null : (
        <FormItem
          validateStatus={typeof errMsg === "string" && errMsg ? "error" : ""}
          message={errMsg || undefined}
        >
          {renderCell()}
        </FormItem>
      )}
    </div>
  );
};

import { cx } from "@linaria/core";
import React from "react";

import { Typo } from "../Typo";
import { ColumnHeaderImpls } from "./Columns";
import { TitleStyle } from "./style";
import { ColumnHeaderCellProps } from "./types";

export const BatchInputListHeaderCell: React.FC<ColumnHeaderCellProps> = (
  props
) => {
  const { column, disabled, data, disableBatchFilling, onBlur, onChange } =
    props;

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnHeaderImpls[column.type];
    return <CellComponent {...props} column={column} />;
  };

  const renderCell = () =>
    column.render
      ? column.render({
          isHeader: true,
          disabled,
          onChange: (value) => {
            const newData = data.map((row) => ({
              ...row,
              [column.key]: value,
            }));
            onChange?.(newData, column.key);
          },
          onBlur() {
            onBlur?.(column.key);
          },
        })
      : renderDefaultComponent();

  return (
    <div
      className="eagle-table-form-cell"
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      <>
        <p className={cx(Typo.Label.l2_regular, TitleStyle)}>{column.title}</p>
        {disableBatchFilling ? null : renderCell()}
      </>
    </div>
  );
};

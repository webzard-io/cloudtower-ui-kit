import React from "react";

import { ColumnHeaderImpls } from "./Columns";
import { BatchInputListHeaderCellStyle } from "./style";
import { ColumnHeaderCellProps } from "./types";

export const BatchInputListHeaderCell: React.FC<ColumnHeaderCellProps> = (
  props
) => {
  const { column } = props;

  const CellComponent = ColumnHeaderImpls[column.type];

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";
  return (
    <div
      className={BatchInputListHeaderCellStyle}
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      <CellComponent {...props} column={column} />
    </div>
  );
};

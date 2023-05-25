import React from "react";

import { ColumnBodyImpls } from "./Columns";
import { ColumnBodyCellProps } from "./types";

export const TableFormBodyCell: React.FC<ColumnBodyCellProps> = (props) => {
  const { column } = props;

  const CellComponent = ColumnBodyImpls[column.type];

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";
  return (
    <div
      className="eagle-table-form-cell"
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      <CellComponent {...props} customData={column.customData} />
    </div>
  );
};

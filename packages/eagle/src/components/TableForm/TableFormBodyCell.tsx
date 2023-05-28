import React from "react";

import { ColumnBodyImpls } from "./Columns";
import { ColumnBodyCellProps } from "./types";

export const TableFormBodyCell: React.FC<ColumnBodyCellProps> = (props) => {
  const {
    column,
    disabled,
    index: rowIndex,
    data,
    onChange,
    latestData,
  } = props;

  const width = Number.isNaN(Number(column.width))
    ? column.width
    : column.width + "px";

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnBodyImpls[column.type];
    return <CellComponent {...props} customData={column.customData} />;
  };

  const Cell = column.render
    ? column.render({
        isHeader: false,
        disabled,
        placeholder: props.placeholderValue || latestData[rowIndex][column.key],
        value: data[rowIndex][column.key],
        onChange: (value) => {
          const newData = data.map((row, i) =>
            i === rowIndex ? { ...row, [column.key]: value } : row
          );
          onChange?.(newData, rowIndex, column.key);
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
      {Cell}
    </div>
  );
};

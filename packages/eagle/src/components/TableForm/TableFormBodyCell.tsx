import { cx } from "@linaria/core";
import React, { useMemo } from "react";

import { Typo } from "../Typo";
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

  const CellDescription = useMemo(() => {
    const Result =
      column.renderDescription?.({
        rowIndex,
        rowData: data[rowIndex],
        latestData,
      }) ?? null;
    return typeof Result === "string" ? (
      <p className={cx(Typo.Label.l4_regular, "cell-description")}>{Result}</p>
    ) : (
      Result
    );
  }, [rowIndex, data, latestData, column]);

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
      {CellDescription}
    </div>
  );
};

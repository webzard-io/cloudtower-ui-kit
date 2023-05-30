import { cx } from "@linaria/core";
import React, { useCallback, useMemo } from "react";

import { Typo } from "../Typo";
import { ColumnBodyImpls } from "./Columns";
import { FormItem } from "./Columns/FormItem";
import { ColumnBodyCellProps, DataType } from "./types";

export const TableFormBodyCell: React.FC<ColumnBodyCellProps> = (props) => {
  const {
    column,
    disabled,
    index: rowIndex,
    data,
    onChange,
    latestData,
    isRowError,
    onBlur,
  } = props;

  const width =
    typeof column.width === "number" ? column.width + "px" : column.width;

  const _onChange = useCallback(
    (value: unknown, data: DataType[]) => {
      const newData = data.map((row, i) =>
        i === rowIndex ? { ...row, [column.key]: value } : row
      );
      onChange?.(newData, rowIndex, column.key);
    },
    [rowIndex, onChange, column]
  );

  const _onBlur = useCallback(() => {
    onBlur?.(data, rowIndex, column.key);
  }, [rowIndex, column, onBlur, data]);

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnBodyImpls[column.type];
    return (
      <CellComponent
        {...props}
        customData={column.customData}
        onChange={(val) => {
          _onChange(val, data);
        }}
        onBlur={_onBlur}
      />
    );
  };

  const Cell = column.render
    ? column.render({
        isHeader: false,
        disabled,
        placeholder: props.placeholderValue || latestData[rowIndex][column.key],
        value: data[rowIndex][column.key],
        onChange: (val) => {
          _onChange(val, data);
        },
        onBlur: _onBlur,
        rowIndex,
      })
    : renderDefaultComponent();

  const CellDescription = useMemo(() => {
    if (column.type === "text") return null;
    const Result =
      column.renderDescription?.({
        rowIndex,
        rowData: data[rowIndex],
        latestData,
      }) || null;
    return typeof Result === "string" ? (
      <p className={cx(Typo.Label.l4_regular, "cell-description")}>{Result}</p>
    ) : (
      Result
    );
  }, [rowIndex, data, latestData, column]);

  const validateResult:
    | {
        msg: string;
        isError: boolean;
      }
    | undefined = useMemo(() => {
    if (isRowError) {
      return {
        msg: "",
        isError: true,
      };
    }
    const value = data[rowIndex][column.key];
    const result = column.validator?.({
      value,
      rowIndex,
      rowData: data[rowIndex],
    });
    if (typeof result === "string" && result) {
      return { msg: result, isError: true };
    }
  }, [data, column, rowIndex, isRowError]);

  return (
    <div
      className={cx("eagle-table-form-cell", `align-${column.align || "left"}`)}
      style={{
        maxWidth: column.width ? width : "",
        minWidth: column.width ? width : "",
        visibility: column.hidden ? "hidden" : "visible",
      }}
    >
      <FormItem
        validateStatus={validateResult?.isError ? "error" : ""}
        message={
          validateResult?.isError && validateResult.msg
            ? validateResult.msg
            : undefined
        }
      >
        {Cell}
      </FormItem>
      {CellDescription}
    </div>
  );
};

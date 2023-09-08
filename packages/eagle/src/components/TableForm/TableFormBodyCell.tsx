import { cx } from "@linaria/core";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Typo } from "../Typo";
import { ColumnBodyImpls } from "./Columns";
import { FormItem } from "./Columns/FormItem";
import { ColumnBodyCellProps, DataType, ValidateTriggerType } from "./types";

export const TableFormBodyCell: React.FC<ColumnBodyCellProps> = (props) => {
  const {
    column,
    index: rowIndex,
    data,
    latestData,
    validateTriggerType,
    isRowError,
    getRowValidateResult,
    disabled,
    onChange,
    onBlur,
    validateAll,
    error,
  } = props;

  const [validateResult, setValidateResult] = useState<{
    msg: string;
    isError: boolean;
  }>();
  const isTouched = useRef(false);

  const width =
    typeof column.width === "number" ? column.width + "px" : column.width;

  const isCellErrorStyle = Boolean(validateResult?.isError || isRowError);

  useEffect(() => {
    setValidateResult(
      error
        ? {
            msg: error,
            isError: true,
          }
        : undefined,
    );
  }, [error]);

  const triggerValidate = useCallback(
    (currentValue?: unknown) => {
      const value = currentValue || data[rowIndex][column.key];
      const rowData = { ...data[rowIndex], [column.key]: value };
      const rowValidateRes = getRowValidateResult(rowData);
      if (rowValidateRes) {
        return;
      }
      const result = column.validator?.({
        value,
        rowIndex,
        rowData: data[rowIndex],
      });
      const isError = result ? typeof result === "string" : false;
      setValidateResult({ msg: result || "", isError });
    },
    [data, column, rowIndex, getRowValidateResult],
  );

  useEffect(() => {
    if (validateAll) {
      isTouched.current = true;
      triggerValidate();
    }
  }, [validateAll, triggerValidate]);

  const _onChange = (value: unknown, data: DataType[]) => {
    const newData = data.map((row, i) =>
      i === rowIndex ? { ...row, [column.key]: value } : row,
    );
    onChange?.(newData, rowIndex, column.key);
    if (
      (validateTriggerType === ValidateTriggerType.Normal &&
        isTouched.current) ||
      validateTriggerType === ValidateTriggerType.Aggressive
    ) {
      triggerValidate(value);
    }
  };

  const _onBlur = useCallback(() => {
    isTouched.current = true;
    triggerValidate();
    onBlur?.(data, rowIndex, column.key);
  }, [rowIndex, column, onBlur, data, triggerValidate]);

  const renderDefaultComponent = () => {
    if (!column.type) return null;
    const CellComponent = ColumnBodyImpls[column.type];
    return (
      <CellComponent
        disabled={disabled}
        data={data}
        index={rowIndex}
        latestData={latestData}
        column={column}
        visible={props.visible}
        error={isCellErrorStyle}
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
        error: isCellErrorStyle,
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
        validateStatus={isCellErrorStyle ? "error" : ""}
        message={isRowError ? "" : validateResult?.msg}
      >
        {Cell}
      </FormItem>
      {CellDescription}
    </div>
  );
};

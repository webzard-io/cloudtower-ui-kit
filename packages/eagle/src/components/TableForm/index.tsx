import { List as AntdList } from "antd";
import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";

import AddRowButton from "./AddRowButton";
import { DraggableHandleWrapper, TableFormWrapper } from "./style";
import TableFormBodyRows from "./TableFormBodyRows";
import { BatchInputListHeaderCell } from "./TableFormHeaderCell";
import { DataType, TableFormHandle, TableFormProps } from "./types";
import { genEmptyRow } from "./utils";

const DEFAULT_ROW_COUNT = 3;

const TableForm = React.forwardRef<TableFormHandle, TableFormProps>(
  (
    {
      defaultData = [],
      columns,
      disabled,
      rowAddConfig,
      deleteConfig,
      size = "default",
      className,
      draggable,
      disableBatchFilling = false,
      rowSplitType = "border",
      validateTriggerType,
      renderRowDescription,
      rowValidator,
      onHeaderChange,
      onHeaderBlur,
      onBodyChange,
      onBodyBlur,
    },
    ref
  ) => {
    const [data, setData] = useState<DataType[]>(defaultData);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [latestData, setLatestData] = useState<DataType[]>(defaultData);
    const [validateAll, setValidateAll] = useState(false);

    const updateData = useCallback(
      (value: DataType[], rowIndex?: number, columnKey?: string) => {
        setLatestData(value);
        setData(value);
        onBodyChange?.(value, rowIndex, columnKey);
      },
      [onBodyChange]
    );

    useLayoutEffect(() => {
      // While default data is empty in first render, generate 3 records
      if (defaultData.length === 0) {
        updateData(
          [...Array(DEFAULT_ROW_COUNT)].map(() => genEmptyRow(columns))
        );
      }
    }, []);

    const handleBatchChange = useCallback(
      (newData, columnKey) => {
        setLatestData(newData);
        onHeaderChange?.(newData, columnKey);
      },
      [onHeaderChange]
    );

    const handleBatchBlur = useCallback(
      (key, error) => {
        if (error) {
          // If there is an error, clear the current column body input placeholder
          const newData = latestData.map((cell) => {
            return {
              ...cell,
              [key]: "",
            };
          });
          setLatestData(newData);
          onHeaderBlur?.(newData);
        } else {
          // update current column body input value
          setData(latestData);
          onBodyChange?.(latestData, undefined, key);
          onHeaderBlur?.(latestData);
        }
      },
      [latestData, onHeaderBlur, onBodyChange]
    );

    useImperativeHandle(
      ref,
      () => ({
        setData: (data: DataType[]) => {
          updateData(data);
        },
        validateWholeFields() {
          setValidateAll(true);
        },
      }),
      [updateData]
    );

    const headerCells = columns.map((col) => {
      return (
        <BatchInputListHeaderCell
          key={col.key}
          data={data}
          latestData={latestData}
          disabled={disabled}
          column={col}
          disableBatchFilling={disableBatchFilling}
          onChange={handleBatchChange}
          onBlur={handleBatchBlur}
          onVisibleChange={setPasswordVisible}
        />
      );
    });

    return (
      <div className={className}>
        <TableFormWrapper className={`table-form row-split-by-${rowSplitType}`}>
          <AntdList size={size} className={`size-${size}`}>
            <AntdList.Item
              className="eagle-table-form-header"
              actions={deleteConfig?.deletable ? [<></>] : undefined}
            >
              {draggable ? <DraggableHandleWrapper /> : null}
              {headerCells}
            </AntdList.Item>
            <TableFormBodyRows
              data={data}
              latestData={latestData}
              columns={columns}
              passwordVisible={passwordVisible}
              deleteConfig={deleteConfig}
              disabled={disabled}
              draggable={draggable}
              rowSplitType={rowSplitType}
              validateTriggerType={validateTriggerType}
              onBodyBlur={onBodyBlur}
              updateData={updateData}
              renderRowDescription={renderRowDescription}
              rowValidator={rowValidator}
              validateAll={validateAll}
            />
          </AntdList>
        </TableFormWrapper>
        {rowAddConfig?.addible ? (
          <AddRowButton
            config={rowAddConfig}
            updateData={updateData}
            columns={columns}
            data={data}
          />
        ) : null}
      </div>
    );
  }
);

export default TableForm;

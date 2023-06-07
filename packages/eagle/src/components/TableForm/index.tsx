import { List as AntdList } from "antd";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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
      defaultData,
      columns,
      disabled,
      rowAddConfig,
      deletable,
      size = "default",
      className,
      draggable,
      disableBatchFilling = false,
      rowSplitType = "border",
      renderRowDescription,
      rowValidator,
      onHeaderChange,
      onHeaderBlur,
      onBodyChange,
      onBodyBlur,
    },
    ref
  ) => {
    const treatedDefaultData = useMemo(() => {
      return (
        defaultData ||
        [...Array(DEFAULT_ROW_COUNT)].map(() => genEmptyRow(columns))
      );
    }, [defaultData, columns]);
    const [data, setData] = useState<DataType[]>(treatedDefaultData);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [latestData, setLatestData] =
      useState<DataType[]>(treatedDefaultData);

    const updateData = useCallback(
      (value: DataType[], rowIndex?: number, columnKey?: string) => {
        setLatestData(value);
        setData(value);
        onBodyChange?.(value, rowIndex, columnKey);
      },
      [onBodyChange]
    );

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
              actions={deletable ? [<></>] : undefined}
            >
              {draggable ? <DraggableHandleWrapper /> : null}
              {headerCells}
            </AntdList.Item>
            <TableFormBodyRows
              data={data}
              latestData={latestData}
              columns={columns}
              passwordVisible={passwordVisible}
              deletable={deletable}
              disabled={disabled}
              draggable={draggable}
              rowSplitType={rowSplitType}
              onBodyBlur={onBodyBlur}
              updateData={updateData}
              renderRowDescription={renderRowDescription}
              rowValidator={rowValidator}
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

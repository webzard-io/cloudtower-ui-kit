import AddRowButton from "@src/core/TableForm/AddRowButton";
import {
  DraggableHandleWrapper,
  TableFormWrapper,
} from "@src/core/TableForm/style";
import TableFormBodyRows from "@src/core/TableForm/TableFormBodyRows";
import { BatchInputListHeaderCell } from "@src/core/TableForm/TableFormHeaderCell";
import {
  DataType,
  TableFormHandle,
  TableFormProps,
} from "@src/core/TableForm/types";
import { List as AntdList } from "antd";
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

const TableForm = React.forwardRef<TableFormHandle, TableFormProps>(
  (props, ref) => {
    const {
      // The empty array is valid data so do not initialize "defaultData" with it
      defaultData,
      columns,
      disabled,
      rowAddConfig,
      deleteConfig,
      size = "default",
      className,
      disableBatchFilling = false,
      validateTriggerType,
      maxHeight,
      renderRowDescription,
      rowValidator,
      onHeaderChange,
      onHeaderBlur,
      onBodyChange,
      onBodyBlur,
      row,
      errors,
      hideEmptyTable,
    } = props;
    const [data, setData] = useState<DataType[]>(defaultData || []);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [latestData, setLatestData] = useState<DataType[]>(defaultData || []);
    const [validateAll, setValidateAll] = useState(false);
    const rowSplitType = row?.splitType || props.rowSplitType || "border";
    const draggable = row?.draggable ?? props.draggable ?? false;
    const formValidMapRef = useRef<Record<string, boolean>>({});

    const updateData = useCallback(
      (value: DataType[], rowIndex?: number, columnKey?: string) => {
        setLatestData(value);
        setData(value);
        onBodyChange?.(value, rowIndex, columnKey);
      },
      [onBodyChange],
    );

    const handleBatchChange = useCallback(
      (newData, columnKey, shouldUpdateData: boolean) => {
        setLatestData(newData);
        onHeaderChange?.(newData, columnKey);
        if (shouldUpdateData) {
          setData(newData);
          onBodyChange?.(newData, undefined, columnKey);
        }
      },
      [onHeaderChange, onBodyChange],
    );

    const handleBatchBlur = useCallback(
      (columnKey, error) => {
        if (error) {
          // If there is an error, clear the current column body input placeholder
          const newData = latestData.map((cell) => {
            return {
              ...cell,
              [columnKey]: "",
            };
          });
          setLatestData(newData);
          onHeaderBlur?.(newData, columnKey);
        } else {
          // update current column body input value
          setData(latestData);
          onBodyChange?.(latestData, undefined, columnKey);
          onHeaderBlur?.(latestData, columnKey);
        }
      },
      [latestData, onHeaderBlur, onBodyChange],
    );

    useImperativeHandle(
      ref,
      () => ({
        setData: (data: DataType[]) => {
          updateData(data);
        },
        setDataWithoutTriggerChange: (data: DataType[]) => {
          setLatestData(data);
          setData(data);
        },
        validateWholeFields() {
          formValidMapRef.current = {};
          setValidateAll(true);
        },
        isValid() {
          return Object.values(formValidMapRef.current).every(
            (v) => v === true,
          );
        },
      }),
      [updateData],
    );

    const onValidate = (id: string, isValid: boolean) => {
      formValidMapRef.current[id] = isValid;
    };

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

    const tableFormWrapperStyle: React.CSSProperties | undefined = useMemo(
      () =>
        maxHeight
          ? {
              maxHeight:
                typeof maxHeight === "number" ? maxHeight + "px" : maxHeight,
            }
          : undefined,
      [maxHeight],
    );

    return (
      <div className={className}>
        {hideEmptyTable && data.length < 1 ? null : (
          <TableFormWrapper
            data-testid="eagle-table-form-wrapper"
            className={`table-form row-split-by-${rowSplitType}`}
            style={tableFormWrapperStyle}
          >
            <AntdList size={size} className={`size-${size}`}>
              <AntdList.Item
                className="eagle-table-form-header"
                actions={
                  deleteConfig?.deletable || row?.deletable
                    ? [<></>]
                    : undefined
                }
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
                row={row}
                onBodyBlur={onBodyBlur}
                updateData={updateData}
                renderRowDescription={renderRowDescription}
                rowValidator={rowValidator}
                validateAll={validateAll}
                errors={errors}
                onValidate={onValidate}
              />
            </AntdList>
          </TableFormWrapper>
        )}
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
  },
);

export default TableForm;

export * from "./types";

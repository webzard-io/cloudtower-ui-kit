import { List as AntdList } from "antd";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import AddRowButton from "./AddRowButton";
import { TableFormWrapper } from "./style";
import TableFormBodyRows from "./TableFormBodyRows";
import { BatchInputListHeaderCell } from "./TableFormHeaderCell";
import { DataType, TableFormHandle, TableFormProps } from "./types";
import { genEmptyRow } from "./utils";

const TableForm = React.forwardRef<TableFormHandle, TableFormProps>(
  (
    {
      defaultData,
      columns,
      rowCount = 3,
      errorInfo = {},
      disabled,
      rowAddConfig,
      deletable,
      size = "default",
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

    const updateData = useCallback((data: DataType[]) => {
      setLatestData(data);
      setData(data);
    }, []);

    useEffect(() => {
      updateData(defaultData);
    }, [defaultData, updateData]);

    const handleBatchChange = useCallback(
      (newData) => {
        setLatestData(newData);
        onHeaderChange?.(newData);
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
          onHeaderBlur?.(latestData);
        }
      },
      [latestData, onHeaderBlur]
    );

    // modify data size when rowCount changes
    useEffect(() => {
      if (rowCount === undefined || rowCount === data.length || rowCount === -1)
        return;

      if (rowCount < data.length) {
        const newData = data.slice(0, rowCount);

        updateData(newData);
        return;
      }

      const newData = [...data];
      while (rowCount > newData.length) {
        newData.push(genEmptyRow(columns));
      }
      updateData(newData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowCount, columns]);

    useImperativeHandle(
      ref,
      () => ({
        setData: (data: DataType[]) => {
          console.log("useImperativeHandle", data);
          updateData(data);
        },
        getData: () => data,
      }),
      [data, updateData]
    );

    const headerCells = columns.map((col) => {
      return (
        <BatchInputListHeaderCell
          key={col.key}
          data={data}
          latestData={latestData}
          disabled={disabled}
          column={col}
          onChange={handleBatchChange}
          onBlur={handleBatchBlur}
          errorInfo={errorInfo}
          onVisibleChange={setPasswordVisible}
        />
      );
    });

    return (
      <TableFormWrapper>
        <AntdList size={size}>
          <AntdList.Item
            className="eagle-table-form-header"
            actions={deletable ? [<></>] : undefined}
          >
            {headerCells}
          </AntdList.Item>
          <TableFormBodyRows
            data={data}
            latestData={latestData}
            columns={columns}
            passwordVisible={passwordVisible}
            errorInfo={errorInfo}
            deletable={deletable}
            disabled={disabled}
            onBodyBlur={onBodyBlur}
            onBodyChange={onBodyChange}
            updateData={updateData}
          />
        </AntdList>
        {rowAddConfig?.addible ? (
          <AddRowButton
            config={rowAddConfig}
            updateData={updateData}
            columns={columns}
            data={data}
          />
        ) : null}
      </TableFormWrapper>
    );
  }
);

export default TableForm;

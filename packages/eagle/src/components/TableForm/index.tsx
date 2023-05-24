import { List as AntdList } from "antd";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import AddRowButton from "./AddRowButton";
import {
  BatchInputListBodyItemStyle,
  BatchInputListHeaderItemStyle,
  TableFormWrapper,
} from "./style";
import { TableFormBodyCell } from "./TableFormBodyCell";
import { BatchInputListHeaderCell } from "./TableFormHeaderCell";
import { TableFormHandle, TableFormProps } from "./types";
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
      onHeaderChange,
      onHeaderBlur,
      onBodyChange,
      onBodyBlur,
    },
    ref
  ) => {
    const [data, setData] = useState<Record<string, any>[]>(defaultData);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [latestData, setLatestData] =
      useState<Record<string, any>[]>(defaultData);

    const updateData = useCallback((data: Record<string, any>[]) => {
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
    const handleChange = useCallback(
      (newData, path) => {
        updateData(newData);
        onBodyChange?.(newData, path);
      },
      [onBodyChange, updateData]
    );

    const handleClear = useCallback(
      (newData, path) => {
        updateData(newData);
      },
      [updateData]
    );

    const handleBlur = useCallback(
      (newData, path) => {
        onBodyBlur?.(newData, path);
      },
      [onBodyBlur]
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
        setData: (data: Record<string, any>[]) => {
          console.log("useImperativeHandle", data);
          updateData(data);
        },
        getData: () => data,
      }),
      [data, updateData]
    );

    const items = useMemo(() => {
      return data.map((_d, i) => {
        const cells = columns.map((col, index) => {
          return (
            <TableFormBodyCell
              key={col.key}
              column={col}
              data={data}
              latestData={latestData}
              defaultData={defaultData}
              disabled={disabled}
              index={i}
              errorInfo={errorInfo}
              onClear={handleClear}
              onChange={handleChange}
              onBlur={handleBlur}
              visible={passwordVisible}
            />
          );
        });
        return (
          <AntdList.Item className={BatchInputListBodyItemStyle} key={i}>
            {cells}
          </AntdList.Item>
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns, data, disabled, errorInfo, latestData, passwordVisible]);

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
        <AntdList size="small">
          <AntdList.Item className={BatchInputListHeaderItemStyle}>
            {headerCells}
          </AntdList.Item>
          {items}
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

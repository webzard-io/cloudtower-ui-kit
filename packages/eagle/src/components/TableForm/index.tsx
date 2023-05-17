import { List as AntdList } from "antd";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import {
  BatchInputListBodyItemStyle,
  BatchInputListHeaderItemStyle,
} from "./style";
import { TableFormBodyCell } from "./TableFormBodyCell";
import { BatchInputListHeaderCell } from "./TableFormHeaderCell";
import { ErrorInfo, TableFormColumn } from "./types";

type TableFormProps = {
  defaultData: any[];
  columns: TableFormColumn[];
  rowCount?: number;
  errorInfo?: ErrorInfo;
  disabled?: boolean;
  onHeaderChange?: (data: unknown[]) => void;
  onHeaderBlur?: (data: unknown[]) => void;
  onBodyChange?: (value: unknown[], path: string) => void;
  onBodyBlur?: (value: unknown, path: string) => void;
};

export type TableFormHandle = {
  setData: (data: Record<string, any>[]) => void;
};

const TableForm = React.forwardRef<TableFormHandle, TableFormProps>(
  (
    {
      defaultData,
      columns,
      rowCount = 3,
      errorInfo = {},
      disabled,
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

    useEffect(() => {
      setLatestData(defaultData);
      setData(defaultData);
    }, [defaultData]);

    const genEmptyRow = useCallback(() => {
      const row: Record<string, any> = {};
      columns.forEach((col) => {
        row[col.key] = col.defaultValue;
      });
      return row;
    }, [columns]);

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
        setLatestData(newData);
        setData(newData);
        onBodyChange?.(newData, path);
      },
      [onBodyChange]
    );

    const handleClear = useCallback((newData, path) => {
      setLatestData(newData);
      setData(newData);
    }, []);

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

        setLatestData(newData);
        setData(newData);
        return;
      }

      const newData = [...data];
      while (rowCount > newData.length) {
        newData.push(genEmptyRow());
      }
      setLatestData(newData);
      setData(newData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowCount, genEmptyRow]);

    useImperativeHandle(ref, () => ({
      setData: (data: Record<string, any>[]) => {
        console.log("useImperativeHandle", data);
        setLatestData(data);
        setData(data);
      },
    }));

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
      <div>
        <AntdList size="small">
          <AntdList.Item className={BatchInputListHeaderItemStyle}>
            {headerCells}
          </AntdList.Item>
          {items}
        </AntdList>
      </div>
    );
  }
);

export default TableForm;

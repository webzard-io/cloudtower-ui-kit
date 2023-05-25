import {
  XmarkRemove16RegularRedIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { parrotI18n } from "@cloudtower/parrot";
import { cx } from "@linaria/core";
import { List as AntdList } from "antd";
import React, { useCallback } from "react";

import Icon from "../Icon";
import Tooltip from "../Tooltip";
import { TableFormBodyCell } from "./TableFormBodyCell";
import { TableFormRowsProps } from "./types";

const TableFormBodyRows: React.FC<TableFormRowsProps> = (props) => {
  const {
    data,
    columns,
    latestData,
    disabled,
    errorInfo = {},
    passwordVisible,
    deletable,
    updateData,
    onBodyChange,
    onBodyBlur,
  } = props;

  const handleClear = useCallback(
    (newData, path) => {
      updateData(newData);
    },
    [updateData]
  );

  const handleChange = useCallback(
    (newData, path) => {
      updateData(newData);
      onBodyChange?.(newData, path);
    },
    [onBodyChange, updateData]
  );

  const handleBlur = useCallback(
    (newData, path) => {
      onBodyBlur?.(newData, path);
    },
    [onBodyBlur]
  );

  const deleteRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const getRowActions = (index: number, rowDeletable?: boolean) => {
    const isRowDeleteDisabled = rowDeletable === false;
    const DeleteIcon = (
      <Icon
        className={cx("delete-row-icon", isRowDeleteDisabled && "disabled")}
        src={XmarkRemove16SecondaryIcon}
        hoverSrc={isRowDeleteDisabled ? undefined : XmarkRemove16RegularRedIcon}
        onClick={() => {
          if (isRowDeleteDisabled) return;
          deleteRow(index);
        }}
      />
    );
    const FinalRenderIcon = isRowDeleteDisabled ? (
      DeleteIcon
    ) : (
      <Tooltip title={parrotI18n.t("components.remove")}>{DeleteIcon}</Tooltip>
    );
    return deletable ? [FinalRenderIcon] : undefined;
  };

  return (
    <>
      {data.map((_d, i) => {
        const cells = columns.map((col, index) => {
          return (
            <TableFormBodyCell
              key={col.key}
              column={col}
              data={data}
              latestData={latestData}
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
          <AntdList.Item
            key={i}
            className="eagle-table-form-row"
            actions={getRowActions(i, _d.deletable)}
          >
            {cells}
          </AntdList.Item>
        );
      })}
    </>
  );
};

export default TableFormBodyRows;

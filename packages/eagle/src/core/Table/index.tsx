import { css, cx } from "@linaria/core";
import { CheckboxStyleContent } from "@src/core/Checkbox/checkbox.style";
import { useTableBodyHasScrollBar } from "@src/core/Table/common";
import { ColumnTitle } from "@src/core/Table/TableWidget";
import { zIndices } from "@src/styles/token/zIndices";
import { Table as BaseTable } from "antd";
import cs from "classnames";
import { isNil } from "lodash";
import React, { useMemo, useRef } from "react";

import { TableProps } from "./table.type";
import { TableSkeleton } from "./TableSkeleton";

const TableContainerStyle = css`
  height: 100%;
`;

export const emptyTableStyle = css`
  .ant-table-content,
  .ant-table-body {
    overflow: visible !important;
    height: 100%;
  }

  .ant-table-tbody .ant-table-placeholder td {
    height: 100%;
  }

  table {
    width: 100% !important;
    height: 100%;
    .ant-table-placeholder .ant-table-expanded-row-fixed {
      padding: 15px 0;
    }
  }

  table thead.ant-table-thead {
    display: none;
  }
`;

export const tableStyleCover = css`
  height: 100%;

  .ant-table.ant-table-small .ant-table-tbody > tr > td {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .active-row td:nth-child(1) {
    font-weight: 700;
  }
  &.has-selection .active-row td:nth-child(2) {
    font-weight: 700;
  }

  .ant-spin-nested-loading {
    height: 100%;

    .ant-spin-container {
      height: 100%;
      overflow: visible;
    }
    .ant-spin {
      max-height: none;
    }
  }

  td.ant-table-column-sort {
    background: transparent;
  }

  td.ant-table-cell-fix-left,
  td.ant-table-cell-fix-right {
    background: #fff;
    padding: 0 !important;
    .ant-table-cell-content {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 8px;
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }

  .ant-table-container {
    height: 100%;
    &::before,
    &::after {
      box-shadow: none !important;
    }
  }

  div.ant-table {
    $columnAlignRightPaddingRight: 25px;
    border-radius: 0px;
    border-left: none;
    border-right: none;
    border-bottom: none;
    height: 100%;
    font-size: 12px;
    background: transparent;

    .ant-table-header {
      position: relative;
      z-index: $table-header-index;
      border-bottom: 1px solid $strokes-light-trans-2;
      margin-bottom: -1px;
    }

    .time-wrapper .date,
    .value {
      color: $text-primary-light;
    }

    .time-wrapper .time,
    .unit {
      color: $text-secondary-light;
    }

    .ant-table-selection {
      position: unset;
      text-align: center;
    }

    .ant-table-tbody > tr.ant-table-row-selected td {
      background: $white;
    }

    .anticon-setting {
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }

    &.ant-table-ping-left {
      .ant-table-cell-fix-left-last::after {
        box-shadow: none;
        width: 1px;
        background: rgba(213, 219, 227, 0.6);
      }
    }

    &.ant-table-ping-right {
      .ant-table-cell-fix-right-first::after {
        box-shadow: none;
        width: 1px;
        background: rgba(213, 219, 227, 0.6);
      }
    }

    .ant-table-tbody {
      position: relative;
      .ant-table-row {
        td {
          border-top: 1px solid $strokes-light-trans-2;
          border-bottom: 1px solid white;
          height: 40px;
          vertical-align: middle;
          transition: background 0ms;
          color: $gray-120;

          &.header-hover {
            background: $fills-light-opaque-1;
            border-bottom-color: $fills-light-opaque-1;
          }

          .ant-btn.ant-btn-link {
            height: auto;
            color: $gray-120;
            font-size: 12px;
            text-align: left;
            transition: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover {
              color: $blue;
            }

            > span {
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              vertical-align: middle;
            }
          }

          &.cell_status {
            line-height: 0px;
          }
          &.align-right {
            padding-right: $columnAlignRightPaddingRight;
          }
        }

        &:hover {
          & + tr td {
            border-top-color: transparent;
          }
          td {
            background: $fills-trans-secondary-light;
            border-color: transparent transparent white;

            &:first-child {
              border-radius: 8px 0 0 8px;
              .ant-table-cell-content {
                border-radius: 8px 0 0 8px;
              }
              &::before {
                content: "";
                width: 4px;
                top: -1px;
                bottom: -1px;
                background: white;
              }
            }
            &:last-child {
              border-radius: 0 8px 8px 0;
            }
            &:last-child.cell__action_ {
              border-radius: 0;
              background: white;
              border-top: none;

              > * {
                border-top: 1px solid transparent;
                border-radius: 0 8px 8px 0;
                background: $fills-trans-secondary-light;
              }
            }
            &.ant-table-cell-fix-right {
              background: white;
              border-top: 1px solid rgba(211, 218, 235, 0.6);
              .ant-table-cell-content {
                display: flex;
                align-items: center;
                height: 100%;
                background: $fills-trans-secondary-light;
              }
            }

            &.ant-table-cell-fix-left {
              background: white;
              border-top: 1px solid rgba(211, 218, 235, 0.6);
              .ant-table-cell-content {
                display: flex;
                align-items: center;
                height: 100%;
                background: $fills-trans-secondary-light;
              }
            }
          }
        }

        &:last-child td {
          border-bottom: 1px solid $strokes-light-trans-2;
        }

        &.active-row {
          box-shadow: inset 0px 0px 0 2px $blue-a10;
          border-radius: 8px;

          & + tr td {
            border-top-color: white;
          }
          td {
            background: $blue-a10;
            border-bottom-color: transparent;
            border-top-color: transparent;

            &:first-child {
              border-radius: 8px 0 0 8px;
            }
            &:last-child {
              border-radius: 0 8px 8px 0;
            }
            &:hover {
              background: $blue-a10;
            }
          }
        }
      }
    }

    .ant-table-thead {
      > tr > th {
        background: $white;
        font-weight: 400;
        position: relative;
        border-bottom: none;
        color: $gray-120;
        transition: none;
        padding: 14px 8px 14px 8px;
        line-height: 20px;

        &:not(:last-child):after {
          content: "";
          width: 1px;
          top: 0;
          bottom: 0;
          background: $strokes-light-trans-2;
          position: absolute;
          right: 0;
        }

        &.is-blank {
          padding: unset;

          &:after {
            display: none;
          }
        }

        &.ant-table-cell-ellipsis.ant-table-column-has-sorters
          .ant-table-column-sorters {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          > span {
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
          }
        }

        &.ant-table-column-has-sorters {
          padding: 15px $columnAlignRightPaddingRight 15px 8px;

          .ant-table-column-sorters {
            padding: 0;
            .order-icon {
              position: absolute;
              right: 6px;
              top: 50%;
              transform: translateY(-50%);
              height: 16px;
              display: none;
              transition: transform 320ms ease;

              &.descend {
                display: block;
                transform: translateY(-50%) rotateX(180deg);
              }
              &.ascend {
                display: block;
              }
            }
          }
          .ant-table-column-sorter {
            display: none;
          }
        }

        &:active {
          .ant-table-column-sorters .order-icon {
            &.descend {
              transform: translateY(-50%);
            }
            &.ascend {
              transform: translateY(-50%) rotateX(180deg);
            }
          }
        }

        &:hover:not(.is-blank) {
          background: $fills-light-opaque-1;
          .ant-table-column-sorters .order-icon {
            display: block;
          }
        }
        &.align-right {
          padding-right: $columnAlignRightPaddingRight;
        }
      }
    }

    .ant-table-selection-column {
      padding: 0 !important;

      .ant-checkbox-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        ${CheckboxStyleContent}
      }
      &:after {
        display: none;
      }
    }

    .ant-table-hide-scrollbar {
      background: $white;
    }
    .ant-table-placeholder {
      background: inherit;

      td {
        position: static;
        border: none;
        background: inherit !important;
        height: 100px;
        vertical-align: middle;
      }

      .table-default-empty,
      .ant-table-expanded-row-fixed {
        font-weight: bold;
        font-size: 20px;
        color: $text-terdiary-light;
      }
    }
    th.ant-table-cell-scrollbar,
    th.cell__action_ {
      z-index: ${zIndices.tableActionColumn};
    }
    td.cell__action_ {
      padding: 0 !important;
      position: relative;
      background: $white;
      > * {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 8px;
      }
      .menu-button {
        width: 24px;
        height: 24px;
        cursor: pointer;
        justify-content: center;
        border-radius: 4px;

        &:hover {
          background: $white;
        }
      }
    }
  }
`;

const Table = <T extends { id: string }>(props: TableProps<T>) => {
  const {
    loading = false,
    error,
    dataSource: _dataSource,
    columns,
    onSorterChange,
    onRowClick,
    rowClassName,
    scroll,
    bordered,
    components,
    rowSelection,
    empty,
    tableLayout = "fixed",
    // FIXME Should be removed at 0.30.x
    initLoading = false,
    rowKey,
    wrapper,
    pagination,
    onRow,
    skeletonProps,
    expandable,
    "data-testid": dataTestId,
  } = props;
  const orderRef = useRef<"descend" | "ascend" | undefined | null>(null);
  const hasScrollBard = useTableBodyHasScrollBar(wrapper, _dataSource);

  const _columns = useMemo(
    () =>
      columns.map((column) => {
        const _column = { ...column };
        if (_column.sorter && typeof _column.title !== "function") {
          _column.title = (
            <ColumnTitle title={column.title} sortOrder={column.sortOrder} />
          );
        }
        if (_column.align === "right") {
          _column.className = _column.className
            ? `${_column.className} align-right`
            : "align-right";
        }
        return _column;
      }),
    [columns],
  );

  const dataSource = useMemo(() => {
    if (loading) {
      return _dataSource;
    }
    if (!!error) {
      return [];
    }
    return _dataSource ?? [];
  }, [_dataSource, error, loading]);

  const emptyText = useMemo(() => {
    if (loading) {
      return "";
    }
    if (!!error) {
      return error;
    }
    return empty;
  }, [empty, error, loading]);

  return (
    <div
      className={cx(
        TableContainerStyle,
        "table-container",
        !hasScrollBard && "no-scroll-bar",
      )}
      data-testid={dataTestId}
    >
      <BaseTable
        className={cs(
          tableStyleCover,
          !dataSource?.length && emptyTableStyle,
          rowSelection && "has-selection",
        )}
        bordered={bordered}
        loading={{
          spinning: loading || initLoading,
          indicator: <TableSkeleton {...skeletonProps} />,
        }}
        locale={{
          emptyText,
        }}
        dataSource={dataSource}
        pagination={pagination || false}
        columns={_columns}
        components={components}
        rowKey={rowKey || "id"}
        tableLayout={dataSource?.length ? tableLayout : "auto"}
        size="small"
        onChange={(_, filters, sorter) => {
          if (!(sorter instanceof Array)) {
            orderRef.current =
              sorter.order ||
              (orderRef.current === "ascend" ? "descend" : "ascend");
            onSorterChange?.(orderRef.current, sorter.columnKey);
          }
        }}
        onRow={(record: T, index) => ({
          onClick: (evt) => onRowClick?.(record, index!, evt),
          ...onRow?.(record, index), // supply antd table complete property
        })}
        rowClassName={rowClassName}
        scroll={scroll}
        rowSelection={rowSelection && { ...rowSelection, columnWidth: 32 }}
        showSorterTooltip={false}
        expandable={expandable}
      />
    </div>
  );
};

export default Table;

export * from "./common";
export * from "./table.type";
export * from "./TableSkeleton";
export * from "./TableWidget";

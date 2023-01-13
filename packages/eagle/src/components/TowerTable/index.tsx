import { parrotI18n } from "@cloudtower/parrot";
import cs from "classnames";
import React, { useContext, useEffect, useMemo, useRef } from "react";

import { kitContext, RequiredColumnProps, TableProps } from "../../spec";
import FailedLoad from "../FailedLoad";
import {
  AuxiliaryLine,
  CustomizeColumn,
  HeaderCell,
  tableScrollToTop,
  useCustomizeColumn,
  useTransformScrollAndColumns,
} from "../Table";
import TableEmpty from "./TableEmpty";
import TablePagination from "./TablePagination";
import WrapperComponent from "./WrapperComponent";

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

export enum NetworkStatus {
  loading = 1,
  setVariables = 2,
  fetchMore = 3,
  refetch = 4,
  poll = 6,
  ready = 7,
  error = 8,
}

export interface ITowerTableProps<BaseTableData extends { id: string }>
  extends TableProps<BaseTableData> {
  uniqueTableKey: string;
  pagination: {
    count: number;
    skip: number;
    size?: number;
    defaultSize?: number;
    onChange?: (page: number) => void;
    onSizeChange?: ((size: number) => void) | undefined;
  };
  sortable?: boolean;
  tableKey?: string;
  stickyHeader?: boolean;
  sidebar?: boolean;
  error?: Error;
  loading?: boolean;
  searching?: boolean;
  refetch?: () => Promise<unknown>;
  networkStatus?: NetworkStatus;
}

const TowerTable = <BaseTableData extends { id: string }>(
  props: ITowerTableProps<BaseTableData>
) => {
  type Column = RequiredColumnProps<BaseTableData>;

  const {
    uniqueTableKey,
    dataSource,
    columns,
    pagination,
    onRowClick,
    onSorterChange,
    rowClassName,
    scroll,
    components,
    resizable = true,
    sortable = true,
    tableKey,
    rowSelection,
    empty,
    searching,
    loading,
    error,
    refetch,
    networkStatus,
    sidebar,
    tableLayout,
    stickyHeader = true,
    rowKey,
  } = props;
  const kit = useContext(kitContext);

  const polling = networkStatus === NetworkStatus.poll;
  const initLoading = networkStatus === NetworkStatus.loading;

  const auxiliaryLine = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  const fillDisplayColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.display == null) {
        return { ...col, display: true };
      }
      return col;
    });
  }, [columns]);

  // useCustomizeColumn will lost all function. in column.
  const [customizeColumn, setCustomizeColumn] = useCustomizeColumn(
    uniqueTableKey,
    fillDisplayColumns
  );

  const _components = useMemo(() => {
    return {
      header: {
        cell:
          resizable || sortable
            ? (props: {
                index: number;
                sortable: boolean;
                className: string;
                children: React.ReactNode;
              }) => {
                return (
                  <HeaderCell
                    {...props}
                    resizable={resizable}
                    draggable={props.sortable}
                    components={components}
                    auxiliaryLine={auxiliaryLine}
                    wrapper={wrapper}
                    customizeColumn={customizeColumn}
                    setCustomizeColumn={setCustomizeColumn}
                  />
                );
              }
            : undefined,
      },
      body: {
        cell: (props: any) => (
          <td
            {...props}
            className={`${props.className} cell_${props.unique}`}
          />
        ),
      },
    };
  }, [components, customizeColumn, resizable, setCustomizeColumn, sortable]);

  const allColumnKeys = useMemo(() => columns.map((col) => col.key), [columns]);

  const columnTitleMap = useMemo(() => {
    return columns?.reduce((prev, cur) => {
      return {
        ...prev,
        [cur.key as string]: cur.title,
      };
    }, {});
  }, [columns]);

  const columnsWithAction = useMemo(
    () => [
      ...customizeColumn
        .sort((a, b) => {
          return (
            customizeColumn.map((col) => col.key).indexOf(a.key) -
            customizeColumn.map((col) => col.key).indexOf(b.key)
          );
        })
        .map((col, index) => {
          return {
            ...col,
            onHeaderCell: () => ({
              index,
            }),
          };
        })
        .filter((col) => col.display),
      {
        key: "_action_",
        dataIndex: "id",
        title: (
          <CustomizeColumn
            customizeColumn={customizeColumn}
            setCustomizeColumn={setCustomizeColumn}
            renderKeys={allColumnKeys}
            disabledColumnKeys={[allColumnKeys[0]]}
            columnTitleMap={columnTitleMap}
            data-test-id={"customize-column-a"}
          />
        ),
        fixed: "right",
        width: 32,
      } as RequiredColumnProps<BaseTableData>,
    ],
    [allColumnKeys, columnTitleMap, customizeColumn, setCustomizeColumn]
  );

  const [_scroll, withBlankColumns] = useTransformScrollAndColumns<Column>({
    wrapper,
    loading,
    rowSelection,
    data: dataSource,
    tableKey,
    uniqueKey: tableKey,
    stickyHeader,
    columns: columnsWithAction,
    scroll,
  });

  useEffect(() => {
    if (!_scroll?.x) {
      withBlankColumns.forEach((column) => {
        column.fixed = undefined;
      });
    }
  }, [_scroll?.x, withBlankColumns]);

  return (
    <WrapperComponent
      sidebar={sidebar}
      initLoading={initLoading}
      wrapper={wrapper}
    >
      <div
        className={cs(
          "table-wrapper",
          tableKey && `${tableKey}-table-wrapper`,
          stickyHeader && "table-sticky-header"
        )}
        ref={wrapper}
      >
        <div className="relative table-content">
          <kit.table<BaseTableData>
            wrapper={wrapper}
            loading={loading && !polling}
            initLoading={initLoading}
            error={
              error &&
              refetch && (
                <FailedLoad
                  error={parrotI18n.t("cluster.retry_when_access_data_failed")}
                  title={error.message}
                  refetch={refetch}
                />
              )
            }
            key={`${tableKey}-${parrotI18n.language}`}
            dataSource={dataSource}
            columns={withBlankColumns}
            onSorterChange={onSorterChange}
            onRowClick={onRowClick}
            rowClassName={rowClassName}
            scroll={_scroll}
            components={_components}
            rowSelection={rowSelection}
            tableLayout={tableLayout}
            empty={
              empty || (
                <TableEmpty
                  searching={searching}
                  emptyTablekey={uniqueTableKey}
                />
              )
            }
            rowKey={rowKey}
          />
          <AuxiliaryLine ref={auxiliaryLine} />
        </div>
        {dataSource && (
          <TablePagination
            count={pagination.count}
            skip={pagination.skip || 0}
            size={pagination.size || pagination.defaultSize || 10}
            onChange={(page) => {
              pagination.onChange?.(page);
              tableScrollToTop(wrapper);
            }}
            onSizeChange={pagination.onSizeChange}
          />
        )}
      </div>
    </WrapperComponent>
  );
};

export default TowerTable;

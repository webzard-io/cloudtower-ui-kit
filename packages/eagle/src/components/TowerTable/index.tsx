import {
  AuxiliaryLine,
  CustomizeColumnType,
  FailedLoad,
  HeaderCell,
  PendingTable,
  tableScrollToTop,
  useTransformScrollAndColumns,
} from "@cloudtower/eagle/kit/smartx";
import {
  kitContext,
  RequiredColumnProps,
  TableProps as KitTableProps,
  TableProps,
} from "@cloudtower/eagle/kit/specify";
import { parrotI18n } from "@cloudtower/parrot";
import { ApolloError, NetworkStatus } from "apollo-client";
import cs from "classnames";
import React, { useContext, useMemo, useRef } from "react";

import TableEmpty from "./TableEmpty";
import TablePagination from "./TablePagination";
import WrapperComponent from "./WrapperComponent";

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

interface IBaseTableProps<BaseTableData extends { id: string }>
  extends KitTableProps<BaseTableData> {
  uniqueKey: string;
  pagination: {
    count: number;
    skip: number;
    size: number;
    defaultSize: number;
    onChange?: (page: number) => void;
    onSizeChange?: ((size: number) => void) | undefined;
  };
  sortable?: boolean;
  emptyTablekey: string;
  tableKey?: string;
  stickyHeader?: boolean;
  sidebar?: boolean;
  error?: ApolloError;
  loading?: boolean;
  searching?: boolean;
  refetch: () => Promise<unknown>;
  networkStatus?: number;
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
  defaultCustomizeColumn: [string, () => CustomizeColumnType[]];
}

const TowerTable = <BaseTableData extends { id: string }>(
  props: IBaseTableProps<BaseTableData>
) => {
  const {
    dataSource,
    columns,
    uniqueKey,
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
    wrapper,
    emptyTablekey,
    stickyHeader = true,
    rowKey,
    defaultCustomizeColumn,
  } = props;
  const kit = useContext(kitContext);

  const polling = networkStatus === NetworkStatus.poll;
  const initLoading = networkStatus === NetworkStatus.loading;

  type Column = RequiredColumnProps<BaseTableData>;

  const auxiliaryLine = useRef<HTMLDivElement>(null);
  const _components = useMemo<TableProps<BaseTableData>["components"]>(() => {
    const result: TableProps<BaseTableData>["components"] = {
      header: {},
      body: {
        cell: () => {
          return null;
        },
      },
    };

    if (resizable || sortable) {
      result.header!.cell = (props: {
        index: number;
        sortable: boolean;
        className: string;
        children: React.ReactNode;
      }) => (
        <HeaderCell
          {...props}
          resizable={resizable}
          draggable={props.sortable}
          components={components}
          auxiliaryLine={auxiliaryLine}
          wrapper={wrapper}
          defaultCustomizeColumn={defaultCustomizeColumn}
        />
      );
    }

    result.body!.cell = (props) => (
      <td {...props} className={`${props.className} cell_${props.unique}`} />
    );
    return { ...components, ...result };
  }, [components, defaultCustomizeColumn, resizable, sortable, wrapper]);

  const [_scroll, finalColumns] = useTransformScrollAndColumns<Column>({
    wrapper,
    loading,
    rowSelection,
    data: dataSource,
    tableKey,
    uniqueKey,
    stickyHeader,
    columns,
    scroll,
  });

  if (!_scroll?.x) {
    finalColumns.forEach((column) => {
      column.fixed = undefined;
    });
  }

  return (
    <PendingTable>
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
                error && (
                  <FailedLoad
                    error={parrotI18n.t(
                      "cluster.retry_when_access_data_failed"
                    )}
                    title={error.message}
                    refetch={refetch}
                  />
                )
              }
              key={`IscsiConnectionTable-${parrotI18n.language}`}
              dataSource={dataSource}
              columns={finalColumns}
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
                    emptyTablekey={emptyTablekey}
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
              size={pagination.size || pagination.defaultSize}
              onChange={(page) => {
                pagination.onChange?.(page);
                tableScrollToTop(wrapper);
              }}
              onSizeChange={pagination.onSizeChange}
            />
          )}
        </div>
      </WrapperComponent>
    </PendingTable>
  );
};

export default TowerTable;

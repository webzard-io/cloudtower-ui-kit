import {
  ColumnsType,
  ColumnType,
  TableProps as AntdTableProps,
} from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { ITableSkeletonProps } from "./TableSkeleton";

interface IdObject {
  id: string;
}

export interface TableComponent {
  <TData extends IdObject>(
    props: React.PropsWithChildren<TableProps<TData>>,
    context?: unknown,
  ): React.ReactElement | null;
}

type Columns<T> = ColumnsType<T>[0];

export interface RequiredColumnProps<T>
  extends Omit<Columns<T>, "onHeaderCell" | "onCell" | "title"> {
  key: Exclude<Columns<T>["key"], undefined | number>;
  dataIndex: Exclude<ColumnType<T>["dataIndex"], undefined>;
  sortable?: boolean;
  width?: number | string;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onHeaderCell?: (column: ColumnType<T>) => any;
  onCell?: (column: T) => any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  /**
   * removed params for title function
   * because we need to cast the function in customize column
   * which cannot access the header params
   */
  title: React.ReactNode | (() => React.ReactNode);
  customizable?: boolean;
}

export type SorterOrder = "descend" | "ascend" | undefined;

export interface TableProps<T extends { id: string }> {
  bordered?: boolean;
  loading?: boolean;
  error?: React.ReactNode | string;
  dataSource: T[] | undefined;
  columns: RequiredColumnProps<T>[];
  onSorterChange?: (order: SorterOrder | null, key?: string | number) => void;
  //TODO: abandon props
  // Use onRow instead of onRowClick
  onRowClick?: (
    record: T,
    index: number,
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  rowClassName?: (record: T, index: number) => string;
  scroll?: { x?: number | string | true; y?: number | string };
  onResize?: (column: RequiredColumnProps<T>[]) => void;
  resizable?: boolean;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
  components?: {
    table?: (props: any) => any;
    header?: {
      wrapper?: (props: any) => any;
      row?: (props: any) => any;
      cell?: (props: any) => any;
    };
    body?: {
      wrapper?: (props: any) => any;
      row?: (props: any) => any;
      cell?: (props: any) => any;
    };
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
  RowMenu?: React.FC<{ record: T; index: number }>;
  rowSelection?: TableRowSelection<T>;
  empty?: string | React.ReactNode;
  tableLayout?: "fixed" | "auto";
  initLoading?: boolean;
  rowKey?: AntdTableProps<T>["rowKey"];
  wrapper?: React.MutableRefObject<HTMLDivElement | null>;
  pagination?: {
    current: number;
    pageSize: number;
  };
  onRow?: AntdTableProps<T>["onRow"];
  skeletonProps?: Omit<ITableSkeletonProps, "scrollY">;
}

import {
  ColumnsType,
  ColumnType,
  TableProps as AntdTableProps,
} from "antd/lib/table";
import { ExpandableConfig, TableRowSelection } from "antd/lib/table/interface";
import React from "react";

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
  /**
   * 是否支持排序。设置为 true 时，点击表头可触发排序。
   * @default false
   */
  sortable?: boolean;
  /**
   * 列宽度。支持数字（像素）或字符串（如 "20%"）。
   */
  width?: number | string;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onHeaderCell?: (column: ColumnType<T>) => any;
  onCell?: (column: T) => any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  /**
   * 列标题。支持 React 节点或返回 React 节点的函数。
   * 注意：函数形式不接收参数，与 antd 原生 title 函数签名不同。
   */
  title: React.ReactNode | (() => React.ReactNode);
  /**
   * 是否允许用户自定义该列。用于列配置功能。
   * @default true
   */
  customizable?: boolean;
}

export type SorterOrder = "descend" | "ascend" | undefined;

/**
 * 表格组件，基于 antd Table 二次封装，提供统一的 CloudTower 表格样式。
 *
 * @description
 * 用于展示结构化数据列表，支持排序、行选择、展开行、加载状态、错误状态等功能。
 * 数据源要求每条记录包含 id 字段作为唯一标识。
 *
 * @example
 * // 基础用法
 * import { Table } from "@cloudtower/eagle";
 *
 * interface VMData {
 *   id: string;
 *   name: string;
 *   status: string;
 *   cpu: number;
 * }
 *
 * const columns = [
 *   { key: "name", title: "名称", dataIndex: "name" },
 *   { key: "status", title: "状态", dataIndex: "status" },
 *   { key: "cpu", title: "CPU", dataIndex: "cpu" },
 * ];
 *
 * <Table<VMData> columns={columns} dataSource={vms} />
 *
 * @example
 * // 带行选择
 * import { Table } from "@cloudtower/eagle";
 * import { useState } from "react";
 *
 * const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
 *
 * <Table<VMData>
 *   columns={columns}
 *   dataSource={vms}
 *   rowSelection={{
 *     selectedRowKeys: selectedKeys,
 *     onChange: (keys) => setSelectedKeys(keys as string[]),
 *   }}
 * />
 *
 * @example
 * // 带排序和加载状态
 * import { Table } from "@cloudtower/eagle";
 *
 * <Table<VMData>
 *   columns={columns}
 *   dataSource={vms}
 *   loading={isLoading}
 *   onSorterChange={(order, key) => {
 *     console.log("排序:", order, key);
 *   }}
 * />
 *
 * @see TableForm - 表格表单，用于行内编辑场景
 * @see SummaryTable - 摘要表格，用于键值对信息展示
 * @see BatchOperation - 批量操作工具栏，配合行选择使用
 */
export interface TableProps<T extends { id: string }> {
  /**
   * 是否显示边框。
   * @default false
   */
  bordered?: boolean;
  /**
   * 是否显示加载状态。为 true 时显示骨架屏加载动画。
   * @default false
   */
  loading?: boolean;
  /**
   * 错误状态内容。传入后将覆盖 dataSource，显示错误信息而非数据。
   */
  error?: React.ReactNode | string;
  /**
   * 数据源数组。每条记录必须包含 id 字段作为唯一标识。
   */
  dataSource: T[] | undefined;
  /**
   * 列配置数组。定义表格的列结构。
   */
  columns: RequiredColumnProps<T>[];
  /**
   * 排序变化回调。当用户点击可排序列的表头时触发。
   * @param order - 排序方向："descend"（降序）、"ascend"（升序）、null（取消排序）
   * @param key - 排序列的 key
   */
  onSorterChange?: (order: SorterOrder | null, key?: string | number) => void;
  /**
   * 行点击回调。
   * @deprecated 请使用 onRow 替代
   * @param record - 点击行的数据记录
   * @param index - 行索引
   * @param evt - 鼠标事件
   */
  onRowClick?: (
    record: T,
    index: number,
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  /**
   * 行样式类名函数。根据行数据和索引返回自定义类名。
   */
  rowClassName?: (record: T, index: number) => string;
  /**
   * 表格滚动配置。
   * @example
   * // 固定表头，内容区滚动
   * scroll={{ y: 400 }}
   * // 水平滚动
   * scroll={{ x: 1200 }}
   */
  scroll?: { x?: number | string | true; y?: number | string };
  /**
   * 列宽调整回调。启用 resizable 后，用户拖拽调整列宽时触发。
   */
  onResize?: (column: RequiredColumnProps<T>[]) => void;
  /**
   * 是否允许调整列宽。
   * @default false
   */
  resizable?: boolean;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * 自定义表格组件。用于覆盖默认的 table/thead/tbody 渲染。
   */
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
  /**
   * 行操作菜单组件。在每行末尾渲染操作按钮或菜单。
   */
  RowMenu?: React.FC<{ record: T; index: number }>;
  /**
   * 行选择配置。启用后显示复选框列，支持单选或多选。
   * @see https://ant.design/components/table-cn#rowSelection
   */
  rowSelection?: TableRowSelection<T>;
  /**
   * 空数据时的显示内容。
   */
  empty?: string | React.ReactNode;
  /**
   * 表格布局方式。
   * - "fixed"：固定布局，列宽由第一行决定
   * - "auto"：自动布局，列宽由内容决定
   * @default "fixed"
   */
  tableLayout?: "fixed" | "auto";
  /**
   * 初始化加载状态。
   * @deprecated 请使用 loading 替代
   */
  initLoading?: boolean;
  /**
   * 行的唯一标识字段。支持字符串或函数。
   * @default "id"
   */
  rowKey?: AntdTableProps<T>["rowKey"];
  /**
   * 表格容器引用。用于获取表格尺寸信息。
   */
  wrapper?: React.MutableRefObject<HTMLDivElement | null>;
  /**
   * 分页配置。传入后将启用前端分页，通常用于骨架屏行数计算。
   */
  pagination?: {
    current: number;
    pageSize: number;
  };
  /**
   * 行属性配置。用于设置行事件（如 onClick、onMouseEnter 等）。
   * @see https://ant.design/components/table-cn#onRow
   */
  onRow?: AntdTableProps<T>["onRow"];
  /**
   * 骨架屏配置。自定义加载状态下的骨架屏样式。
   */
  skeletonProps?: ITableSkeletonProps;
  /**
   * 展开行配置。用于渲染可展开的行内容。
   * @see https://ant.design/components/table-cn#expandable
   */
  expandable?: ExpandableConfig<T>;
  /**
   * 用于测试的标识符，会传递到表格根容器元素。
   */
  "data-testid"?: string;
}

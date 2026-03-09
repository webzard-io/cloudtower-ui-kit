import { ColumnBodyImpls } from "@src/core/TableForm/Columns";

import { ButtonProps } from "../Button";

/** 单元格错误信息，key 为列标识 */
export type ErrorInfo = Record<
  string,
  {
    errorMessage: string;
    isError: boolean;
  }
>;

/**
 * 表单校验触发模式
 */
export enum ValidateTriggerType {
  /** 标准模式：首次 blur 后触发校验，之后每次 change 也触发 */
  Normal,
  /** 激进模式：每次 change 都触发校验 */
  Aggressive,
  /** 惰性模式：仅 blur 时触发校验 */
  Lazy,
}

/**
 * 自定义列渲染函数的参数
 */
export type CustomizedColumnRenderProps = {
  /** 当前单元格的值 */
  value?: any;
  /** 当前行索引（header 行时为 undefined） */
  rowIndex?: number;
  /** 值变更回调 */
  onChange: (value: any) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 失焦回调 */
  onBlur?: () => void;
  /** 占位文本 */
  placeholder?: string;
  /** 是否为表头行（批量填充行） */
  isHeader: boolean;
  /** 是否处于错误状态 */
  error?: boolean;
  /** 当前行的完整数据 */
  formValue: any;
};

/**
 * TableForm 列配置。
 * 每列可选择内置类型（text/input/password/checkbox/affix）或通过 render 自定义渲染。
 */
export type TableFormColumn = {
  /**
   * 列类型，使用内置列组件渲染单元格
   * - "text": 只读文本展示
   * - "input": 文本输入框
   * - "password": 密码输入框（可切换显示/隐藏）
   * - "checkbox": 复选框
   * - "affix": 带前缀/后缀的输入框
   *
   * 不指定 type 时需提供 render 函数自定义渲染。
   */
  type?: keyof typeof ColumnBodyImpls;
  /** 列标题，显示在表头 */
  title?: string | React.ReactNode;
  /** 列唯一标识，同时作为行数据对象的 key */
  key: string;
  /**
   * 列副标题。仅当 disableBatchFilling 为 false 且 type 为 "text" 时显示。
   * 若需要在任何情况下显示副标题，请使用 subTitleRender。
   */
  subTitle?: string;
  /**
   * 列副标题颜色
   * - "": 默认颜色
   * - "primary": 主色
   * - "success": 成功色
   * - "warning": 警告色
   * - "danger": 危险色
   */
  subTitleColor?: "" | "primary" | "success" | "warning" | "danger";
  /**
   * 列副标题自定义渲染函数。优先级高于 subTitle，即使 disableBatchFilling 为 true 也会生效。
   */
  subTitleRender?: (props: CustomizedColumnRenderProps) => React.ReactNode;
  /** 列单元格图标 */
  bodyIcon?: any;
  /** 列单元格错误状态图标 */
  bodyErrorIcon?: any;
  /** 列宽度 */
  width?: number | string;
  /** 覆盖单元格显示文本（仅 text 类型） */
  displayText?: string;
  /** 单元格默认值，新增行时使用 */
  defaultValue?: any;
  /** 是否隐藏该列 */
  hidden?: boolean;
  /** 输入框占位文本 */
  placeholder?: string;
  /**
   * 批量填充时是否自动递增末尾数字。
   * 例如输入 "host0"，各行会自动填充为 "host0"、"host1"、"host2"...
   */
  autoIncrease?: boolean;
  /** 禁用 affix 类型的前缀输入（仅 type="affix" 时生效） */
  disablePrefix?: boolean;
  /** 禁用 affix 类型的后缀输入（仅 type="affix" 时生效） */
  disableSuffix?: boolean;
  /** 自定义数据，透传给列渲染组件 */
  customData?: any;
  /**
   * 列对齐方式
   * @default "left"
   */
  align?: "left" | "right" | "center";
  /** 列行描述渲染函数，在单元格下方渲染额外说明 */
  renderDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  /**
   * 自定义单元格渲染函数。不指定 type 时必须提供此函数。
   * 即使指定了 type，render 也会覆盖内置渲染。
   */
  render?: (props: CustomizedColumnRenderProps) => React.ReactNode;
  /**
   * 列级别校验函数。返回错误信息字符串表示校验失败，返回 undefined 表示通过。
   */
  validator?: (params: {
    value: any;
    rowIndex?: number;
    rowData?: DataType;
    isHeader?: boolean;
  }) => string | undefined;
};

export interface ColumnHeaderCellProps {
  data: DataType[];
  latestData: DataType[];
  column: TableFormColumn;
  disabled?: boolean;
  disableBatchFilling?: boolean;
  onChange?: (
    newData: DataType[],
    columnKey: string,
    shouldUpdateData: boolean,
  ) => void;
  onBlur?: (key: string, error?: string) => void;
  // Used to control whether the body password input is show or hide
  onVisibleChange?: (visible: boolean) => void;
}

/** 行数据类型，key 为列标识，value 为单元格值 */
export type DataType = {
  [columnKey: string]: any;
};

export interface ColumnBodyCellProps {
  data: DataType[];
  latestData: DataType[];
  index: number;
  column: TableFormColumn;
  disabled?: boolean;
  onChange?: (
    newData: DataType[],
    rowIndex?: number,
    columnKey?: string,
  ) => void;
  onBlur?: (newData: DataType[], rowIndex?: number, columnKey?: string) => void;
  customData?: any;
  placeholderValue?: string;
  // Whether the password is show or hide
  visible?: boolean;
  validateTriggerType: ValidateTriggerType;
  isRowError: boolean;
  getRowValidateResult: (rowData: DataType) => string | undefined;
  validateAllCount: number;
  error?: string | null;
  onValidate?: (id: string, isValid: boolean) => void;
}

/** 添加行按钮的 Props */
export type AddRowButtonProps = {
  /** 行添加配置 */
  config: RowAddConfigurations;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 列配置，用于生成空行默认值 */
  columns: TableFormColumn[];
  /** 添加行回调 */
  addData: (data: DataType[]) => void;
  /** 当前表格数据 */
  data: DataType[];
};

/**
 * 行添加配置
 */
export type RowAddConfigurations = {
  /** 是否允许添加行 */
  addible: boolean;
  /** 添加按钮文案，支持字符串或返回 ReactNode 的函数 */
  text?: (() => React.ReactNode) | string;
  /** 添加按钮的额外属性 */
  buttonProps?: ButtonProps;
  /** 最大行数限制，达到上限后添加按钮禁用 */
  maximum?: number;
  /** 添加按钮区域的自定义类名 */
  className?: string;
  /** 添加按钮右侧的额外操作区域 */
  extraAction?: React.ReactNode;
  /** 完全自定义添加按钮组件 */
  CustomizedButton?: (props: AddRowButtonProps) => React.ReactElement;
};

export interface TableFormRowsProps
  extends Pick<
    TableFormProps,
    | "columns"
    | "disabled"
    | "deleteConfig"
    | "disableBatchFilling"
    | "validateTriggerType"
    | "renderRowDescription"
    | "rowValidator"
    | "onBodyBlur"
    | "row"
    | "errors"
  > {
  data: DataType[];
  latestData: DataType[];
  updateData: (data: DataType[]) => void;
  passwordVisible: boolean;
  validateAllCount: number;
  draggable?: boolean;
  rowSplitType?: TableFormRowSplitType;
  onValidate?: (id: string, isValid: boolean) => void;
}

/** 行描述渲染函数的参数 */
export type RenderRowDescriptionProps = {
  /** 当前行索引 */
  rowIndex: number;
  /** 当前行数据 */
  rowData: DataType;
  /** 表头批量填充的最新值 */
  latestData?: DataType[];
};

/**
 * @deprecated 请使用 TableFormRowConfiguration 的 deletable + disableActions 替代
 */
export type DeletableConfigurations = {
  deletable: boolean;
  specifyRowDeleteDisabled?: (rowIndex: number, allData: DataType[]) => boolean;
};

/** 行操作类型 */
export type TableFormRowActions = "delete";

/** 行分隔样式类型 */
export type TableFormRowSplitType = "border" | "zebraMarking";

/**
 * 表格行配置。统一管理行级别的交互行为，替代已废弃的 draggable/deleteConfig/rowSplitType/renderRowDescription/rowValidator。
 */
export type TableFormRowConfiguration = {
  /**
   * 行分隔样式
   * - "border": 边框分隔（默认）
   * - "zebraMarking": 斑马纹分隔
   */
  splitType?: TableFormRowSplitType;
  /** 是否允许拖拽排序 */
  draggable?: boolean;
  /**
   * 是否允许删除行。传 boolean 控制全部行，传函数可按行索引动态控制。
   */
  deletable?: boolean | ((rowIndex: number, allData: DataType[]) => boolean);
  /** 行描述文本数组，按索引对应每一行 */
  descriptions?: (string | React.ReactNode)[];
  /**
   * 禁用指定行操作。传数组禁用所有行的指定操作，传函数可按行索引动态控制。
   */
  disableActions?:
    | TableFormRowActions[]
    | ((
        rowIndex: number,
        allData: DataType[],
      ) => TableFormRowActions[] | undefined);
  /** 行级别校验函数。返回错误信息字符串表示校验失败，返回 undefined 表示通过。 */
  validator?: (rowIndex: number, rowData: DataType) => string | undefined;
  /** 自定义行描述渲染函数，按行返回描述内容 */
  customizedDescription?: (
    props: RenderRowDescriptionProps,
  ) => React.ReactNode | string;
};

/**
 * 表格错误信息数组，按行索引对应。
 * 每项可以是：
 * - string: 行级别错误信息
 * - { [columnKey]: string | null }: 单元格级别错误信息
 * - null: 该行无错误
 */
export type TableFormErrorsType = (
  | string
  | { [columnKey: string]: string | null }
  | null
)[];

/**
 * TableForm 是行内编辑的表格表单组件，适用于批量数据录入场景。
 * 支持多种列类型（文本/输入/密码/复选框/前后缀/自定义）、表头批量填充、
 * 行的增删和拖拽排序、三种校验模式、以及外部错误信息注入。
 *
 * @example
 * ```tsx
 * import React, { useRef } from "react";
 * import { TableForm } from "@cloudtower/eagle";
 * import type { TableFormColumn, TableFormHandle } from "@cloudtower/eagle";
 *
 * const columns: TableFormColumn[] = [
 *   { key: "name", title: "主机名", type: "input", autoIncrease: true },
 *   { key: "ip", title: "管理 IP", type: "input",
 *     validator: ({ value }) => !value ? "IP 不能为空" : undefined },
 *   { key: "password", title: "密码", type: "password" },
 * ];
 *
 * const App = () => {
 *   const ref = useRef<TableFormHandle>(null);
 *   return (
 *     <TableForm
 *       ref={ref}
 *       columns={columns}
 *       defaultData={[{ name: "host0", ip: "", password: "" }]}
 *       rowAddConfig={{ addible: true, maximum: 10 }}
 *       row={{ deletable: true, draggable: true }}
 *       onBodyChange={(data) => console.log("数据变更:", data)}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // 自定义列渲染
 * import React from "react";
 * import { TableForm, Select } from "@cloudtower/eagle";
 * import type { TableFormColumn } from "@cloudtower/eagle";
 *
 * const columns: TableFormColumn[] = [
 *   { key: "name", title: "名称", type: "input" },
 *   {
 *     key: "role",
 *     title: "角色",
 *     defaultValue: "worker",
 *     render({ isHeader, value, onChange, placeholder, ...rest }) {
 *       return (
 *         <Select
 *           size="small"
 *           value={value}
 *           onChange={onChange}
 *           placeholder={isHeader ? "批量选择" : "请选择"}
 *           options={[
 *             { label: "Master", value: "master" },
 *             { label: "Worker", value: "worker" },
 *           ]}
 *         />
 *       );
 *     },
 *   },
 * ];
 * ```
 *
 * @see Form 标准表单容器，适用于非表格化的表单场景
 * @see SortableList 可拖拽排序列表，适用于纯排序（无编辑）场景
 */
export type TableFormProps = {
  /** 表格初始数据，每项为一行数据对象，key 对应列的 key */
  defaultData?: DataType[];
  /** 表格列配置数组 */
  columns: TableFormColumn[];
  /**
   * 是否禁用所有单元格的默认控件（输入框、复选框等）
   * @default false
   */
  disabled?: boolean;
  /** 行添加配置，包含添加按钮文案、最大行数等 */
  rowAddConfig?: RowAddConfigurations;
  /**
   * @deprecated 请使用 row 配置的 deletable + disableActions 替代
   */
  deleteConfig?: DeletableConfigurations;
  /**
   * 表格大小
   * @default "default"
   */
  size?: "default" | "large" | "small";
  /**
   * @deprecated 请使用 row.draggable 替代
   */
  draggable?: boolean;
  /**
   * 是否禁用表头批量填充功能。禁用后表头只显示标题，不显示输入控件。
   * @default false
   */
  disableBatchFilling?: boolean;
  /** 自定义类名 */
  className?: string;
  /**
   * @deprecated 请使用 row.splitType 替代
   */
  rowSplitType?: TableFormRowSplitType;
  /**
   * 校验触发模式
   * - Normal: 首次 blur 后触发，之后每次 change 也触发
   * - Aggressive: 每次 change 都触发
   * - Lazy: 仅 blur 时触发
   * @default ValidateTriggerType.Normal
   */
  validateTriggerType?: ValidateTriggerType;
  /** 表格最大高度，超出后出现滚动条 */
  maxHeight?: number | string;
  /** 表格行配置，统一管理拖拽、删除、分隔样式、行描述、行校验等 */
  row?: TableFormRowConfiguration;
  /**
   * 外部注入的错误信息数组，按行索引对应。
   * 支持行级别（字符串）和单元格级别（对象）两种格式。
   */
  errors?: TableFormErrorsType;
  /**
   * @deprecated 请使用 row.customizedDescription 替代
   */
  renderRowDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  /**
   * @deprecated 请使用 row.validator 替代
   */
  rowValidator?: (rowIndex: number, rowData: DataType) => string | undefined;
  /** 表头批量填充值变更回调 */
  onHeaderChange?: (data: any[], columnKey: string) => void;
  /** 表头批量填充输入框失焦回调 */
  onHeaderBlur?: (data: any[], columnKey: string) => void;
  /** 行数据变更回调。data 为完整表格数据，rowIndex 和 columnKey 标识变更位置。 */
  onBodyChange?: (
    value: DataType[],
    rowIndex?: number,
    columnKey?: string,
  ) => void;
  /** 新增行回调。value 为新增后的完整数据，rowIndex 为新行索引。 */
  onBodyAdd?: (value: DataType[], rowIndex: number) => void;
  /** 行数据失焦回调 */
  onBodyBlur?: (value: DataType, rowIndex?: number, columnKey?: string) => void;
  /**
   * 是否在无数据时隐藏表格（仅显示添加按钮）
   * @default false
   */
  hideEmptyTable?: boolean;
};

/**
 * TableForm 的 ref handle，通过 useRef<TableFormHandle> 获取。
 * 提供命令式操作表格数据和校验的方法。
 */
export type TableFormHandle = {
  /** 设置表格数据并触发 onBodyChange 回调 */
  setData: (data: DataType[]) => void;
  /** 设置表格数据但不触发 onBodyChange 回调（静默更新） */
  setDataWithoutTriggerChange: (data: DataType[]) => void;
  /** 触发全表校验（所有行、所有列） */
  validateWholeFields: () => void;
  /** 返回当前表格是否全部校验通过 */
  isValid: () => boolean;
};

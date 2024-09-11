import { ColumnBodyImpls } from "@src/core/TableForm/Columns";

import { ButtonProps } from "../Button";

export type ErrorInfo = Record<
  string,
  {
    errorMessage: string;
    isError: boolean;
  }
>;

export enum ValidateTriggerType {
  Normal,
  Aggressive,
  Lazy,
}

export type CustomizedColumnRenderProps = {
  value?: any;
  rowIndex?: number;
  onChange: (value: any) => void;
  disabled?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  isHeader: boolean;
  error?: boolean;
};

export type TableFormColumn = {
  type?: keyof typeof ColumnBodyImpls;
  title?: string;
  key: string;
  subTitle?: string;

  subTitleColor?: "" | "primary" | "success" | "warning" | "danger";
  bodyIcon?: any;
  bodyErrorIcon?: any;
  width?: number | string;
  displayText?: string;

  defaultValue?: any;
  hidden?: boolean;
  placeholder?: string;
  autoIncrease?: boolean;
  disablePrefix?: boolean;
  disableSuffix?: boolean;
  customData?: any;
  align?: "left" | "right" | "center";
  renderDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  render?: (props: CustomizedColumnRenderProps) => React.ReactNode;
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
  validateAll: boolean;
  error?: string | null;
}

export type AddRowButtonProps = {
  config: RowAddConfigurations;
  columns: TableFormColumn[];
  updateData: (data: DataType[]) => void;
  data: DataType[];
};

export type RowAddConfigurations = {
  addible: boolean;
  text?: (() => React.ReactNode) | string;
  buttonProps?: ButtonProps;
  maximum?: number;
  className?: string;
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
  validateAll: boolean;
  draggable?: boolean;
  rowSplitType?: TableFormRowSplitType;
}

export type RenderRowDescriptionProps = {
  rowIndex: number;
  rowData: DataType;
  latestData?: DataType[];
};

export type DeletableConfigurations = {
  deletable: boolean;
  specifyRowDeleteDisabled?: (rowIndex: number, allData: DataType[]) => boolean;
};

export type TableFormRowActions = "delete";

export type TableFormRowSplitType = "border" | "zebraMarking";

export type TableFormRowConfiguration = {
  splitType?: TableFormRowSplitType;
  draggable?: boolean;
  deletable?: boolean | ((rowIndex: number, allData: DataType[]) => boolean);
  descriptions?: (string | React.ReactNode)[];
  disableActions?:
    | TableFormRowActions[]
    | ((
        rowIndex: number,
        allData: DataType[],
      ) => TableFormRowActions[] | undefined);
  validator?: (rowIndex: number, rowData: DataType) => string | undefined;
  // Customize description for single row by call this function
  customizedDescription?: (
    props: RenderRowDescriptionProps,
  ) => React.ReactNode | string;
};

export type TableFormErrorsType = (
  | string
  | { [columnKey: string]: string | null }
  | null
)[];

export type TableFormProps = {
  /**
   * 表格默认数据
   */
  defaultData?: DataType[];
  /**
   * 表格列配置
   */
  columns: TableFormColumn[];
  /**
   * 表格是否禁用单元格默认控件
   */
  disabled?: boolean;
  /**
   * 表格行添加配置
   */
  rowAddConfig?: RowAddConfigurations;
  /**
   * @deprecated use "row" configuration instead
   */
  deleteConfig?: DeletableConfigurations;
  /**
   * 表格大小
   */
  size?: "default" | "large" | "small";
  /**
   * @deprecated use "row" configuration instead
   */
  draggable?: boolean;
  /**
   * 表格是否禁用批量填充
   */
  disableBatchFilling?: boolean;
  /**
   * 表格类名
   */
  className?: string;
  /**
   * @deprecated use "row" configuration instead
   */
  rowSplitType?: TableFormRowSplitType;
  /**
   * 表格验证触发类型，使用 ValidateTriggerType 枚举
   * @enum {number}
   */
  validateTriggerType?: ValidateTriggerType;
  /**
   * 表格最大高度
   */
  maxHeight?: number | string;
  /**
   * 表格行配置
   */
  row?: TableFormRowConfiguration;
  /**
   * 表格行错误信息
   */
  errors?: TableFormErrorsType;
  /**
   * @deprecated use "row" configuration instead
   */
  renderRowDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  /**
   * @deprecated use "row" configuration instead
   */
  rowValidator?: (rowIndex: number, rowData: DataType) => string | undefined;
  /**
   * 表格头部数据变化的回调
   */
  onHeaderChange?: (data: any[], columnKey: string) => void;
  /**
   * 表格头部数据失去焦点时的回调
   */
  onHeaderBlur?: (data: any[]) => void;
  /**
   * 表格行数据变化的回调
   */
  onBodyChange?: (
    value: DataType[],
    rowIndex?: number,
    columnKey?: string,
  ) => void;
  /**
   * 表格行数据失去焦点时的回调
   */
  onBodyBlur?: (value: DataType, rowIndex?: number, columnKey?: string) => void;
  /**
   * 是否隐藏空表格
   */
  hideEmptyTable?: boolean;
};

export type TableFormHandle = {
  setData: (data: DataType[]) => void;
  validateWholeFields: () => void;
};

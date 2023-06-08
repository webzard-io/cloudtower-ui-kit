import { ButtonProps } from "src/spec";

import { ColumnBodyImpls } from "./Columns";

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
  value?: unknown;
  rowIndex?: number;
  onChange: (value: unknown) => void;
  disabled?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  isHeader: boolean;
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

  defaultValue?: unknown;
  hidden?: boolean;
  placeholder?: string;
  autoIncrease?: boolean;
  disablePrefix?: boolean;
  disableSuffix?: boolean;
  // headerValidator?: (value: any) => string;
  customData?: any;
  align?: "left" | "right" | "center";
  renderDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  render?: (props: CustomizedColumnRenderProps) => React.ReactNode;
  validator?: (params: {
    value: unknown;
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
  onChange?: (newData: DataType[], columnKey?: string) => void;
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
    columnKey?: string
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
    | "draggable"
    | "disableBatchFilling"
    | "rowSplitType"
    | "validateTriggerType"
    | "renderRowDescription"
    | "rowValidator"
    | "onBodyBlur"
  > {
  data: DataType[];
  latestData: DataType[];
  updateData: (data: DataType[]) => void;
  passwordVisible: boolean;
  validateAll: boolean;
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

export type TableFormProps = {
  defaultData?: DataType[];
  columns: TableFormColumn[];
  disabled?: boolean;
  rowAddConfig?: RowAddConfigurations;
  deleteConfig?: DeletableConfigurations;
  size?: "default" | "large" | "small";
  draggable?: boolean;
  disableBatchFilling?: boolean;
  className?: string;
  rowSplitType?: "border" | "zebraMarking";
  validateTriggerType?: ValidateTriggerType;
  maxHeight?: number | string;
  renderRowDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  rowValidator?: (rowIndex: number, rowData: DataType) => string | undefined;
  onHeaderChange?: (data: unknown[], columnKey: string) => void;
  onHeaderBlur?: (data: unknown[]) => void;
  onBodyChange?: (
    value: DataType[],
    rowIndex?: number,
    columnKey?: string
  ) => void;
  onBodyBlur?: (value: DataType, rowIndex?: number, columnKey?: string) => void;
};

export type TableFormHandle = {
  setData: (data: DataType[]) => void;
  validateWholeFields: () => void;
};

import { ColumnBodyImpls } from "./Columns";

export type ErrorInfo = Record<
  string,
  {
    errorMessage: string;
    isError: boolean;
  }
>;
export type TableFormColumn = {
  type: keyof typeof ColumnBodyImpls;
  title?: string;
  key: string;
  subTitle?: string;

  subTitleColor?: "" | "primary" | "success" | "warning" | "danger";
  bodyIcon?: any;
  bodyErrorIcon?: any;
  width?: number;
  displayText?: string;

  defaultValue?: unknown;
  hidden?: boolean;
  placeholder?: string;
  autoIncrease?: boolean;
  disablePrefix?: boolean;
  disableSuffix?: boolean;
  headerValidator?: (value: any) => string;
  customData?: any;
};

export interface ColumnHeaderCellProps {
  data: DataType[];
  latestData: DataType[];
  column: TableFormColumn;
  disabled?: boolean;
  errorInfo: ErrorInfo;
  onChange?: (newData: DataType[], key: string) => void;
  onBlur?: (key: string, error?: string) => void;
  // Used to control whether the body password input is show or hide
  onVisibleChange?: (visible: boolean) => void;
}

export type DataType = {
  [columnKey: string]: any;
  deletable?: boolean;
};

export interface ColumnBodyCellProps {
  data: DataType[];
  latestData: DataType[];
  errorInfo: ColumnHeaderCellProps["errorInfo"];
  index: number;
  column: TableFormColumn;
  disabled?: boolean;
  onChange?: (newData: DataType[], path: string) => void;
  onBlur?: (newData: DataType[], path: string) => void;
  onClear?: (newData: DataType[], path: string) => void;
  customData?: any;
  placeholderValue?: string;
  // Whether the password is show or hide
  visible?: boolean;
}

export type AddRowButtonProps = {
  config: RowAddConfigurations;
  columns: TableFormColumn[];
  updateData: (data: DataType[]) => void;
  data: DataType[];
};

export type RowAddConfigurations = {
  addible: boolean;
  maximum?: number;
  className?: string;
  CustomizedButton?: (props: AddRowButtonProps) => React.ReactElement;
};

export interface TableFormRowsProps
  extends Omit<
    TableFormProps,
    | "rowCount"
    | "rowAddConfig"
    | "onHeaderChange"
    | "onHeaderBlur"
    | "defaultData"
  > {
  data: DataType[];
  latestData: DataType[];
  updateData: (data: DataType[]) => void;
  passwordVisible: boolean;
}

export type TableFormProps = {
  defaultData: any[];
  columns: TableFormColumn[];
  rowCount?: number;
  errorInfo?: ErrorInfo;
  disabled?: boolean;
  rowAddConfig?: RowAddConfigurations;
  deletable?: boolean;
  size?: "default" | "large";
  onHeaderChange?: (data: unknown[]) => void;
  onHeaderBlur?: (data: unknown[]) => void;
  onBodyChange?: (value: DataType[], path: string) => void;
  onBodyBlur?: (value: DataType, path: string) => void;
};

export type TableFormHandle = {
  setData: (data: DataType[]) => void;
};

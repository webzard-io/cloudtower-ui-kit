import { ColumnBodyImpls } from "./Columns";

export type ErrorInfo = Record<
  string,
  {
    errorMessage: string;
    isError: boolean;
  }
>;

export type CustomizedColumnRenderProps = {
  value?: unknown;
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
  renderDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  render?: (props: CustomizedColumnRenderProps) => React.ReactElement;
};

export interface ColumnHeaderCellProps {
  data: DataType[];
  latestData: DataType[];
  column: TableFormColumn;
  disabled?: boolean;
  errorInfo: ErrorInfo;
  disableBatchFilling?: boolean;
  onChange?: (newData: DataType[], columnKey?: string) => void;
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
  onChange?: (
    newData: DataType[],
    rowIndex?: number,
    columnKey?: string
  ) => void;
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
    | "onBodyChange"
  > {
  data: DataType[];
  latestData: DataType[];
  updateData: (data: DataType[]) => void;
  passwordVisible: boolean;
}

export type RenderRowDescriptionProps = {
  rowIndex: number;
  rowData: DataType;
  latestData: DataType[];
};

export type TableFormProps = {
  defaultData: any[];
  columns: TableFormColumn[];
  rowCount?: number;
  errorInfo?: ErrorInfo;
  disabled?: boolean;
  rowAddConfig?: RowAddConfigurations;
  deletable?: boolean;
  size?: "default" | "large";
  draggable?: boolean;
  disableBatchFilling?: boolean;
  renderRowDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  onHeaderChange?: (data: unknown[], columnKey: string) => void;
  onHeaderBlur?: (data: unknown[]) => void;
  onBodyChange?: (
    value: DataType[],
    rowIndex?: number,
    columnKey?: string
  ) => void;
  onBodyBlur?: (value: DataType, path: string) => void;
};

export type TableFormHandle = {
  setData: (data: DataType[]) => void;
};

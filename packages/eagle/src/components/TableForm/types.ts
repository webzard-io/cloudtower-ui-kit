import { ButtonProps } from "../../spec";
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
  descriptions?: string | React.ReactNode[];
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

export type TableFormErrorsType = (string | { [columnKey: string]: string })[];

export type TableFormProps = {
  defaultData?: DataType[];
  columns: TableFormColumn[];
  disabled?: boolean;
  rowAddConfig?: RowAddConfigurations;
  /**
   * @deprecated use "row" configuration instead
   */
  deleteConfig?: DeletableConfigurations;
  size?: "default" | "large" | "small";
  /**
   * @deprecated use "row" configuration instead
   */
  draggable?: boolean;
  disableBatchFilling?: boolean;
  className?: string;
  /**
   * @deprecated use "row" configuration instead
   */
  rowSplitType?: TableFormRowSplitType;
  validateTriggerType?: ValidateTriggerType;
  maxHeight?: number | string;
  row?: TableFormRowConfiguration;
  /**
   * @deprecated use "row" configuration instead
   */
  renderRowDescription?: (props: RenderRowDescriptionProps) => React.ReactNode;
  /**
   * @deprecated use "row" configuration instead
   */
  rowValidator?: (rowIndex: number, rowData: DataType) => string | undefined;
  onHeaderChange?: (data: any[], columnKey: string) => void;
  onHeaderBlur?: (data: any[]) => void;
  onBodyChange?: (
    value: DataType[],
    rowIndex?: number,
    columnKey?: string,
  ) => void;
  onBodyBlur?: (value: DataType, rowIndex?: number, columnKey?: string) => void;
};

export type TableFormHandle = {
  setData: (data: DataType[]) => void;
  validateWholeFields: () => void;
};

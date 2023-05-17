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
  data: Record<string, any>[];
  latestData: Record<string, any>[];
  column: TableFormColumn;
  disabled?: boolean;
  errorInfo: ErrorInfo;
  onChange?: (newData: Record<string, any>[], key: string) => void;
  onBlur?: (key: string, error?: string) => void;
  // Used to control whether the body password input is show or hide
  onVisibleChange?: (visible: boolean) => void;
}

export interface ColumnBodyCellProps {
  data: Record<string, any>[];
  latestData: Record<string, any>[];
  defaultData: Record<string, any>[];
  errorInfo: ColumnHeaderCellProps["errorInfo"];
  index: number;
  column: TableFormColumn;
  disabled?: boolean;
  onChange?: (newData: Record<string, any>[], path: string) => void;
  onBlur?: (newData: Record<string, any>[], path: string) => void;
  onClear?: (newData: Record<string, any>[], path: string) => void;
  customData?: any;
  placeholderValue?: string;
  // Whether the password is show or hide
  visible?: boolean;
}

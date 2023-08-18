import "./styles/index.scss";

import { initParrotI18n } from "@cloudtower/parrot";

export type { DateRange, GraphType, IconProps, IDataPoint } from "./components";
export {
  antdKit,
  BaseIcon,
  Button,
  ButtonStyle,
  createBatchMessageMethods,
  FailedLoad,
  FullView,
  Icon,
  InputTagItem,
  KitStoreProvider,
  ModalStack,
  tableStyleCover,
  tickFormatter,
  Typo,
  useKitDispatch,
  useKitSelector,
  WizardBody,
} from "./components";
export * from "./components/TableForm/types";
export { useElementsSize } from "./hooks";
export type {
  AntdInputComponentType,
  AntdTreeSelectComponentType,
  BaseEnumProps,
  ButtonProps,
  DateTimeRangeProps,
  EnumProps,
  FloatProps,
  InputSize,
  IntegerFieldProps,
  IntFieldProps,
  IntProps,
  Kit,
  KitSelectProps,
  ModalProps,
  RequiredColumnProps,
  SorterOrder,
  StringProps,
  TableProps,
  TextAreaProps,
  TooltipProps,
  WizardSteps,
} from "./spec";
export * from "./spec/type";
export type {
  CloseCb,
  GetModalProps,
  IModalProps,
  KitRootState,
  ModalType,
} from "./store";
export {
  closeModal,
  ModalActions,
  popModal,
  pushModal,
  UIKitStore,
} from "./store";
export * from "./UIKitProvider";
export { default as UIKitProvider } from "./UIKitProvider";
export * from "@cloudtower/parrot";
export { Col, Row } from "antd";
export type { CheckboxChangeEvent as AntdCheckboxChangeEvent } from "antd/lib/checkbox";
export type { ColProps as AntdColProps } from "antd/lib/col";
export type { DatePickerProps as AntdDatePickerProps } from "antd/lib/date-picker";
export type { DrawerProps as AntdDrawerProps } from "antd/lib/drawer";
export type { DropDownProps as AntdDropDownProps } from "antd/lib/dropdown";
export type { TextAreaProps as AntdTextAreaProps } from "antd/lib/input";
export type { InputProps as AntdInputProps } from "antd/lib/input";
export type { InputNumberProps as AntdInputNumberProps } from "antd/lib/input-number";
export type { MenuProps as AntdMenuProps } from "antd/lib/menu";
export type { ModalProps as AntdModalProps } from "antd/lib/modal";
export type { ProgressProps as AntdProgressProps } from "antd/lib/progress";
export type { RadioChangeEvent } from "antd/lib/radio";
export type { RowProps as AntdRowProps } from "antd/lib/row";
export type { SelectProps as AntdSelectProps } from "antd/lib/select";
export type {
  ColumnsType as AntdColumnsType,
  ColumnType as AntdColumnType,
  TableRowSelection as AntdTableRowSelection,
} from "antd/lib/table/interface";
export type { TabsProps as AntdTabsProps } from "antd/lib/tabs";
export type { TooltipPropsWithTitle as AntdTooltipPropsWithTitle } from "antd/lib/tooltip";
export type {
  DataNode as AntdDataNode,
  TreeProps as AntdTreeProps,
} from "antd/lib/tree";
export type { TreeSelectProps as AntdTreeSelectProps } from "antd/lib/tree-select";
export type {
  RcFile as AntdRcFile,
  UploadProps as AntdUploadProps,
} from "antd/lib/upload";
export type { CustomTagProps as AntdCustomTagProps } from "rc-select/lib/interface/generator";

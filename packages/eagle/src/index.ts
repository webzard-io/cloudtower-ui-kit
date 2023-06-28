import "./styles/index.scss";

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
  ButtonProps,
  DateTimeRangeProps,
  EnumProps,
  FloatProps,
  InputSize,
  IntProps,
  Kit,
  KitSelectProps,
  ModalProps,
  RequiredColumnProps,
  SorterOrder,
  StringProps,
  TableProps,
  TooltipProps,
  AntdInputComponentType,
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
export type {
  MultipleSelectProps,
  SelectProps,
  SingleSelectProps,
} from "./utils";
export * from "@cloudtower/parrot";
export { Col, Row } from "antd";
export type { CheckboxChangeEvent } from "antd/lib/checkbox";
export type { ColProps } from "antd/lib/col";
export type { DatePickerProps } from "antd/lib/date-picker";
export type { DrawerProps } from "antd/lib/drawer";
export type { DropDownProps } from "antd/lib/dropdown";
export type { TextAreaProps } from "antd/lib/input";
export type { InputProps } from "antd/lib/input";
export type { InputNumberProps } from "antd/lib/input-number";
export type { MenuProps } from "antd/lib/menu";
export type { ModalProps as AntdModalProps } from "antd/lib/modal";
export type { ProgressProps } from "antd/lib/progress";
export type { RowProps } from "antd/lib/row";
export type { SelectProps as AntdSelectProps } from "antd/lib/select";
export type {
  ColumnsType,
  ColumnType,
  TableRowSelection,
} from "antd/lib/table/interface";
export type { TabsProps } from "antd/lib/tabs";
export type { DataNode, TreeProps } from "antd/lib/tree";
export type { RcFile, UploadProps } from "antd/lib/upload";
export type { TooltipPropsWithTitle } from "antd/lib/tooltip";
export type { RadioChangeEvent } from "antd/lib/radio";
export type { TreeSelectProps } from "antd/lib/tree-select";
export type { CustomTagProps } from "rc-select/lib/interface/generator";

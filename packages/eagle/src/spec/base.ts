import { FieldRenderProps } from "@smartx/react-final-form";
import { FieldArrayRenderProps } from "@smartx/react-final-form-arrays";
import { SerializableObject } from "@tower/utils";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AlertProps } from "antd/lib/alert";
import { AutoCompleteProps } from "antd/lib/auto-complete";
import { BadgeProps } from "antd/lib/badge";
import { ButtonProps as AntdButtonProps, ButtonType } from "antd/lib/button";
import { CheckboxProps } from "antd/lib/checkbox";
import { DatePickerProps } from "antd/lib/date-picker";
import { DividerProps as AntdDividerProps } from "antd/lib/divider";
import { DropDownProps } from "antd/lib/dropdown";
import { FormProps } from "antd/lib/form";
import { InputProps } from "antd/lib/input";
import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";
import { InputNumberProps } from "antd/lib/input-number";
import { SiderProps } from "antd/lib/layout";
import { BasicProps } from "antd/lib/layout/layout";
import { ListProps } from "antd/lib/list";
import { ListItemMetaProps, ListItemProps } from "antd/lib/list/Item";
import { MenuItemGroupProps, MenuProps } from "antd/lib/menu";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { SubMenuProps } from "antd/lib/menu/SubMenu";
import { MessageInstance } from "antd/lib/message";
import { ModalProps as AntdModalProps } from "antd/lib/modal";
import { PopoverProps } from "antd/lib/popover";
import { ProgressProps } from "antd/lib/progress";
import {
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps as AntdRadioProps,
} from "antd/lib/radio";
import { RadioButtonProps as AntdRadioButtonProps } from "antd/lib/radio/radioButton";
import { SelectProps as AntdSelectProps } from "antd/lib/select";
import { SkeletonProps as AntdSkeletonProps } from "antd/lib/skeleton";
import { StepProps, StepsProps } from "antd/lib/steps";
import { SwitchProps as AntdSwitchProps } from "antd/lib/switch";
import {
  ColumnsType,
  ColumnType,
  TableProps as AntdTableProps,
} from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { TagType } from "antd/lib/tag";
import { TimePickerProps } from "antd/lib/time-picker";
import { TooltipProps as AntdTooltipProps } from "antd/lib/tooltip";
import { TreeProps as AntdTreeProps } from "antd/lib/tree";
import React, { createContext, ReactNode } from "react";

import { ImagesType } from "..";
import emptyImpl from "./emptyImpl";
import { Architecture } from "./type";

type BadgeTypeProps = "warning" | "error" | "info";
type Primitive = "Int" | "Float" | "DateTime" | "Enum" | "String" | "Boolean";
type Child =
  | {
      type: Exclude<Primitive, "Enum">;
    }
  | {
      type: "Enum";
      enumValues: readonly string[];
    };
interface IdObject {
  id: string;
}

interface LooseFieldRenderProps<V, T extends HTMLElement> {
  input: {
    name?: FieldRenderProps<V, T>["input"]["name"];
    value?: FieldRenderProps<V, T>["input"]["value"];
    onBlur?: FieldRenderProps<V, T>["input"]["onBlur"];
    onChange?: (
      value: string | string[],
      option: { object: V } | Array<{ object: V }>
    ) => void;
    onFocus?: FieldRenderProps<V, T>["input"]["onFocus"];
    type?: FieldRenderProps<V, T>["input"]["type"];
    checked?: FieldRenderProps<V, T>["input"]["checked"];
    multiple?: FieldRenderProps<V, T>["input"]["multiple"];
  };
  meta?: FieldRenderProps<V, T>["meta"];
  focusIndicator?: boolean;
}

export interface ISimplePaginationProps {
  className?: string;
  current: number;
  count: number;
  size: number;
  onPageChange?: (page: number) => void;
}

export interface PaginationProps {
  current: number;
  count: number;
  size: number;
  onChange: (page: number) => void;
  onSizeChange?: (size: number) => void;
  simple?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  selectorVisible?: boolean;
  className?: string;
}
export type InputSize = "large" | "middle" | "small";
export type KitSelectProps = {
  defaultValue?: string;
  error?: unknown | React.ReactNode;
  danger?: boolean;
  multiple?: boolean;
  scrollBottomBuffer?: number;
  onScrollBottom?: () => void;
  selectLimit?: number;
} & AntdSelectProps<string>;

interface OptionProps {
  value: React.ReactText;
  disabled?: boolean;
  key?: string;
  hidden?: boolean;
  label?: string;
  className?: string;
  object?: SerializableObject;
  title?: string;
}

export interface RawValue {
  rawValue?: number | null;
  decimals?: number;
  noUnitOnZero?: boolean;
  abbreviate?: boolean;
}
export type UnitFn = React.FC<RawValue>;

export type SorterOrder = "descend" | "ascend" | undefined;

type Columns<T> = ColumnsType<T>[0];

export interface RequiredColumnProps<T>
  extends Omit<Columns<T>, "onHeaderCell" | "onCell" | "title"> {
  key: Exclude<Columns<T>["key"], undefined | number>;
  dataIndex: Exclude<ColumnType<T>["dataIndex"], undefined>;
  sortable?: boolean;
  width?: number;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onHeaderCell?: (column: ColumnType<T>) => any;
  onCell?: (column: T) => any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  /**
   * removed params for title function
   * because we need to cast the function in customize column
   * which cannot access the header params
   */
  title: React.ReactNode | (() => React.ReactNode);
  customizable?: boolean;
}
export type TableScroll = string | number | boolean;
export interface TableProps<T extends { id: string }> {
  bordered?: boolean;
  loading?: boolean;
  error?: React.ReactNode | string;
  dataSource: T[] | undefined;
  columns: RequiredColumnProps<T>[];
  onSorterChange?: (order: SorterOrder | null, key?: string | number) => void;
  onRowClick?: (
    record: T,
    index: number,
    evt: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  rowClassName?: (record: T, index: number) => string;
  scroll?: { x?: number | string | true; y?: number | string };
  onResize?: (column: RequiredColumnProps<T>[]) => void;
  resizable?: boolean;
  // TODO: improve type
  /* eslint-disable @typescript-eslint/no-explicit-any */
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
  RowMenu?: React.FC<{ record: T; index: number }>;
  rowSelection?: TableRowSelection<T>;
  empty?: string | React.ReactNode;
  tableLayout?: "fixed" | "auto";
  initLoading?: boolean;
  rowKey?: AntdTableProps<T>["rowKey"];
  wrapper?: React.MutableRefObject<HTMLDivElement | null>;
  pagination?: {
    current: number;
    pageSize: number;
  };
}
interface TableComponent {
  <TData extends IdObject>(
    props: React.PropsWithChildren<TableProps<TData>>,
    context?: unknown
  ): React.ReactElement | null;
}
export interface EnumProps {
  enumValues: readonly (string | { value: string; text: string })[];
  placeholder?: string;
  emptyLabel?: string;
  size?: InputSize;
  defaultValue?: string;
  multiple?: boolean;
}

export interface TextAreaProps extends AntdTextAreaProps {
  error?: boolean;
  size?: "large" | "middle" | "small";
  autoSize?: AntdTextAreaProps["autoSize"];
  onFocusChangeHeight?: {
    onFocus: number;
    onBlur: number;
  };
}
export interface StringProps {
  placeholder?: string;
  autoComplete?: "on" | "off" | "new-password";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  size?: InputSize;
  allowClear?: boolean;
  tags?: string[];
  tagsOverflow?: React.ReactNode;
  onTagsAllowClearClick?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  maxLength?: number;
  disabled?: boolean;
}
export interface IntProps {
  placeholder?: string;
  suffix?: string;
  size?: InputSize;
  onBlur?: (
    input: FieldBaseProps<number, HTMLInputElement>["input"],
    event?: React.FocusEvent<HTMLInputElement>
  ) => void;
}
export interface FloatProps {
  placeholder?: string;
  suffix?: string;
  size?: InputSize;
  onBlur?: (
    input: FieldBaseProps<number, HTMLInputElement>["input"],
    event?: React.FocusEvent<HTMLInputElement>
  ) => void;
}
export type TooltipProps = AntdTooltipProps & {
  followMouse?: boolean;
};
export type FieldBaseProps<V, T extends HTMLElement = HTMLElement> =
  FieldRenderProps<V, T> & {
    disabled?: boolean;
    className?: string;
  };
export type WizardSteps = {
  title: string;
  render: React.ReactNode;
  prevText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}[];
export type ModalProps = Omit<AntdModalProps, "okType"> & {
  confirmLoading?: boolean;
  fullscreen?: boolean;
  error?: string | React.ReactNode;
  normal?: boolean;
  children?: React.ReactNode;
  showCancel?: boolean;
  showOk?: boolean;
  wizard?:
    | {
        step: number;
        onStepChange?: (step: number) => void;
        steps: WizardSteps;
        right?: React.ReactNode;
        destroyOtherStep?: boolean;
        disablePrevStep?: boolean;
      }
    | boolean;
};

export type Modal2Props = AntdModalProps & {
  /** Set is fullscreen to display modal */
  fullscreen?: boolean;
  /** Set loading type for ok button */
  okLoading?: boolean;
  /** Set disabled type for ok button */
  okDisabled?: boolean;
  /** Set error in footer */
  footerError?: string | React.ReactNode | Error;
  children?: React.ReactNode;
  /** Display cancel button */
  showCancel?: boolean;
  /** Display ok button */
  showOk?: boolean;
  /** Set is a normal modal, width is 460px. If width is set it will fail */
  normal?: boolean;
  // FIXME: add props size
  size?: "normal" | "medium" | "fullscreen";
};

type SearchInputProps = Omit<InputProps, "onChange"> & {
  onChange: (value: string) => void;
  debounceWait?: number;
};

export type DateTimeRangeProps = DatePickerProps;

export type IntFieldProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = any,
  T extends HTMLElement = HTMLElement
> = FieldBaseProps<V, T> &
  IntProps & {
    onChange?: FieldBaseProps<V, T>["input"]["onChange"];
    autoComplete?: "on" | "off";
    maximum?: number;
    minimum?: number;
    supportNegativeValue?: boolean;
  };

export type ButtonGroupType = {
  className?: string;
  size?: SizeType;
  options: Array<
    Omit<ButtonProps, "shape" | "size" | "icon"> & {
      key: string;
      title?: string;
      hideTitle?: boolean;
      icon?: ImagesType | JSX.Element;
    }
  >;
};

export type IntegerFieldProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = any,
  T extends HTMLElement = HTMLElement
> = FieldBaseProps<V, T> &
  InputNumberProps & {
    onChange?: FieldBaseProps<V, T>["input"]["onChange"];
    controls?: boolean;
    suffix?: string;
    prefix?: string;
    size?: InputSize;
    onBlur?: (
      input: FieldBaseProps<number, HTMLInputElement>["input"],
      event?: React.FocusEvent<HTMLInputElement>
    ) => void;
  };

export type ButtonProps = {
  prefixIcon?: ImagesType | JSX.Element;
  hoverPrefixIcon?: ImagesType | JSX.Element;
  suffixIcon?: ImagesType | JSX.Element;
  hoverSuffixIcon?: ImagesType | JSX.Element;
  type?:
    | ButtonType
    | "secondary"
    | "tertiary"
    | "ordinary"
    | "ordinary-onTint"
    | "quiet";
} & Omit<AntdButtonProps, "type">;

export type SwitchProps = Omit<AntdSwitchProps, "size"> & {
  size?: "small" | "default" | "large";
};

export type RadioProps = AntdRadioProps & {
  description?: React.ReactNode;
  compact?: boolean;
};

export type RadioButtonProps = AntdRadioButtonProps & {
  type?: "input" | "input-number";
  min?: number;
  max?: number;
  precision?: number;
  placeholder?: string;
  initialValue?: string | number;
  onInputChange?: (val: number | string | undefined) => void;
};

export type IStepsPorps = StepsProps & {
  stepsConfig?: Array<StepProps>;
  containerClassname?: string;
  showStepCount?: boolean;
};

type ErrorType = string | React.ReactNode | Error;

export type InitializedModalType = Modal2Props & {
  initLoading: boolean;
  initError: ErrorType;
  analyzeFallbackError: (fallback: unknown) => {
    msg: string;
    originalMsg: string;
  } | null;
};

export type WizardModalType = Modal2Props & {
  step: number;
  onStepChange?: (step: number) => void;
  steps: {
    title: string;
    render: React.ReactNode;
    prevText?: string | React.ReactNode;
    okText?: string | React.ReactNode;
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
  }[];
  right?: React.ReactNode;
  destroyOtherStep?: boolean;
  disablePrevStep?: boolean;
  stepsPosition?: "top" | "side";
  analyzeFallbackError: (fallback: unknown) => {
    msg: string;
    originalMsg: string;
  } | null;
};

export interface Modal2Type extends React.FC<Modal2Props> {
  Initialized: React.FC<InitializedModalType>;
  Wizard: React.FC<WizardModalType>;
}

export interface Kit<V = any, T extends HTMLElement = HTMLElement> {
  // constants
  PAGINATION_SELECTOR: string;
  TABLE_WRAPPER_SELECTOR: string;
  THEAD_SELECTOR: string;
  TBODY_SELECTOR: string;
  MODAL_WHITELIST: string[];
  // general UI
  loading: React.FunctionComponent<{ fullView?: boolean }>;
  error: React.FunctionComponent<{ error: unknown }>;
  pagination: React.FC<PaginationProps>;
  select: React.FunctionComponent<LooseFieldRenderProps<V, T> & KitSelectProps>;
  option: React.FunctionComponent<OptionProps>;
  table: TableComponent;
  button: React.FC<ButtonProps>;
  modal: React.FC<ModalProps>;
  modal2: React.FC<Modal2Props> & Modal2Type;
  dropdown: React.FC<DropDownProps>;
  switch: React.FC<SwitchProps>;
  tooltip: React.FC<TooltipProps>;
  input: React.FC<InputProps & { error?: boolean }>;
  textArea: React.FC<TextAreaProps>;
  checkbox: React.FC<
    CheckboxProps & { description?: ReactNode; compact?: boolean }
  >;
  // input fields
  fields: {
    // scalars
    Int: React.FunctionComponent<IntFieldProps<V, T>>;
    Integer: React.FunctionComponent<IntegerFieldProps<V, T>>;
    Float: React.FunctionComponent<
      FieldBaseProps<V, T> &
        FloatProps & {
          onChange?: FieldBaseProps<V, T>["input"]["onChange"];
          autoComplete?: "on" | "off";
        }
    >;
    DateTime: React.FunctionComponent<FieldBaseProps<V, T>>;
    Enum: React.FunctionComponent<
      {
        input: Partial<FieldRenderProps<V, T>["input"]>;
        meta: FieldRenderProps<V, T>["meta"];
        disabled?: boolean;
        className?: string;
        dropdownClassName?: string;
      } & EnumProps
    >;
    String: React.FunctionComponent<FieldBaseProps<V, T> & StringProps>;
    Boolean: React.FunctionComponent<FieldBaseProps<V, T>>;
    TextArea: React.FC<FieldBaseProps<V, T> & TextAreaProps>;
    // list
    Array: React.FunctionComponent<
      FieldArrayRenderProps<V, T> & { child: Child }
    >;
    // compose
    DateTimeRange: React.FunctionComponent<
      FieldBaseProps<V, T> & DatePickerProps
    >;
    TimePicker: React.FunctionComponent<FieldBaseProps<V, T> & TimePickerProps>;
  };
  // specific unit data UI
  units: {
    Byte: UnitFn;
    Frequency: UnitFn;
    Percent: UnitFn;
    Speed: UnitFn;
    Second: UnitFn;
    Bps: UnitFn;
    BitPerSecond: UnitFn;
    Bit: UnitFn;
  };
  inputGroup: React.FunctionComponent<{ compact: boolean }>;
  Empty: React.ReactElement | null;
  alert: React.FunctionComponent<
    Omit<AlertProps, "type"> & { type?: AlertProps["type"] | "normal" }
  >;
  searchInput: React.FC<SearchInputProps>;
  exportButton: React.FC<{ href?: string }>;
  badge: React.FC<BadgeProps & { type?: BadgeTypeProps }>;
  radio: React.FC<RadioProps>;
  radioGroup: React.FC<AntdRadioGroupProps>;
  radioButton: React.FC<RadioButtonProps>;
  tree: React.FC<AntdTreeProps>;
  progress: React.FC<ProgressProps>;
  divider: React.FC<AntdDividerProps>;
  skeleton: React.FC<AntdSkeletonProps>;
  menu: React.ComponentType<MenuProps> & {
    Divider: React.FC<import("rc-menu/lib/Divider").DividerProps>;
    Item: React.ComponentType<MenuItemProps>;
    SubMenu: React.ComponentType<SubMenuProps>;
    ItemGroup: React.ComponentType<MenuItemGroupProps>;
  };
  menuItem: React.ComponentType<MenuItemProps>;
  menuItemGroup: React.ComponentType<MenuItemGroupProps>;
  list: <T>(props: ListProps<T>) => JSX.Element;
  listItem: React.FC<ListItemProps>;
  listItemMeta: React.FC<ListItemMetaProps>;
  layout: React.ComponentType<BasicProps> & {
    Header: React.ComponentType<BasicProps>;
    Footer: React.ComponentType<BasicProps>;
    Content: React.ComponentType<BasicProps>;
    Sider: React.ComponentType<SiderProps>;
  };
  autoComplete: React.ForwardRefExoticComponent<AutoCompleteProps>;
  message: MessageInstance;
  tag: TagType;
  popover: React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<unknown>
  >;
  arch: React.FC<{ architecture?: Architecture }>;
  buttonGroup: React.ForwardRefExoticComponent<
    ButtonGroupType & React.RefAttributes<HTMLDivElement>
  >;
  steps: React.FC<IStepsPorps>;
  form: React.FC<FormProps>;
  simplePagination: React.FC<ISimplePaginationProps>;
}

export const kitContext = createContext<Kit>(emptyImpl);

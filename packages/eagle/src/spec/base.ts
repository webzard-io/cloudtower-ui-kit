import { StyledMeta } from "@linaria/react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AlertProps } from "antd/lib/alert";
import { AutoCompleteProps } from "antd/lib/auto-complete";
import { BadgeProps } from "antd/lib/badge";
import { ButtonProps as AntdButtonProps, ButtonType } from "antd/lib/button";
import { CalendarProps } from "antd/lib/calendar/generateCalendar";
import { CascaderProps } from "antd/lib/cascader";
import { CheckboxGroupProps, CheckboxProps } from "antd/lib/checkbox";
import { ColProps } from "antd/lib/col";
import { CollapsePanelProps, CollapseProps } from "antd/lib/collapse";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import { DividerProps as AntdDividerProps } from "antd/lib/divider";
import { DrawerProps } from "antd/lib/drawer";
import { DropDownProps } from "antd/lib/dropdown";
import { EmptyProps } from "antd/lib/empty";
import type Form from "antd/lib/form";
import type Input from "antd/lib/input";
import { GroupProps, InputProps } from "antd/lib/input";
import { TextAreaProps as AntdTextAreaProps } from "antd/lib/input/TextArea";
import { InputNumberProps } from "antd/lib/input-number";
import { SiderProps } from "antd/lib/layout";
import { BasicProps } from "antd/lib/layout/layout";
import { ListProps } from "antd/lib/list";
import { ListItemProps } from "antd/lib/list/Item";
import { MenuItemGroupProps, MenuProps } from "antd/lib/menu";
import { MenuItemProps } from "antd/lib/menu/MenuItem";
import { SubMenuProps } from "antd/lib/menu/SubMenu";
import { ModalProps as AntdModalProps } from "antd/lib/modal";
import { PopoverProps } from "antd/lib/popover";
import { ProgressProps } from "antd/lib/progress";
import {
  RadioGroupProps as AntdRadioGroupProps,
  RadioProps as AntdRadioProps,
} from "antd/lib/radio";
import { RadioButtonProps as AntdRadioButtonProps } from "antd/lib/radio/radioButton";
import { RowProps } from "antd/lib/row";
import { SelectProps as AntdSelectProps, SelectProps } from "antd/lib/select";
import { SkeletonProps as AntdSkeletonProps } from "antd/lib/skeleton";
import { SkeletonButtonProps } from "antd/lib/skeleton/Button";
import Steps, { StepProps, StepsProps } from "antd/lib/steps";
import { SwitchProps as AntdSwitchProps } from "antd/lib/switch";
import {
  ColumnsType,
  ColumnType,
  TableProps as AntdTableProps,
} from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { TabPaneProps, TabsProps } from "antd/lib/tabs";
import { TagType } from "antd/lib/tag";
import { TagProps } from "antd/lib/tag";
import { TimePickerProps } from "antd/lib/time-picker";
import { TimeLineItemProps, TimelineProps } from "antd/lib/timeline";
import { TooltipProps as AntdTooltipProps } from "antd/lib/tooltip";
import { TreeProps as AntdTreeProps } from "antd/lib/tree";
import type TreeSelect from "antd/lib/tree-select";
import { TextProps } from "antd/lib/typography/Text";
import { DraggerProps, UploadProps } from "antd/lib/upload";
import type { Moment } from "moment";
import React, {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from "react";

import { ICardProps } from "../components/Card";
import { IEmptyProps } from "../components/Empty";
import { MessageApi } from "../components/message";
import { TableFormHandle, TableFormProps } from "../components/TableForm/types";
import { SerializableObject } from "../utils/tower";
import { FieldRenderProps } from "./react-final-form";
import { Architecture, ISpaceProps, ITimeZoneSelectProps } from "./type";

export type AntdTableComponentType = <RecordType extends object = any>(
  props: AntdTableProps<RecordType>,
) => JSX.Element;

export type AntdTreeSelectComponentType<T> = TreeSelect<T>;

interface EmptyType extends React.FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}

export interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: React.FC<CollapsePanelProps>;
}

type BadgeTypeProps = "warning" | "error" | "info";
type Primitive = "Int" | "Float" | "DateTime" | "Enum" | "String" | "Boolean";
export type Child =
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
      option: { object: V } | Array<{ object: V }>,
    ) => void;
    onFocus?: FieldRenderProps<V, T>["input"]["onFocus"];
    type?: FieldRenderProps<V, T>["input"]["type"];
    checked?: FieldRenderProps<V, T>["input"]["checked"];
    multiple?: FieldRenderProps<V, T>["input"]["multiple"];
  };
  meta?: FieldRenderProps<V, T>["meta"];
  focusIndicator?: boolean;
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
  valueClassName?: string;
  unitClassName?: string;
}
export type UnitFn = React.FC<
  RawValue & {
    emptyProps?: IEmptyProps;
  }
>;

export type PercentFn = React.FC<
  RawValue & {
    saturated?: boolean;
    emptyProps?: IEmptyProps;
  }
>;

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
  //TODO: abandon props
  // Use onRow instead of onRowClick
  onRowClick?: (
    record: T,
    index: number,
    evt: React.MouseEvent<HTMLElement, MouseEvent>,
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
  onRow?: AntdTableProps<T>["onRow"];
}
interface TableComponent {
  <TData extends IdObject>(
    props: React.PropsWithChildren<TableProps<TData>>,
    context?: unknown,
  ): React.ReactElement | null;
}
export interface BaseEnumProps {
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
    event?: React.FocusEvent<HTMLInputElement>,
  ) => void;
}
export interface FloatProps {
  placeholder?: string;
  suffix?: string;
  size?: InputSize;
  onBlur?: (
    input: FieldBaseProps<number, HTMLInputElement>["input"],
    event?: React.FocusEvent<HTMLInputElement>,
  ) => void;
}
export type TooltipProps = AntdTooltipProps & {
  followMouse?: boolean;
};
export type FieldBaseProps<
  V = any,
  T extends HTMLElement = HTMLElement,
> = FieldRenderProps<V, T> & {
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

type SearchInputProps = Omit<InputProps, "onChange"> & {
  onChange: (value: string) => void;
  debounceWait?: number;
};

export type DateTimeRangeProps = DatePickerProps;

export type IntFieldProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = any,
  T extends HTMLElement = HTMLElement,
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
      icon?: JSX.Element;
    }
  >;
};

export type IntegerFieldProps<
  V = any,
  T extends HTMLElement = HTMLElement,
> = FieldBaseProps<V, T> &
  InputNumberProps & {
    onChange?: FieldBaseProps<V, T>["input"]["onChange"];
    controls?: boolean;
    suffix?: string;
    prefix?: string;
    size?: InputSize;
    onBlur?: (
      input: FieldBaseProps<number, HTMLInputElement>["input"],
      event?: React.FocusEvent<HTMLInputElement>,
    ) => void;
  };

export type FloatFieldProps<
  V = any,
  T extends HTMLElement = HTMLElement,
> = FieldBaseProps<V, T> &
  FloatProps & {
    onChange?: FieldBaseProps<V, T>["input"]["onChange"];
    autoComplete?: "on" | "off";
  };

export type ButtonProps = {
  prefixIcon?: JSX.Element;
  hoverPrefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  hoverSuffixIcon?: JSX.Element;
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

export type IStepsProps = StepsProps & {
  stepsConfig?: Array<StepProps>;
  containerClassname?: string;
  showStepCount?: boolean;
};

export interface ISimplePaginationProps {
  className?: string;
  current: number;
  count: number;
  size: number;
  onPageChange?: (page: number) => void;
}

export type AntdInputComponentType = Input;

export interface Kit<V = any, T extends HTMLElement = HTMLElement> {
  // general UI
  loading: LoadingComponentType;
  error: React.FunctionComponent<{ error: unknown }>;
  pagination: React.FC<PaginationProps>;
  select: SelectComponentType<V, T>;
  option: OptionComponentType;
  selectOptGroup: import("rc-select/lib/OptGroup").OptionGroupFC;
  table: TableComponent;
  button: React.FC<ButtonProps>;
  modal: React.FC<ModalProps>;
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
    Float: React.FunctionComponent<FloatFieldProps<V, T>>;
    DateTime: React.FunctionComponent<FieldBaseProps<V, T>>;
    Enum: React.FunctionComponent<
      {
        input: Partial<FieldRenderProps<V, T>["input"]>;
        meta: FieldRenderProps<V, T>["meta"];
        disabled?: boolean;
        className?: string;
        dropdownClassName?: string;
      } & BaseEnumProps
    >;
    String: React.FunctionComponent<FieldBaseProps<V, T> & StringProps>;
    Boolean: React.FunctionComponent<FieldBaseProps<V, T>>;
    TextArea: React.FC<FieldBaseProps<V, T> & TextAreaProps>;
    // compose
    DateTimeRange: React.FunctionComponent<
      FieldBaseProps<V, T> & DatePickerProps
    >;
    TimePicker: React.FunctionComponent<FieldBaseProps<V, T> & TimePickerProps>;
  };
  // specific unit data UI
  units: {
    Percent: PercentFn;
    Byte: UnitFn;
    Frequency: UnitFn;
    Speed: UnitFn;
    Second: UnitFn;
    Bps: UnitFn;
    BitPerSecond: UnitFn;
    Bit: UnitFn;
  };
  inputGroup: InputGroupComponentType;
  Empty: React.ReactElement | null;
  alert: AlertComponentType;
  searchInput: React.FC<SearchInputProps>;
  badge: BadgeComponentType;
  radio: React.FC<RadioProps>;
  radioGroup: React.FC<AntdRadioGroupProps>;
  radioButton: React.FC<RadioButtonProps>;
  tree: React.FC<AntdTreeProps>;
  progress: ProgressComponentType;
  divider: React.FC<AntdDividerProps>;
  skeleton: React.FC<AntdSkeletonProps>;
  skeletonButton: {
    (props: SkeletonButtonProps): JSX.Element;
    defaultProps: {
      size: string;
    };
  };
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
  layout: React.ComponentType<BasicProps> & {
    Header: React.ComponentType<BasicProps>;
    Footer: React.ComponentType<BasicProps>;
    Content: React.ComponentType<BasicProps>;
    Sider: React.ComponentType<SiderProps>;
  };
  autoComplete: React.ForwardRefExoticComponent<AutoCompleteProps>;
  message: MessageApi;
  tag: TagType;
  popover: React.ForwardRefExoticComponent<
    PopoverProps & React.RefAttributes<unknown>
  >;
  arch: ArchComponentType;
  buttonGroup: React.ForwardRefExoticComponent<
    ButtonGroupType & React.RefAttributes<HTMLDivElement>
  >;
  steps: React.FC<IStepsProps>;
  form: Form;
  antdSteps: typeof Steps;
  simplePagination: React.FC<ISimplePaginationProps>;
  space: React.FC<ISpaceProps>;
  timeZoneSelect: React.FC<ITimeZoneSelectProps>;
  col: React.FC<ColProps>;
  row: React.FC<RowProps>;
  timeline: React.FC<TimelineProps>;
  timelineItem: React.FC<TimeLineItemProps>;
  cascader: React.ComponentType<CascaderProps>;
  checkboxGroup: React.ComponentType<CheckboxGroupProps>;
  typographyText: React.FC<TextProps>;
  upload: React.ComponentType<UploadProps>;
  datePickerRangePicker: React.ComponentType<RangePickerProps>;
  tableForm: React.ForwardRefExoticComponent<
    TableFormProps & React.RefAttributes<TableFormHandle>
  >;
  token: TokenComponentType;
  uploadDragger: React.ComponentType<DraggerProps>;
  calendar: React.FC<CalendarProps<Moment>>;
  timePicker: React.FC<TimePickerProps>;
  datePicker: React.ComponentType<DatePickerProps>;
  tabs: React.FC<TabsProps>;
  tabsTabPane: React.FC<TabPaneProps>;
  antdBadge: React.FC<BadgeProps>;
  antdMessage: MessageApi;
  antdButton: React.ComponentType<AntdButtonProps>;
  antdSelect: React.ComponentType<SelectProps<V>>;
  antdTooltip: React.FC<TooltipProps>;
  antdModal: React.FC<
    AntdModalProps & {
      focusTriggerAfterClose?: boolean;
    }
  >;
  antdInput: typeof Input;
  antdTable: AntdTableComponentType;
  antdEmpty: EmptyType;
  antdCheckbox: React.ComponentType<CheckboxProps>;
  antdSwitch: React.FC<AntdSwitchProps>;
  antdCollapse: CollapseInterface;
  antdTreeSelect: typeof TreeSelect;
  antdDrawer: React.FC<DrawerProps>;
  card: ForwardRefExoticComponent<
    PropsWithoutRef<ICardProps> & RefAttributes<HTMLDivElement>
  >;
}

export type ArchComponentType = React.FC<{ architecture?: Architecture }>;

export type SelectComponentType<
  V = any,
  T extends HTMLElement = HTMLElement,
> = React.FunctionComponent<LooseFieldRenderProps<V, T> & KitSelectProps>;

export type OptionComponentType = React.FC<OptionProps> & {
  isSelectOption: boolean;
};

export type BadgeComponentType = React.FC<
  BadgeProps & { type?: BadgeTypeProps }
>;

export type ProgressComponentType = React.FC<ProgressProps>;

export type InputGroupComponentType = StyledMeta & React.FC<GroupProps>;

export type AlertComponentType = React.FunctionComponent<
  Omit<AlertProps, "type"> & { type?: AlertProps["type"] | "normal" }
>;

export type SearchInputComponentType = React.FC<SearchInputProps>;

export type LoadingComponentType = React.FunctionComponent<{
  fullView?: boolean;
}>;

export type EnumProps<V = any, T extends HTMLElement = HTMLElement> = {
  input: Partial<FieldRenderProps<V, T>["input"]>;
  meta: FieldRenderProps<V, T>["meta"];
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
} & BaseEnumProps;

export type TableFormPropsType = React.ForwardRefExoticComponent<
  TableFormProps & React.RefAttributes<TableFormHandle>
>;

export type TokenComponentType = React.FC<
  Omit<TagProps, "icon" | "closeIcon"> & {
    color?: "red" | "yellow" | "green" | "blue" | "gray" | string;
    size?: "small" | "medium" | "large";
    checked?: boolean;
  }
>;

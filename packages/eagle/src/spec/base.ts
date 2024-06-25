import type {
  AlertComponentType,
  ArchComponentType,
  BadgeComponentType,
  BaseEnumProps,
  ButtonGroupType,
  ButtonProps,
  CalendarComponentType,
  CardProps,
  CloseButtonProps,
  FieldBaseProps,
  FieldRenderProps,
  IAccordionCardProps,
  IBreadcrumbProps,
  ICircleProgressProps,
  IDetailCardProps,
  IDonutChartProps,
  IDropdownMenuProps,
  InputGroupComponentType,
  InputSize,
  IntFieldProps,
  ISegmentedControlProps,
  ISimplePaginationProps,
  ISpaceProps,
  IStepsProps,
  ITimeProps,
  ITimeZoneSelectProps,
  LinkComponentType,
  LoadingComponentType,
  MessageApi,
  ModalProps,
  PaginationProps,
  PercentFn,
  RadioButtonProps,
  RadioProps,
  SearchInputProps,
  SelectComponentType,
  StatusCapsuleComponentType,
  StringProps,
  SwitchProps,
  TableComponent,
  TableFormHandle,
  TableFormProps,
  TagComponentType,
  TextAreaProps,
  TokenComponentType,
  TooltipProps,
  TruncatePropTypes,
  UnitFn,
} from "@src/core";
import type {
  CronCalendarProps,
  CronPlanProps,
  DateRangePickerProps,
  DeprecatedIDonutChartProps,
  DropdownTransitionProps,
  GoBackButtonType,
  I18nNameTagType,
  IBatchOperation,
  IChartWithUnitProps,
  ICountingProps,
  ICWTProps,
  IUnitWithChartProps,
  NamesTooltipType,
  OverflowTooltipProps,
  SidebarSubtitleComponentType,
  SortableListComponentType,
  SummaryTableComponentType,
  SwitchWithTextProps,
} from "@src/coreX";
import { AutoCompleteProps } from "antd/lib/auto-complete";
import { BadgeProps } from "antd/lib/badge";
import { ButtonProps as AntdButtonProps } from "antd/lib/button";
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
import { InputProps } from "antd/lib/input";
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
import { ProgressProps as AntdProgressProps } from "antd/lib/progress";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio";
import { RowProps } from "antd/lib/row";
import { SelectProps } from "antd/lib/select";
import { SkeletonProps as AntdSkeletonProps } from "antd/lib/skeleton";
import { SkeletonButtonProps } from "antd/lib/skeleton/Button";
import Steps from "antd/lib/steps";
import { SwitchProps as AntdSwitchProps } from "antd/lib/switch";
import { TableProps as AntdTableProps } from "antd/lib/table";
import { TabPaneProps, TabsProps } from "antd/lib/tabs";
import { TimePickerProps } from "antd/lib/time-picker";
import { TimeLineItemProps, TimelineProps } from "antd/lib/timeline";
import { TreeProps as AntdTreeProps } from "antd/lib/tree";
import type TreeSelect from "antd/lib/tree-select";
import { TextProps } from "antd/lib/typography/Text";
import { DraggerProps, UploadProps } from "antd/lib/upload";
import React, {
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from "react";

import { SerializableObject } from "@tower/utils";

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

type Primitive = "Int" | "Float" | "DateTime" | "Enum" | "String" | "Boolean";

export type Child =
  | {
      type: Exclude<Primitive, "Enum">;
    }
  | {
      type: "Enum";
      enumValues: readonly string[];
    };

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

export type TableScroll = string | number | boolean;

export interface FloatProps {
  placeholder?: string;
  suffix?: string;
  size?: InputSize;
  onBlur?: (
    input: FieldBaseProps<number, HTMLInputElement>["input"],
    event?: React.FocusEvent<HTMLInputElement>,
  ) => void;
}

export type DateTimeRangeProps = DatePickerProps;

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

export type AntdInputComponentType = Input;

export interface IExpandableItemProps {
  header?: React.ReactNode;
  order?: number;
  disableExpand?: boolean;
  defaultActive?: boolean;
}

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
  DeprecatedProgress: React.FC<AntdProgressProps>;
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
  tag: TagComponentType;
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
  statusCapsule: StatusCapsuleComponentType;
  space: React.FC<ISpaceProps>;
  timeZoneSelect: React.FC<ITimeZoneSelectProps>;
  col: React.FC<ColProps>;
  row: React.FC<RowProps>;
  timeline: React.FC<TimelineProps>;
  timelineItem: React.FC<TimeLineItemProps>;
  checkboxGroup: React.ComponentType<CheckboxGroupProps>;
  typographyText: React.FC<TextProps>;
  upload: React.ComponentType<UploadProps>;
  datePickerRangePicker: React.ComponentType<RangePickerProps>;
  tableForm: React.ForwardRefExoticComponent<
    TableFormProps & React.RefAttributes<TableFormHandle>
  >;
  token: TokenComponentType;
  overflowTooltip: React.FC<OverflowTooltipProps>;
  I18nNameTag: React.FC<I18nNameTagType>;
  uploadDragger: React.ComponentType<DraggerProps>;
  calendar: CalendarComponentType;
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
  truncate: React.FC<TruncatePropTypes>;
  card: ForwardRefExoticComponent<
    PropsWithoutRef<PropsWithChildren<CardProps>> &
      RefAttributes<HTMLDivElement>
  >;
  expandableList: {
    ExpandableContainer: React.FC<PropsWithChildren<{}>>;
    ExpandableItem: React.FC<PropsWithChildren<IExpandableItemProps>>;
  };
  time: React.FC<ITimeProps>;
  DropdownTransition: React.FC<DropdownTransitionProps>;
  AccordionCard: React.FC<IAccordionCardProps> & {
    CloseButton: React.FC<CloseButtonProps>;
  };
  DetailCard: React.FC<IDetailCardProps>;
  Counting: React.FC<ICountingProps>;
  Breadcrumb: React.FC<IBreadcrumbProps>;
  CircleProgress: React.FC<ICircleProgressProps>;
  SwitchWithText: React.FC<SwitchWithTextProps>;
  CronPlan: React.FC<CronPlanProps>;
  NamesTooltip: React.FC<NamesTooltipType>;
  ChartWithTooltip: React.FC<ICWTProps>;
  ChartWithUnit: React.FC<IChartWithUnitProps>;
  DonutChart: React.FC<IDonutChartProps>;
  DeprecatedDonutChart: React.FC<DeprecatedIDonutChartProps>;
  UnitWithChart: React.FC<IUnitWithChartProps>;
  GoBackButton: React.FC<GoBackButtonType>;
  CronCalendar: React.FC<CronCalendarProps>;
  SummaryTable: SummaryTableComponentType;
  SortableList: SortableListComponentType;
  SidebarSubtitle: SidebarSubtitleComponentType;
  Link: LinkComponentType;
  DropdownMenu: React.FC<IDropdownMenuProps>;
  BatchOperation: React.FC<IBatchOperation>;
  DateRangePicker: React.FC<DateRangePickerProps>;
  SegmentedControl: React.FC<ISegmentedControlProps>;
}

export type OptionComponentType = React.FC<OptionProps> & {
  isSelectOption: boolean;
};

export type TableFormPropsType = React.ForwardRefExoticComponent<
  TableFormProps & React.RefAttributes<TableFormHandle>
>;

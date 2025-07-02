import {
  DatePicker as AntdDatePicker,
  List,
  Menu,
  Modal,
  Select,
  Skeleton,
  Tabs,
  Timeline as AntdTimeline,
  Typography,
  Upload,
} from "antd";
import { MenuItemGroupProps } from "antd/lib/menu";
import { ModalProps as AntdModalProps } from "antd/lib/modal";
import { FC } from "react";

export {
  Badge as AntdBadge,
  Button as AntdButton,
  Checkbox as AntdCheckbox,
  Collapse as AntdCollapse,
  DatePicker as AntdDatePicker,
  Divider as AntdDivider,
  Drawer as AntdDrawer,
  Empty as AntdEmpty,
  Input as AntdInput,
  message as AntdMessage,
  Select as AntdSelect,
  Skeleton as AntdSkeleton,
  Steps as AntdSteps,
  Switch as AntdSwitch,
  Table as AntdTable,
  Timeline as AntdTimeline,
  TimePicker as AntdTimePicker,
  Tooltip as AntdTooltip,
  TreeSelect as AntdTreeSelect,
  AutoComplete,
  Col,
  Dropdown,
  Layout,
  List,
  Menu,
  Popover,
  Row,
  Tabs,
  Tree,
  Typography,
  Upload,
} from "antd";

export const DatePickerRangePicker = AntdDatePicker.RangePicker;
export const ListItem = List.Item;
export const MenuItemGroup =
  Menu.ItemGroup as React.ComponentType<MenuItemGroupProps>;
export const SkeletonButton = Skeleton.Button;
export const TabsTabPane = Tabs.TabPane;
export const AntdTimelineItem = AntdTimeline.Item;
export const TypographyText = Typography.Text;
export const UploadDragger = Upload.Dragger;
export const AntdOption = Select.Option;
export const AntdSelectOptGroup = Select.OptGroup;
export const AntdModal = Modal as FC<
  AntdModalProps & {
    focusTriggerAfterClose?: boolean;
  }
>;

// reexport type
export type { ButtonProps as AntdButtonProps } from "antd/lib/button";
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
export type { TableProps as AntdTableProps } from "antd/lib/table";
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

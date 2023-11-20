import {
  AutoComplete,
  Badge as AntdBadge,
  Button as AntdButton,
  Calendar,
  Cascader,
  Checkbox as AntdCheckbox,
  Col,
  Collapse as AntdCollapse,
  DatePicker,
  Divider,
  Drawer as AntdDrawer,
  Dropdown,
  Empty as AntdEmpty,
  Input as AntdInput,
  Layout,
  List,
  Menu,
  message as AntdMessage,
  Modal as AntdModal,
  Popover,
  Row,
  Select as AntdSelect,
  Skeleton,
  Steps as AntdSteps,
  Switch as AntdSwitch,
  Table as AntdTable,
  Tabs,
  Timeline,
  TimePicker,
  Tooltip as AntdTooltip,
  Tree,
  TreeSelect as AntdTreeSelect,
  Typography,
  Upload,
} from "antd";
import React from "react";

import { Kit, OptionComponentType } from "../spec";
import Alert from "./Alert";
import Arch from "./Arch";
import Badge from "./Badge";
import Bit from "./Bit";
import BitPerSecond from "./BitPerSecond";
import Bps from "./Bps";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import Byte from "./Byte";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Empty from "./Empty";
import ExpandableContainer from "./ExpandableList/ExpandableContainer";
import ExpandableItem from "./ExpandableList/ExpandableItem";
import fields from "./Fields";
import Form from "./Form";
import Frequency from "./Frequency";
import Input from "./Input";
import InputGroup from "./InputGroup";
import Loading from "./Loading";
import message from "./message";
import Modal from "./Modal";
import Pagination from "./Pagination";
import Percent from "./Percent";
import Progress from "./Progress";
import Radio, { RadioButton, RadioGroup } from "./Radio";
import SearchInput from "./SearchInput";
import Second from "./Second";
import Select from "./Select";
import SimplePagination from "./SimplePagination";
import Space from "./Space";
import Speed from "./Speed";
import StatusCapsule from "./StatusCapsule";
import Steps from "./Steps";
import Switch from "./Switch";
import Table from "./Table";
import TableForm from "./TableForm";
import Tag from "./Tag";
import TextArea from "./TextArea";
import Time from "./Time";
import TimeZoneSelect from "./TimeZoneSelect";
import Token from "./Token";
import Tooltip from "./Tooltip";
import Truncate from "./Truncate";
import OverflowTooltip from "./OverflowTooltip";
import DropdownMenu from "../core/DropdownMenu";

export function getAntdKit(): Kit {
  const kit: Kit = {
    loading: Loading,
    error: ({ error }) => <div className="error">{String(error)}</div>,
    pagination: Pagination,
    select: Select,
    option: AntdSelect.Option as OptionComponentType,
    selectOptGroup: AntdSelect.OptGroup,
    table: Table,
    row: Row,
    col: Col,
    button: Button,
    modal: Modal,
    dropdown: Dropdown,
    switch: Switch,
    tooltip: Tooltip,
    input: Input,
    textArea: TextArea,
    checkbox: Checkbox,
    fields,
    units: {
      Percent,
      Byte,
      Frequency,
      Speed,
      Bps,
      BitPerSecond,
      Bit,
      Second,
    },
    inputGroup: InputGroup,
    Empty: <Empty />,
    alert: Alert,
    searchInput: SearchInput,
    badge: Badge,
    radio: Radio,
    radioGroup: RadioGroup,
    radioButton: RadioButton,
    tree: Tree,
    progress: Progress,
    divider: Divider,
    skeleton: Skeleton,
    skeletonButton: Skeleton.Button,
    list: List,
    listItem: List.Item,
    menu: Menu,
    menuItem: Menu.Item,
    menuItemGroup: Menu.ItemGroup,
    layout: Layout,
    autoComplete: AutoComplete,
    message: message,
    tag: Tag,
    popover: Popover,
    arch: Arch,
    buttonGroup: ButtonGroup,
    steps: Steps,
    form: Form,
    simplePagination: SimplePagination,
    space: Space,
    timeZoneSelect: TimeZoneSelect,
    timeline: Timeline,
    timelineItem: Timeline.Item,
    checkboxGroup: AntdCheckbox.Group,
    typographyText: Typography.Text,
    cascader: Cascader,
    upload: Upload,
    datePickerRangePicker: DatePicker.RangePicker,
    tableForm: TableForm,
    token: Token,
    statusCapsule: StatusCapsule,
    uploadDragger: Upload.Dragger,
    calendar: Calendar,
    timePicker: TimePicker,
    datePicker: DatePicker,
    tabs: Tabs,
    tabsTabPane: Tabs.TabPane,
    antdBadge: AntdBadge,
    antdMessage: AntdMessage,
    antdButton: AntdButton,
    antdSelect: AntdSelect,
    antdTooltip: AntdTooltip,
    antdModal: AntdModal,
    antdInput: AntdInput,
    antdTable: AntdTable,
    antdEmpty: AntdEmpty,
    antdCheckbox: AntdCheckbox,
    antdSwitch: AntdSwitch,
    antdCollapse: AntdCollapse,
    antdTreeSelect: AntdTreeSelect,
    antdDrawer: AntdDrawer,
    antdSteps: AntdSteps,
    card: Card,
    overflowTooltip: OverflowTooltip,
    truncate: Truncate,
    expandableList: {
      ExpandableContainer: ExpandableContainer,
      ExpandableItem: ExpandableItem,
    },
    time: Time,
    DropdownMenu: DropdownMenu,
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  kit.option.isSelectOption = true;

  // https://github.com/ant-design/ant-design/issues/9581
  (kit.button as typeof AntdButton).__ANT_BUTTON = true;

  return kit;
}

export const antdKit = getAntdKit();

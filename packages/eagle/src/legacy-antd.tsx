import {
  AutoComplete,
  Badge as AntdBadge,
  Button as AntdButton,
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

import AccordionCard from "./core/AccordionCard";
import Alert from "./core/Alert";
import Arch from "./core/Arch";
import Badge from "./core/Badge";
import Bit from "./core/Bit";
import BitPerSecond from "./core/BitPerSecond";
import Bps from "./core/Bps";
import Breadcrumb from "./core/Breadcrumb";
import Button from "./core/Button";
import ButtonGroup from "./core/ButtonGroup";
import Byte from "./core/Byte";
import BytePerSecond from "./core/BytePerSecond";
import Calendar from "./core/Calendar";
import Card from "./core/Card";
import Checkbox from "./core/Checkbox";
import DeprecatedProgress from "./core/DeprecatedProgress";
import DetailCard from "./core/DetailCard";
import DonutChart from "./core/DonutChart";
import DropdownMenu from "./core/DropdownMenu";
import Empty from "./core/Empty";
import Error from "./core/Error";
import ExpandableContainer from "./core/ExpandableList/ExpandableContainer";
import ExpandableItem from "./core/ExpandableList/ExpandableItem";
import fields from "./core/Fields";
import Form from "./core/Form";
import Frequency from "./core/Frequency";
import Input from "./core/Input";
import InputGroup from "./core/InputGroup";
import LegacyModal from "./core/LegacyModal";
import LegacySelect from "./core/LegacySelect";
import Link from "./core/Link";
import Loading from "./core/Loading";
import message from "./core/message";
import Pagination from "./core/Pagination";
import Percent from "./core/Percent";
import Radio, { RadioButton, RadioGroup } from "./core/Radio";
import { SearchInput } from "./core/SearchInput";
import Second from "./core/Second";
import SegmentControl from "./core/SegmentControl";
import Select from "./core/Select";
import SimplePagination from "./core/SimplePagination";
import Space from "./core/Space";
import Speed from "./core/Speed";
import StatusCapsule from "./core/StatusCapsule";
import { CircleProgress } from "./core/StepProgress";
import Steps from "./core/Steps";
import Switch from "./core/Switch";
import Table from "./core/Table";
import TableForm from "./core/TableForm";
import Tag from "./core/Tag";
import TextArea from "./core/TextArea";
import Time from "./core/Time";
import TimeZoneSelect from "./core/TimeZoneSelect";
import Token from "./core/Token";
import Tooltip from "./core/Tooltip";
import Truncate from "./core/Truncate";
import { DateRangePicker } from "./coreX";
import BatchOperation from "./coreX/BatchOperation";
import ChartWithTooltip, { ChartWithUnit } from "./coreX/ChartWithTooltip";
import Counting from "./coreX/Counting";
import CronCalendar from "./coreX/CronCalendar";
import CronPlan from "./coreX/CronPlan";
import DeprecatedDonutChart from "./coreX/DeprecatedDonutChart";
import DropdownTransition from "./coreX/DropdownTransition";
import GoBackButton from "./coreX/GoBackButton";
import I18nNameTag from "./coreX/I18nNameTag";
import NamesTooltip from "./coreX/NamesTooltip";
import OverflowTooltip from "./coreX/OverflowTooltip";
import SidebarSubtitle from "./coreX/SidebarSubtitle";
import SortableList from "./coreX/SortableList";
import SummaryTable from "./coreX/SummaryTable";
import SwitchWithText from "./coreX/SwitchWithText";
import UnitWithChart from "./coreX/UnitWithChart";
import { Kit, OptionComponentType } from "./spec";

export function getAntdKit(): Kit {
  const kit: Kit = {
    loading: Loading,
    error: Error,
    pagination: Pagination,
    legacySelect: LegacySelect,
    select: Select,
    option: AntdSelect.Option as OptionComponentType,
    selectOptGroup: AntdSelect.OptGroup,
    table: Table,
    row: Row,
    col: Col,
    button: Button,
    legacyModal: LegacyModal,
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
      BytePerSecond,
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
    DeprecatedProgress: DeprecatedProgress,
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
    I18nNameTag: I18nNameTag,
    SwitchWithText: SwitchWithText,
    CronPlan: CronPlan,
    NamesTooltip: NamesTooltip,
    CronCalendar: CronCalendar,
    truncate: Truncate,
    expandableList: {
      ExpandableContainer: ExpandableContainer,
      ExpandableItem: ExpandableItem,
    },
    time: Time,
    DropdownTransition: DropdownTransition,
    AccordionCard: AccordionCard,
    DetailCard: DetailCard,
    Counting: Counting,
    Breadcrumb: Breadcrumb,
    CircleProgress: CircleProgress,
    ChartWithTooltip: ChartWithTooltip,
    ChartWithUnit: ChartWithUnit,
    DonutChart: DonutChart,
    DeprecatedDonutChart: DeprecatedDonutChart,
    UnitWithChart: UnitWithChart,
    GoBackButton: GoBackButton,
    SummaryTable: SummaryTable,
    SortableList: SortableList,
    SidebarSubtitle: SidebarSubtitle,
    Link: Link,
    DropdownMenu: DropdownMenu,
    BatchOperation: BatchOperation,
    DateRangePicker: DateRangePicker,
    SegmentedControl: SegmentControl,
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  kit.option.isSelectOption = true;

  // https://github.com/ant-design/ant-design/issues/9581
  (kit.button as typeof AntdButton).__ANT_BUTTON = true;

  return kit;
}

export const antdKit = getAntdKit();

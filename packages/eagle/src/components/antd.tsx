import {
  AutoComplete,
  Button as AntdButton,
  Cascader,
  Checkbox as AntCheckbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Layout,
  List,
  Menu,
  Popover,
  Row,
  Select as AntdSelect,
  Skeleton,
  Tag,
  Timeline,
  Tree,
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
import Checkbox from "./Checkbox";
import Empty from "./Empty";
import fields from "./Fields";
import Frequency from "./Frequency";
import Input from "./Input";
import InputGroup from "./InputGroup";
import Loading from "./Loading";
import { createBatchMessageMethods } from "./message-group";
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
import Steps from "./Steps";
import Switch from "./Switch";
import Table from "./Table";
import TextArea from "./TextArea";
import TimeZoneSelect from "./TimeZoneSelect";
import Tooltip from "./Tooltip";

export function getAntdKit(): Kit {
  const kit: Kit = {
    loading: Loading,
    error: ({ error }) => <div className="error">{String(error)}</div>,
    pagination: Pagination,
    select: Select,
    option: AntdSelect.Option as OptionComponentType,
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
    Empty,
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
    message: createBatchMessageMethods(),
    tag: Tag,
    popover: Popover,
    arch: Arch,
    buttonGroup: ButtonGroup,
    steps: Steps,
    form: Form,
    formItem: Form.Item,
    simplePagination: SimplePagination,
    space: Space,
    timeZoneSelect: TimeZoneSelect,
    timeline: Timeline,
    timelineItem: Timeline.Item,
    checkboxGroup: AntCheckbox.Group,
    typographyText: Typography.Text,
    cascader: Cascader,
    upload: Upload,
    datePickerRangePicker: DatePicker.RangePicker,
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  kit.option.isSelectOption = true;

  // https://github.com/ant-design/ant-design/issues/9581
  (kit.button as typeof AntdButton).__ANT_BUTTON = true;

  return kit;
}

export const antdKit = getAntdKit();

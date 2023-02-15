import {
  AutoComplete,
  Divider,
  Dropdown,
  Form,
  Layout,
  List,
  Menu,
  Popover,
  Select as AntdSelect,
  Skeleton,
  Tag,
  Tree,
} from "antd";
import message from "antd/lib/message";
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
import Modal from "./Modal";
import Pagination from "./Pagination";
import Percent from "./Percent";
import Progress from "./Progress";
import Radio, { RadioButton, RadioGroup } from "./Radio";
import SearchInput from "./SearchInput";
import Second from "./Second";
import Select from "./Select";
import Speed from "./Speed";
import Steps from "./Steps";
import {
  MODAL_WHITELIST,
  PAGINATION_SELECTOR,
  TABLE_WRAPPER_SELECTOR,
  TBODY_SELECTOR,
  THEAD_SELECTOR,
} from "./Styled";
import Switch from "./Switch";
import Table from "./Table";
import TextArea from "./TextArea";
import Tooltip from "./Tooltip";

export function getAntdKit(): Kit {
  const kit: Kit = {
    PAGINATION_SELECTOR,
    TABLE_WRAPPER_SELECTOR,
    THEAD_SELECTOR,
    TBODY_SELECTOR,
    MODAL_WHITELIST,
    loading: Loading,
    error: ({ error }) => <div className="error">{String(error)}</div>,
    pagination: Pagination,
    select: Select,
    option: AntdSelect.Option as OptionComponentType,
    table: Table,
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
      Byte,
      Frequency,
      Percent,
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
  };

  // https://github.com/react-component/select/blob/master/src/Option.tsx#L19
  kit.option.isSelectOption = true;

  return kit;
}

export const antdKit = getAntdKit();

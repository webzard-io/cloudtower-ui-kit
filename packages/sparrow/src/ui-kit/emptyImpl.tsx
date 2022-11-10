import { BasicProps } from "antd/lib/layout/layout";
import { TagProps } from "antd/lib/tag";
import { forwardRef } from "react";

import { Kit } from "./base";

const ThrowError = () => {
  throw new Error("");
};

const emptyImpl: Kit = {
  // constants
  get PAGINATION_SELECTOR() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return "";
  },
  get TABLE_WRAPPER_SELECTOR() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return "";
  },
  get THEAD_SELECTOR() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return "";
  },
  get TBODY_SELECTOR() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return "";
  },
  get MODAL_WHITELIST() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return [""];
  },
  // general UI
  loading: ThrowError,
  error: ThrowError,
  pagination: ThrowError,
  select: ThrowError,
  option: ThrowError,
  table: ThrowError,
  button: ThrowError,
  modal: ThrowError,
  modal2: Object.assign(ThrowError, {
    Initialized: ThrowError,
    Wizard: ThrowError,
  }),
  dropdown: ThrowError,
  switch: ThrowError,
  tooltip: ThrowError,
  input: ThrowError,
  textArea: ThrowError,
  checkbox: ThrowError,
  // input fields
  fields: {
    // scalars
    Int: ThrowError,
    Float: ThrowError,
    DateTime: ThrowError,
    Enum: ThrowError,
    String: ThrowError,
    Boolean: ThrowError,
    TextArea: ThrowError,
    // list
    Array: ThrowError,
    // compose
    DateTimeRange: ThrowError,
    TimePicker: ThrowError,
  },
  // specific unit data UI
  units: {
    Byte: ThrowError,
    Frequency: ThrowError,
    Percent: ThrowError,
    Speed: ThrowError,
    Second: ThrowError,
    Bps: ThrowError,
  },
  inputGroup: ThrowError,
  get Empty() {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("");
    }
    return null;
  },
  alert: ThrowError,
  searchInput: ThrowError,
  exportButton: ThrowError,
  badge: ThrowError,
  radio: ThrowError,
  radioGroup: ThrowError,
  radioButton: ThrowError,
  tree: ThrowError,
  progress: ThrowError,
  divider: ThrowError,
  skeleton: ThrowError,
  menu: ThrowError,
  menuItem: ThrowError,
  menuItemGroup: ThrowError,
  list: ThrowError,
  listItem: ThrowError,
  listItemMeta: ThrowError,
  layout: Object.assign(forwardRef<{}, BasicProps>(ThrowError), {
    Header: forwardRef<{}, BasicProps>(ThrowError),
    Footer: forwardRef<{}, BasicProps>(ThrowError),
    Content: forwardRef<{}, BasicProps>(ThrowError),
    Sider: forwardRef<{}, BasicProps>(ThrowError),
  }),
  autoComplete: forwardRef(ThrowError),
  message: {
    info: ThrowError,
    success: ThrowError,
    error: ThrowError,
    warning: ThrowError,
    loading: ThrowError,
    open: ThrowError,
  },
  tag: Object.assign(forwardRef<HTMLElement, TagProps>(ThrowError), {
    CheckableTag: ThrowError,
  }),
  popover: forwardRef(ThrowError),
  arch: ThrowError,
  buttonGroup: forwardRef(ThrowError),
  steps: ThrowError,
};

export default emptyImpl;

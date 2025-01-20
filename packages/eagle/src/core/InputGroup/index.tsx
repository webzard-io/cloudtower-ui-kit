import { styled } from "@linaria/react";
import { Input as AntdInput } from "antd";

const InputGroup = styled(AntdInput.Group)`
  &.ant-input-group.ant-input-group-compact {
    display: flex;
  }

  &.ant-input-group.ant-input-group-compact > *:first-child,
  &.ant-input-group.ant-input-group-compact
    > .ant-select:first-child
    > .ant-select-selector,
  &.ant-input-group.ant-input-group-compact
    > .ant-calendar-picker:first-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-select-auto-complete:first-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-cascader-picker:first-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-mention-wrapper:first-child
    .ant-mention-editor,
  &.ant-input-group.ant-input-group-compact
    > .ant-time-picker:first-child
    .ant-time-picker-input {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  &.ant-input-group.ant-input-group-compact > *:last-child,
  &.ant-input-group.ant-input-group-compact
    > .ant-select:last-child
    > .ant-select-selector,
  &.ant-input-group.ant-input-group-compact
    > .ant-calendar-picker:last-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-select-auto-complete:last-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-cascader-picker:last-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-cascader-picker-focused:last-child
    .ant-input,
  &.ant-input-group.ant-input-group-compact
    > .ant-mention-wrapper:last-child
    .ant-mention-editor,
  &.ant-input-group.ant-input-group-compact
    > .ant-time-picker:last-child
    .ant-time-picker-input {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

export default InputGroup;

export * from "./inputGroup.type";

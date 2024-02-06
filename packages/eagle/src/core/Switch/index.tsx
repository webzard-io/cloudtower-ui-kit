import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { Switch as AntdSwitch } from "antd";
import { SwitchProps as AntdSwitchProps } from "antd/lib/switch";
import React from "react";

import { SwitchProps } from "./switch.type";

/**
 *  transition-delay: 120ms; 这个 delay 的时长在第一次渲染并单击时，可能会出现拖影的状况
 */
const SwitchStyle = css`
  &.ant-switch {
    min-width: 40px;
    height: 24px;
    background: $fills-trans-quinary-light;
    overflow: hidden;
    &:focus {
      box-shadow: 0 0 0 2px $strokes-light-trans-1;
    }
  }
  &.ant-switch-small {
    min-width: 26px;
    height: 16px;
  }
  &.ant-switch-large {
    min-width: 52px;
    height: 32px;
  }

  &.ant-switch .ant-switch-handle {
    height: 20px;
    width: 20px;
    &::before {
      border-radius: 10px;
      transition-delay: 120ms;
    }
  }
  &.ant-switch-small .ant-switch-handle {
    height: 14px;
    width: 14px;
    top: 1px;
    left: 1px;
  }
  &.ant-switch-large .ant-switch-handle {
    height: 28px;
    width: 28px;
    &::before {
      border-radius: 14px;
    }
  }

  &.ant-switch-checked {
    background-color: $green-60;
  }
  &.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 20px - 2px);
  }
  &.ant-switch-small.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 14px - 1px);
  }
  &.ant-switch-large.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 28px - 2px);
  }
`;

const Switch: React.FC<SwitchProps> = ({
  children,
  className,
  checked,
  ...props
}) => {
  const Content = styled.span`
    margin-left: 5px;
  `;

  const classNames = [className, SwitchStyle, "switch"];
  if (props.size === "large") classNames.push("ant-switch-large");

  return (
    <>
      <AntdSwitch
        className={cx(...classNames)}
        checked={checked || false}
        {...props}
        size={props.size as AntdSwitchProps["size"]}
      />
      {children ? <Content>{children}</Content> : null}
    </>
  );
};

export default Switch;

export * from "./switch.type";

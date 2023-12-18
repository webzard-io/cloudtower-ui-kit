import { css, cx } from "@linaria/core";
import { Dropdown as AntdDropdown, Menu as AntdMenu } from "antd";
import type { DropDownProps as AntdDropDownProps } from "antd/lib/dropdown";
import React from "react";

import Tooltip from "../../components/Tooltip";

const DropdownOverlayStyle = css`
  .ant-dropdown-menu-item-group {
    .ant-dropdown-menu-item-group-title {
      padding: 4px 8px 0 8px;
      color: $text-light-secondary;
      font-size: 12px;
    }
    .ant-dropdown-menu-item-group-list {
      padding-bottom: 6px;
    }
    &:not(:first-child) {
      padding-top: 4px;
      border-top: 1px solid $strokes-light-trans-2;
    }
  }
`;

interface IItem {
  type?: "single" | "group" | "divider";
  key: string;
  disabled?: boolean;
  text?: string;
  icon?: React.ReactElement;
  hidden?: boolean;
  onClick?: () => void;
  danger?: boolean;
  tooltip?: string;
}

interface IProps {
  items: Array<
    IItem & {
      title?: string;
      children?: Array<IItem>;
    }
  >;
  disabled?: boolean;
  placement?: AntdDropDownProps["placement"];
  trigger?: AntdDropDownProps["trigger"];
  customStyle?: {
    content: string;
  };
  slotsElements: {
    trigger?: (args: object) => string | React.ReactNode;
  };
}

export const RenderMenuItem = (
  item: IItem & {
    title?: string;
    children?: Array<IItem>;
  },
) => {
  if (item.hidden === true) {
    return <></>;
  }
  if (item.type === "group") {
    return (
      <AntdMenu.ItemGroup title={item.title} key={item.key}>
        {(item.children || []).map((childItem) => RenderMenuItem(childItem))}
      </AntdMenu.ItemGroup>
    );
  }
  if (item.type === "divider") {
    return <AntdMenu.Divider key={item.key} />;
  }
  if (item.tooltip) {
    return (
      <AntdMenu.Item
        danger={item.danger}
        key={item.key}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        <Tooltip title={item.tooltip}>
          {item.icon ? (
            React.cloneElement(item.icon, {}, item.text)
          ) : (
            <div>{item.text}</div>
          )}
        </Tooltip>
      </AntdMenu.Item>
    );
  }
  return (
    <AntdMenu.Item
      danger={item.danger}
      key={item.key}
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {item.icon ? React.cloneElement(item.icon, {}, item.text) : item.text}
    </AntdMenu.Item>
  );
};

const DropdownMenu: React.FC<IProps> = ({
  items,
  disabled,
  placement,
  trigger,
  customStyle,
  slotsElements = {},
}) => {
  const menuItems = items.filter((item) => !item.hidden);
  const menuDisabled = disabled || menuItems.length === 0;
  return (
    <AntdDropdown
      disabled={menuDisabled}
      placement={placement}
      trigger={trigger}
      overlayClassName={cx(DropdownOverlayStyle, customStyle?.content)}
      overlay={
        <AntdMenu>
          {menuItems.map((item) => {
            return RenderMenuItem(item);
          })}
        </AntdMenu>
      }
    >
      <span>{slotsElements.trigger ? slotsElements.trigger({}) : null}</span>
    </AntdDropdown>
  );
};

export default DropdownMenu;

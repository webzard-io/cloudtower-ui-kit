import React from "react";
import { css, cx } from "@linaria/core";
import { Menu, Dropdown } from "antd";
import Tooltip from "../../components/Tooltip";
import { IDropDownMenuItem, IDropdownMenuProps } from "../../spec/type";

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

export const RenderMenuItem = (
  item: IDropDownMenuItem & {
    title?: string;
    children?: Array<IDropDownMenuItem>;
  },
) => {
  if (item.hidden === true) {
    return <></>;
  }
  if (item.type === "group") {
    return (
      <Menu.ItemGroup title={item.title} key={item.key}>
        {(item.children || []).map((childItem) => RenderMenuItem(childItem))}
      </Menu.ItemGroup>
    );
  }
  if (item.type === "divider") {
    return <Menu.Divider key={item.key} />;
  }
  if (item.tooltip) {
    return (
      <Menu.Item
        danger={item.danger}
        key={item.key}
        disabled={item.disabled}
        onClick={item.onClick}
      >
        <Tooltip title={item.tooltip}>
          {item.icon != null ? item.icon : <div>{item.text}</div>}
        </Tooltip>
      </Menu.Item>
    );
  }
  return (
    <Menu.Item
      danger={item.danger}
      key={item.key}
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {item.icon != null ? item.icon : item.text}
    </Menu.Item>
  );
};

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
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
    <Dropdown
      disabled={menuDisabled}
      placement={placement}
      trigger={trigger}
      overlayClassName={cx(DropdownOverlayStyle, customStyle?.content)}
      overlay={
        <Menu>
          {menuItems.map((item) => {
            return RenderMenuItem(item);
          })}
        </Menu>
      }
    >
      <span>{slotsElements.trigger ? slotsElements.trigger({}) : null}</span>
    </Dropdown>
  );
};

export default DropdownMenu;

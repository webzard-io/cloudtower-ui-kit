import { css, cx } from "@linaria/core";
import { Layout, Menu, Tooltip } from "antd";
import classNames from "classnames";
import React from "react";

import Icon from "../../core/Icon";
import { Typo } from "../../core/Typo";
import { SiderMenuItem, SiderProps } from "./Sider.type";

const SiderStyle = css`
  &.ant-layout-sider {
    background: $backgrounds-light-grouped;
    padding: 32px 8px;
    overflow: auto;
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  footer {
    display: flex;
  }

  .ant-menu {
    background: $backgrounds-light-grouped;
    a {
      color: $text-light-primary;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .ant-menu-vertical {
    margin-bottom: 24px;

    .ant-menu-item-group {
      .ant-menu-item {
        margin: 0;
      }
      .ant-menu-item-group-title {
        font-size: 12px;
        padding: 0 8px 4px;
        line-height: 18px;

        &:empty {
          padding: 0;
        }
      }
      &:not(:last-child) {
        padding-bottom: 24px;
        &.split {
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(211, 218, 235, 0.6);
        }
      }
    }

    .ant-menu-item {
      transition: none;
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 22px;
      padding: 0 8px;

      > .icon-wrapper {
        margin-right: 12px;
      }

      &:not(:last-child) {
        margin: 0;
        margin-bottom: 2px;
      }
      &.ant-menu-item-selected {
        background: $background-selected;
        box-shadow: $box-shadow-light-selected;
        border-radius: 6px;
        color: $text-light-on-tint;
        a {
          color: $text-light-on-tint;
        }
      }
      &:not(.ant-menu-item-selected) {
        &.ant-menu-item:hover,
        &.ant-menu-item-active {
          background: $background-onhover;
          box-shadow: $box-shadow-light-onhover;
          border-radius: 6px;
        }
      }
    }
  }
`;

const ShrinkStyle = css`
  .ant-menu-item-group-title {
    white-space: nowrap;
    transition: all 0s;
  }

  &.shrink {
    transition: all 0s;
    overflow: hidden;

    .ant-menu-item-group-title {
      visibility: hidden;
    }

    .ant-menu-item {
      width: 36px;
      padding: 0 6px;
    }
  }
`;

const NavLinkStyle = css`
  display: flex;
  place-items: center;
  width: 100% !important;

  &[disabled] {
    color: rgba(0, 0, 0, 0.25) !important;
    opacity: 1 !important;
  }

  &.ant-btn {
    width: 100%;
    color: $text-light-primary;
  }

  .icon-wrapper {
    margin-right: 12px;
  }

  .link-title {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }
`;

const NormalWidth = 256;
const ShrinkWidth = 52;

const Sider: React.FC<SiderProps> = ({
  config = [],
  selectedKeys,
  isShrink,
  onClick,
  children,
  antdSiderProps,
}) => {
  const renderItem = (item: SiderMenuItem) => {
    const iconSrc = selectedKeys.includes(item.key || "")
      ? item.icon.active
      : item.icon.normal;

    const icon = (
      <Icon
        iconWidth={24}
        iconHeight={24}
        src={iconSrc}
        style={{ opacity: item.disabled ? 0.5 : 1 }}
      />
    );
    const _onClick = () => {
      if (item.onClick) {
        item.onClick(item.key);
      }
      onClick?.(item.key);
    };
    if (isShrink) {
      return (
        <div className={NavLinkStyle} onClick={_onClick}>
          <Tooltip title={item.title} placement="right">
            {icon}
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div className={NavLinkStyle} onClick={_onClick}>
          {icon}
          <span className="link-title">{item.title}</span>
        </div>
      );
    }
  };

  return (
    <Layout.Sider
      className={cx(SiderStyle, ShrinkStyle, isShrink ? "shrink" : "")}
      width={isShrink ? ShrinkWidth : NormalWidth}
      {...antdSiderProps}
    >
      <Menu className={cx(Typo.Label.l2_regular)} selectedKeys={selectedKeys}>
        {config
          .filter((item) => !item.hidden)
          .map((item) => {
            if ("items" in item) {
              return (
                <Menu.ItemGroup
                  className={classNames({ split: item.isShowDivider })}
                  key={item.key}
                  title={
                    item.title ? (
                      <span className={Typo.Heading.h3_regular_upper}>
                        {item.title}
                      </span>
                    ) : null
                  }
                >
                  {(item.items || [])
                    .filter((childItem) => !childItem.hidden)
                    .map((childItem) => {
                      return (
                        <Menu.Item
                          key={childItem.key}
                          disabled={childItem.disabled}
                        >
                          {renderItem(childItem)}
                        </Menu.Item>
                      );
                    })}
                </Menu.ItemGroup>
              );
            }
            return (
              <Menu.Item key={item.key} disabled={item.disabled}>
                {renderItem(item)}
              </Menu.Item>
            );
          })}
      </Menu>
      <footer>{children}</footer>
    </Layout.Sider>
  );
};

export default Sider;

export * from "./Sider.type";

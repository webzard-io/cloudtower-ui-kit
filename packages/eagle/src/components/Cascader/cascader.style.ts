import { css } from "@linaria/core";

export const DoubleRowOptionStyleWrapper = css`
  width: 400px;
`;

export const CascaderDefaultOptionLabel = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .label {
    color: $text-neutral-tertiary;
    font-weight: 400;
  }
`;

export const CascaderNotData = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 240px;
  width: 432px;
`;

export const CascaderDefaultHeaderSearch = css`
  &.ant-input-affix-wrapper {
    border-radius: 0px;
    box-shadow: unset;
    border: 0;
    border-bottom: 1px solid $gray-30;
  }
`;

export const CascaderDefaultHeaderContainer = css`
  font-size: 13px;
`;

export const CascaderDefaultHeader = css`
  padding: 7px 14px;
  height: 20px;

  box-sizing: content-box;
  color: $text-neutral-secondary;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $gray-30;
`;

export const CascaderSmallDropdown = css`
  border-radius: 6px;
  &:not(:has(.${CascaderNotData})) {
    li.antd5-menu-item {
      min-width: 200px;
      font-size: 12px;
    }
  }
  .${CascaderDefaultHeader} {
    padding: 6px 12px;
    height: 18px;
    font-size: 12px;
  }
`;

export const CascaderLargeDropdown = css`
  border-radius: 10px;
  &:not(:has(.${CascaderNotData})) {
    li.antd5-menu-item {
      min-width: 296px;
      padding: 8px;
    }
  }
  .${CascaderDefaultHeader} {
    height: 22px;
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const CascaderDropdown = css`
  box-shadow: $shadow-menu-light-default;
  border-radius: 8px;
  padding: 0px;

  .antd5-menus {
    padding: 4px;
    padding-top: 0px;
  }

  ul:first-child {
    padding-left: 0px;
  }
  ul:last-child {
    padding-right: 0px;
  }

  &:not(:has(.${CascaderNotData})) {
    li {
      min-width: 296px;
      padding: 4px 4px 4px 8px;
      color: $text-neutral-secondary;
      .icon-wrapper {
        vertical-align: middle;
      }
      &.antd5-menu-item-active .icon-wrapper svg path {
        fill: $blue-60;
      }
    }
  }

  li:has(.${DoubleRowOptionStyleWrapper}) {
    .antd5-checkbox {
      align-self: flex-start;
      margin-top: 4px;
    }
  }
  &:has(.${CascaderNotData}) {
    .${CascaderDefaultHeaderContainer} {
      display: none;
    }
  }
`;

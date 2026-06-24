import { css } from "@linaria/core";

import { Antd5PrefixCls } from "../../utils";
import { CheckboxStyleContent } from "../Checkbox/checkbox.style";

export const Hide = css`
  display: none;
`;

export const DoubleRowOptionStyleWrapper = css`
  .bottom {
    color: $text-neutral-secondary;
  }
  .left {
    min-width: 0;
  }
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

export const CascaderInputStyle = css`
  &.${Antd5PrefixCls}-cascader .${Antd5PrefixCls}-cascader-selector {
    padding: 4px;
    &:after {
      line-height: normal;
    }
    .${Antd5PrefixCls}-cascader-selection-search-input {
      height: 22px;
    }
    .${Antd5PrefixCls}-cascader-selection-overflow {
      row-gap: 2px;
    }
    .${Antd5PrefixCls}-cascader-selection-overflow-item {
      line-height: normal;
      span {
        max-width: 100%;
      }
    }
    .${Antd5PrefixCls}-cascader-selection-placeholder {
      font-size: 13px;
      line-height: 20px;
    }
  }
`;

export const CascaderDefaultHeaderContainer = css`
  font-size: 13px;
`;

export const CascaderDefaultHeader = css`
  padding: 7px 14px;
  height: 34px;

  font-weight: 400;
  box-sizing: border-box;
  color: $text-neutral-secondary;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $gray-30;
  gap: 4px;
`;

export const CascaderDropdown = css`
  box-shadow: $shadow-menu-light-default;
  border-radius: 8px;
  padding: 0px;

  ul.${Antd5PrefixCls}-cascader-menu {
    padding: 6px;
    height: 240px;
  }

  &:not(:has(.${CascaderNotData})) {
    li {
      min-width: 296px;
      padding: 4px 4px 4px 8px;
      color: $text-neutral-primary;
      margin-bottom: 2px;
      .icon-wrapper {
        vertical-align: middle;
      }
    }
    li.antd5-menu-item-active {
      font-weight: 400;
      &:hover {
        font-weight: 400;
      }
      &:active {
        background: $fill-outstanding-light-active;
      }
      .icon-wrapper svg path {
        fill: $blue-60;
      }
    }
    li:hover {
      background: $fill-neutral-trans-2;
      font-weight: 400;
      .icon-wrapper svg path {
        fill: $blue-60;
      }
    }
    li:active {
      background: $fill-neutral-trans-3-trans-2-hover;
    }
  }

  li:has(.${DoubleRowOptionStyleWrapper}) {
    .antd5-checkbox {
      align-self: flex-start;
    }
  }
  &:has(.${CascaderNotData}) {
    .${CascaderDefaultHeaderContainer} {
      display: none;
    }
  }

  ${(CheckboxStyleContent || "").replaceAll(
    "ant-",
    `${Antd5PrefixCls}-cascader-`,
  )}

  .${DoubleRowOptionStyleWrapper} {
    width: 400px;
  }
`;

export const CascaderSmallDropdown = css`
  ul.${Antd5PrefixCls}-cascader-menu {
    padding: 4px;
    height: 158px;
  }
  &.${CascaderDropdown} {
    border-radius: 6px;
    &:not(:has(.${CascaderNotData})) {
      li.antd5-menu-item {
        min-width: 200px;
        font-size: 12px;
      }
    }
    .${CascaderDefaultHeader} {
      padding: 6px 12px;
      height: 30px;
      font-size: 12px;
    }
  }
`;

export const CascaderLargeDropdown = css`
  ul.${Antd5PrefixCls}-cascader-menu {
    padding: 8px;
    height: 320px;
  }
  &.${CascaderDropdown} {
    border-radius: 10px;
    &:not(:has(.${CascaderNotData})) {
      li.antd5-menu-item {
        min-width: 296px;
        padding: 8px;
      }
    }
    .${CascaderDefaultHeader} {
      height: 38px;
      padding: 8px 16px;
      font-size: 14px;
    }
  }
`;

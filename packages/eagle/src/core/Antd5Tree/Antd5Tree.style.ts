import { css } from "@linaria/core";

import { Antd5PrefixCls } from "../../utils";
import { CheckboxStyleContent } from "../Checkbox/checkbox.style";

export const Antd5TreeStyle = css`
  ${(CheckboxStyleContent || "").replaceAll("ant-", `${Antd5PrefixCls}-tree-`)}

  .${Antd5PrefixCls}-tree-checkbox {
    height: auto;
    display: inline-block;
    top: initial;
  }

  /* 提高优先级，避免 Antd5 的默认颜色和 hover 覆盖 Eagle 样式。 */
  &.${Antd5PrefixCls}-tree {
    .${Antd5PrefixCls}-tree-checkbox {
      &:not(.${Antd5PrefixCls}-tree-checkbox-checked):not(
          .${Antd5PrefixCls}-tree-checkbox-indeterminate
        )
        .${Antd5PrefixCls}-tree-checkbox-inner {
        border-color: $strokes-light-trans-4;
      }

      &:not(.${Antd5PrefixCls}-tree-checkbox-disabled) {
        &:hover .${Antd5PrefixCls}-tree-checkbox-inner {
          border-color: $fills-light-general-general;
        }

        &.${Antd5PrefixCls}-tree-checkbox-checked {
          .${Antd5PrefixCls}-tree-checkbox-inner {
            background: $fills-light-general-general;
          }
        }
      }

      /* Tree 的禁用类在复选框自身，无法命中共享样式的 wrapper 规则。 */
      &.${Antd5PrefixCls}-tree-checkbox-disabled {
        opacity: 0.5;

        .${Antd5PrefixCls}-tree-checkbox-inner {
          background: $fills-light-trans-3;
          border-color: $strokes-light-trans-4;
        }

        &.${Antd5PrefixCls}-tree-checkbox-checked
          .${Antd5PrefixCls}-tree-checkbox-inner:after {
          border-color: $text-primary-light;
        }

        &.${Antd5PrefixCls}-tree-checkbox-indeterminate
          .${Antd5PrefixCls}-tree-checkbox-inner:after {
          background: $text-primary-light;
        }
      }
    }

    /* 相邻节点是 Tree 标题，覆盖 Checkbox 文案及 compact 布局规则。 */
    .${Antd5PrefixCls}-tree-checkbox
      + .${Antd5PrefixCls}-tree-node-content-wrapper {
      padding: 0 4px;

      .main,
      .sub {
        margin-left: 0;
        color: inherit;
      }

      .main {
        display: revert;
      }
    }
  }
`;

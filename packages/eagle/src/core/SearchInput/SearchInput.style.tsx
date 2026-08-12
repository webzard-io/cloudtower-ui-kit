import { css } from "@linaria/core";
import { Color } from "@src/styles/token/color";

export const SearchInputStyles = css`
  .ant-input-prefix {
    margin-right: 8px;
  }
  .ant-input-suffix {
    margin-left: 8px;
  }
`;

export const CountTextStyles = css`
  color: $gray-120;
  border-right: 1px solid $gray-a60-5;
  margin-right: 8px;
  padding-right: 8px;
`;

export const IconContainerStyles = css`
  display: flex;
  gap: 4px;

  .icon-wrapper {
    cursor: pointer;
  }
`;

export const DisabledIconStyles = css`
  &.icon-wrapper {
    cursor: not-allowed;
  }
`;

export const SearchInputDropdownStyles = css`
  &.ant-dropdown > .ant-dropdown-menu {
    padding: 6px;
    border-radius: 8px;

    .ant-dropdown-menu-item {
      color: ${Color.text.neutral.primary};
      font-size: 13px;
      line-height: 20px;

      &.recent-search-menu-item {
        color: ${Color.text.neutral.secondary};
        font-size: 12px;
        line-height: 18px;
        pointer-events: none;
        margin-bottom: 3px;
      }

      .ant-dropdown-menu-title-content {
        width: 100%;

        .icon-wrapper .icon-children {
          overflow: hidden;
        }
      }
    }
  }
`;

import { css } from "@linaria/core";
import { Antd5PrefixCls } from "@src/utils";

export const FileSelectorWrapperStyle = css`
  width: 100%;
  position: relative;

  &.label-left {
    display: flex;
    align-items: flex-start;
  }

  &.label-left .file-selector-label {
    flex: 0 0 216px;
    margin-bottom: 0;
    padding-right: 12px;
  }

  &.label-left .file-selector-main {
    flex: 1;
    min-width: 0;
  }

  .file-selector-label {
    display: block;
    margin-bottom: 4px;
    color: $text-light-primary;
    word-break: break-word;
  }

  .file-selector-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .file-selector-segment {
    align-self: center;
    margin-bottom: 8px;
  }

  .file-selector-option {
    display: inline-flex;
    align-items: center;
  }

  .file-selector-body {
    width: 100%;
  }

  .${Antd5PrefixCls}-segmented-item-disabled .file-selector-option {
    cursor: not-allowed;
  }
`;

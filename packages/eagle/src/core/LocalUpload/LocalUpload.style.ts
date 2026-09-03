import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const UploadWrapper = styled.div`
  width: 100%;
  position: relative;
  &.label-left {
    display: flex;
    align-items: flex-start;
    .upload-label {
      flex: 0 0 216px;
      margin-bottom: 0;
      padding-right: 12px;
    }
    .upload-main {
      flex: 1;
      min-width: 0;
    }
  }
  .upload-label {
    color: $text-light-secondary;
    word-break: break-word;
    margin-bottom: 4px;
    display: block;
  }
  .upload-description {
    color: $text-light-secondary;
    word-break: break-word;
  }
  .upload-button {
    display: block;
  }
  .upload-button:not(:first-child),
  .upload-drag:not(:first-child) {
    margin-top: 8px;
  }
  .upload-button:not(:last-child),
  .upload-drag:not(:last-child) {
    margin-bottom: 8px;
  }
  /* 设计稿把错误、描述和文件列表归到同一组，组内间距 4px，组与上传区之间 8px。
     错误渲染在上传区内部，所以由上传区代为收窄下边距 */
  .upload-button.has-error:not(:last-child),
  .upload-drag.has-error:not(:last-child),
  .upload-description.description-below:not(:last-child) {
    margin-bottom: 4px;
  }

  .upload-drag-area {
    height: 138px;
    padding: 32px 16px;
    border-radius: 4px;
    border: 1px dashed $strokes-light-trans-4;
    background: $fills-light-trans-1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .ant-upload-drag-container {
      gap: 4px;
    }
    .upload-drag-text {
      text-align: center;
      .upload-drag-link {
        color: $text-light-general;
      }
      .upload-drag-link:hover {
        color: $link-outstandinghover;
      }
      .upload-drag-link:active {
        color: $link-outstandingactive;
      }
    }

    .ant-upload-drag-container {
      color: $text-light-primary;
    }

    &.has-file {
      height: 56px;
      padding: 16px;
      .ant-upload-drag-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        .ant-btn.ant-btn-link {
          height: 24px;
        }
        .ant-btn.ant-btn-link[disabled] {
          color: $text-light-primary;
          opacity: 1;
        }
      }
      .upload-drag-text {
        margin-left: 8px;
        text-align: left;
        .ant-btn.ant-btn-link {
          height: 24px;
        }
      }
    }
    &.has-file.single {
      height: auto;
      padding: 11px;
      .ant-upload-drag-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        line-height: 18px;
        word-break: break-all;
      }
    }
    &.file-error.single {
      border-color: $strokes-light-serious;
      background: $fills-element-light-container-serious;
    }
    &.file-validating.single {
      cursor: not-allowed;
    }

    .file-info {
      display: flex;
      cursor: default;
      gap: 4px;
      width: 100%;
      align-items: flex-start;
      .icon-wrapper {
        flex-shrink: 0;
        margin-top: 1px;
      }
      .file-content {
        flex: 1;
        min-width: 0;
        text-align: left;
      }
      .remove-button {
        flex-shrink: 0;
        margin-left: 0;
      }
    }

    &:not(.ant-upload-disabled):not(.file-error):hover,
    &.ant-upload-drag-hover:not(.ant-upload-disabled):not(.file-error) {
      border-color: $strokes-light-outstanding;
      background: $fills-light-general-general-light;
    }
    &.ant-upload-disabled {
      opacity: 0.5;
    }
    &.ant-upload-disabled.file-validating {
      opacity: 1;
    }
  }

  /* 文件名超过宽度时换行，OverflowTooltip 默认是单行省略 */
  .file-name {
    display: block;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  /* 解析中的文件名颜色，两个类名是为了盖过 Typo 自带的 color */
  .file-content.validating {
    color: $text-light-tertiary;
  }

  .upload-error {
    margin-top: 8px;
    color: $text-light-serious;
  }

  .upload-file-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .upload-file-item {
      .upload-file-error {
        color: $text-light-serious;
      }
    }
  }
`;

export const FileInfoWrapperStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  background: $fills-light-trans-1;
  padding: 7px 8px;
  border-radius: 4px;
  gap: 4px;
  align-items: flex-start;
  color: $text-light-primary;
  line-height: 18px;

  .file-size,
  .file-size-unit {
    color: $text-neutral-tertiary;
  }
  .file-content {
    flex-grow: 1;
    min-width: 0;
    overflow: hidden;
    text-align: left;
  }
  .file-size-line {
    line-height: 18px;
  }
  .icon-wrapper {
    flex-shrink: 0;
    margin-top: 1px;
    cursor: pointer;
  }
  .remove-button {
    margin-left: auto;
  }
  .upload-file-error {
    color: $text-light-serious;
  }
  &.file-error-wrapper {
    background: $fills-element-light-container-serious;
  }
  &.disabled {
    opacity: 0.5;
    .icon-wrapper {
      cursor: default;
    }
  }
`;

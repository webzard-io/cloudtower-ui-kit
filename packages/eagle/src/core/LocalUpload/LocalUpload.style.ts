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
    color: var(--text-neutral-tertiary);
    word-break: break-word;
    margin-bottom: 4px;
    display: block;
  }
  .upload-description {
    color: var(--text-neutral-tertiary);
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
  /* 间距语义：4px 表示从属关系，8px 表示同级或不同信息组。错误文案与辅助说明都在解释
     同一个上传控件，两者相邻时收紧到 4px，其余相邻关系一律 8px。错误文案渲染在上传区
     内部，所以由上传区代为收窄下边距。
     下面几条只声明下限，最终间距由相邻块级元素的外边距合并（取较大值）得出：
     有错误 + 有描述 → 4 与 4 合并为 4px；无错误 + 有描述 → 8 与 4 合并为 8px；
     错误或描述后面直接接文件列表 → 与列表的 8px 上边距合并为 8px。 */
  .upload-button.has-error:not(:last-child),
  .upload-drag.has-error:not(:last-child) {
    margin-bottom: 4px;
  }
  .upload-description.description-below {
    margin-top: 4px;
  }

  .upload-drag-area {
    height: 138px;
    padding: 32px 16px;
    border-radius: 4px;
    border: 1px dashed var(--stroke-neutral-trans-4);
    background: var(--fill-neutral-trans-1);

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
        color: var(--text-colorful-outstanding);
      }
      .upload-drag-link:hover {
        color: var(--link-outstandinghover);
      }
      .upload-drag-link:active {
        color: var(--link-outstandingactive);
      }
    }

    .ant-upload-drag-container {
      color: var(--text-neutral-primary);
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
          color: var(--text-neutral-primary);
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
      border-color: var(--stroke-serious-base);
      background: rgba(255, 74, 74, 0.1);
    }
    &.file-validating.single {
      cursor: not-allowed;
    }

    .file-info {
      display: flex;
      cursor: default;
      &.disabled {
        cursor: not-allowed;
      }
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
      border-color: var(--stroke-outstanding-base);
      background: rgba(0, 136, 255, 0.1);
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
    color: rgba(0, 21, 64, 0.3);
  }

  .upload-error {
    margin-top: 8px;
    color: var(--text-colorful-serious);
  }

  .upload-file-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    gap: 8px;
    .upload-file-item {
      .upload-file-error {
        color: var(--text-colorful-serious);
      }
    }
  }
`;

export const FileInfoWrapperStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  background: var(--fill-neutral-trans-1);
  padding: 7px 8px;
  border-radius: 4px;
  gap: 4px;
  align-items: flex-start;
  color: var(--text-neutral-primary);
  line-height: 18px;

  .file-size,
  .file-size-unit {
    color: var(--text-neutral-tertiary);
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
    color: var(--text-colorful-serious);
  }
  &.file-error-wrapper {
    background: rgba(255, 74, 74, 0.1);
  }
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    .icon-wrapper {
      cursor: not-allowed;
    }
  }
`;

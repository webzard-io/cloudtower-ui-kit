import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const UploadWrapper = styled.div`
  width: 100%;
  position: relative;
  .upload-label {
    color: $text-light-primary;
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

  .upload-drag-area {
    padding: 32px 16px;
    border-radius: 4px;
    border: 1px dashed $strokes-light-trans-4;
    background: $fills-light-trans-1;

    display: flex;
    flex-direction: column;
    align-items: center;
    .upload-drag-text {
      text-align: center;
    }

    .ant-upload-drag-container {
      color: $text-light-primary;
    }

    &.has-file {
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
      padding: 12px;
      line-height: 24px;
      .ant-upload-drag-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        line-height: 24px;
        word-break: break-all;
        .ant-btn.ant-btn-link {
          height: 24px;
        }
      }
    }
    &.file-error.single {
      border-color: $strokes-light-serious;
      background: $fills-element-light-container-serious;
    }

    .file-info {
      display: flex;
      cursor: default;
      align-items: flex-start;
      .icon-wrapper {
        margin: 4px 0;
      }
      .file-name {
        margin: 3px 4px;
        text-align: left;
      }
    }

    &:not(.ant-upload-disabled):not(.file-error):hover {
      border-color: $strokes-light-outstanding;
      background: $fills-light-general-general-light;
    }
    &.ant-upload-disabled {
      opacity: 0.5;
    }
    &.ant-upload-disabled.reach-max-count {
      color: $text-light-tertiary;
    }
  }

  .upload-error {
    margin-top: 8px;
    color: $text-light-serious;
  }

  .upload-file-info-list {
    gap: 4px;
    display: flex;
    flex-direction: column;
  }
  .upload-file-list {
    width: 100%;
    .upload-file-item {
      padding-bottom: 4px;
      &:not(:last-child) {
        border-bottom: 1px solid $strokes-light-trans-1;
        margin-bottom: 4px;
      }
      .upload-file-info {
        display: flex;
        align-items: flex-start;
        .file-info {
          display: flex;
          align-items: flex-start;
          width: calc(100% - 25px);
          .validating {
            color: $text-light-tertiary;
          }
          .icon-wrapper {
            margin: 0 4px;
          }
        }
        .remove-button {
          margin-left: auto;
        }
      }
      .upload-file-error {
        color: $red;
        margin-left: 24px;
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
  align-items: self-start;
  color: $text-light-primary;

  .file-size,
  .file-size-unit {
    color: $text-light-secondary;
  }
  .file-info {
    flex-grow: 1;
    overflow: hidden;
  }
  .icon-wrapper {
    margin-top: 2px;
    cursor: pointer;
  }
  .upload-file-error {
    color: $text-light-serious;
  }
  &.file-error-wrapper {
    background: $fills-element-light-container-serious;
  }
  &.disabled {
    opacity: 0.5;
  }
`;

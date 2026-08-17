import { css } from "@linaria/core";

export const UrlUploadWrapperStyle = css`
  width: 100%;
  position: relative;

  &.label-left {
    display: flex;
    align-items: flex-start;
  }

  &.label-left .url-upload-label {
    flex: 0 0 216px;
    margin-bottom: 0;
    padding-right: 12px;
  }

  &.label-left .url-upload-body {
    flex: 1;
    min-width: 0;
    margin-top: 0;
  }

  .url-upload-label {
    display: block;
    margin-bottom: 4px;
    color: $text-light-primary;
    word-break: break-word;
  }

  .url-upload-description {
    color: $text-light-secondary;
    word-break: break-word;
  }

  .url-upload-description-above {
    margin-bottom: 4px;
  }

  .url-upload-body {
    display: flex;
    flex-direction: column;
  }

  .url-upload-body:not(:first-child) {
    margin-top: 8px;
  }

  .url-upload-body:not(:last-child) {
    margin-bottom: 8px;
  }

  .url-upload-action {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }

  .url-upload-action .ant-btn.ant-btn-secondary {
    font-weight: normal;
  }

  .url-upload-error {
    color: $text-light-serious;
  }

  .url-upload-footnote {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
  }

  .url-upload-file {
    display: flex;
    width: 100%;
    flex-direction: row;
    background: $fills-light-trans-1;
    padding: 7px 8px;
    border-radius: 4px;
    gap: 4px;
    align-items: flex-start;
    color: $text-light-primary;
  }

  .url-upload-file.file-error-wrapper {
    background: $fills-element-light-container-serious;
  }

  .url-upload-file.disabled {
    opacity: 0.5;
  }

  .url-upload-file.disabled .remove-icon {
    cursor: default;
  }

  .url-upload-file .file-info {
    flex-grow: 1;
    overflow: hidden;
  }

  .url-upload-file .icon-wrapper {
    margin-top: 2px;
  }

  .url-upload-file .remove-icon {
    cursor: pointer;
  }

  .url-upload-file .upload-file-error {
    color: $text-light-serious;
  }
`;

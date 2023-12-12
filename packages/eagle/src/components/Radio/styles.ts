import { css } from "@linaria/core";

export const SegmentControl = css`
  background-color: $fill-neutral-trans-2;
  padding: 2px;
  border-radius: 5px;
  .ant-radio-button-wrapper:hover {
    color: unset;
  }
  .ant-radio-button {
    padding: 3px 12px;
    height: 28px;
    border-radius: 4px;
  }
  .segment-control-button.ant-radio-button-wrapper {
    line-height: 28px;
    height: 28px;
    border-radius: 4px;
  }
  .segment-control-button.ant-radio-button-wrapper:hover {
    background-color: $fill-neutral-light-white;
    color: $text-neutral-secondary-light;
    border-radius: 4px;
  }
  .ant-radio-button-wrapper {
    border-width: 0px;
    color: $text-secondary-light;
  }
  .ant-radio-button-wrapper::before {
    display: none;
  }
  .ant-radio-button-wrapper-checked::before {
    display: none;
  }
  .ant-radio-button-wrapper-checked:focus-within {
    box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);
  }
  .ant-radio-button-wrapper-checked {
    border-radius: 4px;
    color: unset;
    box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);
  }
  .segment-control-button.ant-radio-button-wrapper {
    background: unset;
  }
  .segment-control-button.ant-radio-button-wrapper-checked {
    background: $fill-neutral-white;
  }
  .segment-control-button.ant-radio-button-wrapper-checked:first-child {
    border-radius: 4px;
  }
  .segment-control-button.ant-radio-button-wrapper-checked:last-child {
    border-radius: 4px;
  }
`;

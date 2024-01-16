import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const CommonContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalBody = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
`;

export const WizardBody = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  display: flex;

  .left,
  .right {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 21%;
  }

  .left {
    display: flex;
    justify-content: flex-end;
    padding-right: 44px;
  }

  .right {
    padding-left: 44px;
  }

  .middle {
    margin-bottom: 40px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 58%;
    .form-base-field {
      width: 100%;
      .form-base-field {
        width: auto;
      }
    }
  }
`;

export const HorizontalWizardModalCompactStyle = css`
  .ant-modal-header {
    margin: 0 auto;
    width: 100%;
    max-width: 648px;
  }
  .ant-modal-header .ant-modal-title {
    margin-left: 0;
  }
  .ant-modal-body {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    max-width: 648px;
    overflow: hidden;
  }
  .ant-modal-body .horizontal-steps-wrapper {
    margin-bottom: 40px;
  }
  .ant-modal-body .horizontal-content-wrapper {
    height: calc(100vh - 225px);
    overflow-y: auto;
  }
  .ant-modal-footer .footer-content {
    margin: 0 auto;
    max-width: 648px;
  }
`;

export const HorizontalWizardModalLooseStyle = css`
  .ant-modal-header {
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
  }
  .ant-modal-header .ant-modal-title {
    margin-left: 0;
  }
  .ant-modal-body {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    max-width: 1024px;
    overflow: hidden;
  }
  .ant-modal-body .horizontal-steps-wrapper {
    margin-bottom: 40px;
  }
  .ant-modal-body .horizontal-content-wrapper {
    height: calc(100vh - 225px);
    overflow-y: auto;
  }
  .ant-modal-footer .footer-content {
    margin: 0 auto;
    max-width: 1024px;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;

  label {
    font-size: 13px;
    line-height: 20px;
    color: $text-secondary-light;
  }

  .title {
    font-size: 14px;
    line-height: 20px;
    color: $text-primary-light;
    margin-bottom: 12px;
  }

  &.connect-cluster .title {
    padding-bottom: 26px;
  }
`;

export const FormSectionTitle = styled.h4`
  padding: 25px 0 15px 0;
  border-bottom: 1px solid #e1e5eb;
  margin-bottom: 16px;
`;

export const FormField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  > label {
    width: 216px;
  }

  > label + * {
    width: 100%;
  }

  .ant-select {
    width: 100%;
  }
`;

export const ErrorSpan = styled.span`
  color: $red;
  margin-right: 10px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(213, 219, 227, 0.6);
  margin: 24px 0;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Dot = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #8e9aa9;
  opacity: 0.4;
  border-radius: 50%;
  margin: 0 4px;
`;

export const ModalWrapper = css`
  .ant-modal-header,
  .ant-modal-footer .footer-content {
    width: 648px;
    margin: 0 auto;
  }

  .ant-modal-header {
    padding: 35px 0 24px;
    border: none;

    .ant-modal-title {
      font-size: 30px;
    }
  }

  .ant-modal-body {
    padding: 4px 0 2px;
  }

  .ant-modal-footer {
    border: none;
  }
`;

type TagColor = "red" | "yellow" | "blue";

export const TagSpan = styled.span<{ color: TagColor }>`
  font-size: 12px;
  line-height: 18px;
  font-weight: bold;
  color: $white;
  padding: 0 4px;
  border-radius: 4px;
  display: inline-block;
  background: ${({ color }) => {
    switch (color) {
      case "red":
        return "linear-gradient(262.79deg, #FA5F3C 0%, #FF9412 100%)";
      case "yellow":
        return "linear-gradient(260.13deg, #FFA600 0%, #FFD900 100%)";
      case "blue":
        return "linear-gradient(276.05deg, #0066FF 10.65%, #5CA8FF 89.35%)";
    }
  }};
  &:not(:first-child) {
    margin-left: 4px;
  }
`;

export const FullView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameTag = styled.span`
  font-size: 90%;
  font-weight: bold;
  background-color: rgba(240, 243, 247, 0.6);
  padding: 1px 4px 1px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid rgba(213, 219, 227, 0.6);
  border-radius: 4px;
`;

export const FormItemDiv = styled.div`
  &.form-item-general {
    width: 640px;
    &.form-item + &.form-item {
      margin-top: 16px;
    }
  }
  &.form-item-compact {
    width: 412px;
    &.form-item + &.form-item {
      margin-top: 8px;
    }
  }
  & .form-item {
    width: auto;
  }
  .form-item-main {
    position: relative;
    display: flex;
  }
  .form-item-extra {
    margin-top: 4px;
    width: 100%;
    padding: 14px;
    background: #f2f4f6;
    font-size: 13px;
    line-height: 1.8;
    color: #8e9aa9;
  }
  .form-item-label {
    padding-right: 12px;
    font-size: 13px;
    color: $text-secondary-light;

    &.label-right {
      text-align: right;
    }
  }
  .form-item-label,
  .form-item-control {
    line-height: 32px;
  }
  .form-item-control .form-item-error {
    line-height: 18px;
  }
  .form-item-children {
    width: 100%;
    > *:only-child {
      &.ant-select,
      &.ant-radio-group,
      &.ant-checkbox-group {
        width: 100%;
      }
    }
  }
  .form-item-error {
    color: $red;
    height: 0;
    overflow: hidden;
  }
  .form-item-error-enter-done {
    margin-top: 4px;
    height: auto;
    overflow: auto;
  }
  &.form-base-field:not(.form-base-field-array) {
    .form-item-control.field-error .form-item-error {
      > input:not(.ant-input),
      :not(.ant-select) input {
        border: 1px solid $red;
        color: $red;
      }
    }
  }
`;

export const FieldTitle = styled.div`
  color: $gray-80;
  font-weight: bold;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(213, 219, 227, 0.6);
  margin-bottom: 16px;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

export const ExpandArrow = styled.i`
  width: 8px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms ease-out 40ms;

  &:before,
  &:after {
    content: "";
    width: 1px;
    height: 6px;
    border-radius: 1px;
    background: $gray-50;
    position: relative;
    right: 2px;
    transform: rotate(-45deg);
  }

  &:after {
    transform: rotate(45deg);
    left: 1px;
  }
`;

export const WarningAlert = css`
  &.ant-alert-warning {
    border: 0;
    background: rgba(255, 187, 0, 0.1);
    border-radius: 6px;
  }
  &.ant-alert,
  .ant-alert-message {
    color: #e07f00;
    .dashed-border-bottom {
      border-bottom-color: #e07f00;
    }
  }
`;

export const NoticeAlert = css`
  display: flex;
  flex-direction: row;
  padding: 7px 12px;
  background: rgba(255, 187, 0, 0.1);
  border-radius: 6px;
  color: $fills-light-notice-notice-dark;
  font-size: 12px;
  line-height: 18px;
  .icon-wrapper {
    margin-right: 10px;
    height: 18px;
  }
`;

export const NormalAlert = css`
  display: flex;
  flex-direction: row;
  padding: 7px 12px;
  background: rgba(225, 230, 241, 0.6);
  border-radius: 6px;
  color: $text-light-secondary;
  font-size: 12px;
  line-height: 18px;
  .icon-wrapper {
    margin-right: 10px;
    height: 18px;
  }
`;

export const InfoAlert = css`
  display: flex;
  flex-direction: row;
  padding: 7px 12px;
  background: rgba(0, 136, 255, 0.1);
  border-radius: 6px;
  color: $fills-light-general-general-dark;
  font-size: 12px;
  line-height: 18px;
  .icon-wrapper {
    margin-right: 10px;
    height: 18px;
  }
`;

export const Description = styled.div`
  color: $text-light-secondary;
  margin-top: 5px;
  font-size: 12px;
  line-height: 18px;
`;

export const SelectOptionDisabledText = styled.div`
  color: $text-light-serious;
  font-size: 12px;
  white-space: pre-wrap;
`;

export const OperationWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .icon-wrapper {
    margin-right: 16px;
  }
`;

export const TertiaryText = styled.div`
  color: $text-light-tertiary;
`;

export const InputStyle = css`
  &.ant-input {
    padding: 5px 12px;
    line-height: 20px;
    color: $text-primary-light;
    border-radius: 6px;
    border-color: $strokes-light-trans-3;
    transition: height 240ms ease 8ms, border 160ms ease 8ms,
      box-shadow 160ms ease 8ms;
  }

  &.ant-input.ant-input-lg {
    padding: 8px 16px;
    line-height: 22px;
  }

  &.ant-input.ant-input-sm {
    padding: 2px 8px;
    line-height: 18px;
  }

  &.ant-input:not([disabled]),
  &.ant-input-number:not([disabled]) {
    &:hover,
    &.__pseudo-states-hover {
      border-color: $strokes-light-trans-4;
      box-shadow: $shadow-light-hover;
      z-index: $input-hover-index;
    }

    &:active,
    &:focus,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $blue;
      box-shadow: $shadow-light-active;
      z-index: $input-hover-index;
    }
  }

  &.ant-input.error:not([disabled]),
  &.ant-picker.error:not([disabled]),
  &.ant-input-number.error:not([disabled]) {
    border-color: $red;
    color: $red;

    &:hover,
    &.__pseudo-states-hover {
      border-color: $red;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $red;
      box-shadow: $shadow-light-error;
    }
  }

  &.ant-input[disabled],
  &.ant-input.ant-input-disabled,
  &.ant-input-number[disabled],
  &.ant-input-number.ant-input-number-disabled {
    background: $fills-trans-terdiary-light;
    color: $text-light-tertiary;
    border-color: $strokes-light-trans-3;
  }

  &.ant-input-affix-wrapper {
    padding: 5px 12px;
    border-radius: 6px;
    border-color: $strokes-light-trans-3;
    line-height: 20px;
    color: $text-primary-light;
    transition: height 240ms ease 8ms, border 160ms ease 8ms,
      box-shadow 160ms ease 8ms;

    .ant-input-suffix,
    .ant-input-prefix {
      color: $text-secondary-light;
    }
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-lg {
    padding: 8px 16px;
    line-height: 22px;
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-sm {
    padding: 2px 8px;
    line-height: 18px;
  }

  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled) {
    &:hover,
    &.__pseudo-states-hover {
      border-color: $strokes-light-trans-4;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.ant-input-affix-wrapper-focused,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $blue;
      box-shadow: $shadow-light-active;
    }
  }

  &.ant-input-affix-wrapper.error:not(.ant-input-affix-wrapper-disabled) {
    border-color: $red;
    > .ant-input {
      color: $red;
    }

    &:hover,
    &.__pseudo-states-hover {
      border-color: $red;
      box-shadow: $shadow-light-hover;
    }

    &:active,
    &:focus,
    &.ant-input-affix-wrapper-focused,
    &.__pseudo-states-active,
    &.__pseudo-states-focus {
      border-color: $red;
      box-shadow: $shadow-light-error;
    }
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled {
    background: $fills-trans-terdiary-light;
    color: $text-light-tertiary;
    border-color: $strokes-light-trans-3;
  }

  @at-root {
    textarea#{&}.ant-input {
      transition-property: height;
      transition-delay: 50ms;
      &.textarea-large {
        min-height: 40px;
        height: 40px;
      }
      &.textarea-large:focus {
        height: 80px;
      }
      &.textarea-middle {
        min-height: 32px;
        height: 32px;
      }
      &.textarea-middle:focus {
        height: 64px;
      }
      &.textarea-small {
        min-height: 24px;
        height: 24px;
      }
      &.textarea-small:focus {
        height: 40px;
      }
    }
  }
`;

export const KitInputStyle = css`
  input,
  &.input-tags {
    border: 1px solid rgba(213, 219, 227, 0.6);
    border-radius: 4px;
  }
  &.input-tags {
    position: relative;
    padding: 6px;
    height: 32px;
    cursor: pointer;
    transition: border 150ms;

    &:hover {
      border-color: $blue-60;
      box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
    }

    &.kit-input-suffix-wrapper {
      padding-right: 30px;
    }

    .input-tags-inner {
      display: flex;
      .tags-overflow-auto {
        display: flex;
      }
    }

    .input-tag-suffix {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      .anticon-close-circle {
        color: rgba(0, 0, 0, 0.25);
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
  &.has-focus-indicator {
    position: relative;
    overflow: hidden;

    .ant-input-prefix {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -16px;
      transition: left 150ms ease;
      opacity: 0;
    }
    &.ant-input-affix-wrapper-focused .ant-input-prefix {
      left: 8px;
      opacity: 1;
    }

    input {
      transition: margin-left 150ms ease;
      margin-left: 0px;
      &:focus {
        margin-left: 16px;
      }
    }
  }
`;

export const LeftEndInputStyle = css`
  @at-root {
    input#{&}.ant-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.ant-input-affix-wrapper {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const RightEndInputStyle = css`
  @at-root {
    input#{&}.ant-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &.ant-input-affix-wrapper {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const LeftEndSelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const RightEndSelectStyle = css`
  &.ant-select,
  &.ant-select .ant-select-selector {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .select-wrapper {
    margin-top: 12px;

    .select {
      width: 100%;
    }
  }

  .radio-wrapper {
    margin-top: 24px;
  }

  div.form-item {
    width: 100%;
  }
`;

export const Desc = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #3e4652;
  line-height: 18px;

  & + & {
    margin-top: 16px;
  }

  & + * {
    margin-top: 16px;
  }
`;

export const LightDesc = styled(Desc)`
  font-size: 12px;
  color: $gray-a60-8;
  margin-top: 12px;
`;

export const RadioDesc = styled(LightDesc)`
  line-height: 18px;
  font-weight: 500;
  margin-top: 0;
  white-space: initial;
`;

export const radioStyle = css`
  display: block;

  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 32px;
    color: #3e4652;
  }
`;

export const CannotOperationInfo = css`
  margin-top: 16px;
  padding: 8px;
  border-radius: 6px;
  background: $fills-element-light-container-general;
  color: $text-light-secondary;
  font-size: 12px;
  div {
    line-height: 20px;
    display: flex;
    align-items: center;
    word-break: break-all;
  }

  .title {
    font-weight: 700;
    line-height: 18px;
    margin: 4px 0;
  }
`;

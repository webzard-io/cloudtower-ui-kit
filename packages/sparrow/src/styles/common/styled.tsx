import { css } from "@linaria/core";
import { styled } from "@linaria/react";

export const Content = styled.div`
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

  .ant-steps-vertical .ant-steps-item {
    flex: initial;
  }

  .ant-steps-item + .ant-steps-item {
    margin-top: 4px;
  }

  .ant-steps-item-icon,
  .ant-steps-item-tail {
    display: none !important;
  }

  .ant-steps-item-container {
    padding: 0 15px;
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;

    .ant-steps-item-content {
      min-height: auto;
      white-space: nowrap;
    }
  }

  .ant-steps-item-description {
    padding-bottom: 0px;
  }

  .ant-steps-item-title {
    font-size: 13px !important;
    line-height: 20px !important;
    .step-index {
      display: inline-block;
      text-align: center;
      width: 13px;
      margin-right: 12px;
    }
  }

  .ant-steps-item-active {
    .ant-steps-item-container {
      background: rgba($blue-60, 0.1);
      .ant-steps-item-content .ant-steps-item-title {
        color: $blue-80;
      }
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-container {
      background: $gray-a60-1;
      .ant-steps-item-content .ant-steps-item-title {
        color: $text-terdiary-light !important;
      }
    }
  }

  .ant-steps-item-disabled {
    cursor: not-allowed;

    .ant-steps-item-container {
      background: $gray-a60-1;
      .ant-steps-item-content .ant-steps-item-title {
        color: $gray-80;
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

export const Error = styled.span`
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

export const Tag = styled.span<{ color: TagColor }>`
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
  justify-content: end;
  .icon-wrapper {
    margin-right: 16px;
  }
`;

export const TertiaryText = styled.div`
  color: $text-light-tertiary;
`;

import { css } from "@linaria/core";

export const CheckboxStyleContent = `
.ant-checkbox {
  height: 22px;
  display: flex;
  align-items: center;
  top: 0;
}
.ant-checkbox-checked::after {
  border: none;
}
&.ant-checkbox-wrapper:hover .ant-checkbox-inner,
&.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner {
  border-color: $fills-light-general-general;
}

.ant-checkbox .ant-checkbox-inner {
  border: 1px solid $strokes-light-trans-4;
}
.ant-checkbox.ant-checkbox-checked,
.ant-checkbox.ant-checkbox-indeterminate {
  .ant-checkbox-inner {
    border: 1px solid $fills-light-general-general;
  }
}

.ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {
  background: $fills-light-general-general;
  &:after {
    background-color: $white;
    height: 2px;
    width: 10px;
    border-radius: 2px;
  }
}

&.ant-checkbox-wrapper-disabled {
  opacity: 0.5;
  .ant-checkbox-disabled .ant-checkbox-inner {
    background: $fills-light-trans-3;
    border-color: $strokes-light-trans-4 !important;
  }
  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: $text-primary-light;
  }
  .ant-checkbox-disabled.ant-checkbox-indeterminate
    .ant-checkbox-inner:after {
    background: $text-primary-light;
  }
}

.ant-checkbox + span,
.ant-checkbox-disabled + span {
  padding: 0;
  .main {
    display: inline-block;
    margin-left: 12px;
    color: $text-primary-light;
  }
  .sub {
    margin-left: 28px;
    color: $text-secondary-light;
  }
}

&.compact {
  .ant-checkbox + span,
  .ant-checkbox-disabled + span {
    .main {
      margin-left: 8px;
    }
    .sub {
      margin-left: 24px;
    }
  }
}
`;
export const CheckboxStyle = css`
  color: $text-primary-light;
  line-height: 22px;
  display: inline-flex;
  ${CheckboxStyleContent}
`;

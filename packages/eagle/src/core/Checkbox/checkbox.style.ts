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
  border-color: $fill-outstanding-base;
}

.ant-checkbox .ant-checkbox-inner {
  border: 1px solid $stroke-neutral-trans-4;
}
.ant-checkbox.ant-checkbox-checked,
.ant-checkbox.ant-checkbox-indeterminate {
  .ant-checkbox-inner {
    border: 1px solid $fill-outstanding-base;
  }
}

.ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {
  background: $fill-outstanding-base;
  &:after {
    background-color: $fill-neutral-white;
    height: 2px;
    width: 10px;
    border-radius: 2px;
  }
}

&.ant-checkbox-wrapper-disabled {
  opacity: 0.5;
  .ant-checkbox-disabled .ant-checkbox-inner {
    background: $fill-neutral-trans-3;
    border-color: $stroke-neutral-trans-4 !important;
  }
  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: $gray-gray-80;
  }
  .ant-checkbox-disabled.ant-checkbox-indeterminate
    .ant-checkbox-inner:after {
    background: $gray-gray-80;
  }
}

.ant-checkbox + span,
.ant-checkbox-disabled + span {
  padding: 0;
  .main {
    display: inline-block;
    margin-left: 12px;
    color: $gray-gray-80;
  }
  .sub {
    margin-left: 28px;
    color: $text-neutral-tertiary;
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
  color: $gray-gray-80;
  line-height: 22px;
  display: inline-flex;
  ${CheckboxStyleContent}
`;

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
  border-color: var(--fill-outstanding-base);
}

.ant-checkbox .ant-checkbox-inner {
  border: 1px solid var(--stroke-neutral-trans-4);
}
.ant-checkbox.ant-checkbox-checked,
.ant-checkbox.ant-checkbox-indeterminate {
  .ant-checkbox-inner {
    border: 1px solid var(--fill-outstanding-base);
  }
}

.ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {
  background: var(--fill-outstanding-base);
  &:after {
    background-color: var(--fill-neutral-white);
    height: 2px;
    width: 10px;
    border-radius: 2px;
  }
}

&.ant-checkbox-wrapper-disabled {
  opacity: 0.5;
  .ant-checkbox-disabled .ant-checkbox-inner {
    background: var(--fill-neutral-trans-3);
    border-color: var(--stroke-neutral-trans-4) !important;
  }
  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: var(--gray-gray-80);
  }
  .ant-checkbox-disabled.ant-checkbox-indeterminate
    .ant-checkbox-inner:after {
    background: var(--gray-gray-80);
  }
}

.ant-checkbox + span,
.ant-checkbox-disabled + span {
  padding: 0;
  .main {
    display: inline-block;
    margin-left: 12px;
    color: var(--gray-gray-80);
  }
  .sub {
    margin-left: 28px;
    color: var(--text-neutral-tertiary);
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
  color: var(--gray-gray-80);
  line-height: 22px;
  display: inline-flex;
  ${CheckboxStyleContent}
`;

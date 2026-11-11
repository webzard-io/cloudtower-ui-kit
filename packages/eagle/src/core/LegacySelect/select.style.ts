import { css } from "@linaria/core";

export const SelectStyle = css`
  &.ant-select,
  &.ant-select div.ant-select-selector {
    border-radius: 6px;
  }

  &.ant-select {
    &.ant-select-single {
      width: 100%;
      &[data-size="small"] {
      }
      &[data-size="middle"] {
        height: 30px;
      }
      &[data-size="large"] {
      }
      color: var(--gray-gray-80);
      border-color: var(--stroke-neutral-trans-2);
      transition:
        border 160ms ease 8ms,
        box-shadow 160ms ease 8ms;
      font-size: 13px;

      &.ant-select-lg {
        height: 38px;
        font-size: 13px;
      }

      .ant-select-arrow,
      .ant-select-arrow .anticon-down {
        transition: 160ms ease;
      }

      .ant-select-arrow-loading {
        color: var(--fill-outstanding-base);
      }

      &:not(.ant-select-disabled) {
        &:hover .ant-select-selector,
        &.__pseudo-states-hover .ant-select-selector {
          border-color: var(--stroke-neutral-trans-4);
          box-shadow: var(--effect-outline-hover);
        }

        &:hover .ant-select-arrow,
        &.__pseudo-states-hover .ant-select-arrow {
          color: var(--fill-outstanding-base);
        }

        &:active,
        &:focus,
        &.ant-select-focused,
        &.ant-select-open,
        &.__pseudo-states-active,
        &.__pseudo-states-focus {
          .ant-select-selector {
            border-color: var(--fill-outstanding-base);
            box-shadow: var(--effect-outline-activeFocus);
          }
        }

        &.ant-select-open .ant-select-arrow .anticon-down {
          transform: rotate(180deg);
        }
      }

      &.ant-select-disabled .ant-select-selector {
        background: var(--fill-neutral-trans-3);
        border-color: var(--stroke-neutral-trans-3);
        cursor: "not-allowed";
      }
    }
    &.select-error:not(.ant-select-disabled) {
      .ant-select-selector {
        border-color: var(--fill-serious-base) !important;
      }

      &:hover .ant-select-arrow,
      &.__pseudo-states-hover .ant-select-arrow {
        color: var(--text-neutral-super);
      }

      &:active,
      &:focus,
      &.ant-select-focused,
      &.ant-select-open,
      &.__pseudo-states-focus,
      &.__pseudo-states-active {
        .ant-select-selector {
          border-color: var(--fill-outstanding-base);
          box-shadow: var(--effect-outline-error);
        }
      }

      &.ant-select-open .ant-select-arrow .anticon-down {
        transform: rotate(180deg);
      }
    }
  }
`;

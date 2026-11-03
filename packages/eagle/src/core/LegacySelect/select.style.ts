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
      color: $gray-gray-80;
      border-color: $stroke-neutral-trans-2;
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
        color: $fill-outstanding-base;
      }

      &:not(.ant-select-disabled) {
        &:hover .ant-select-selector,
        &.__pseudo-states-hover .ant-select-selector {
          border-color: $stroke-neutral-trans-4;
          box-shadow: $effect-outline-hover;
        }

        &:hover .ant-select-arrow,
        &.__pseudo-states-hover .ant-select-arrow {
          color: $fill-outstanding-base;
        }

        &:active,
        &:focus,
        &.ant-select-focused,
        &.ant-select-open,
        &.__pseudo-states-active,
        &.__pseudo-states-focus {
          .ant-select-selector {
            border-color: $fill-outstanding-base;
            box-shadow: $effect-outline-activeFocus;
          }
        }

        &.ant-select-open .ant-select-arrow .anticon-down {
          transform: rotate(180deg);
        }
      }

      &.ant-select-disabled .ant-select-selector {
        background: $fill-neutral-trans-3;
        border-color: $stroke-neutral-trans-3;
        cursor: "not-allowed";
      }
    }
    &.select-error:not(.ant-select-disabled) {
      .ant-select-selector {
        border-color: $fill-serious-base !important;
      }

      &:hover .ant-select-arrow,
      &.__pseudo-states-hover .ant-select-arrow {
        color: $text-neutral-super;
      }

      &:active,
      &:focus,
      &.ant-select-focused,
      &.ant-select-open,
      &.__pseudo-states-focus,
      &.__pseudo-states-active {
        .ant-select-selector {
          border-color: $fill-outstanding-base;
          box-shadow: $effect-outline-error;
        }
      }

      &.ant-select-open .ant-select-arrow .anticon-down {
        transform: rotate(180deg);
      }
    }
  }
`;

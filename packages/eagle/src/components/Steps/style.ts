import { css } from "@linaria/core";

export const StepsStyle = css`
  $item: ant-steps-item;
  --item-min-width: 60px;
  .#{$item} {
    &-tail,
    &-icon {
      display: none !important;
    }
  }
  .#{$item}.#{$item}-active {
    flex-shrink: 0 !important;
    .step-item-prefix-container {
      color: $text-colorful-outstanding;
    }
    .#{$item}-container .#{$item}-content .#{$item}-title {
      color: $text-colorful-outstanding;
      font-weight: normal;
    }
  }
  .#{$item}.#{$item}-finish {
    .#{$item}-container .#{$item}-content .#{$item}-title,
    & .#{$item}-container:hover .#{$item}-content .#{$item}-title {
      color: $text-neutral-tertiary;
    }
  }
  .#{$item}.#{$item}-wait {
    .#{$item}-container .#{$item}-content .#{$item}-title {
      color: $text-neutral-primary;
    }
  }
  .step-item-text {
    display: inline-block;
  }
  .step-item-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const HorizontalStyle = css`
  $item: ant-steps-item;
  @mixin rightTriangle($color: $fills-light-trans-1) {
    content: "";
    width: 0;
    height: 0;
    border: 13px solid transparent;
    position: absolute;
    top: 0;
    border-left: 8px solid $color;
  }
  .#{$item}-container {
    min-width: var(--item-min-width);
  }
  .#{$item}-disabled {
    cursor: not-allowed !important;
  }
  .ant-steps-horizontal.ant-steps-label-horizontal {
    flex-direction: row;
    justify-content: stretch;
    .#{$item} {
      padding: 0;
      margin-right: 4px;
      flex: 1;
      overflow: visible;
      .#{$item}-content {
        width: 100%;
        min-height: unset;
        .#{$item}-title {
          height: 26px;
          line-height: 26px;
          width: 100%;
          padding: 0;
          font-size: 12px;
          .step-count {
            margin-right: 10px;
          }
          &::after {
            display: none;
          }
        }
      }
      &:first-child {
        .#{$item}-container {
          padding-left: 8px;
          padding-right: 4px;
          border-radius: 4px 0 0 4px;
        }
      }
      &:last-child {
        margin-right: 0;
        .#{$item}-container {
          padding-right: 8px;
          padding-left: 12px;
          border-radius: 0 4px 4px 0;
        }
      }
      &:not(&:last-child) {
        &::after {
          @include rightTriangle();
          z-index: 2;
          position: relative;
          top: -50%;
          right: -100%;
        }
      }
      &:not(:first-child):not(:last-child) {
        .#{$item}-container {
          padding: 0 4px 0 12px;
        }
      }
      &:not(&:first-child) {
        &::before {
          @include rightTriangle(#fff);
          left: 0;
        }
      }
    }
    .#{$item}-active {
      max-width: calc(100% - var(--item-min-width) * 2);
      .#{$item}-container {
        background-color: $fills-light-general-general-light;
      }
      &::after {
        border-left-color: $fills-light-general-general-light !important;
      }
    }
    .#{$item}-finish {
      cursor: pointer;
      min-width: var(--item-min-width);
    }
    .#{$item}-wait,
    .#{$item}-finish {
      min-width: var(--item-min-width);
      .#{$item}-container {
        background-color: $fills-light-trans-1;
      }
    }
  }
  .ant-steps:not(.ant-steps-dot):not(.ant-steps-navigation):not(
      .ant-steps-vertical
    )
    .#{$item} {
    padding: 0;
  }
`;

export const VerticalStyle = css`
  $item: ant-steps-item;
  .ant-steps.ant-steps-vertical {
    width: 138px;
    row-gap: 2px;
    .#{$item}-container {
      padding: 0 8px;
      border-radius: 4px;
      height: 32px;
      display: flex;
      align-items: center;
      .#{$item}-content {
        min-height: auto;
        white-space: nowrap;
        & .ant-steps-item-title {
          font-size: 13px;
          line-height: 20px;
          max-width: 100%;
        }
      }
    }
    .#{$item}-active {
      .ant-steps-item-container {
        background: rgba($blue-60, 0.1);
      }
    }
  }
`;

export const HorizontalStepContentStyle = css`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  .step-item-prefix-container {
    display: inline-flex;
    align-items: center;
    width: 18px;
    height: 18px;
    color: $gray-a75-8;
    justify-content: center;
  }
`;

export const VerticalStepContentStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6px;
  font-size: 13px;
  .step-item-prefix-container {
    display: inline-flex;
    align-items: center;
    min-width: 20px;
    min-height: 20px;
    color: $gray-a75-8;
    justify-content: center;
  }
`;

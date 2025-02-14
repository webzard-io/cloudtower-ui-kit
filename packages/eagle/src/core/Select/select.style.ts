import { css } from "@linaria/core";

export const SelectStyle = css`
  &.ant-select {
    .ant-select-selection-placeholder {
      opacity: 1;
    }

    &.select-loading-value {
      pointer-events: none;
    }
  }
`;

export const SelectIconStyle = css`
  &.ant-select {
    .select-hover-suffix,
    .select-active-suffix,
    .select-expanded-suffix,
    .select-expanded-search-suffix,
    .select-focus-suffix,
    .select-error-suffix,
    .select-error-hover-suffix,
    .select-error-active-suffix,
    .select-error-expanded-suffix,
    .select-error-expanded-search-suffix,
    .select-error-focus-suffix {
      display: none;
      width: 16px;
      height: 16px;
    }

    &.ant-select-disabled {
      .select-suffix {
        opacity: 0.5;
      }
    }

    &:not(.ant-select-disabled) {
      // open, not error
      &.ant-select-open:not(.select-error) {
        &.ant-select-show-search {
          .select-suffix {
            display: none;
          }
          .select-expanded-search-suffix {
            display: inline;
          }
        }

        &:not(.ant-select-show-search) {
          .select-suffix {
            display: none;
          }
          .select-expanded-suffix {
            display: inline;
          }
        }
      }

      // not open, not error
      &:not(.ant-select-open):not(.select-error) {
        &:hover {
          .select-suffix {
            display: none;
          }
          .select-hover-suffix {
            display: inline;
          }
        }

        &:active {
          .select-suffix {
            display: none;
          }
          .select-active-suffix {
            display: inline;
          }
        }

        &:focus {
          .select-suffix {
            display: none;
          }
          .select-focus-suffix {
            display: inline;
          }
        }
      }

      // open, error
      &.select-error.ant-select-open {
        &.ant-select-show-search {
          .select-suffix {
            display: none;
          }
          .select-error-expanded-search-suffix {
            display: inline;
          }
        }

        &:not(.ant-select-show-search) {
          .select-suffix {
            display: none;
          }
          .select-error-expanded-suffix {
            display: inline;
          }
        }
      }

      // not open, error
      &.select-error:not(.ant-select-open) {
        .select-suffix {
          display: none;
        }
        .select-error-suffix {
          display: inline;
        }

        &:hover {
          .select-suffix,
          .select-error-suffix {
            display: none;
          }
          .select-error-hover-suffix {
            display: inline;
          }
        }

        &:active {
          .select-suffix,
          .select-error-suffix {
            display: none;
          }
          .select-error-active-suffix {
            display: inline;
          }
        }

        &:focus {
          .select-suffix,
          .select-error-suffix {
            display: none;
          }
          .select-error-focus-suffix {
            display: inline;
          }
        }
      }
    }
  }
`;

export const SelectSizeStyle = css`
  &.ant-select {
    .ant-select-selector {
      padding: 0 7px 0 12px;
    }

    .ant-select-arrow {
      right: 8px;
      top: 50%;
      margin-top: -8px;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
    }

    &.ant-select-lg {
      .ant-select-selector {
        padding: 0 11px 0 16px;
      }

      .ant-select-arrow {
        right: 12px;
      }
    }

    &.ant-select-sm {
      .ant-select-selector {
        padding: 0 3px 0 8px;
      }

      .ant-select-arrow {
        right: 4px;
      }
    }

    &.ant-select-single.ant-select-show-arrow {
      .ant-select-selection-item {
        padding-right: 24px;
      }
    }
  }
`;

export const PlaceholderTextStyle = css`
  color: $gray-a30-10;
`;

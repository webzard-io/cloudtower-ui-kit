import { render } from "@testing-library/react";
import { Select as AntdSelect } from "antd";
import React from "react";
import { describe, it } from "vitest";

import Input from "../../Input";
import Select from "../../Select";
import InputGroup from "..";

describe("InputGroup h5_css", () => {
  it("h5_css small", ({ expect }) => {
    const { container } = render(
      <InputGroup size="small">
        <Select input={{}}>
          <AntdSelect.Option value="Zhejiang">Zhejiang</AntdSelect.Option>
          <AntdSelect.Option value="Jiangsu">Jiangsu</AntdSelect.Option>
        </Select>
        <Input
          style={{ width: "50%" }}
          defaultValue="Xihu District, Hangzhou"
        />
      </InputGroup>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=ant-input-group,ant-input-group-sm,mocked-styled-24,
        &.ant-input-group.ant-input-group-compact {
          display: flex;
        }

        >
          <div
            class=ant-select,
        &.ant-select,
        &.ant-select .ant-select-selector {
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
            color: $text-primary-light;
            border-color: $strokes-light-trans-2;
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
              color: $fills-light-general-general;
            }

            &:not(.ant-select-disabled) {
              &:hover .ant-select-selector,
              &.__pseudo-states-hover .ant-select-selector {
                border-color: $strokes-light-trans-4;
                box-shadow: $shadow-light-hover;
              }

              &:hover .ant-select-arrow,
              &.__pseudo-states-hover .ant-select-arrow {
                color: $fills-light-general-general;
              }

              &:active,
              &:focus,
              &.ant-select-focused,
              &.ant-select-open,
              &.__pseudo-states-active,
              &.__pseudo-states-focus {
                .ant-select-selector {
                  border-color: $fills-light-general-general;
                  box-shadow: $shadow-light-active;
                }
              }

              &.ant-select-open .ant-select-arrow .anticon-down {
                transform: rotate(180deg);
              }
            }

            &.ant-select-disabled .ant-select-selector {
              background: $fills-light-trans-3;
              border-color: $strokes-light-trans-3;
              cursor: "not-allowed";
            }
          }
          &.select-error:not(.ant-select-disabled) {
            .ant-select-selector {
              border-color: $fills-light-serious-serious !important;
            }

            &:hover .ant-select-arrow,
            &.__pseudo-states-hover .ant-select-arrow {
              color: $text-light-super;
            }

            &:active,
            &:focus,
            &.ant-select-focused,
            &.ant-select-open,
            &.__pseudo-states-focus,
            &.__pseudo-states-active {
              .ant-select-selector {
                border-color: $fills-light-general-general;
                box-shadow: $shadow-light-error;
              }
            }

            &.ant-select-open .ant-select-arrow .anticon-down {
              transform: rotate(180deg);
            }
          }
        }
      ,select,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,ant-select-single,ant-select-show-arrow
            data-size=middle
          >
            <div
              class=ant-select-selector
            >
              <span
                class=ant-select-selection-search
              >
                <input
                  aria-activedescendant=rc_select_TEST_OR_SSR_list_0
                  aria-autocomplete=list
                  aria-controls=rc_select_TEST_OR_SSR_list
                  aria-haspopup=listbox
                  aria-owns=rc_select_TEST_OR_SSR_list
                  autocomplete=off
                  class=ant-select-selection-search-input
                  id=rc_select_TEST_OR_SSR
                  readonly=
                  role=combobox
                  style=opacity:,0;
                  type=search
                  unselectable=on
                  value=
                />
              </span>
              <span
                class=ant-select-selection-placeholder
              />
            </div>
            <span
              aria-hidden=true
              class=ant-select-arrow
              style=user-select:,none;
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-select-suffix
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=down
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M884,256h-75c-5.1,0-9.9,2.5-12.9,6.6L512,654.2,227.9,262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5,0-10.3,7.4-6.5,12.7l352.6,486.1c12.8,17.6,39,17.6,51.7,0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z
                  />
                </svg>
              </span>
            </span>
          </div>
          <input
            class=ant-input,
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
      ,
        @include Inter();
        font-size: 13px;
        line-height: 20px;

            style=width:,50%;
            type=text
            value=Xihu,District,,Hangzhou
          />
        </span>
      </div>
    `);
  });
});

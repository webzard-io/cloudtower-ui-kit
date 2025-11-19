import { render } from "@testing-library/react";
import dayjs from "dayjs";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsTimePicker from "..";

describe("FieldsTimePicker h5_css", () => {
  it("h5_css small", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsTimePicker
        id={"1"}
        size="small"
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: dayjs("12:08:23", "HH:mm:ss"),
        }}
        meta={{}}
      />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-picker,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: $text-primary-light;
          border-radius: 6px;
          border-color: $strokes-light-trans-3;
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
        font-size: 12px;
        line-height: 18px;
      ,ant-picker-small
        >
          <div
            class=ant-picker-input
          >
            <input
              autocomplete=off
              data-test=inputName1
              id=1
              name=inputName1
              placeholder=请选择时间
              readonly=
              size=10
              title=12:08:23
              value=12:08:23
            />
            <span
              class=ant-picker-suffix
            >
              <span
                aria-label=clock-circle
                class=anticon,anticon-clock-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=clock-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm0,820c-205.4,0-372-166.6-372-372s166.6-372,372-372,372,166.6,372,372-166.6,372-372,372z
                  />
                  <path
                    d=M686.7,638.6L544.1,535.5V288c0-4.4-3.6-8-8-8H488c-4.4,0-8,3.6-8,8v275.4c0,2.6,1.2,5,3.3,6.5l165.4,120.6c3.6,2.6,8.6,1.8,11.2-1.7l28.6-39c2.6-3.7,1.8-8.7-1.8-11.2z
                  />
                </svg>
              </span>
            </span>
            <span
              class=ant-picker-clear
            >
              <span
                aria-label=close-circle
                class=anticon,anticon-close-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=close-circle
                  fill=currentColor
                  fill-rule=evenodd
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64c247.4,0,448,200.6,448,448S759.4,960,512,960,64,759.4,64,512,264.6,64,512,64zm127.98,274.82h-.04l-.08.06L512,466.75,384.14,338.88c-.04-.05-.06-.06-.08-.06a.12.12,0,00-.07,0c-.03,0-.05.01-.09.05l-45.02,45.02a.2.2,0,00-.05.09.12.12,0,000,.07v.02a.27.27,0,00.06.06L466.75,512,338.88,639.86c-.05.04-.06.06-.06.08a.12.12,0,000,.07c0,.03.01.05.05.09l45.02,45.02a.2.2,0,00.09.05.12.12,0,00.07,0c.02,0,.04-.01.08-.05L512,557.25l127.86,127.87c.04.04.06.05.08.05a.12.12,0,00.07,0c.03,0,.05-.01.09-.05l45.02-45.02a.2.2,0,00.05-.09.12.12,0,000-.07v-.02a.27.27,0,00-.05-.06L557.25,512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12,0,000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2,0,00-.09-.05.12.12,0,00-.07,0z
                  />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css middle", ({ expect }) => {
    const inputName = "inputName2";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsTimePicker
        id={"2"}
        size="middle"
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: dayjs("12:08:23", "HH:mm:ss"),
        }}
        meta={{}}
      />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-picker,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: $text-primary-light;
          border-radius: 6px;
          border-color: $strokes-light-trans-3;
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
      ,ant-picker-middle
        >
          <div
            class=ant-picker-input
          >
            <input
              autocomplete=off
              data-test=inputName2
              id=2
              name=inputName2
              placeholder=请选择时间
              readonly=
              size=10
              title=12:08:23
              value=12:08:23
            />
            <span
              class=ant-picker-suffix
            >
              <span
                aria-label=clock-circle
                class=anticon,anticon-clock-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=clock-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm0,820c-205.4,0-372-166.6-372-372s166.6-372,372-372,372,166.6,372,372-166.6,372-372,372z
                  />
                  <path
                    d=M686.7,638.6L544.1,535.5V288c0-4.4-3.6-8-8-8H488c-4.4,0-8,3.6-8,8v275.4c0,2.6,1.2,5,3.3,6.5l165.4,120.6c3.6,2.6,8.6,1.8,11.2-1.7l28.6-39c2.6-3.7,1.8-8.7-1.8-11.2z
                  />
                </svg>
              </span>
            </span>
            <span
              class=ant-picker-clear
            >
              <span
                aria-label=close-circle
                class=anticon,anticon-close-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=close-circle
                  fill=currentColor
                  fill-rule=evenodd
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64c247.4,0,448,200.6,448,448S759.4,960,512,960,64,759.4,64,512,264.6,64,512,64zm127.98,274.82h-.04l-.08.06L512,466.75,384.14,338.88c-.04-.05-.06-.06-.08-.06a.12.12,0,00-.07,0c-.03,0-.05.01-.09.05l-45.02,45.02a.2.2,0,00-.05.09.12.12,0,000,.07v.02a.27.27,0,00.06.06L466.75,512,338.88,639.86c-.05.04-.06.06-.06.08a.12.12,0,000,.07c0,.03.01.05.05.09l45.02,45.02a.2.2,0,00.09.05.12.12,0,00.07,0c.02,0,.04-.01.08-.05L512,557.25l127.86,127.87c.04.04.06.05.08.05a.12.12,0,00.07,0c.03,0,.05-.01.09-.05l45.02-45.02a.2.2,0,00.05-.09.12.12,0,000-.07v-.02a.27.27,0,00-.05-.06L557.25,512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12,0,000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2,0,00-.09-.05.12.12,0,00-.07,0z
                  />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css large", ({ expect }) => {
    const inputName = "inputName2";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsTimePicker
        id={"3"}
        size="large"
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: dayjs("12:08:23", "HH:mm:ss"),
        }}
        meta={{}}
      />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-picker,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: $text-primary-light;
          border-radius: 6px;
          border-color: $strokes-light-trans-3;
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
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
        font-size: 14px;
        line-height: 22px;
      ,ant-picker-large
        >
          <div
            class=ant-picker-input
          >
            <input
              autocomplete=off
              data-test=inputName2
              id=3
              name=inputName2
              placeholder=请选择时间
              readonly=
              size=10
              title=12:08:23
              value=12:08:23
            />
            <span
              class=ant-picker-suffix
            >
              <span
                aria-label=clock-circle
                class=anticon,anticon-clock-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=clock-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm0,820c-205.4,0-372-166.6-372-372s166.6-372,372-372,372,166.6,372,372-166.6,372-372,372z
                  />
                  <path
                    d=M686.7,638.6L544.1,535.5V288c0-4.4-3.6-8-8-8H488c-4.4,0-8,3.6-8,8v275.4c0,2.6,1.2,5,3.3,6.5l165.4,120.6c3.6,2.6,8.6,1.8,11.2-1.7l28.6-39c2.6-3.7,1.8-8.7-1.8-11.2z
                  />
                </svg>
              </span>
            </span>
            <span
              class=ant-picker-clear
            >
              <span
                aria-label=close-circle
                class=anticon,anticon-close-circle
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=close-circle
                  fill=currentColor
                  fill-rule=evenodd
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64c247.4,0,448,200.6,448,448S759.4,960,512,960,64,759.4,64,512,264.6,64,512,64zm127.98,274.82h-.04l-.08.06L512,466.75,384.14,338.88c-.04-.05-.06-.06-.08-.06a.12.12,0,00-.07,0c-.03,0-.05.01-.09.05l-45.02,45.02a.2.2,0,00-.05.09.12.12,0,000,.07v.02a.27.27,0,00.06.06L466.75,512,338.88,639.86c-.05.04-.06.06-.06.08a.12.12,0,000,.07c0,.03.01.05.05.09l45.02,45.02a.2.2,0,00.09.05.12.12,0,00.07,0c.02,0,.04-.01.08-.05L512,557.25l127.86,127.87c.04.04.06.05.08.05a.12.12,0,00.07,0c.03,0,.05-.01.09-.05l45.02-45.02a.2.2,0,00.05-.09.12.12,0,000-.07v-.02a.27.27,0,00-.05-.06L557.25,512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12,0,000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2,0,00-.09-.05.12.12,0,00-.07,0z
                  />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    `);
  });
});

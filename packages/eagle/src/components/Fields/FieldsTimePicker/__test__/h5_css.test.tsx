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
              placeholder=Select,time
              readonly=
              size=10
              title=Invalid,Date
              value=Invalid,Date
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
                  class=
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
                  class=
                  data-icon=close-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm165.4,618.2l-66-.3L512,563.4l-99.3,118.4-66.1.3c-4.4,0-8-3.5-8-8,0-1.9.7-3.7,1.9-5.2l130.1-155L340.5,359a8.32,8.32,0,01-1.9-5.2c0-4.4,3.6-8,8-8l66.1.3L512,464.6l99.3-118.4,66-.3c4.4,0,8,3.5,8,8,0,1.9-.7,3.7-1.9,5.2L553.5,514l130,155c1.2,1.5,1.9,3.3,1.9,5.2,0,4.4-3.6,8-8,8z
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
              placeholder=Select,time
              readonly=
              size=10
              title=Invalid,Date
              value=Invalid,Date
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
                  class=
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
                  class=
                  data-icon=close-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm165.4,618.2l-66-.3L512,563.4l-99.3,118.4-66.1.3c-4.4,0-8-3.5-8-8,0-1.9.7-3.7,1.9-5.2l130.1-155L340.5,359a8.32,8.32,0,01-1.9-5.2c0-4.4,3.6-8,8-8l66.1.3L512,464.6l99.3-118.4,66-.3c4.4,0,8,3.5,8,8,0,1.9-.7,3.7-1.9,5.2L553.5,514l130,155c1.2,1.5,1.9,3.3,1.9,5.2,0,4.4-3.6,8-8,8z
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
              placeholder=Select,time
              readonly=
              size=10
              title=Invalid,Date
              value=Invalid,Date
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
                  class=
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
                  class=
                  data-icon=close-circle
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M512,64C264.6,64,64,264.6,64,512s200.6,448,448,448,448-200.6,448-448S759.4,64,512,64zm165.4,618.2l-66-.3L512,563.4l-99.3,118.4-66.1.3c-4.4,0-8-3.5-8-8,0-1.9.7-3.7,1.9-5.2l130.1-155L340.5,359a8.32,8.32,0,01-1.9-5.2c0-4.4,3.6-8,8-8l66.1.3L512,464.6l99.3-118.4,66-.3c4.4,0,8,3.5,8,8,0,1.9-.7,3.7-1.9,5.2L553.5,514l130,155c1.2,1.5,1.9,3.3,1.9,5.2,0,4.4-3.6,8-8,8z
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

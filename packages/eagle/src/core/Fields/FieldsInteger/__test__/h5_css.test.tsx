import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsInteger from "..";

describe("FieldsInteger h5_css", () => {
  it("h5_css valid_value", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsInteger
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: 20,
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
          class=ant-input-number,
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
      ,
        .ant-input-number-handler-wrap {
          display: var(--a1lk78lb-0);
        }
        .ant-input-number-input-wrap {
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--a1lk78lb-1);
          display: var(--a1lk78lb-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          padding: 5px 12px 5px 0;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--a1lk78lb-3);
          display: var(--a1lk78lb-4);
          flex: none;
          align-items: center;
          margin-right: 4px;
          cursor: auto;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-group.ant-input-group-compact > & {
          border-radius: 0;
        }

        &.ant-input-number {
          width: 100%;
          border-radius: 6px;
        }
        &.ant-input-number:not([disabled]) {
          &:focus,
          &:active,
          &.ant-input-number-focused {
            &.ant-input-number {
              border-color: $blue;
              box-shadow: $shadow-light-active;
              z-index: $input-hover-index;
            }
          }
          &.error {
            &:hover,
            &.ant-input-number-focused {
              &.ant-input-number {
                border-color: $red;
                box-shadow: $shadow-light-error;
              }
            }
          }
        }

        .ant-input-number-input {
          height: 30px;
          border: 1px;
          padding: 5px 12px;
          font-size: inherit;
        }

        &.ant-input-number-lg input {
          height: 38px;
          border: 1px;
          padding: 8px 16px;
        }

        &.ant-input-number-sm input {
          height: 22px;
          border: 1px;
          padding: 2px 8px;
        }

          style=--a1lk78lb-0:,none;,--a1lk78lb-1:,"";,--a1lk78lb-2:,none;,--a1lk78lb-3:,"";,--a1lk78lb-4:,none;
        >
          <div
            class=ant-input-number-handler-wrap
          >
            <span
              aria-label=Increase,Value
              class=ant-input-number-handler,ant-input-number-handler-up
              role=button
              unselectable=on
            >
              <span
                aria-label=up
                class=anticon,anticon-up,ant-input-number-handler-up-inner
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=up
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M890.5,755.3L537.9,269.2c-12.8-17.6-39-17.6-51.7,0L133.5,755.3A8,8,0,00140,768h75c5.1,0,9.9-2.5,12.9-6.6L512,369.8l284.1,391.6c3,4.1,7.8,6.6,12.9,6.6h75c6.5,0,10.3-7.4,6.5-12.7z
                  />
                </svg>
              </span>
            </span>
            <span
              aria-label=Decrease,Value
              class=ant-input-number-handler,ant-input-number-handler-down
              role=button
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-input-number-handler-down-inner
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
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuemax=9007199254740991
              aria-valuemin=-9007199254740991
              aria-valuenow=20
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              max=9007199254740991
              min=-9007199254740991
              name=inputName1
              role=spinbutton
              step=1
              value=20
            />
          </div>
        </div>
      </div>
    `);
  });

  // FIXME
  it("h5_css invalid_value_float", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsInteger
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: 20.1,
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
          class=ant-input-number,
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
      ,
        .ant-input-number-handler-wrap {
          display: var(--a1lk78lb-0);
        }
        .ant-input-number-input-wrap {
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--a1lk78lb-1);
          display: var(--a1lk78lb-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          padding: 5px 12px 5px 0;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--a1lk78lb-3);
          display: var(--a1lk78lb-4);
          flex: none;
          align-items: center;
          margin-right: 4px;
          cursor: auto;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-group.ant-input-group-compact > & {
          border-radius: 0;
        }

        &.ant-input-number {
          width: 100%;
          border-radius: 6px;
        }
        &.ant-input-number:not([disabled]) {
          &:focus,
          &:active,
          &.ant-input-number-focused {
            &.ant-input-number {
              border-color: $blue;
              box-shadow: $shadow-light-active;
              z-index: $input-hover-index;
            }
          }
          &.error {
            &:hover,
            &.ant-input-number-focused {
              &.ant-input-number {
                border-color: $red;
                box-shadow: $shadow-light-error;
              }
            }
          }
        }

        .ant-input-number-input {
          height: 30px;
          border: 1px;
          padding: 5px 12px;
          font-size: inherit;
        }

        &.ant-input-number-lg input {
          height: 38px;
          border: 1px;
          padding: 8px 16px;
        }

        &.ant-input-number-sm input {
          height: 22px;
          border: 1px;
          padding: 2px 8px;
        }

          style=--a1lk78lb-0:,none;,--a1lk78lb-1:,"";,--a1lk78lb-2:,none;,--a1lk78lb-3:,"";,--a1lk78lb-4:,none;
        >
          <div
            class=ant-input-number-handler-wrap
          >
            <span
              aria-label=Increase,Value
              class=ant-input-number-handler,ant-input-number-handler-up
              role=button
              unselectable=on
            >
              <span
                aria-label=up
                class=anticon,anticon-up,ant-input-number-handler-up-inner
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=up
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M890.5,755.3L537.9,269.2c-12.8-17.6-39-17.6-51.7,0L133.5,755.3A8,8,0,00140,768h75c5.1,0,9.9-2.5,12.9-6.6L512,369.8l284.1,391.6c3,4.1,7.8,6.6,12.9,6.6h75c6.5,0,10.3-7.4,6.5-12.7z
                  />
                </svg>
              </span>
            </span>
            <span
              aria-label=Decrease,Value
              class=ant-input-number-handler,ant-input-number-handler-down
              role=button
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-input-number-handler-down-inner
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
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuemax=9007199254740991
              aria-valuemin=-9007199254740991
              aria-valuenow=20.1
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              max=9007199254740991
              min=-9007199254740991
              name=inputName1
              role=spinbutton
              step=1
              value=201
            />
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css valid_value_string", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsInteger
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "20",
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
          class=ant-input-number,
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
      ,
        .ant-input-number-handler-wrap {
          display: var(--a1lk78lb-0);
        }
        .ant-input-number-input-wrap {
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--a1lk78lb-1);
          display: var(--a1lk78lb-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          padding: 5px 12px 5px 0;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--a1lk78lb-3);
          display: var(--a1lk78lb-4);
          flex: none;
          align-items: center;
          margin-right: 4px;
          cursor: auto;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-group.ant-input-group-compact > & {
          border-radius: 0;
        }

        &.ant-input-number {
          width: 100%;
          border-radius: 6px;
        }
        &.ant-input-number:not([disabled]) {
          &:focus,
          &:active,
          &.ant-input-number-focused {
            &.ant-input-number {
              border-color: $blue;
              box-shadow: $shadow-light-active;
              z-index: $input-hover-index;
            }
          }
          &.error {
            &:hover,
            &.ant-input-number-focused {
              &.ant-input-number {
                border-color: $red;
                box-shadow: $shadow-light-error;
              }
            }
          }
        }

        .ant-input-number-input {
          height: 30px;
          border: 1px;
          padding: 5px 12px;
          font-size: inherit;
        }

        &.ant-input-number-lg input {
          height: 38px;
          border: 1px;
          padding: 8px 16px;
        }

        &.ant-input-number-sm input {
          height: 22px;
          border: 1px;
          padding: 2px 8px;
        }

          style=--a1lk78lb-0:,none;,--a1lk78lb-1:,"";,--a1lk78lb-2:,none;,--a1lk78lb-3:,"";,--a1lk78lb-4:,none;
        >
          <div
            class=ant-input-number-handler-wrap
          >
            <span
              aria-label=Increase,Value
              class=ant-input-number-handler,ant-input-number-handler-up
              role=button
              unselectable=on
            >
              <span
                aria-label=up
                class=anticon,anticon-up,ant-input-number-handler-up-inner
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=up
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M890.5,755.3L537.9,269.2c-12.8-17.6-39-17.6-51.7,0L133.5,755.3A8,8,0,00140,768h75c5.1,0,9.9-2.5,12.9-6.6L512,369.8l284.1,391.6c3,4.1,7.8,6.6,12.9,6.6h75c6.5,0,10.3-7.4,6.5-12.7z
                  />
                </svg>
              </span>
            </span>
            <span
              aria-label=Decrease,Value
              class=ant-input-number-handler,ant-input-number-handler-down
              role=button
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-input-number-handler-down-inner
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
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuemax=9007199254740991
              aria-valuemin=-9007199254740991
              aria-valuenow=20
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              max=9007199254740991
              min=-9007199254740991
              name=inputName1
              role=spinbutton
              step=1
              value=20
            />
          </div>
        </div>
      </div>
    `);
  });

  // FIXME
  it("h5_css invalid_value_string", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsInteger
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "20.1",
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
          class=ant-input-number,
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
      ,
        .ant-input-number-handler-wrap {
          display: var(--a1lk78lb-0);
        }
        .ant-input-number-input-wrap {
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--a1lk78lb-1);
          display: var(--a1lk78lb-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          padding: 5px 12px 5px 0;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--a1lk78lb-3);
          display: var(--a1lk78lb-4);
          flex: none;
          align-items: center;
          margin-right: 4px;
          cursor: auto;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-group.ant-input-group-compact > & {
          border-radius: 0;
        }

        &.ant-input-number {
          width: 100%;
          border-radius: 6px;
        }
        &.ant-input-number:not([disabled]) {
          &:focus,
          &:active,
          &.ant-input-number-focused {
            &.ant-input-number {
              border-color: $blue;
              box-shadow: $shadow-light-active;
              z-index: $input-hover-index;
            }
          }
          &.error {
            &:hover,
            &.ant-input-number-focused {
              &.ant-input-number {
                border-color: $red;
                box-shadow: $shadow-light-error;
              }
            }
          }
        }

        .ant-input-number-input {
          height: 30px;
          border: 1px;
          padding: 5px 12px;
          font-size: inherit;
        }

        &.ant-input-number-lg input {
          height: 38px;
          border: 1px;
          padding: 8px 16px;
        }

        &.ant-input-number-sm input {
          height: 22px;
          border: 1px;
          padding: 2px 8px;
        }

          style=--a1lk78lb-0:,none;,--a1lk78lb-1:,"";,--a1lk78lb-2:,none;,--a1lk78lb-3:,"";,--a1lk78lb-4:,none;
        >
          <div
            class=ant-input-number-handler-wrap
          >
            <span
              aria-label=Increase,Value
              class=ant-input-number-handler,ant-input-number-handler-up
              role=button
              unselectable=on
            >
              <span
                aria-label=up
                class=anticon,anticon-up,ant-input-number-handler-up-inner
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=up
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M890.5,755.3L537.9,269.2c-12.8-17.6-39-17.6-51.7,0L133.5,755.3A8,8,0,00140,768h75c5.1,0,9.9-2.5,12.9-6.6L512,369.8l284.1,391.6c3,4.1,7.8,6.6,12.9,6.6h75c6.5,0,10.3-7.4,6.5-12.7z
                  />
                </svg>
              </span>
            </span>
            <span
              aria-label=Decrease,Value
              class=ant-input-number-handler,ant-input-number-handler-down
              role=button
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-input-number-handler-down-inner
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
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuemax=9007199254740991
              aria-valuemin=-9007199254740991
              aria-valuenow=20.1
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              max=9007199254740991
              min=-9007199254740991
              name=inputName1
              role=spinbutton
              step=1
              value=201
            />
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css invalid_value_string_alphabet", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsInteger
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "abc",
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
          class=ant-input-number,
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
      ,
        .ant-input-number-handler-wrap {
          display: var(--a1lk78lb-0);
        }
        .ant-input-number-input-wrap {
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--a1lk78lb-1);
          display: var(--a1lk78lb-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          padding: 5px 12px 5px 0;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--a1lk78lb-3);
          display: var(--a1lk78lb-4);
          flex: none;
          align-items: center;
          margin-right: 4px;
          cursor: auto;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-group.ant-input-group-compact > & {
          border-radius: 0;
        }

        &.ant-input-number {
          width: 100%;
          border-radius: 6px;
        }
        &.ant-input-number:not([disabled]) {
          &:focus,
          &:active,
          &.ant-input-number-focused {
            &.ant-input-number {
              border-color: $blue;
              box-shadow: $shadow-light-active;
              z-index: $input-hover-index;
            }
          }
          &.error {
            &:hover,
            &.ant-input-number-focused {
              &.ant-input-number {
                border-color: $red;
                box-shadow: $shadow-light-error;
              }
            }
          }
        }

        .ant-input-number-input {
          height: 30px;
          border: 1px;
          padding: 5px 12px;
          font-size: inherit;
        }

        &.ant-input-number-lg input {
          height: 38px;
          border: 1px;
          padding: 8px 16px;
        }

        &.ant-input-number-sm input {
          height: 22px;
          border: 1px;
          padding: 2px 8px;
        }

          style=--a1lk78lb-0:,none;,--a1lk78lb-1:,"";,--a1lk78lb-2:,none;,--a1lk78lb-3:,"";,--a1lk78lb-4:,none;
        >
          <div
            class=ant-input-number-handler-wrap
          >
            <span
              aria-disabled=true
              aria-label=Increase,Value
              class=ant-input-number-handler,ant-input-number-handler-up,ant-input-number-handler-up-disabled
              role=button
              unselectable=on
            >
              <span
                aria-label=up
                class=anticon,anticon-up,ant-input-number-handler-up-inner
                role=img
              >
                <svg
                  aria-hidden=true
                  data-icon=up
                  fill=currentColor
                  focusable=false
                  height=1em
                  viewBox=64,64,896,896
                  width=1em
                >
                  <path
                    d=M890.5,755.3L537.9,269.2c-12.8-17.6-39-17.6-51.7,0L133.5,755.3A8,8,0,00140,768h75c5.1,0,9.9-2.5,12.9-6.6L512,369.8l284.1,391.6c3,4.1,7.8,6.6,12.9,6.6h75c6.5,0,10.3-7.4,6.5-12.7z
                  />
                </svg>
              </span>
            </span>
            <span
              aria-disabled=true
              aria-label=Decrease,Value
              class=ant-input-number-handler,ant-input-number-handler-down,ant-input-number-handler-down-disabled
              role=button
              unselectable=on
            >
              <span
                aria-label=down
                class=anticon,anticon-down,ant-input-number-handler-down-inner
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
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuemax=9007199254740991
              aria-valuemin=-9007199254740991
              aria-valuenow=abc
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              max=9007199254740991
              min=-9007199254740991
              name=inputName1
              role=spinbutton
              step=1
              value=
            />
          </div>
        </div>
      </div>
    `);
  });
});

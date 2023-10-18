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
          display: var(--at4ovwe-0);
        }
        .ant-input-number-input-wrap {
          padding: 5px 12px;
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--at4ovwe-1);
          display: var(--at4ovwe-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--at4ovwe-3);
          display: var(--at4ovwe-4);
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
            border-color: $blue;
            box-shadow: $shadow-light-active;
            z-index: $input-hover-index;
          }
        }
        &.ant-input-number.error:not([disabled]) {
          &:hover,
          &.ant-input-number-focused {
            border-color: $red;
            box-shadow: $shadow-light-error;
          }
        }

        .ant-input-number-input {
          padding: 0;
          margin: 0;
          height: auto;
          font-size: inherit;
        }

          style=--at4ovwe-0:,none;,--at4ovwe-1:,"";,--at4ovwe-2:,none;,--at4ovwe-3:,"";,--at4ovwe-4:,none;
        >
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuenow=20
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
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
          display: var(--at4ovwe-0);
        }
        .ant-input-number-input-wrap {
          padding: 5px 12px;
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--at4ovwe-1);
          display: var(--at4ovwe-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--at4ovwe-3);
          display: var(--at4ovwe-4);
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
            border-color: $blue;
            box-shadow: $shadow-light-active;
            z-index: $input-hover-index;
          }
        }
        &.ant-input-number.error:not([disabled]) {
          &:hover,
          &.ant-input-number-focused {
            border-color: $red;
            box-shadow: $shadow-light-error;
          }
        }

        .ant-input-number-input {
          padding: 0;
          margin: 0;
          height: auto;
          font-size: inherit;
        }

          style=--at4ovwe-0:,none;,--at4ovwe-1:,"";,--at4ovwe-2:,none;,--at4ovwe-3:,"";,--at4ovwe-4:,none;
        >
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuenow=20.1
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
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
          display: var(--at4ovwe-0);
        }
        .ant-input-number-input-wrap {
          padding: 5px 12px;
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--at4ovwe-1);
          display: var(--at4ovwe-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--at4ovwe-3);
          display: var(--at4ovwe-4);
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
            border-color: $blue;
            box-shadow: $shadow-light-active;
            z-index: $input-hover-index;
          }
        }
        &.ant-input-number.error:not([disabled]) {
          &:hover,
          &.ant-input-number-focused {
            border-color: $red;
            box-shadow: $shadow-light-error;
          }
        }

        .ant-input-number-input {
          padding: 0;
          margin: 0;
          height: auto;
          font-size: inherit;
        }

          style=--at4ovwe-0:,none;,--at4ovwe-1:,"";,--at4ovwe-2:,none;,--at4ovwe-3:,"";,--at4ovwe-4:,none;
        >
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuenow=20
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
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
          display: var(--at4ovwe-0);
        }
        .ant-input-number-input-wrap {
          padding: 5px 12px;
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--at4ovwe-1);
          display: var(--at4ovwe-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--at4ovwe-3);
          display: var(--at4ovwe-4);
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
            border-color: $blue;
            box-shadow: $shadow-light-active;
            z-index: $input-hover-index;
          }
        }
        &.ant-input-number.error:not([disabled]) {
          &:hover,
          &.ant-input-number-focused {
            border-color: $red;
            box-shadow: $shadow-light-error;
          }
        }

        .ant-input-number-input {
          padding: 0;
          margin: 0;
          height: auto;
          font-size: inherit;
        }

          style=--at4ovwe-0:,none;,--at4ovwe-1:,"";,--at4ovwe-2:,none;,--at4ovwe-3:,"";,--at4ovwe-4:,none;
        >
          <div
            class=ant-input-number-input-wrap
          >
            <input
              aria-valuenow=20.1
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
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
          display: var(--at4ovwe-0);
        }
        .ant-input-number-input-wrap {
          padding: 5px 12px;
          display: inline-flex;
          line-height: 1.5715;
          height: 100%;
          width: 100%;
        }

        .ant-input-number-input-wrap::after {
          content: var(--at4ovwe-1);
          display: var(--at4ovwe-2);
          flex: none;
          align-items: center;
          margin-left: 4px;
          color: rgba(44, 56, 82, 0.6);
        }

        .ant-input-number-input-wrap::before {
          content: var(--at4ovwe-3);
          display: var(--at4ovwe-4);
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
            border-color: $blue;
            box-shadow: $shadow-light-active;
            z-index: $input-hover-index;
          }
        }
        &.ant-input-number.error:not([disabled]) {
          &:hover,
          &.ant-input-number-focused {
            border-color: $red;
            box-shadow: $shadow-light-error;
          }
        }

        .ant-input-number-input {
          padding: 0;
          margin: 0;
          height: auto;
          font-size: inherit;
        }
      ,ant-input-number-not-a-number
          style=--at4ovwe-0:,none;,--at4ovwe-1:,"";,--at4ovwe-2:,none;,--at4ovwe-3:,"";,--at4ovwe-4:,none;
        >
          <div
            class=ant-input-number-input-wrap
          >
            <input
              autocomplete=off
              class=ant-input-number-input
              data-test=inputName1
              name=inputName1
              role=spinbutton
              step=1
              value=abc
            />
          </div>
        </div>
      </div>
    `);
  });
});

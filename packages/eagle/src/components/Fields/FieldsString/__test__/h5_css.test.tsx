import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsString from "..";

describe("Input h5_css", () => {
  it("h5_css without_tags", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsString
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
        }}
        meta={{}}
      />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <input
          autocomplete=off
          class=ant-input,
        input,
        &.input-tags {
          border: 1px solid rgba(213, 219, 227, 0.6);
          border-radius: 4px;
        }
        &.input-tags {
          position: relative;
          padding: 6px;
          height: 32px;
          cursor: pointer;
          transition: border 150ms;

          &:hover {
            border-color: $blue-60;
            box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
          }

          &.kit-input-suffix-wrapper {
            padding-right: 30px;
          }

          .input-tags-inner {
            display: flex;
            .tags-overflow-auto {
              display: flex;
            }
          }

          .input-tag-suffix {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            .anticon-close-circle {
              color: rgba(0, 0, 0, 0.25);
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
        &.has-focus-indicator {
          position: relative;
          overflow: hidden;

          .ant-input-prefix {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -16px;
            transition: left 150ms ease;
            opacity: 0;
          }
          &.ant-input-affix-wrapper-focused .ant-input-prefix {
            left: 8px;
            opacity: 1;
          }

          input {
            transition: margin-left 150ms ease;
            margin-left: 0px;
            &:focus {
              margin-left: 16px;
            }
          }
        }
      ,
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
            z-index: 1;
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

          data-test=inputName1
          name=inputName1
          type=text
          value=test,value,1
        />
      </div>
    `);
  });
  it("h5_css with_one_tag", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(
      <FieldsString
        tags={["test_tag"]}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
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
          class=
        input,
        &.input-tags {
          border: 1px solid rgba(213, 219, 227, 0.6);
          border-radius: 4px;
        }
        &.input-tags {
          position: relative;
          padding: 6px;
          height: 32px;
          cursor: pointer;
          transition: border 150ms;

          &:hover {
            border-color: $blue-60;
            box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
          }

          &.kit-input-suffix-wrapper {
            padding-right: 30px;
          }

          .input-tags-inner {
            display: flex;
            .tags-overflow-auto {
              display: flex;
            }
          }

          .input-tag-suffix {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            .anticon-close-circle {
              color: rgba(0, 0, 0, 0.25);
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
        &.has-focus-indicator {
          position: relative;
          overflow: hidden;

          .ant-input-prefix {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -16px;
            transition: left 150ms ease;
            opacity: 0;
          }
          &.ant-input-affix-wrapper-focused .ant-input-prefix {
            left: 8px;
            opacity: 1;
          }

          input {
            transition: margin-left 150ms ease;
            margin-left: 0px;
            &:focus {
              margin-left: 16px;
            }
          }
        }
      ,input-tags
        >
          <div
            class=input-tags-inner
          >
            <span
              class=
        display: inline-block;

            >
              <span
                class=tags-overflow-auto
              >
                <span
                  class=
        height: 18px;
        line-height: 18px;
        padding: 0 4px;
        border-radius: 4px;
        background: rgba(235, 239, 245, 0.6);
        border: 1px solid rgba(223, 228, 235, 0.6);
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-right: 4px;

                >
                  test_tag
                </span>
              </span>
            </span>
          </div>
          <span
            class=input-tag-suffix
          />
        </div>
      </div>
    `);
  });
  it("h5_css with_tags", ({ expect }) => {
    const inputName = "inputName1";
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const tags = ["test_tag", "test_tag2"];

    const { container } = render(
      <FieldsString
        tags={tags}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
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
          class=
        input,
        &.input-tags {
          border: 1px solid rgba(213, 219, 227, 0.6);
          border-radius: 4px;
        }
        &.input-tags {
          position: relative;
          padding: 6px;
          height: 32px;
          cursor: pointer;
          transition: border 150ms;

          &:hover {
            border-color: $blue-60;
            box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
          }

          &.kit-input-suffix-wrapper {
            padding-right: 30px;
          }

          .input-tags-inner {
            display: flex;
            .tags-overflow-auto {
              display: flex;
            }
          }

          .input-tag-suffix {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            .anticon-close-circle {
              color: rgba(0, 0, 0, 0.25);
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
        &.has-focus-indicator {
          position: relative;
          overflow: hidden;

          .ant-input-prefix {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -16px;
            transition: left 150ms ease;
            opacity: 0;
          }
          &.ant-input-affix-wrapper-focused .ant-input-prefix {
            left: 8px;
            opacity: 1;
          }

          input {
            transition: margin-left 150ms ease;
            margin-left: 0px;
            &:focus {
              margin-left: 16px;
            }
          }
        }
      ,input-tags
        >
          <div
            class=input-tags-inner
          >
            <span
              class=
        display: inline-block;

            >
              <span
                class=tags-overflow-auto
              >
                <span
                  class=
        height: 18px;
        line-height: 18px;
        padding: 0 4px;
        border-radius: 4px;
        background: rgba(235, 239, 245, 0.6);
        border: 1px solid rgba(223, 228, 235, 0.6);
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-right: 4px;

                >
                  test_tag
                </span>
                <span
                  class=
        height: 18px;
        line-height: 18px;
        padding: 0 4px;
        border-radius: 4px;
        background: rgba(235, 239, 245, 0.6);
        border: 1px solid rgba(223, 228, 235, 0.6);
        display: flex;
        align-items: center;
        white-space: nowrap;
        margin-right: 4px;

                >
                  test_tag2
                </span>
              </span>
            </span>
          </div>
          <span
            class=input-tag-suffix
          />
        </div>
      </div>
    `);
  });

  it("Input onChange", ({ expect }) => {
    const inputName = "inputName1";

    const tags: string[] = [];
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const value = "test value 1";
    const newValue = "new value";

    const { container } = render(
      <FieldsString
        tags={tags}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: value,
        }}
        meta={{}}
      />,
    );

    const input = screen.getByDisplayValue<HTMLInputElement>(value);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: newValue },
    });

    expect(onChange).toBeCalledTimes(1);

    // component is data driven, it should not change value.
    expect(input.value).toBe(value);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <input
          autocomplete=off
          class=ant-input,
        input,
        &.input-tags {
          border: 1px solid rgba(213, 219, 227, 0.6);
          border-radius: 4px;
        }
        &.input-tags {
          position: relative;
          padding: 6px;
          height: 32px;
          cursor: pointer;
          transition: border 150ms;

          &:hover {
            border-color: $blue-60;
            box-shadow: 0 0 0px 2px rgba($blue-60, 0.1);
          }

          &.kit-input-suffix-wrapper {
            padding-right: 30px;
          }

          .input-tags-inner {
            display: flex;
            .tags-overflow-auto {
              display: flex;
            }
          }

          .input-tag-suffix {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            .anticon-close-circle {
              color: rgba(0, 0, 0, 0.25);
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
        }
        &.has-focus-indicator {
          position: relative;
          overflow: hidden;

          .ant-input-prefix {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -16px;
            transition: left 150ms ease;
            opacity: 0;
          }
          &.ant-input-affix-wrapper-focused .ant-input-prefix {
            left: 8px;
            opacity: 1;
          }

          input {
            transition: margin-left 150ms ease;
            margin-left: 0px;
            &:focus {
              margin-left: 16px;
            }
          }
        }
      ,
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
            z-index: 1;
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

          data-test=inputName1
          name=inputName1
          type=text
          value=test,value,1
        />
      </div>
    `);
  });
});

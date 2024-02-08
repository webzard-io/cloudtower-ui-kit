import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import SearchInput from "..";

describe("SearchInput h5_css", () => {
  it("h5_css small", ({ expect }) => {
    const onChange = vi.fn();
    const { container } = render(<SearchInput onChange={onChange} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=
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
      ,ant-input-affix-wrapper
          style=width:,276px;
        >
          <span
            class=ant-input-prefix
          >
            <span
              aria-label=search
              class=anticon,anticon-search
              role=img
            >
              <svg
                aria-hidden=true
                data-icon=search
                fill=currentColor
                focusable=false
                height=1em
                viewBox=64,64,896,896
                width=1em
              >
                <path
                  d=M909.6,854.5L649.9,594.8C690.2,542.7,712,479,712,412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5,31.3-212.1,87.9C143.2,256.5,112,331.8,112,412c0,80.1,31.3,155.5,87.9,212.1C256.5,680.8,331.8,712,412,712c67,0,130.6-21.8,182.7-62l259.7,259.6a8.2,8.2,0,0011.6,0l43.6-43.5a8.2,8.2,0,000-11.6zM570.4,570.4C528,612.7,471.8,636,412,636s-116-23.3-158.4-65.6C211.3,528,188,471.8,188,412s23.3-116.1,65.6-158.4C296,211.3,352.2,188,412,188s116.1,23.2,158.4,65.6S636,352.2,636,412s-23.3,116.1-65.6,158.4z
                />
              </svg>
            </span>
          </span>
          <input
            class=ant-input
            type=text
            value=
          />
        </span>
      </div>
    `);
  });

  it("h5_css middle", ({ expect }) => {
    const onChange = vi.fn();
    const { container } = render(<SearchInput onChange={onChange} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=
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
      ,ant-input-affix-wrapper
          style=width:,276px;
        >
          <span
            class=ant-input-prefix
          >
            <span
              aria-label=search
              class=anticon,anticon-search
              role=img
            >
              <svg
                aria-hidden=true
                data-icon=search
                fill=currentColor
                focusable=false
                height=1em
                viewBox=64,64,896,896
                width=1em
              >
                <path
                  d=M909.6,854.5L649.9,594.8C690.2,542.7,712,479,712,412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5,31.3-212.1,87.9C143.2,256.5,112,331.8,112,412c0,80.1,31.3,155.5,87.9,212.1C256.5,680.8,331.8,712,412,712c67,0,130.6-21.8,182.7-62l259.7,259.6a8.2,8.2,0,0011.6,0l43.6-43.5a8.2,8.2,0,000-11.6zM570.4,570.4C528,612.7,471.8,636,412,636s-116-23.3-158.4-65.6C211.3,528,188,471.8,188,412s23.3-116.1,65.6-158.4C296,211.3,352.2,188,412,188s116.1,23.2,158.4,65.6S636,352.2,636,412s-23.3,116.1-65.6,158.4z
                />
              </svg>
            </span>
          </span>
          <input
            class=ant-input
            type=text
            value=
          />
        </span>
      </div>
    `);
  });

  it("h5_css large", ({ expect }) => {
    const onChange = vi.fn();
    const { container } = render(<SearchInput onChange={onChange} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=
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
      ,ant-input-affix-wrapper
          style=width:,276px;
        >
          <span
            class=ant-input-prefix
          >
            <span
              aria-label=search
              class=anticon,anticon-search
              role=img
            >
              <svg
                aria-hidden=true
                data-icon=search
                fill=currentColor
                focusable=false
                height=1em
                viewBox=64,64,896,896
                width=1em
              >
                <path
                  d=M909.6,854.5L649.9,594.8C690.2,542.7,712,479,712,412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5,31.3-212.1,87.9C143.2,256.5,112,331.8,112,412c0,80.1,31.3,155.5,87.9,212.1C256.5,680.8,331.8,712,412,712c67,0,130.6-21.8,182.7-62l259.7,259.6a8.2,8.2,0,0011.6,0l43.6-43.5a8.2,8.2,0,000-11.6zM570.4,570.4C528,612.7,471.8,636,412,636s-116-23.3-158.4-65.6C211.3,528,188,471.8,188,412s23.3-116.1,65.6-158.4C296,211.3,352.2,188,412,188s116.1,23.2,158.4,65.6S636,352.2,636,412s-23.3,116.1-65.6,158.4z
                />
              </svg>
            </span>
          </span>
          <input
            class=ant-input
            type=text
            value=
          />
        </span>
      </div>
    `);
  });
});

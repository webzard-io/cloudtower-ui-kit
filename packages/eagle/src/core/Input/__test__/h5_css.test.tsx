import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import Input from "..";

describe("Input h5_css", () => {
  it("h5_css small", ({ expect }) => {
    const { container } = render(<Input id={"1"} size="small" />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <input
          class=ant-input,ant-input-sm,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: var(--gray-gray-80);
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
            z-index: $input-hover-index;
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
            z-index: $input-hover-index;
          }
        }

        &.ant-input.error:not([disabled]),
        &.ant-picker.error:not([disabled]),
        &.ant-input-number.error:not([disabled]) {
          border-color: #e75a3a;
          color: #e75a3a;

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input[disabled],
        &.ant-input.ant-input-disabled,
        &.ant-input-number[disabled],
        &.ant-input-number.ant-input-number-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
        }

        &.ant-input-affix-wrapper {
          padding: 5px 12px;
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
          line-height: 20px;
          color: var(--gray-gray-80);
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
            box-shadow 160ms ease 8ms;

          .ant-input-suffix,
          .ant-input-prefix {
            color: var(--text-neutral-tertiary);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
          }
        }

        &.ant-input-affix-wrapper.error:not(.ant-input-affix-wrapper-disabled) {
          border-color: #e75a3a;
          > .ant-input {
            color: #e75a3a;
          }

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
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
      ,
        .ant-input-sm {
          line-height: 18px;
        }

          id=1
          type=text
          value=
        />
      </div>
    `);
  });

  it("h5_css middle", ({ expect }) => {
    const { container } = render(<Input id={"2"} size="middle" />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <input
          class=ant-input,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: var(--gray-gray-80);
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
            z-index: $input-hover-index;
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
            z-index: $input-hover-index;
          }
        }

        &.ant-input.error:not([disabled]),
        &.ant-picker.error:not([disabled]),
        &.ant-input-number.error:not([disabled]) {
          border-color: #e75a3a;
          color: #e75a3a;

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input[disabled],
        &.ant-input.ant-input-disabled,
        &.ant-input-number[disabled],
        &.ant-input-number.ant-input-number-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
        }

        &.ant-input-affix-wrapper {
          padding: 5px 12px;
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
          line-height: 20px;
          color: var(--gray-gray-80);
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
            box-shadow 160ms ease 8ms;

          .ant-input-suffix,
          .ant-input-prefix {
            color: var(--text-neutral-tertiary);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
          }
        }

        &.ant-input-affix-wrapper.error:not(.ant-input-affix-wrapper-disabled) {
          border-color: #e75a3a;
          > .ant-input {
            color: #e75a3a;
          }

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
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
        .ant-input-sm {
          line-height: 18px;
        }

          id=2
          type=text
          value=
        />
      </div>
    `);
  });

  it("h5_css large", ({ expect }) => {
    const { container } = render(<Input id={"3"} size="large" />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <input
          class=ant-input,ant-input-lg,
        &.ant-input {
          padding: 5px 12px;
          line-height: 20px;
          color: var(--gray-gray-80);
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
            z-index: $input-hover-index;
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
            z-index: $input-hover-index;
          }
        }

        &.ant-input.error:not([disabled]),
        &.ant-picker.error:not([disabled]),
        &.ant-input-number.error:not([disabled]) {
          border-color: #e75a3a;
          color: #e75a3a;

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input[disabled],
        &.ant-input.ant-input-disabled,
        &.ant-input-number[disabled],
        &.ant-input-number.ant-input-number-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
        }

        &.ant-input-affix-wrapper {
          padding: 5px 12px;
          border-radius: 6px;
          border-color: var(--stroke-neutral-trans-3);
          line-height: 20px;
          color: var(--gray-gray-80);
          transition:
            height 240ms ease 8ms,
            border 160ms ease 8ms,
            box-shadow 160ms ease 8ms;

          .ant-input-suffix,
          .ant-input-prefix {
            color: var(--text-neutral-tertiary);
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
            border-color: var(--stroke-neutral-trans-4);
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #0096ff;
            box-shadow: var(--effect-outline-activeFocus);
          }
        }

        &.ant-input-affix-wrapper.error:not(.ant-input-affix-wrapper-disabled) {
          border-color: #e75a3a;
          > .ant-input {
            color: #e75a3a;
          }

          &:hover,
          &.__pseudo-states-hover {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-hover);
          }

          &:active,
          &:focus,
          &.ant-input-affix-wrapper-focused,
          &.__pseudo-states-active,
          &.__pseudo-states-focus {
            border-color: #e75a3a;
            box-shadow: var(--effect-outline-error);
          }
        }

        &.ant-input-affix-wrapper.ant-input-affix-wrapper-disabled {
          background: var(--fill-neutral-trans-3);
          color: rgba(0, 21, 64, 0.3);
          border-color: var(--stroke-neutral-trans-3);
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
      ,
        .ant-input-sm {
          line-height: 18px;
        }

          id=3
          type=text
          value=
        />
      </div>
    `);
  });
});

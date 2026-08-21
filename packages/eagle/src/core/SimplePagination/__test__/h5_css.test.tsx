import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import SimplePagination from "..";

describe("SimplePagination h5_css", () => {
  it("h5_css first page", ({ expect }) => {
    const { container } = render(
      <SimplePagination current={1} count={300000} size={50} />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        color: $text-light-secondary;
        font-size: 12px;
        line-height: 24px;

        .pagination-left {
          padding: 2px 8px;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: $fills-interaction-light-general-hover;
            color: $text-light-general;
          }
          .icon-inner {
            margin-left: 4px;
          }
        }

        .pagination-right {
          display: flex;
          align-items: center;
          color: $blue-60;
          font-weight: bold;
          .icon-inner {
            margin-left: 4px;
          }
          .prev-btn,
          .next-btn {
            padding: 0 8px;
            > span {
              color: $text-light-general;
            }
          }

          .next-btn {
            .icon-inner {
              transform: rotate(180deg);
            }
          }
        }
      ,pagination-wrapper
        >
          <span
            class=
        @include Inter();
        font-size: 13px;
        line-height: 20px;

          >
            共 300000 项
          </span>
          <span
            class=pagination-right
          >
            <div
              class=ant-input-number,ant-input-number-sm,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,
        height: 24px;
        width: 56px !important;
        margin-right: 4px;
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
                  aria-valuenow=1
                  autocomplete=off
                  class=ant-input-number-input
                  max=9007199254740991
                  min=-9007199254740991
                  role=spinbutton
                  step=1
                  value=1
                />
              </div>
            </div>
            <span
              class=
                    color: $text-secondary-light;
                  ,
        @include Inter();
        @include Uppercase();
        font-size: 13px;
        line-height: 20px;

            >
              / 6000
            </span>
            <button
              class=ant-btn,next-btn,
        &.ant-btn-icon-only {
          justify-content: center;
        }
        &.ant-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          border-radius: 6px;
          line-height: 22px;
          transition:
            transform 160ms ease,
            background 160ms ease,
            opacity 160ms ease;
          transform: scale(var(--scale)) translateY(var(--transY)) translateZ(0);

          padding: 5px 12px;

          &.ant-btn-lg {
            height: 40px;
            line-height: 24px;
            padding: 8px 16px;
          }

          &.ant-btn-sm {
            height: 24px;
            line-height: 20px;
            padding: 2px 8px;
          }

          &.ant-btn-link {
            padding: 0;
          }

          &.ant-btn-circle,
          &.ant-btn-circle-outline {
            border-radius: 50%;
          }
        }

        .ant-btn-loading-icon span.anticon {
          margin-right: 8px;
          padding-right: 0px;
        }

        &.ant-btn.ant-btn-primary,
        &.ant-btn.ant-btn-secondary,
        &.ant-btn.ant-btn-tertiary,
        &.ant-btn.ant-btn-ordinary,
        &.ant-btn.ant-btn-ordinary-onTint,
        &.ant-btn.ant-btn-quiet {
          color: var(--color, #06101f);
          font-weight: var(--font-weight);
          background: var(--background-color, #fff);
          border-width: var(--border-width, 1px);
          border-color: var(--border-color, #d9d9d9);

          &[ant-click-animating-without-extra-node="true"]:after {
            display: none;
          }

          .anticon {
            color: var(--color, inherit);
          }

          &:hover,
          &.__pseudo-states-hover {
            background: var(--background-color-hover, var(--background-color));
            border-color: var(--border-color-hover, var(--border-color, transparent));
          }

          &:active,
          &.__pseudo-states-active {
            --scale: 1;
            --transY: 1px;
            background: var(--background-color-active, var(--background-color));
            border-color: var(
              --border-color-active,
              var(--border-color, transparent)
            );
          }

          &:focus,
          &.__pseudo-states-focus {
            background: var(--background-color-focus, var(--background-color));
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
            border-color: var(--border-color-focus, var(--border-color, transparent));
          }

          &[disabled],
          &[disabled]:hover,
          &[disabled]:focus,
          &[disabled]:active {
            color: var(--color-disabled, var(--color));
            background: var(--background-color-disabled, var(--background-color));
            border-color: var(
              --border-color-disabled,
              var(--border-color, transparent)
            );
            opacity: 0.5;
            --transY: 0;
          }
        }

        &.ant-btn-link {
          &[disabled] {
            color: $text-light-general;
            opacity: 0.5;
          }

          &:hover,
          &:focus {
            color: $link-outstandinghover;
          }

          &:active {
            color: $link-outstandingactive;
          }
        }

        &.ant-btn-primary {
          --color: #{$white};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general};
          --background-color-hover: #{$fills-light-general-general-bright};
          --background-color-active: #{$fills-light-general-general-dark};
          --background-color-focus: #{$fills-light-general-general};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-primary.ant-btn-dangerous {
          --background-color: #{$fills-light-serious-serious};
          --background-color-hover: #{$fills-light-serious-serious-bright};
          --background-color-active: #{$fills-light-serious-serious-dark};
          --background-color-focus: #{$fills-light-serious-serious-bright};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-primary.btn-primary-orange {
          --background-color: #{$fills-light-notice-notice};
          --background-color-hover: #{$fills-light-notice-notice-bright};
          --background-color-active: #{$fills-light-notice-notice-dark};
          --background-color-focus: #{$fills-light-notice-notice};
        }

        &.ant-btn-secondary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general-light};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$fills-light-general-general-light};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-secondary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$fills-light-serious-serious-light};
          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --background-color-focus: #{$fills-light-serious-serious-light};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};
        }

        &.ant-btn-secondary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$fills-light-notice-notice-light};
          --background-color-hover: #{$fills-interaction-light-notice-hover};
          --background-color-active: #{$fills-interaction-light-notice-active};
          --background-color-focus: #{$fills-light-notice-notice-light};
        }

        &.ant-btn-tertiary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$white};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$white};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 187, 0, 0.1));
            }
          }
        }

        &.ant-btn-ordinary {
          --color: #{$text-light-super};
          --border-color: #{$strokes-light-opaque-3};

          --background-color: #{$white};
          --background-color-hover: #{$fills-light-opaque-2};
          --background-color-active: #{$fills-light-opaque-3};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);

          &:focus,
          &.__pseudo-states-focus {
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
          }
        }

        &.ant-btn-ordinary.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$fills-light-general-general};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.16),
              rgba(0, 136, 255, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.2),
              rgba(0, 136, 255, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);
        }

        &.ant-btn-ordinary.ant-btn-dangerous {
          --color: #{$text-light-serious};
          --border-color: #{$fills-light-serious-serious};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.16),
              rgba(255, 74, 74, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.2),
              rgba(255, 74, 74, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-ordinary-onTint {
          --color: #{$text-light-super};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet {
          --color: #{$text-light-secondary};
          --border-width: 0;

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
          box-shadow: none;
        }

        &.ant-btn-quiet.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet.quiet-blue {
          --color: #{$text-light-general};

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        .button-prefix-icon {
          margin-right: 8px;
          display: inline-flex;
        }
        .button-suffix-icon {
          margin-left: 8px;
          display: inline-flex;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
        }
      ,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,ant-btn-quiet,ant-btn-icon-only,ant-btn-sm
              style=margin-left:,8px;
              type=button
            >
              <span
                class=
        display: inline-flex;
        align-items: center;

        .icon-inner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon-inner + span,
        span + .icon-inner.suffix {
          margin-left: 4px;
        }
        &.is-rotate {
          img,
          svg {
            animation: rotate 680ms linear infinite;
          }
        }
      ,icon-wrapper
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=ArrowChevronLeftSmall16BoldBlueIcon
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M9.06,3.757a1,1,0,011.415,1.414L7.646,8l2.829,2.828a1,1,0,01-1.414,1.415L5.949,9.13c-.396-.396-.594-.594-.668-.822a1,1,0,010-.618c.074-.228.272-.426.668-.822l3.112-3.112z
                      fill=#0080FF
                    />
                  </svg>
                </span>
              </span>
            </button>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css middle page", ({ expect }) => {
    const { container } = render(
      <SimplePagination current={6000} count={300000} size={50} />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        color: $text-light-secondary;
        font-size: 12px;
        line-height: 24px;

        .pagination-left {
          padding: 2px 8px;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: $fills-interaction-light-general-hover;
            color: $text-light-general;
          }
          .icon-inner {
            margin-left: 4px;
          }
        }

        .pagination-right {
          display: flex;
          align-items: center;
          color: $blue-60;
          font-weight: bold;
          .icon-inner {
            margin-left: 4px;
          }
          .prev-btn,
          .next-btn {
            padding: 0 8px;
            > span {
              color: $text-light-general;
            }
          }

          .next-btn {
            .icon-inner {
              transform: rotate(180deg);
            }
          }
        }
      ,pagination-wrapper
        >
          <span
            class=
        @include Inter();
        font-size: 13px;
        line-height: 20px;

          >
            共 300000 项
          </span>
          <span
            class=pagination-right
          >
            <button
              class=ant-btn,prev-btn,
        &.ant-btn-icon-only {
          justify-content: center;
        }
        &.ant-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          border-radius: 6px;
          line-height: 22px;
          transition:
            transform 160ms ease,
            background 160ms ease,
            opacity 160ms ease;
          transform: scale(var(--scale)) translateY(var(--transY)) translateZ(0);

          padding: 5px 12px;

          &.ant-btn-lg {
            height: 40px;
            line-height: 24px;
            padding: 8px 16px;
          }

          &.ant-btn-sm {
            height: 24px;
            line-height: 20px;
            padding: 2px 8px;
          }

          &.ant-btn-link {
            padding: 0;
          }

          &.ant-btn-circle,
          &.ant-btn-circle-outline {
            border-radius: 50%;
          }
        }

        .ant-btn-loading-icon span.anticon {
          margin-right: 8px;
          padding-right: 0px;
        }

        &.ant-btn.ant-btn-primary,
        &.ant-btn.ant-btn-secondary,
        &.ant-btn.ant-btn-tertiary,
        &.ant-btn.ant-btn-ordinary,
        &.ant-btn.ant-btn-ordinary-onTint,
        &.ant-btn.ant-btn-quiet {
          color: var(--color, #06101f);
          font-weight: var(--font-weight);
          background: var(--background-color, #fff);
          border-width: var(--border-width, 1px);
          border-color: var(--border-color, #d9d9d9);

          &[ant-click-animating-without-extra-node="true"]:after {
            display: none;
          }

          .anticon {
            color: var(--color, inherit);
          }

          &:hover,
          &.__pseudo-states-hover {
            background: var(--background-color-hover, var(--background-color));
            border-color: var(--border-color-hover, var(--border-color, transparent));
          }

          &:active,
          &.__pseudo-states-active {
            --scale: 1;
            --transY: 1px;
            background: var(--background-color-active, var(--background-color));
            border-color: var(
              --border-color-active,
              var(--border-color, transparent)
            );
          }

          &:focus,
          &.__pseudo-states-focus {
            background: var(--background-color-focus, var(--background-color));
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
            border-color: var(--border-color-focus, var(--border-color, transparent));
          }

          &[disabled],
          &[disabled]:hover,
          &[disabled]:focus,
          &[disabled]:active {
            color: var(--color-disabled, var(--color));
            background: var(--background-color-disabled, var(--background-color));
            border-color: var(
              --border-color-disabled,
              var(--border-color, transparent)
            );
            opacity: 0.5;
            --transY: 0;
          }
        }

        &.ant-btn-link {
          &[disabled] {
            color: $text-light-general;
            opacity: 0.5;
          }

          &:hover,
          &:focus {
            color: $link-outstandinghover;
          }

          &:active {
            color: $link-outstandingactive;
          }
        }

        &.ant-btn-primary {
          --color: #{$white};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general};
          --background-color-hover: #{$fills-light-general-general-bright};
          --background-color-active: #{$fills-light-general-general-dark};
          --background-color-focus: #{$fills-light-general-general};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-primary.ant-btn-dangerous {
          --background-color: #{$fills-light-serious-serious};
          --background-color-hover: #{$fills-light-serious-serious-bright};
          --background-color-active: #{$fills-light-serious-serious-dark};
          --background-color-focus: #{$fills-light-serious-serious-bright};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-primary.btn-primary-orange {
          --background-color: #{$fills-light-notice-notice};
          --background-color-hover: #{$fills-light-notice-notice-bright};
          --background-color-active: #{$fills-light-notice-notice-dark};
          --background-color-focus: #{$fills-light-notice-notice};
        }

        &.ant-btn-secondary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general-light};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$fills-light-general-general-light};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-secondary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$fills-light-serious-serious-light};
          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --background-color-focus: #{$fills-light-serious-serious-light};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};
        }

        &.ant-btn-secondary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$fills-light-notice-notice-light};
          --background-color-hover: #{$fills-interaction-light-notice-hover};
          --background-color-active: #{$fills-interaction-light-notice-active};
          --background-color-focus: #{$fills-light-notice-notice-light};
        }

        &.ant-btn-tertiary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$white};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$white};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 187, 0, 0.1));
            }
          }
        }

        &.ant-btn-ordinary {
          --color: #{$text-light-super};
          --border-color: #{$strokes-light-opaque-3};

          --background-color: #{$white};
          --background-color-hover: #{$fills-light-opaque-2};
          --background-color-active: #{$fills-light-opaque-3};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);

          &:focus,
          &.__pseudo-states-focus {
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
          }
        }

        &.ant-btn-ordinary.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$fills-light-general-general};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.16),
              rgba(0, 136, 255, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.2),
              rgba(0, 136, 255, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);
        }

        &.ant-btn-ordinary.ant-btn-dangerous {
          --color: #{$text-light-serious};
          --border-color: #{$fills-light-serious-serious};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.16),
              rgba(255, 74, 74, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.2),
              rgba(255, 74, 74, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-ordinary-onTint {
          --color: #{$text-light-super};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet {
          --color: #{$text-light-secondary};
          --border-width: 0;

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
          box-shadow: none;
        }

        &.ant-btn-quiet.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet.quiet-blue {
          --color: #{$text-light-general};

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        .button-prefix-icon {
          margin-right: 8px;
          display: inline-flex;
        }
        .button-suffix-icon {
          margin-left: 8px;
          display: inline-flex;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
        }
      ,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,ant-btn-quiet,ant-btn-icon-only,ant-btn-sm
              style=margin-right:,8px;
              type=button
            >
              <span
                class=
        display: inline-flex;
        align-items: center;

        .icon-inner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon-inner + span,
        span + .icon-inner.suffix {
          margin-left: 4px;
        }
        &.is-rotate {
          img,
          svg {
            animation: rotate 680ms linear infinite;
          }
        }
      ,icon-wrapper
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=ArrowChevronLeftSmall16BoldBlueIcon
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M9.06,3.757a1,1,0,011.415,1.414L7.646,8l2.829,2.828a1,1,0,01-1.414,1.415L5.949,9.13c-.396-.396-.594-.594-.668-.822a1,1,0,010-.618c.074-.228.272-.426.668-.822l3.112-3.112z
                      fill=#0080FF
                    />
                  </svg>
                </span>
              </span>
            </button>
            <div
              class=ant-input-number,ant-input-number-sm,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,
        height: 24px;
        width: 56px !important;
        margin-right: 4px;
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
                  aria-valuenow=6000
                  autocomplete=off
                  class=ant-input-number-input
                  max=9007199254740991
                  min=-9007199254740991
                  role=spinbutton
                  step=1
                  value=6000
                />
              </div>
            </div>
            <span
              class=
                    color: $text-secondary-light;
                  ,
        @include Inter();
        @include Uppercase();
        font-size: 13px;
        line-height: 20px;

            >
              / 6000
            </span>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css last page", ({ expect }) => {
    const { container } = render(
      <SimplePagination current={6000} count={300000} size={50} />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        color: $text-light-secondary;
        font-size: 12px;
        line-height: 24px;

        .pagination-left {
          padding: 2px 8px;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: $fills-interaction-light-general-hover;
            color: $text-light-general;
          }
          .icon-inner {
            margin-left: 4px;
          }
        }

        .pagination-right {
          display: flex;
          align-items: center;
          color: $blue-60;
          font-weight: bold;
          .icon-inner {
            margin-left: 4px;
          }
          .prev-btn,
          .next-btn {
            padding: 0 8px;
            > span {
              color: $text-light-general;
            }
          }

          .next-btn {
            .icon-inner {
              transform: rotate(180deg);
            }
          }
        }
      ,pagination-wrapper
        >
          <span
            class=
        @include Inter();
        font-size: 13px;
        line-height: 20px;

          >
            共 300000 项
          </span>
          <span
            class=pagination-right
          >
            <button
              class=ant-btn,prev-btn,
        &.ant-btn-icon-only {
          justify-content: center;
        }
        &.ant-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          border-radius: 6px;
          line-height: 22px;
          transition:
            transform 160ms ease,
            background 160ms ease,
            opacity 160ms ease;
          transform: scale(var(--scale)) translateY(var(--transY)) translateZ(0);

          padding: 5px 12px;

          &.ant-btn-lg {
            height: 40px;
            line-height: 24px;
            padding: 8px 16px;
          }

          &.ant-btn-sm {
            height: 24px;
            line-height: 20px;
            padding: 2px 8px;
          }

          &.ant-btn-link {
            padding: 0;
          }

          &.ant-btn-circle,
          &.ant-btn-circle-outline {
            border-radius: 50%;
          }
        }

        .ant-btn-loading-icon span.anticon {
          margin-right: 8px;
          padding-right: 0px;
        }

        &.ant-btn.ant-btn-primary,
        &.ant-btn.ant-btn-secondary,
        &.ant-btn.ant-btn-tertiary,
        &.ant-btn.ant-btn-ordinary,
        &.ant-btn.ant-btn-ordinary-onTint,
        &.ant-btn.ant-btn-quiet {
          color: var(--color, #06101f);
          font-weight: var(--font-weight);
          background: var(--background-color, #fff);
          border-width: var(--border-width, 1px);
          border-color: var(--border-color, #d9d9d9);

          &[ant-click-animating-without-extra-node="true"]:after {
            display: none;
          }

          .anticon {
            color: var(--color, inherit);
          }

          &:hover,
          &.__pseudo-states-hover {
            background: var(--background-color-hover, var(--background-color));
            border-color: var(--border-color-hover, var(--border-color, transparent));
          }

          &:active,
          &.__pseudo-states-active {
            --scale: 1;
            --transY: 1px;
            background: var(--background-color-active, var(--background-color));
            border-color: var(
              --border-color-active,
              var(--border-color, transparent)
            );
          }

          &:focus,
          &.__pseudo-states-focus {
            background: var(--background-color-focus, var(--background-color));
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
            border-color: var(--border-color-focus, var(--border-color, transparent));
          }

          &[disabled],
          &[disabled]:hover,
          &[disabled]:focus,
          &[disabled]:active {
            color: var(--color-disabled, var(--color));
            background: var(--background-color-disabled, var(--background-color));
            border-color: var(
              --border-color-disabled,
              var(--border-color, transparent)
            );
            opacity: 0.5;
            --transY: 0;
          }
        }

        &.ant-btn-link {
          &[disabled] {
            color: $text-light-general;
            opacity: 0.5;
          }

          &:hover,
          &:focus {
            color: $link-outstandinghover;
          }

          &:active {
            color: $link-outstandingactive;
          }
        }

        &.ant-btn-primary {
          --color: #{$white};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general};
          --background-color-hover: #{$fills-light-general-general-bright};
          --background-color-active: #{$fills-light-general-general-dark};
          --background-color-focus: #{$fills-light-general-general};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-primary.ant-btn-dangerous {
          --background-color: #{$fills-light-serious-serious};
          --background-color-hover: #{$fills-light-serious-serious-bright};
          --background-color-active: #{$fills-light-serious-serious-dark};
          --background-color-focus: #{$fills-light-serious-serious-bright};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-primary.btn-primary-orange {
          --background-color: #{$fills-light-notice-notice};
          --background-color-hover: #{$fills-light-notice-notice-bright};
          --background-color-active: #{$fills-light-notice-notice-dark};
          --background-color-focus: #{$fills-light-notice-notice};
        }

        &.ant-btn-secondary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$fills-light-general-general-light};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$fills-light-general-general-light};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        &.ant-btn-secondary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$fills-light-serious-serious-light};
          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --background-color-focus: #{$fills-light-serious-serious-light};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};
        }

        &.ant-btn-secondary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$fills-light-notice-notice-light};
          --background-color-hover: #{$fills-interaction-light-notice-hover};
          --background-color-active: #{$fills-interaction-light-notice-active};
          --background-color-focus: #{$fills-light-notice-notice-light};
        }

        &.ant-btn-tertiary {
          --color: #{$text-light-general};
          --font-weight: bold;
          --border-width: 0;

          --background-color: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(0, 136, 255, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color: #{$white};
          --box-shadow-color-focus: #{$fills-interaction-light-serious-hover};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 74, 74, 0.1));
            }
          }
        }

        &.ant-btn-tertiary.btn-primary-orange {
          --color: #{$text-light-notice};
          --background-color: #{$white};

          &:not([disabled]),
          &:not(:focus) {
            &:hover,
            &:active,
            &.__pseudo-states-hover,
            &.__pseudo-states-active {
              filter: drop-shadow(0px 2px 8px rgba(255, 187, 0, 0.1));
            }
          }
        }

        &.ant-btn-ordinary {
          --color: #{$text-light-super};
          --border-color: #{$strokes-light-opaque-3};

          --background-color: #{$white};
          --background-color-hover: #{$fills-light-opaque-2};
          --background-color-active: #{$fills-light-opaque-3};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);

          &:focus,
          &.__pseudo-states-focus {
            box-shadow: 0 0 0px 4px var(--box-shadow-color-focus);
          }
        }

        &.ant-btn-ordinary.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$fills-light-general-general};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.16),
              rgba(0, 136, 255, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(0, 136, 255, 0.2),
              rgba(0, 136, 255, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: 0px 1px 2px -1px rgba(44, 56, 82, 0.18);
        }

        &.ant-btn-ordinary.ant-btn-dangerous {
          --color: #{$text-light-serious};
          --border-color: #{$fills-light-serious-serious};

          --background-color: #{$white};
          --background-color-hover: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.16),
              rgba(255, 74, 74, 0.16)
            ),
            #ffffff;
          --background-color-active: linear-gradient(
              0deg,
              rgba(255, 74, 74, 0.2),
              rgba(255, 74, 74, 0.2)
            ),
            #ffffff;
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-ordinary-onTint {
          --color: #{$text-light-super};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ordinary-blue {
          --color: #{$text-light-general};
          --border-color: #{$white};

          --background-color: #{$white};
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};

          box-shadow: none;
        }

        &.ant-btn-ordinary-onTint.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet {
          --color: #{$text-light-secondary};
          --border-width: 0;

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-general-hover};
          --background-color-active: #{$fills-interaction-light-general-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
          box-shadow: none;
        }

        &.ant-btn-quiet.ant-btn-dangerous {
          --color: #{$text-light-serious};

          --background-color-hover: #{$fills-interaction-light-serious-hover};
          --background-color-active: #{$fills-interaction-light-serious-active};
          --box-shadow-color-focus: #{$strokes-light-serious-light};
        }

        &.ant-btn-quiet.quiet-blue {
          --color: #{$text-light-general};

          --background-color: transparent;
          --background-color-hover: #{$fills-interaction-light-outstanding-hover};
          --background-color-active: #{$fills-interaction-light-outstanding-active};
          --background-color-focus: #{$white};
          --box-shadow-color-focus: #{$strokes-light-outstanding-light};
        }

        .button-prefix-icon {
          margin-right: 8px;
          display: inline-flex;
        }
        .button-suffix-icon {
          margin-left: 8px;
          display: inline-flex;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
        }
      ,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,ant-btn-quiet,ant-btn-icon-only,ant-btn-sm
              style=margin-right:,8px;
              type=button
            >
              <span
                class=
        display: inline-flex;
        align-items: center;

        .icon-inner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .icon-inner + span,
        span + .icon-inner.suffix {
          margin-left: 4px;
        }
        &.is-rotate {
          img,
          svg {
            animation: rotate 680ms linear infinite;
          }
        }
      ,icon-wrapper
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=ArrowChevronLeftSmall16BoldBlueIcon
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M9.06,3.757a1,1,0,011.415,1.414L7.646,8l2.829,2.828a1,1,0,01-1.414,1.415L5.949,9.13c-.396-.396-.594-.594-.668-.822a1,1,0,010-.618c.074-.228.272-.426.668-.822l3.112-3.112z
                      fill=#0080FF
                    />
                  </svg>
                </span>
              </span>
            </button>
            <div
              class=ant-input-number,ant-input-number-sm,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,
        height: 24px;
        width: 56px !important;
        margin-right: 4px;
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
                  aria-valuenow=6000
                  autocomplete=off
                  class=ant-input-number-input
                  max=9007199254740991
                  min=-9007199254740991
                  role=spinbutton
                  step=1
                  value=6000
                />
              </div>
            </div>
            <span
              class=
                    color: $text-secondary-light;
                  ,
        @include Inter();
        @include Uppercase();
        font-size: 13px;
        line-height: 20px;

            >
              / 6000
            </span>
          </span>
        </div>
      </div>
    `);
  });
});

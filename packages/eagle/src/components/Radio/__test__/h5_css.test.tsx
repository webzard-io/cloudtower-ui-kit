import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import Radio, { RadioButton, RadioGroup } from "..";
import { Space } from "antd";

describe("Radio h5_css", () => {
  it("Radio", ({ expect }) => {
    const { container } = render(
      <Space direction="vertical">
        <Radio>Button Title</Radio>
        <Radio checked={true} description="Detail description paragraph here.">
          Button Title
        </Radio>
        <Radio disabled={true}>Button Title</Radio>
        <Radio
          disabled={true}
          checked={true}
          description="Detail description paragraph here."
        >
          Button Title
        </Radio>
      </Space>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-space,ant-space-vertical
        >
          <div
            class=ant-space-item
            style=margin-bottom:,8px;
          >
            <label
              class=ant-radio-wrapper,
        &.ant-radio-wrapper {
          display: inline-flex;
          align-items: baseline;
          white-space: pre-wrap;

          .ant-radio {
            position: relative;
            top: 3px;

            .ant-radio-inner {
              border-color: $strokes-light-trans-4;
            }

            &:hover .ant-radio-inner {
              border-color: $blue-60;
            }

            &.ant-radio-checked .ant-radio-inner {
              border-color: $blue-60;
              background: $blue-60;
              &::after {
                top: 4px;
                left: 4px;
                width: 6px;
                height: 6px;
                background: $white;
              }
            }

            &.ant-radio-disabled {
              opacity: 0.5;

              .ant-radio-inner {
                border-color: $strokes-light-trans-4;
                background: $fills-light-trans-3;
                &::after {
                  background: $text-light-primary;
                }
              }

              & + span {
                color: $text-light-primary;
                opacity: 0.5;

                .radio-description {
                  color: $text-light-primary;
                }
              }
            }

            & + span {
              display: inline-block;
              padding: 0;
              padding-left: 12px;

              .radio-description {
                margin-bottom: 0;
                white-space: pre-wrap;
                color: $text-secondary-light;
              }
            }
          }
        }

        &.ant-radio-wrapper.compact {
          .ant-radio + span {
            padding-left: 8px;
          }
        }

            >
              <span
                class=ant-radio
              >
                <input
                  class=ant-radio-input
                  data-test=undefined
                  type=radio
                />
                <span
                  class=ant-radio-inner
                />
              </span>
              <span>
                Button Title
              </span>
            </label>
          </div>
          <div
            class=ant-space-item
            style=margin-bottom:,8px;
          >
            <label
              class=ant-radio-wrapper,ant-radio-wrapper-checked,
        &.ant-radio-wrapper {
          display: inline-flex;
          align-items: baseline;
          white-space: pre-wrap;

          .ant-radio {
            position: relative;
            top: 3px;

            .ant-radio-inner {
              border-color: $strokes-light-trans-4;
            }

            &:hover .ant-radio-inner {
              border-color: $blue-60;
            }

            &.ant-radio-checked .ant-radio-inner {
              border-color: $blue-60;
              background: $blue-60;
              &::after {
                top: 4px;
                left: 4px;
                width: 6px;
                height: 6px;
                background: $white;
              }
            }

            &.ant-radio-disabled {
              opacity: 0.5;

              .ant-radio-inner {
                border-color: $strokes-light-trans-4;
                background: $fills-light-trans-3;
                &::after {
                  background: $text-light-primary;
                }
              }

              & + span {
                color: $text-light-primary;
                opacity: 0.5;

                .radio-description {
                  color: $text-light-primary;
                }
              }
            }

            & + span {
              display: inline-block;
              padding: 0;
              padding-left: 12px;

              .radio-description {
                margin-bottom: 0;
                white-space: pre-wrap;
                color: $text-secondary-light;
              }
            }
          }
        }

        &.ant-radio-wrapper.compact {
          .ant-radio + span {
            padding-left: 8px;
          }
        }

            >
              <span
                class=ant-radio,ant-radio-checked
              >
                <input
                  checked=
                  class=ant-radio-input
                  data-test=undefined
                  description=Detail,description,paragraph,here.
                  type=radio
                />
                <span
                  class=ant-radio-inner
                />
              </span>
              <span>
                Button Title
                <div
                  class=radio-description,
        @include Inter();
        font-size: 12px;
        line-height: 18px;

                >
                  Detail description paragraph here.
                </div>
              </span>
            </label>
          </div>
          <div
            class=ant-space-item
            style=margin-bottom:,8px;
          >
            <label
              class=ant-radio-wrapper,ant-radio-wrapper-disabled,
        &.ant-radio-wrapper {
          display: inline-flex;
          align-items: baseline;
          white-space: pre-wrap;

          .ant-radio {
            position: relative;
            top: 3px;

            .ant-radio-inner {
              border-color: $strokes-light-trans-4;
            }

            &:hover .ant-radio-inner {
              border-color: $blue-60;
            }

            &.ant-radio-checked .ant-radio-inner {
              border-color: $blue-60;
              background: $blue-60;
              &::after {
                top: 4px;
                left: 4px;
                width: 6px;
                height: 6px;
                background: $white;
              }
            }

            &.ant-radio-disabled {
              opacity: 0.5;

              .ant-radio-inner {
                border-color: $strokes-light-trans-4;
                background: $fills-light-trans-3;
                &::after {
                  background: $text-light-primary;
                }
              }

              & + span {
                color: $text-light-primary;
                opacity: 0.5;

                .radio-description {
                  color: $text-light-primary;
                }
              }
            }

            & + span {
              display: inline-block;
              padding: 0;
              padding-left: 12px;

              .radio-description {
                margin-bottom: 0;
                white-space: pre-wrap;
                color: $text-secondary-light;
              }
            }
          }
        }

        &.ant-radio-wrapper.compact {
          .ant-radio + span {
            padding-left: 8px;
          }
        }

            >
              <span
                class=ant-radio,ant-radio-disabled
              >
                <input
                  class=ant-radio-input
                  data-test=undefined
                  disabled=
                  type=radio
                />
                <span
                  class=ant-radio-inner
                />
              </span>
              <span>
                Button Title
              </span>
            </label>
          </div>
          <div
            class=ant-space-item
          >
            <label
              class=ant-radio-wrapper,ant-radio-wrapper-checked,ant-radio-wrapper-disabled,
        &.ant-radio-wrapper {
          display: inline-flex;
          align-items: baseline;
          white-space: pre-wrap;

          .ant-radio {
            position: relative;
            top: 3px;

            .ant-radio-inner {
              border-color: $strokes-light-trans-4;
            }

            &:hover .ant-radio-inner {
              border-color: $blue-60;
            }

            &.ant-radio-checked .ant-radio-inner {
              border-color: $blue-60;
              background: $blue-60;
              &::after {
                top: 4px;
                left: 4px;
                width: 6px;
                height: 6px;
                background: $white;
              }
            }

            &.ant-radio-disabled {
              opacity: 0.5;

              .ant-radio-inner {
                border-color: $strokes-light-trans-4;
                background: $fills-light-trans-3;
                &::after {
                  background: $text-light-primary;
                }
              }

              & + span {
                color: $text-light-primary;
                opacity: 0.5;

                .radio-description {
                  color: $text-light-primary;
                }
              }
            }

            & + span {
              display: inline-block;
              padding: 0;
              padding-left: 12px;

              .radio-description {
                margin-bottom: 0;
                white-space: pre-wrap;
                color: $text-secondary-light;
              }
            }
          }
        }

        &.ant-radio-wrapper.compact {
          .ant-radio + span {
            padding-left: 8px;
          }
        }

            >
              <span
                class=ant-radio,ant-radio-checked,ant-radio-disabled
              >
                <input
                  checked=
                  class=ant-radio-input
                  data-test=undefined
                  description=Detail,description,paragraph,here.
                  disabled=
                  type=radio
                />
                <span
                  class=ant-radio-inner
                />
              </span>
              <span>
                Button Title
                <div
                  class=radio-description,
        @include Inter();
        font-size: 12px;
        line-height: 18px;

                >
                  Detail description paragraph here.
                </div>
              </span>
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it("RadioGroup", ({ expect }) => {
    const { container } = render(
      <Space direction="vertical">
        <RadioGroup defaultValue={1}>
          <RadioButton value={1}>Label</RadioButton>
          <RadioButton value={2}>Label</RadioButton>
          <RadioButton value={3}>Label</RadioButton>
        </RadioGroup>
      </Space>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-space,ant-space-vertical
        >
          <div
            class=ant-space-item
          >
            <div
              class=ant-radio-group,ant-radio-group-outline,
        & .ant-radio-button-wrapper:first-child {
          border-radius: 5px 0 0 5px;
        }
        & .ant-radio-button-wrapper:last-child {
          border-radius: 0 5px 5px 0;
        }

            >
              <label
                class=ant-radio-button-wrapper,ant-radio-button-wrapper-checked,
        color: $text-light-primary;
        border-color: $strokes-light-opaque-3;

        &:first-child {
          border-color: $strokes-light-opaque-4;
        }

        &.ant-radio-button-wrapper {
          padding: 0 12px;
          line-height: 32px;
          height: 32px;

          > span + span {
            white-space: nowrap;
          }
        }

        .ant-radio-group-small &.ant-radio-button-wrapper {
          height: 22px;
          padding: 0 7px;
          line-height: 20px;
        }

        &.ant-radio-button-wrapper:not(:first-child)::before {
          background: $strokes-light-opaque-3;
        }

        &.ant-radio-button-wrapper-checked:not(:first-child)::before {
          background: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-disabled:not(:first-child)::before {
          background: $strokes-light-opaque-3;
          opacity: 0.5;
        }

        &.ant-radio-button-wrapper-checked:not(
            [class*=" ant-radio-button-wrapper-disabled"]
          ).ant-radio-button-wrapper:first-child {
          border-right-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked:not(
            .ant-radio-button-wrapper-disabled
          ):first-child {
          border-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked {
          background: $fills-light-general-general-light;
        }

        &.ant-radio-button-wrapper-disabled {
          background: $fills-light-trans-3;
          border-color: $strokes-light-opaque-3;
          opacity: 0.5;
          &:hover {
            color: $text-light-primary;
            border-color: $strokes-light-opaque-3;
          }
        }

        &.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
          color: $text-light-primary;
          border-color: $strokes-light-opaque-3;
          background: $fills-light-trans-5;
        }

        & .ant-radio-button-input {
          margin-right: 8px;
          display: inline;
          border: none;
          padding: 0;
          width: 36px;
          background: transparent;
          &:focus {
            box-shadow: none;
          }
        }
        & .ant-radio-button-input.ant-input-number {
          margin-right: 0;
          width: initial;
          box-shadow: none;
        }
        & .ant-radio-button-input .ant-input-number-handler-wrap {
          display: none;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap {
          display: inline;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap input {
          display: inline;
          margin-right: 8px;
          padding: 0;
          width: 36px;
        }

              >
                <span
                  class=ant-radio-button,ant-radio-button-checked
                >
                  <input
                    checked=
                    class=ant-radio-button-input
                    type=radio
                    value=1
                  />
                  <span
                    class=ant-radio-button-inner
                  />
                </span>
                <span>
                  Label
                </span>
              </label>
              <label
                class=ant-radio-button-wrapper,
        color: $text-light-primary;
        border-color: $strokes-light-opaque-3;

        &:first-child {
          border-color: $strokes-light-opaque-4;
        }

        &.ant-radio-button-wrapper {
          padding: 0 12px;
          line-height: 32px;
          height: 32px;

          > span + span {
            white-space: nowrap;
          }
        }

        .ant-radio-group-small &.ant-radio-button-wrapper {
          height: 22px;
          padding: 0 7px;
          line-height: 20px;
        }

        &.ant-radio-button-wrapper:not(:first-child)::before {
          background: $strokes-light-opaque-3;
        }

        &.ant-radio-button-wrapper-checked:not(:first-child)::before {
          background: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-disabled:not(:first-child)::before {
          background: $strokes-light-opaque-3;
          opacity: 0.5;
        }

        &.ant-radio-button-wrapper-checked:not(
            [class*=" ant-radio-button-wrapper-disabled"]
          ).ant-radio-button-wrapper:first-child {
          border-right-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked:not(
            .ant-radio-button-wrapper-disabled
          ):first-child {
          border-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked {
          background: $fills-light-general-general-light;
        }

        &.ant-radio-button-wrapper-disabled {
          background: $fills-light-trans-3;
          border-color: $strokes-light-opaque-3;
          opacity: 0.5;
          &:hover {
            color: $text-light-primary;
            border-color: $strokes-light-opaque-3;
          }
        }

        &.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
          color: $text-light-primary;
          border-color: $strokes-light-opaque-3;
          background: $fills-light-trans-5;
        }

        & .ant-radio-button-input {
          margin-right: 8px;
          display: inline;
          border: none;
          padding: 0;
          width: 36px;
          background: transparent;
          &:focus {
            box-shadow: none;
          }
        }
        & .ant-radio-button-input.ant-input-number {
          margin-right: 0;
          width: initial;
          box-shadow: none;
        }
        & .ant-radio-button-input .ant-input-number-handler-wrap {
          display: none;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap {
          display: inline;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap input {
          display: inline;
          margin-right: 8px;
          padding: 0;
          width: 36px;
        }

              >
                <span
                  class=ant-radio-button
                >
                  <input
                    class=ant-radio-button-input
                    type=radio
                    value=2
                  />
                  <span
                    class=ant-radio-button-inner
                  />
                </span>
                <span>
                  Label
                </span>
              </label>
              <label
                class=ant-radio-button-wrapper,
        color: $text-light-primary;
        border-color: $strokes-light-opaque-3;

        &:first-child {
          border-color: $strokes-light-opaque-4;
        }

        &.ant-radio-button-wrapper {
          padding: 0 12px;
          line-height: 32px;
          height: 32px;

          > span + span {
            white-space: nowrap;
          }
        }

        .ant-radio-group-small &.ant-radio-button-wrapper {
          height: 22px;
          padding: 0 7px;
          line-height: 20px;
        }

        &.ant-radio-button-wrapper:not(:first-child)::before {
          background: $strokes-light-opaque-3;
        }

        &.ant-radio-button-wrapper-checked:not(:first-child)::before {
          background: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-disabled:not(:first-child)::before {
          background: $strokes-light-opaque-3;
          opacity: 0.5;
        }

        &.ant-radio-button-wrapper-checked:not(
            [class*=" ant-radio-button-wrapper-disabled"]
          ).ant-radio-button-wrapper:first-child {
          border-right-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked:not(
            .ant-radio-button-wrapper-disabled
          ):first-child {
          border-color: $fills-light-general-general;
        }

        &.ant-radio-button-wrapper-checked {
          background: $fills-light-general-general-light;
        }

        &.ant-radio-button-wrapper-disabled {
          background: $fills-light-trans-3;
          border-color: $strokes-light-opaque-3;
          opacity: 0.5;
          &:hover {
            color: $text-light-primary;
            border-color: $strokes-light-opaque-3;
          }
        }

        &.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
          color: $text-light-primary;
          border-color: $strokes-light-opaque-3;
          background: $fills-light-trans-5;
        }

        & .ant-radio-button-input {
          margin-right: 8px;
          display: inline;
          border: none;
          padding: 0;
          width: 36px;
          background: transparent;
          &:focus {
            box-shadow: none;
          }
        }
        & .ant-radio-button-input.ant-input-number {
          margin-right: 0;
          width: initial;
          box-shadow: none;
        }
        & .ant-radio-button-input .ant-input-number-handler-wrap {
          display: none;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap {
          display: inline;
        }
        & .ant-radio-button-input .ant-input-number-input-wrap input {
          display: inline;
          margin-right: 8px;
          padding: 0;
          width: 36px;
        }

              >
                <span
                  class=ant-radio-button
                >
                  <input
                    class=ant-radio-button-input
                    type=radio
                    value=3
                  />
                  <span
                    class=ant-radio-button-inner
                  />
                </span>
                <span>
                  Label
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});

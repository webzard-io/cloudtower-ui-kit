import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsEnum from "..";

describe("FieldsEnum h5_css", () => {
  it("h5_css none_enumValues", ({ expect }) => {
    const inputName = "inputName1";

    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const enumValues: string[] = [];

    const { container } = render(
      <FieldsEnum
        enumValues={enumValues}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
        }}
        meta={{}}
      />
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
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
          name=inputName1
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
                data-test=test,value,1
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
              class=ant-select-selection-item
              title=test,value,1
            >
              test value 1
            </span>
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
                class=
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
      </div>
    `);
  });

  it("h5_css with_enumValues_string", ({ expect }) => {
    const inputName = "inputName1";

    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const enumValues = ["test enum"];

    const { container } = render(
      <FieldsEnum
        enumValues={enumValues}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
        }}
        meta={{}}
      />
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
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
          name=inputName1
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
                data-test=test,value,1
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
              class=ant-select-selection-item
              title=test,value,1
            >
              test value 1
            </span>
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
                class=
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
      </div>
    `);
  });

  it("h5_css with_enumValues_object", ({ expect }) => {
    const inputName = "inputName1";

    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    const enumValues = [{ value: "test_enum", text: "test enum" }];

    const { container } = render(
      <FieldsEnum
        enumValues={enumValues}
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
        }}
        meta={{}}
      />
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
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
          name=inputName1
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
                data-test=test,value,1
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
              class=ant-select-selection-item
              title=test,value,1
            >
              test value 1
            </span>
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
                class=
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
      </div>
    `);
  });
});

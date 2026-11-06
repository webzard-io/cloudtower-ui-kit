import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsBoolean from "..";

describe("FieldsBoolean h5_css", () => {
  it.concurrent("h5_css with_children without_description", ({ expect }) => {
    const inputName = "inputName1";
    const childrenTestId = "test-children1";
    const descriptionTestId = "test-description1";

    const onBlur = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();

    // This component does not need description and children. But now there is this interface.
    const { container } = render(
      <FieldsBoolean
        description={
          <div data-testid={descriptionTestId}>test description</div>
        }
        input={{
          name: inputName,
          onBlur,
          onChange,
          onFocus,
          value: "test value 1",
        }}
        meta={{}}
      >
        <div data-testid={childrenTestId}>test children</div>
      </FieldsBoolean>,
    );

    expect(screen.getByTestId(childrenTestId)).toBeInTheDocument();
    expect(screen.getByTestId(descriptionTestId)).toBeInTheDocument();

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <label
          class=
        color: $gray-gray-80;
        line-height: 22px;
        display: inline-flex;
        .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: $fill-outstanding-base; } .ant-checkbox .ant-checkbox-inner {   border: 1px solid $stroke-neutral-trans-4; } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid $fill-outstanding-base;   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: $fill-outstanding-base;   &:after {     background-color: $fill-neutral-white;     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: $fill-neutral-trans-3;     border-color: $stroke-neutral-trans-4 !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: $gray-gray-80;   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: $gray-gray-80;   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: $gray-gray-80;   }   .sub {     margin-left: 28px;     color: $text-neutral-tertiary;   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
      ,ant-checkbox-wrapper,ant-checkbox-wrapper-checked
        >
          <span
            class=ant-checkbox,ant-checkbox-checked
          >
            <input
              checked=
              class=ant-checkbox-input
              type=checkbox
              value=
            />
            <span
              class=ant-checkbox-inner
            />
          </span>
          <span>
            <div
              class=main,
        @include Inter();
        font-size: 14px;
        line-height: 22px;

            >
              <div
                data-testid=test-children1
              >
                test children
              </div>
            </div>
            <div
              class=sub,
        @include Inter();
        font-size: 12px;
        line-height: 18px;

            >
              <div
                data-testid=test-description1
              >
                test description
              </div>
            </div>
          </span>
        </label>
      </div>
    `);
  });
});

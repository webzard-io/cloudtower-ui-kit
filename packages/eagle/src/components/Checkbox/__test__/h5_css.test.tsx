import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import Checkbox from "..";

describe("Checkbox h5_css", () => {
  it("image", async () => {});

  it.concurrent("h5_css with_children without_description", ({ expect }) => {
    const childrenTestId = "test-children1";
    const { container } = render(
      <Checkbox>
        <div data-testid={childrenTestId}>test children</div>
      </Checkbox>,
    );

    expect(screen.getByTestId(childrenTestId)).toBeInTheDocument();

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <label
          class=
        color: $text-primary-light;
        line-height: 22px;
        display: inline-flex;
        .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: $fills-light-general-general; } .ant-checkbox .ant-checkbox-inner {   border: 1px solid $strokes-light-trans-4; } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid $fills-light-general-general;   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: $fills-light-general-general;   &:after {     background-color: $white;     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: $fills-light-trans-3;     border-color: $strokes-light-trans-4 !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: $text-primary-light;   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: $text-primary-light;   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: $text-primary-light;   }   .sub {     margin-left: 28px;     color: $text-secondary-light;   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
      ,ant-checkbox-wrapper
        >
          <span
            class=ant-checkbox
          >
            <input
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
          </span>
        </label>
      </div>
    `);
  });

  it.concurrent("h5_css with_children with_description", ({ expect }) => {
    const childrenTestId = "test-children2";
    const descriptionTestId = "test-description2";

    const { container } = render(
      <Checkbox
        description={
          <div data-testid={descriptionTestId}>test description</div>
        }
      >
        <div data-testid={childrenTestId}>test children</div>
      </Checkbox>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <label
          class=
        color: $text-primary-light;
        line-height: 22px;
        display: inline-flex;
        .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: $fills-light-general-general; } .ant-checkbox .ant-checkbox-inner {   border: 1px solid $strokes-light-trans-4; } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid $fills-light-general-general;   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: $fills-light-general-general;   &:after {     background-color: $white;     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: $fills-light-trans-3;     border-color: $strokes-light-trans-4 !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: $text-primary-light;   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: $text-primary-light;   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: $text-primary-light;   }   .sub {     margin-left: 28px;     color: $text-secondary-light;   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
      ,ant-checkbox-wrapper
        >
          <span
            class=ant-checkbox
          >
            <input
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
                data-testid=test-children2
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
                data-testid=test-description2
              >
                test description
              </div>
            </div>
          </span>
        </label>
      </div>
    `);
  });

  it.concurrent("h5_css without_children without_description", ({ expect }) => {
    const { container } = render(<Checkbox />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <label
          class=
        color: $text-primary-light;
        line-height: 22px;
        display: inline-flex;
        .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: $fills-light-general-general; } .ant-checkbox .ant-checkbox-inner {   border: 1px solid $strokes-light-trans-4; } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid $fills-light-general-general;   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: $fills-light-general-general;   &:after {     background-color: $white;     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: $fills-light-trans-3;     border-color: $strokes-light-trans-4 !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: $text-primary-light;   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: $text-primary-light;   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: $text-primary-light;   }   .sub {     margin-left: 28px;     color: $text-secondary-light;   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
      ,ant-checkbox-wrapper
        >
          <span
            class=ant-checkbox
          >
            <input
              class=ant-checkbox-input
              type=checkbox
              value=
            />
            <span
              class=ant-checkbox-inner
            />
          </span>
          <span />
        </label>
      </div>
    `);
  });

  it.concurrent("h5_css without_children with_description", ({ expect }) => {
    const descriptionTestId = "test-description4";
    const { container } = render(
      <Checkbox
        description={
          <div data-testid={descriptionTestId}>test description</div>
        }
      />,
    );

    expect(screen.queryByTestId(descriptionTestId)).not.toBeInTheDocument();

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <label
          class=
        color: $text-primary-light;
        line-height: 22px;
        display: inline-flex;
        .ant-checkbox {   height: 22px;   display: flex;   align-items: center;   top: 0; } .ant-checkbox-checked::after {   border: none; } &.ant-checkbox-wrapper:hover .ant-checkbox-inner, &.ant-checkbox-wrapper.__pseudo-states-hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner {   border-color: $fills-light-general-general; } .ant-checkbox .ant-checkbox-inner {   border: 1px solid $strokes-light-trans-4; } .ant-checkbox.ant-checkbox-checked, .ant-checkbox.ant-checkbox-indeterminate {   .ant-checkbox-inner {     border: 1px solid $fills-light-general-general;   } } .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner {   background: $fills-light-general-general;   &:after {     background-color: $white;     height: 2px;     width: 10px;     border-radius: 2px;   } } &.ant-checkbox-wrapper-disabled {   opacity: 0.5;   .ant-checkbox-disabled .ant-checkbox-inner {     background: $fills-light-trans-3;     border-color: $strokes-light-trans-4 !important;   }   .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {     border-color: $text-primary-light;   }   .ant-checkbox-disabled.ant-checkbox-indeterminate     .ant-checkbox-inner:after {     background: $text-primary-light;   } } .ant-checkbox + span, .ant-checkbox-disabled + span {   padding: 0;   .main {     display: inline-block;     margin-left: 12px;     color: $text-primary-light;   }   .sub {     margin-left: 28px;     color: $text-secondary-light;   } } &.compact {   .ant-checkbox + span,   .ant-checkbox-disabled + span {     .main {       margin-left: 8px;     }     .sub {       margin-left: 24px;     }   } }
      ,ant-checkbox-wrapper
        >
          <span
            class=ant-checkbox
          >
            <input
              class=ant-checkbox-input
              type=checkbox
              value=
            />
            <span
              class=ant-checkbox-inner
            />
          </span>
          <span />
        </label>
      </div>
    `);
  });
});

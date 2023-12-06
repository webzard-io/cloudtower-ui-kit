import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import SwitchWithText from "..";

describe("SwitchWithText", () => {
  it("h5_css", ({ expect }) => {
    const { container } = render(<SwitchWithText checked={true} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=enabled-switch,
        .enabled-switch {
          display: flex;
          align-items: center;
        }

        .enabled-text {
          margin-right: 8px;
        }

        >
          <span
            class=enabled-text
          >
            启用
          </span>
          <button
            aria-checked=true
            class=ant-switch,
        &.ant-switch {
          min-width: 40px;
          height: 24px;
          background: $fills-trans-quinary-light;
          overflow: hidden;
          &:focus {
            box-shadow: 0 0 0 2px $strokes-light-trans-1;
          }
        }
        &.ant-switch-small {
          min-width: 26px;
          height: 16px;
        }
        &.ant-switch-large {
          min-width: 52px;
          height: 32px;
        }

        &.ant-switch .ant-switch-handle {
          height: 20px;
          width: 20px;
          &::before {
            border-radius: 10px;
            transition-delay: 120ms;
          }
        }
        &.ant-switch-small .ant-switch-handle {
          height: 14px;
          width: 14px;
          top: 1px;
          left: 1px;
        }
        &.ant-switch-large .ant-switch-handle {
          height: 28px;
          width: 28px;
          &::before {
            border-radius: 14px;
          }
        }

        &.ant-switch-checked {
          background-color: $green-60;
        }
        &.ant-switch-checked .ant-switch-handle {
          left: calc(100% - 20px - 2px);
        }
        &.ant-switch-small.ant-switch-checked .ant-switch-handle {
          left: calc(100% - 14px - 1px);
        }
        &.ant-switch-large.ant-switch-checked .ant-switch-handle {
          left: calc(100% - 28px - 2px);
        }
      ,switch,ant-switch-checked
            role=switch
            type=button
          >
            <div
              class=ant-switch-handle
            />
            <span
              class=ant-switch-inner
            />
          </button>
        </span>
      </div>
    `);
  });
});

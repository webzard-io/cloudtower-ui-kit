import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import Legend, { LegendPresetColors } from "..";

describe("Legend h5_css", () => {
  it("h5_css color", ({ expect }) => {
    const { container } = render(
      <div>
        {LegendPresetColors.map((color) => (
          <Legend color={color}>Label</Legend>
        ))}
      </div>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-blue
            color=blue
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-red
            color=red
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-yellow
            color=yellow
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-green
            color=green
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-gray
            color=gray
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-purple
            color=purple
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css tags with number", ({ expect }) => {
    const { container } = render(
      <div>
        {LegendPresetColors.map((color) => (
          <Legend color={color} number={1}>
            Label
          </Legend>
        ))}
      </div>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-blue
            color=blue
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-red
            color=red
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-yellow
            color=yellow
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-green
            color=green
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-gray
            color=gray
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-purple
            color=purple
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css off-white background", ({ expect }) => {
    const { container } = render(
      <div>
        {LegendPresetColors.map((color) => (
          <Legend onTintMode color={color} number={1}>
            Label
          </Legend>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-blue,on-tint
            color=blue
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-red,on-tint
            color=red
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-yellow,on-tint
            color=yellow
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-green,on-tint
            color=green
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-gray,on-tint
            color=gray
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-purple,on-tint
            color=purple
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css loading", ({ expect }) => {
    const { container } = render(
      <div>
        {LegendPresetColors.map((color) => (
          <Legend onTintMode color={color} number={1}>
            Label
          </Legend>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-blue,on-tint
            color=blue
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-red,on-tint
            color=red
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-yellow,on-tint
            color=yellow
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-green,on-tint
            color=green
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-gray,on-tint
            color=gray
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-purple,on-tint
            color=purple
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number,on-tint
                >
                  1
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("h5_css when the color is success, danger, or warning", ({ expect }) => {
    const { container } = render(
      <div>
        {(["success", "warning", "danger"] as const).map((color) => (
          <Legend color={color} number={1}>
            Label
          </Legend>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-green
            color=green
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-yellow
            color=yellow
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
          <div
            class=$prefix: ui-kit-status-legend;
      margin: 0;
      border-radius: 20px;
      padding: 2px 10px;
      height: 22px;
      display: flex;
      align-items: center;

      &.ui-kit-status-legend.on-tint {
      color: $text-neutral-ontint;
      }
      &.tag-hover {
      cursor: pointer;
      }

      &.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
      margin-right: 6px;
      }
      .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
            &.#{$prefix}-number.on-tint {
      color: $text-neutral-ontint;
            }
          }
          &.eagle-legend-blue {
            .#{$prefix}-icon {
      background-color: $fill-outstanding-base;
            }
          }
          &.eagle-legend-red {
            .#{$prefix}-icon {
      background-color: $fill-serious-base;
            }
          }
          &.eagle-legend-yellow {
            .#{$prefix}-icon {
      background-color: $fill-notice-base;
            }
          }
          &.eagle-legend-green {
            .#{$prefix}-icon {
      background-color: $fill-positive-base;
            }
          }
          &.eagle-legend-gray {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $gray-70;
            }
          }
          &.eagle-legend-purple {
            .#{$prefix}-icon:not(.ui-kit-status-legend-icon-loading) {
      background-color: $purple-50;
      }
      }
      }
      ,@include Inter();
      font-size: 12px;
      line-height: 18px;
      ,ui-kit-status-legend,eagle-legend-red
            color=red
          >
            <i
              class=ui-kit-status-legend-icon,width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;

            />
            <div
              class=overflow: hidden;
      text-overflow: ellipsis;
      ,white-space: nowrap;
      ,          flex: 1;


            >
              <span>
                Label
                <span
                  class=              color: #2C385299;

      ,ui-kit-status-legend-number
                >
                  1
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});

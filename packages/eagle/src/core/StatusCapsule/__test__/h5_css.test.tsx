import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import StatusCapsule, { StatusPresetColors } from "..";

describe("StatusCapsule h5_css", () => {
  it("h5_css color", ({ expect }) => {
    const { container } = render(
      <div>
        {StatusPresetColors.map((color) => (
          <StatusCapsule color={color}>Label</StatusCapsule>
        ))}
      </div>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <span
            class=ant-tag,ant-tag-blue,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-blue
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
          </span>
          <span
            class=ant-tag,ant-tag-red,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-red
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-yellow
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
          </span>
          <span
            class=ant-tag,ant-tag-green,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-green
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
          </span>
          <span
            class=ant-tag,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-gray
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css tags with number", ({ expect }) => {
    const { container } = render(
      <div>
        {StatusPresetColors.map((color) => (
          <StatusCapsule color={color} number={1}>
            Label
          </StatusCapsule>
        ))}
      </div>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <span
            class=ant-tag,ant-tag-blue,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-blue
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-red,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-red
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-yellow
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-green,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-green
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-gray
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css off-white background", ({ expect }) => {
    const { container } = render(
      <div>
        {StatusPresetColors.map((color) => (
          <StatusCapsule offWhiteMode color={color} number={1}>
            Label
          </StatusCapsule>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <span
            class=ant-tag,ant-tag-blue,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-blue,off-white
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-red,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-red,off-white
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-yellow,off-white
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-green,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-green,off-white
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-gray,off-white
          >
            <i
              class=ui-kit-status-capsule-icon,
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

            />
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css loading", ({ expect }) => {
    const { container } = render(
      <div>
        {StatusPresetColors.map((color) => (
          <StatusCapsule loading color={color} number={1}>
            Label
          </StatusCapsule>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <span
            class=ant-tag,ant-tag-blue,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-blue
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__0__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__0__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-red,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-red
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__1__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__1__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-yellow
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__2__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__2__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-green,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-green
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__3__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__3__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-gray
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__4__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__4__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css when the color is success, danger, or warning", ({ expect }) => {
    const { container } = render(
      <div>
        {(["success", "warning", "danger"] as const).map((color) => (
          <StatusCapsule loading color={color} number={1}>
            Label
          </StatusCapsule>
        ))}
      </div>,
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <span
            class=ant-tag,ant-tag-green,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-green
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__5__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__5__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-yellow
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__6__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__6__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
          <span
            class=ant-tag,ant-tag-red,
        $prefix: ui-kit-status-capsule;
        margin: 0;
        border-radius: 20px;
        padding: 2px 10px;
        height: 22px;

        &.ant-tag.#{$prefix}.off-white {
          background-color: $fill-neutral-trans-1 !important;
          &.tag-hover:hover,
          &.__pseudo-states-hover {
            background-color: $fill-neutral-trans-2 !important;
          }
        }
        &.ant-tag.#{$prefix} {
          color: $text-neutral-primary;
          .#{$prefix}-icon {
            margin-right: 6px;
          }
          .#{$prefix}-number {
            margin-left: 8px;
            color: #2C385299;
          }
          &.ant-tag-blue {
            background-color: $fill-outstanding-light;
            .#{$prefix}-icon {
              background-color: $fill-outstanding-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-outstanding-light-hover;
            }
          }
          &.ant-tag-red {
            background-color: $fill-serious-light;
            .#{$prefix}-icon {
              background-color: $fill-serious-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-serious-light-hover;
            }
          }
          &.ant-tag-yellow {
            background-color: $fill-notice-light;
            .#{$prefix}-icon {
              background-color: $fill-notice-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-notice-light-hover;
            }
          }
          &.ant-tag-green {
            background-color: $fill-positive-light;
            .#{$prefix}-icon {
              background-color: $fill-positive-base;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-positive-light-hover;
            }
          }
          &.ant-tag-gray {
            background-color: $fill-neutral-trans-2;
            .#{$prefix}-icon:not(.ui-kit-status-capsule-icon-loading) {
              background-color: $gray-70;
            }
            &.tag-hover:hover,
            &.__pseudo-states-hover {
              background-color: $fill-neutral-trans-3-trans-2-hover;
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ui-kit-status-capsule,ant-tag-red
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
      ,icon-wrapper,ui-kit-status-capsule-icon,ui-kit-status-capsule-icon-loading,is-rotate
            >
              <span
                class=icon-inner
              >
                <svg
                  fill=none
                  height=8
                  width=8
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M8,4a4,4,0,11-8,0,4,4,0,018,0zM.96,4a3.04,3.04,0,106.08,0A3.04,3.04,0,00.96,4z
                    fill=#08F
                    fill-opacity=0.1
                  />
                  <path
                    d=M2.05,7.377a.098.098,0,01-.136.036A4,4,0,013.483.033a.098.098,0,01.11.088l.079.756a.103.103,0,01-.089.111,3.04,3.04,0,00-1.189,5.593c.047.029.064.09.036.138l-.38.658z
                    fill=url(#___SVG_ID__7__0___)
                  />
                  <defs>
                    <radialgradient
                      cx=0
                      cy=0
                      gradientTransform=rotate(-77.196,5.51,2.19),scale(6.94185)
                      gradientUnits=userSpaceOnUse
                      id=___SVG_ID__7__0___
                      r=1
                    >
                      <stop
                        stop-color=#5BCAFF
                      />
                      <stop
                        offset=1
                        stop-color=#06F
                      />
                    </radialgradient>
                  </defs>
                </svg>
              </span>
            </span>
            Label
            <span
              class=ui-kit-status-capsule-number
            >
              1
            </span>
          </span>
        </div>
      </div>
    `);
  });
});

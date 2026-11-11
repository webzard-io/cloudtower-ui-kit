import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import Token, { TokenPresetColors } from "..";

describe("Tokenm h5_css", () => {
  it("h5_css color", ({ expect }) => {
    const { container } = render(
      <div>
        {TokenPresetColors.map((color) => (
          <Token color={color}>Label</Token>
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
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-blue,ui-kit-token
          >
            Label
          </span>
          <span
            class=ant-tag,ant-tag-red,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-red,ui-kit-token
          >
            Label
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-yellow,ui-kit-token
          >
            Label
          </span>
          <span
            class=ant-tag,ant-tag-green,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-green,ui-kit-token
          >
            Label
          </span>
          <span
            class=ant-tag,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-gray,ui-kit-token
          >
            Label
          </span>
          <span
            class=ant-tag,ant-tag-purple,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-purple,ui-kit-token
          >
            Label
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css color with closable", ({ expect }) => {
    const { container } = render(
      <div>
        {TokenPresetColors.map((color) => (
          <Token color={color} closable>
            Label
          </Token>
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
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-blue,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
          <span
            class=ant-tag,ant-tag-red,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-red,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
          <span
            class=ant-tag,ant-tag-yellow,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-yellow,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
          <span
            class=ant-tag,ant-tag-green,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-green,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
          <span
            class=ant-tag,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-gray,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
          <span
            class=ant-tag,ant-tag-purple,
          padding: 0 8px;
          border-radius: 4px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-purple,ui-kit-token
          >
            Label
            <div
              class=ant-tag-close-icon
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
      ,icon-wrapper,selected-icon
              >
                <span
                  class=icon-inner
                >
                  <svg
                    data-testid=XmarkRemoveSmall16RegularInheritIcon
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M12.243,3.757a.575.575,0,00-.814,0L8,7.187,4.57,3.757a.575.575,0,10-.813.814L7.187,8l-3.43,3.428a.575.575,0,00.813.814L8,8.813l3.43,3.43a.575.575,0,00.813-.813L8.813,8l3.43-3.43a.575.575,0,000-.813z
                      fill=currentColor
                    />
                  </svg>
                </span>
              </span>
            </div>
          </span>
        </div>
      </div>
    `);
  });

  it("h5_css large size", ({ expect }) => {
    const { container } = render(<Token size="large">Label</Token>);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=ant-tag,
          padding: 3px 8px;
          border-radius: 2px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 13px;
        line-height: 20px;
      ,ant-tag-gray,ui-kit-token
        >
          Label
        </span>
      </div>
    `);
  });

  it("h5_css medium size", ({ expect }) => {
    const { container } = render(<Token size="medium">Label</Token>);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=ant-tag,
          padding: 2px 8px;
          border-radius: 3px;
        ,
        &.ant-tag:hover {
          opacity: unset;
        }
        &.ant-tag.ui-kit-token:not(.ant-tag-hidden) {
          margin: 0;
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
          border: none;
          & .ant-tag-close-icon {
            width: 16px;
            height: 16px;
            color: inherit;
            margin-left: 4px;
            opacity: 0.6;
            display: inline-flex;
            &:hover {
              opacity: 1;
            }
          }
          &.ant-tag-blue {
            color: var(--fill-outstanding-base);
            background-color: rgba(0, 136, 255, 0.1);
          }
          &.ant-tag-red {
            color: var(--fill-serious-base);
            background-color: rgba(255, 74, 74, 0.1);
          }
          &.ant-tag-yellow {
            color: var(--fill-notice-dark);
            background-color: rgba(255, 187, 0, 0.1);
          }
          &.ant-tag-green {
            color: var(--fill-positive-dark);
            background-color: rgba(30, 201, 127, 0.1);
          }
          &.ant-tag-gray {
            color: var(--text-neutral-super);
            background-color: var(--fill-neutral-trans-2);
          }
          &.ant-tag-purple {
            color: var(--text-colorful-purple);
            background-color: var(--fill-purple-light);
          }

          &.ui-kit-token-checked {
            color: var(--text-neutral-ontint);
            &.ant-tag-red {
              background-color: var(--fill-serious-base);
            }
            &.ant-tag-yellow {
              background-color: var(--fill-notice-base);
            }
            &.ant-tag-green {
              background-color: var(--fill-positive-base);
            }
            &.ant-tag-blue {
              background-color: var(--fill-outstanding-base);
            }
            &.ant-tag-gray {
              background-color: var(--gray-gray-70);
            }
            &.ant-tag-purple {
              background-color: var(--fill-purple-base);
            }
          }
        }
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-gray,ui-kit-token
        >
          Label
        </span>
      </div>
    `);
  });
});

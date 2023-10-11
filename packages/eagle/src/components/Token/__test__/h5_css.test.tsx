import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";
import Token, { PresetColors } from "..";

describe("Tokenm h5_css", () => {
  it("h5_css color ", ({ expect }) => {
    const { container } = render(
      <div>
        {PresetColors.map((color) => (
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
          </div>
        `);
  });

  it("h5_css color with closable ", ({ expect }) => {
    const { container } = render(
      <div>
        {PresetColors.map((color) => (
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
            vertical-align: middle;

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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
            vertical-align: middle;

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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
            vertical-align: middle;

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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
            vertical-align: middle;

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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
            vertical-align: middle;

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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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
                color: $fills-light-general-general;
                background-color: $fills-light-general-general-light;
              }
              &.ant-tag-red {
                color: $fills-light-serious-serious;
                background-color: $fills-light-serious-serious-light;
              }
              &.ant-tag-yellow {
                color: $fills-light-notice-notice-dark;
                background-color: $fills-light-notice-notice-light;
              }
              &.ant-tag-green {
                color: $fills-light-positive-positive-dark;
                background-color: $fills-light-positive-positive-light;
              }
              &.ant-tag-gray {
                color: $text-light-super;
                background-color: $fills-element-light-container-general;
              }

              &.ui-kit-token-checked {
                color: $text-light-on-tint;
                &.ant-tag-red {
                  background-color: $fills-light-serious-serious;
                }
                &.ant-tag-yellow {
                  background-color: $fills-light-notice-notice;
                }
                &.ant-tag-green {
                  background-color: $fills-light-positive-positive;
                }
                &.ant-tag-blue {
                  background-color: $fills-light-general-general;
                }
                &.ant-tag-gray {
                  background-color: $gray-70;
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

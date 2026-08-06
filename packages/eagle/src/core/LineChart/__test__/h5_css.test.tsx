import { Antd5DropdownProps } from "@src/core/Antd5Dropdown";
import { render } from "@testing-library/react";
import dayjs from "dayjs";
import React from "react";
import { describe, it } from "vitest";

import { mockMetric } from "../../../../__test__/mockLineChart";
import LineChart from "..";
import { ILineChartDateRange, ILineChartGraphType } from "../type";

const dateRange1: ILineChartDateRange = [
  dayjs("2022-12-13 16:00"),
  dayjs("2022-12-13 18:00"),
];

const menu: Antd5DropdownProps["menu"] = {
  items: [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ],
  selectable: true,
  defaultSelectedKeys: ["3"],
  onSelect: (key) => {
    console.log(key);
  },
};

describe("line chart h5_css", () => {
  it("h5_css color", ({ expect }) => {
    const { container } = render(
      <div>
        <LineChart
          showPointer={true}
          chartProps={{
            syncId: "abc",
            mode: "legend",
            showLegend: true,
            metricName: "hello",
            metric: mockMetric,
            height: 88,
            type: ILineChartGraphType.Area,
            dateRange: dateRange1,
            actionsProps: {
              show: true,
              label: "Label",
              dropdownProps: {
                menu,
                trigger: ["click"],
              },
            },
            showXAxis: true,
            tooltipProps: {
              format: (val) => {
                return `${val.value}`;
              },
            },
          }}
        ></LineChart>
      </div>,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class=metric-wrapper,hidden-xaxis,
        position: relative;

        &.hidden-xaxis .pointer-wrapper {
          bottom: -12px;
        }

        .metric-toolbar {
          display: flex;
          justify-content: space-between;
          line-height: 30px;
          .metric-extra {
            display: flex;
            flex-shrink: 0;
            font-size: 12px;
            align-items: center;

            .info-item {
              color: $gray-60;
            }
            .info-item + .info-item {
              margin-left: 10px;
            }

            .menu-trigger {
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }

        .recharts-xAxis {
          font-size: 12px;
        }

        .pointer-wrapper {
          position: absolute;
          bottom: 10px;
          padding: 0 8px;
          font-size: 12px;
          color: $white;
          transform: translateX(-50%);
          z-index: 2;
        }

            style=height:,184px;
          >
            <div
              class=metric-toolbar
            >
              <span
                class=
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;

        .ant-dropdown-trigger {
          font-size: 12px;
          margin-left: 8px;
        }

              >
                <div
                  class=
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 8px;
        }

        &.deselected,
        &.hovering {
          opacity: 0.3;

          &:not(.hoverering-self) .color-block {
            background: #b4beca !important;
            border-radius: 2px;
          }
        }
        &.hoverering-self {
          opacity: 1;
        }
        .dropdown-trigger {
          margin-left: 12px;
        }
        .legend-name {
          color: $text-light-primary;
        }
        .icon-suffix-wrapper {
          display: flex;
          align-items: center;
          margin-left: 4px;
        }

                >
                  <div
                    class=
        display: inline-block;
        height: 8px;
        width: 8px;
        margin-right: 8px;
        border-radius: 2px;
        &.borderd {
          border: 1px solid $stroke-neutral-white;
        }
      ,color-block
                    style=background:,rgb(171,,202,,188);
                  />
                  <span
                    class=legend-name
                  >
                    <div
                      class=
                    >
                      loooooooooooooooooooooooooo...oooooooooong_legend1
                    </div>
                  </span>
                  <div
                    class=icon-suffix-wrapper
                  />
                </div>
                <div
                  class=
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 8px;
        }

        &.deselected,
        &.hovering {
          opacity: 0.3;

          &:not(.hoverering-self) .color-block {
            background: #b4beca !important;
            border-radius: 2px;
          }
        }
        &.hoverering-self {
          opacity: 1;
        }
        .dropdown-trigger {
          margin-left: 12px;
        }
        .legend-name {
          color: $text-light-primary;
        }
        .icon-suffix-wrapper {
          display: flex;
          align-items: center;
          margin-left: 4px;
        }

                >
                  <div
                    class=
        display: inline-block;
        height: 8px;
        width: 8px;
        margin-right: 8px;
        border-radius: 2px;
        &.borderd {
          border: 1px solid $stroke-neutral-white;
        }
      ,color-block
                    style=background:,rgb(11,,192,,188);
                  />
                  <span
                    class=legend-name
                  >
                    <div
                      class=
                    >
                      loooooooooooooooooooooooooo...oooooooooong_legend2
                    </div>
                  </span>
                  <div
                    class=icon-suffix-wrapper
                  />
                </div>
                <div
                  class=
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 8px;
        }

        &.deselected,
        &.hovering {
          opacity: 0.3;

          &:not(.hoverering-self) .color-block {
            background: #b4beca !important;
            border-radius: 2px;
          }
        }
        &.hoverering-self {
          opacity: 1;
        }
        .dropdown-trigger {
          margin-left: 12px;
        }
        .legend-name {
          color: $text-light-primary;
        }
        .icon-suffix-wrapper {
          display: flex;
          align-items: center;
          margin-left: 4px;
        }

                >
                  <div
                    class=
        display: inline-block;
        height: 8px;
        width: 8px;
        margin-right: 8px;
        border-radius: 2px;
        &.borderd {
          border: 1px solid $stroke-neutral-white;
        }
      ,color-block
                    style=background:,rgb(255,,1,,1);
                  />
                  <span
                    class=legend-name
                  >
                    <div
                      class=
                    >
                      loooooooooooooooooooooooooo...oooooooooong_legend3
                    </div>
                  </span>
                  <div
                    class=icon-suffix-wrapper
                  />
                </div>
              </span>
              <div
                class=metric-extra
              >
                <div
                  class=
        font-size: 12px;
        color: $text-neutral-primary;

                >
                  Label
                </div>
                <button
                  class=ant-btn,ant-dropdown-trigger,
        margin-left: 8px;
      ,
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
      ,ant-btn-tertiary,ant-btn-icon-only,ant-btn-sm
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
                        data-testid=MoreEllipsis316BoldSecondaryIcon
                        fill=none
                        height=16
                        width=16
                        xmlns=http://www.w3.org/2000/svg
                      >
                        <path
                          d=M2.5,9.5a1.5,1.5,0,100-3,1.5,1.5,0,000,3zM9.5,8a1.5,1.5,0,11-3,0,1.5,1.5,0,013,0zM15,8a1.5,1.5,0,11-3,0,1.5,1.5,0,013,0z
                          fill=#2C3852
                          fill-opacity=0.6
                        />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div
              class=mocked-styled-2,
        position: relative;
        width: 100%;

              style=height:,88px;
            >
              <div
                class=recharts-responsive-container
                style=width:,100%;,height:,100%;,min-width:,0;
              />
            </div>
          </div>
        </div>
      </div>
    `);
  });
});

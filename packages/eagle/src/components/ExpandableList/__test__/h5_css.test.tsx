import { StoryFn } from "@storybook/react";
import { render } from "@testing-library/react";
import React from "react";

import ExpandableItem from "../ExpandableItem";

const Template: StoryFn<typeof ExpandableItem> = (args) => (
  <ExpandableItem {...args} header={args.header ?? <div>header</div>}>
    <div>hello custom</div>
  </ExpandableItem>
);

describe("ExpandableList h5_css", () => {
  it("Simple", () => {
    const { container } = render(<Template />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-collapse,ant-collapse-borderless,ant-collapse-icon-position-right,
        .ant-collapse-item {
          border: 0px;
          background-color: $fills-light-white;

          .ant-collapse-header {
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px !important;
            padding-right: 24px;
            .ant-collapse-arrow {
              right: 0px;
            }
          }
          .ant-collapse-content {
            .ant-collapse-content-box {
              padding: 0px;
            }
          }
        }

        >
          <div
            class=ant-collapse-item
          >
            <div
              aria-expanded=false
              class=ant-collapse-header
              role=button
              tabindex=0
            >
              <div
                class=
        height: 24px;
        width: 24px;
        border-radius: 6px;
        padding: 4px;
        &:hover {
          background-color: $fill-outstanding-light;
          svg {
            path {
              fill: blue;
            }
          }
        }
      ,ant-collapse-arrow
              >
                <svg
                  fill=none
                  height=16
                  width=16
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M3.05,6.159a.5.5,0,11.707-.707L8,9.695l4.243-4.243a.5.5,0,11.707.707l-3.89,3.89c-.349.348-.537.527-.751.597a1,1,0,01-.618,0c-.214-.07-.402-.249-.752-.598L3.05,6.159z
                    fill=#2C3852
                    fill-opacity=0.6
                  />
                </svg>
              </div>
              <div
                class=
        display: flex;
        align-items: center;
        .order {
          height: 24px;
          width: 24px;
          border-radius: 20px;
          color: $text-light-general;
          background: $fill-light-element-container-outstanding;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

              >
                <div>
                  header
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("OrderedOneExpand", () => {
    const { container } = render(<Template order={1} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-collapse,ant-collapse-borderless,ant-collapse-icon-position-right,
        .ant-collapse-item {
          border: 0px;
          background-color: $fills-light-white;

          .ant-collapse-header {
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px !important;
            padding-right: 24px;
            .ant-collapse-arrow {
              right: 0px;
            }
          }
          .ant-collapse-content {
            .ant-collapse-content-box {
              padding: 0px;
            }
          }
        }

        >
          <div
            class=ant-collapse-item
          >
            <div
              aria-expanded=false
              class=ant-collapse-header
              role=button
              tabindex=0
            >
              <div
                class=
        height: 24px;
        width: 24px;
        border-radius: 6px;
        padding: 4px;
        &:hover {
          background-color: $fill-outstanding-light;
          svg {
            path {
              fill: blue;
            }
          }
        }
      ,ant-collapse-arrow
              >
                <svg
                  fill=none
                  height=16
                  width=16
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M3.05,6.159a.5.5,0,11.707-.707L8,9.695l4.243-4.243a.5.5,0,11.707.707l-3.89,3.89c-.349.348-.537.527-.751.597a1,1,0,01-.618,0c-.214-.07-.402-.249-.752-.598L3.05,6.159z
                    fill=#2C3852
                    fill-opacity=0.6
                  />
                </svg>
              </div>
              <div
                class=
        display: flex;
        align-items: center;
        .order {
          height: 24px;
          width: 24px;
          border-radius: 20px;
          color: $text-light-general;
          background: $fill-light-element-container-outstanding;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

              >
                <span
                  class=order
                >
                  <span
                    class=
        @include Inter(bold);
        font-size: 14px;
        line-height: 22px;

                  >
                    1
                  </span>
                </span>
                <div>
                  header
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("OrderedElevenExpand", () => {
    const { container } = render(<Template order={11} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-collapse,ant-collapse-borderless,ant-collapse-icon-position-right,
        .ant-collapse-item {
          border: 0px;
          background-color: $fills-light-white;

          .ant-collapse-header {
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px !important;
            padding-right: 24px;
            .ant-collapse-arrow {
              right: 0px;
            }
          }
          .ant-collapse-content {
            .ant-collapse-content-box {
              padding: 0px;
            }
          }
        }

        >
          <div
            class=ant-collapse-item
          >
            <div
              aria-expanded=false
              class=ant-collapse-header
              role=button
              tabindex=0
            >
              <div
                class=
        height: 24px;
        width: 24px;
        border-radius: 6px;
        padding: 4px;
        &:hover {
          background-color: $fill-outstanding-light;
          svg {
            path {
              fill: blue;
            }
          }
        }
      ,ant-collapse-arrow
              >
                <svg
                  fill=none
                  height=16
                  width=16
                  xmlns=http://www.w3.org/2000/svg
                >
                  <path
                    d=M3.05,6.159a.5.5,0,11.707-.707L8,9.695l4.243-4.243a.5.5,0,11.707.707l-3.89,3.89c-.349.348-.537.527-.751.597a1,1,0,01-.618,0c-.214-.07-.402-.249-.752-.598L3.05,6.159z
                    fill=#2C3852
                    fill-opacity=0.6
                  />
                </svg>
              </div>
              <div
                class=
        display: flex;
        align-items: center;
        .order {
          height: 24px;
          width: 24px;
          border-radius: 20px;
          color: $text-light-general;
          background: $fill-light-element-container-outstanding;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

              >
                <span
                  class=order
                >
                  <span
                    class=
        @include Inter(bold);
        font-size: 14px;
        line-height: 22px;

                  >
                    11
                  </span>
                </span>
                <div>
                  header
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("DisableExpand", () => {
    const { container } = render(<Template disableExpand={true} />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-collapse,ant-collapse-borderless,ant-collapse-icon-position-right,
        .ant-collapse-item {
          border: 0px;
          background-color: $fills-light-white;

          .ant-collapse-header {
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px !important;
            padding-right: 24px;
            .ant-collapse-arrow {
              right: 0px;
            }
          }
          .ant-collapse-content {
            .ant-collapse-content-box {
              padding: 0px;
            }
          }
        }
      ,
        .ant-collapse-item {
          .ant-collapse-header {
            padding-right: 0px;
            cursor: default;
          }
        }

        >
          <div
            class=ant-collapse-item,ant-collapse-no-arrow
          >
            <div
              aria-expanded=false
              class=ant-collapse-header
              role=button
              tabindex=0
            >
              <div
                class=
        display: flex;
        align-items: center;
        .order {
          height: 24px;
          width: 24px;
          border-radius: 20px;
          color: $text-light-general;
          background: $fill-light-element-container-outstanding;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

              >
                <div>
                  header
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it("ActivedDisableExpand", () => {
    const { container } = render(
      <Template disableExpand={true} defaultActive={true} />,
    );

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <div
          class=ant-collapse,ant-collapse-borderless,ant-collapse-icon-position-right,
        .ant-collapse-item {
          border: 0px;
          background-color: $fills-light-white;

          .ant-collapse-header {
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px !important;
            padding-right: 24px;
            .ant-collapse-arrow {
              right: 0px;
            }
          }
          .ant-collapse-content {
            .ant-collapse-content-box {
              padding: 0px;
            }
          }
        }
      ,
        .ant-collapse-item {
          .ant-collapse-header {
            padding-right: 0px;
            cursor: default;
          }
        }

        >
          <div
            class=ant-collapse-item,ant-collapse-item-active,ant-collapse-no-arrow
          >
            <div
              aria-expanded=true
              class=ant-collapse-header
              role=button
              tabindex=0
            >
              <div
                class=
        display: flex;
        align-items: center;
        .order {
          height: 24px;
          width: 24px;
          border-radius: 20px;
          color: $text-light-general;
          background: $fill-light-element-container-outstanding;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

              >
                <div>
                  header
                </div>
              </div>
            </div>
            <div
              class=ant-collapse-content,ant-collapse-content-active
            >
              <div
                class=ant-collapse-content-box
              >
                <div>
                  hello custom
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});

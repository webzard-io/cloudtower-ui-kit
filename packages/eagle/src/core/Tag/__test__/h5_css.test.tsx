import { render } from "@testing-library/react";
import { Placeholder16Icon } from "@cloudtower/icons-react";
import React from "react";
import { describe, it } from "vitest";
import Tag, { PresetColors } from "..";

describe("Tokenm h5_css", () => {
  it("h5_css color ", ({ expect }) => {
    const { container } = render(
      <div>
        {PresetColors.map((color) => (
          <Tag color={color}>Label</Tag>
        ))}
      </div>
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
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-blue
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-red,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-yellow,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-yellow
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-green,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green
              >
                Label
              </span>
              <span
                class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-gray
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-purple,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-purple
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-has-color,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red-ontint
              >
                Label
              </span>
              <span
                class=ant-tag,ant-tag-has-color,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green-ontint
              >
                Label
              </span>
            </div>
          </div>
        `);
  });

  it("h5_css tags with icon", ({ expect }) => {
    const { container } = render(
      <div>
        {PresetColors.map((color) => (
          <Tag color={color} icon={<Placeholder16Icon />}>
            Label
          </Tag>
        ))}
      </div>
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
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-blue
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-red,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-yellow,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-yellow
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-green,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-gray
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-purple,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-purple
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-has-color,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red-ontint
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
              <span
                class=ant-tag,ant-tag-has-color,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green-ontint
              >
                <span
                  class=
            margin-right: 4px;
            height: 16px;

                >
                  <svg
                    fill=none
                    height=16
                    width=16
                    xmlns=http://www.w3.org/2000/svg
                  >
                    <path
                      d=M0,0h16v16H0z
                      fill=#C0CBE0
                      fill-opacity=0.6
                    />
                  </svg>
                </span>
                Label
              </span>
            </div>
          </div>
        `);
  });

  it("h5_css split tags", ({ expect }) => {
    const { container } = render(
      <div>
        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"blue"}
        />
        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"gray"}
        />
        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"green"}
        />
        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"purple"}
        />

        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"red"}
        />

        <Tag.SplitTag
          primaryContent="name"
          secondaryContent="version"
          color={"yellow"}
        />
      </div>
    );
    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
          <div>
            <div>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-blue,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-blue,inside-tag
                >
                  name
                </span>
                version
              </span>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-gray,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-gray,inside-tag
                >
                  name
                </span>
                version
              </span>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-green,inside-tag
                >
                  name
                </span>
                version
              </span>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-purple,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-purple,inside-tag
                >
                  name
                </span>
                version
              </span>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-red,inside-tag
                >
                  name
                </span>
                version
              </span>
              <span
                class=ant-tag,
            margin: 0;
          ,
              padding: 0 8px;
              height: 18px;
            ,
            &.outside-tag {
              padding-left: 0;
              .inside-tag {
                border-radius: 4px 0 0 4px;
                padding-right: 4px;
                margin-right: 4px;
              }
            }
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-yellow,outside-tag
              >
                <span
                  class=ant-tag,
              padding: 0 8px;
              height: 18px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-yellow,inside-tag
                >
                  name
                </span>
                version
              </span>
            </div>
          </div>
        `);
  });

  it("h5_css medium size ", ({ expect }) => {
    const { container } = render(<Tag size="medium">tag</Tag>);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
          <div>
            <span
              class=ant-tag,
              padding: 2px 8px;
              height: 24px;
            ,
            margin: 0;
          ,
            @include Inter();
            font-size: 12px;
            line-height: 18px;
          ,ant-tag-gray
            >
              tag
            </span>
          </div>
        `);
  });

  it("render NameTag correctly", ({ expect }) => {
    const { container } = render(<Tag.NameTag>NameTag</Tag.NameTag>);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=ant-tag,
        &.ant-tag.ant-tag-gray {
          font-weight: 700;
          color: $text-neutral-primary;
          background-color: $fill-neutral-trans-1;
          border: 1px solid $stroke-neutral-trans-2;
          word-break: break-all;
          display: inline;
          white-space: normal;
        }
      ,
          padding: 0 8px;
          height: 18px;
        ,
        margin: 0;
      ,
        @include Inter();
        font-size: 12px;
        line-height: 18px;
      ,ant-tag-gray
        >
          NameTag
        </span>
      </div>
    `);
  });
});

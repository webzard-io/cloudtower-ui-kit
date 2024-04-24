import { initParrotI18n } from "@cloudtower/parrot";
import I18nNameTag from "@src/coreX/I18nNameTag";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

beforeAll(() => {
  initParrotI18n({
    resources: {
      "zh-CN": {
        test: {
          highlight: "这是一条会高亮传入 <1>{name}</1> 的词条",
        },
      },
    },
  });
});

describe("I18nNameTag", () => {
  it("render item correctly", ({ expect }) => {
    const { container } = render(
      <I18nNameTag name="label" i18nKey="test.highlight" />,
    );

    const highlightLabel = screen.getByText("label");
    expect(highlightLabel.tagName).toBe("SPAN");

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        这是一条会高亮传入 
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
        @at-root {
          span#{&} {
            margin: 0 2px;
          }
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
          label
        </span>
         的词条
      </div>
    `);
  });
});

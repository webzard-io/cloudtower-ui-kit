import { initParrotI18n } from "@cloudtower/parrot";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import I18nNameTag from "..";
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
          class=
        font-size: 90%;
        font-weight: bold;
        background-color: rgba(240, 243, 247, 0.6);
        padding: 1px 4px 1px;
        margin-left: 2px;
        margin-right: 2px;
        border: 1px solid rgba(213, 219, 227, 0.6);
        border-radius: 4px;
        word-break: break-all;

        >
          label
        </span>
         的词条
      </div>
    `);
  });
});

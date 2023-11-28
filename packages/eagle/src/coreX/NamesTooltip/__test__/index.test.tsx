import { initParrotI18n } from "@cloudtower/parrot";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import { ParrotTrans } from "../../../core/ParrotTrans";
import NamesTooltip from "..";
beforeAll(() => {
  initParrotI18n({
    resources: {
      "zh-CN": {
        test: {
          highlight: "<0>line</0>",
        },
      },
    },
  });
});

describe("NamesTooltip", () => {
  it("render item correctly", async ({ expect }) => {
    const names = [
      {
        id: "1",
        name: "line 1",
      },
      {
        id: "2",
        name: "line 2",
      },
    ];

    const { container } = render(
      <ParrotTrans i18nKey="test.highlight">
        <NamesTooltip names={names} />
      </ParrotTrans>,
    );

    const children = screen.getByText("line");
    expect(children.tagName).toBe("SPAN");
    fireEvent.mouseEnter(children);
    await waitFor(() => {
      const tooltip = screen.getByText("line 1");
      expect(tooltip).toBeInTheDocument();
    });

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=dashed-border-bottom,ant-tooltip-open,
        margin: 0 3px;

        >
          line
        </span>
      </div>
    `);
  });
});

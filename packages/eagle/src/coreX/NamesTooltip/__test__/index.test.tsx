import NamesTooltip from "@src/coreX/NamesTooltip";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

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

    render(<NamesTooltip names={names}>hover me</NamesTooltip>);

    const children = screen.getByText("hover me");
    expect(children.tagName).toBe("SPAN");
    fireEvent.mouseEnter(children);
    await waitFor(() => {
      expect(screen.getByText("line 1")).toBeInTheDocument();
    });
    expect(screen.getByText("line 2")).toBeInTheDocument();

    expect({
      linaria: true,
      dom: document.body,
    }).toMatchInlineSnapshot(`
      <body>
        <div>
          <span
            class=dashed-border-bottom,ant-tooltip-open,
        margin: 0 3px;

          >
            hover me
          </span>
        </div>
        <div
          style=position:,absolute;,top:,0px;,left:,0px;,width:,100%;
        >
          <div>
            <div
              class=ant-tooltip,TooltipDefaultClass,overlayClassName
              style=opacity:,0;,pointer-events:,none;
            >
              <div
                class=ant-tooltip-content
              >
                <div
                  class=ant-tooltip-arrow
                >
                  <span
                    class=ant-tooltip-arrow-content
                  />
                </div>
                <div
                  class=ant-tooltip-inner
                  role=tooltip
                >
                  <div
                    class=
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 18px;

        &:not(:last-child) {
          margin-bottom: 4px;
        }

                  >
                    line 1
                  </div>
                  <div
                    class=
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 18px;

        &:not(:last-child) {
          margin-bottom: 4px;
        }

                  >
                    line 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    `);
  });
});

import { render } from "@testing-library/react";
import React from "react";
import { describe, it } from "vitest";

import SidebarSubtitle from "..";

describe("SidebarSubtitle", () => {
  it("render item correctly", ({ expect }) => {
    const { container } = render(<SidebarSubtitle title="Sidebar" />);

    expect({
      linaria: true,
      dom: container,
    }).toMatchInlineSnapshot(`
      <div>
        <span
          class=
        @include Inter();
        @include Uppercase();
        font-size: 12px;
        line-height: 18px;

        >
          Sidebar
        </span>
      </div>
    `);
  });
});

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";

import BusinessBase from ".";

describe("BusinessBase", () => {
  it("component exist", () => {
    render(<BusinessBase />);
    expect(screen.getAllByText("hello_world")).toHaveLength(2);
  });
});

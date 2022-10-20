import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";

import TestBase from ".";

describe("TestBase", () => {
  it("component exist", () => {
    render(<TestBase />);
    expect(screen.getByText("hello_world")).toBeInTheDocument();
  });
});

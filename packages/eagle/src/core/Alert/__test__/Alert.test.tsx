import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Alert from "..";

describe("Alert", () => {
  it("renders basic alert", () => {
    render(<Alert type="info" message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  describe("expandConfig", () => {
    it("renders expand toggle when expandConfig is true", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{}}
        />,
      );
      expect(screen.getByTestId("alert-expand-toggle")).toBeInTheDocument();
    });

    it("hides description when collapsed", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{}}
        />,
      );
      expect(screen.queryByText("Detail content")).not.toBeInTheDocument();
    });

    it("shows description when expanded by clicking toggle", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{}}
        />,
      );
      fireEvent.click(screen.getByTestId("alert-expand-toggle"));
      expect(screen.getByText("Detail content")).toBeInTheDocument();
    });

    it("collapses description when clicking toggle again", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{}}
        />,
      );
      const toggle = screen.getByTestId("alert-expand-toggle");
      fireEvent.click(toggle);
      expect(screen.getByText("Detail content")).toBeInTheDocument();
      fireEvent.click(toggle);
      expect(screen.queryByText("Detail content")).not.toBeInTheDocument();
    });

    it("respects defaultExpanded", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{ defaultExpanded: true }}
        />,
      );
      expect(screen.getByText("Detail content")).toBeInTheDocument();
    });

    it("supports controlled mode", () => {
      const onExpandChange = vi.fn();
      const { rerender } = render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{ expanded: false, onExpandChange }}
        />,
      );
      expect(screen.queryByText("Detail content")).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("alert-expand-toggle"));
      expect(onExpandChange).toHaveBeenCalledWith(true);
      // Still collapsed because controlled
      expect(screen.queryByText("Detail content")).not.toBeInTheDocument();

      // Rerender with expanded=true
      rerender(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          expandConfig={{ expanded: true, onExpandChange }}
        />,
      );
      expect(screen.getByText("Detail content")).toBeInTheDocument();
    });

    it("does not render toggle when expandConfig is falsy", () => {
      render(
        <Alert type="info" message="Message" description="Detail content" />,
      );
      expect(
        screen.queryByTestId("alert-expand-toggle"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("Detail content")).toBeInTheDocument();
    });

    it("does not render toggle when expandConfig is set but no description", () => {
      render(<Alert type="info" message="Message" expandConfig={{}} />);
      expect(
        screen.queryByTestId("alert-expand-toggle"),
      ).not.toBeInTheDocument();
    });

    it("renders both action and expand toggle when both are provided", () => {
      render(
        <Alert
          type="info"
          message="Message"
          description="Detail content"
          action={<span data-testid="custom-action">Action</span>}
          expandConfig={{}}
        />,
      );
      expect(screen.getByTestId("custom-action")).toBeInTheDocument();
      expect(screen.getByTestId("alert-expand-toggle")).toBeInTheDocument();
    });
  });
});

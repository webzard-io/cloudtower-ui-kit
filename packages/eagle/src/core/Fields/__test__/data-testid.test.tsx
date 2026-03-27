/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import { render } from "@testing-library/react";
import React from "react";
import { describe, it, vi } from "vitest";

import FieldsBoolean from "../FieldsBoolean";
import FieldsFloat from "../FieldsFloat";
import FieldsInt from "../FieldsInt";
import FieldsInteger from "../FieldsInteger";
import FieldsString from "../FieldsString";
import FieldsTextArea from "../FieldsTextArea";

const mockInput = {
  name: "test-field",
  onBlur: vi.fn(),
  onChange: vi.fn(),
  onFocus: vi.fn(),
  value: "test",
};

const mockMeta = {};

describe("Fields data-testid", () => {
  it("FieldsString data-testid 透传到原生 input", () => {
    const { container } = render(
      <FieldsString
        data-testid="name-input"
        input={mockInput}
        meta={mockMeta}
      />,
    );
    expect(
      container.querySelector("input[data-testid='name-input']"),
    ).toBeTruthy();
  });

  it("FieldsString tags 模式 data-testid 透传到容器 div", () => {
    const { container } = render(
      <FieldsString
        data-testid="tags-input"
        input={mockInput}
        meta={mockMeta}
        tags={["tag1", "tag2"]}
      />,
    );
    expect(
      container.querySelector("div[data-testid='tags-input']"),
    ).toBeTruthy();
  });

  it("FieldsInt data-testid 透传到原生 input", () => {
    const { container } = render(
      <FieldsInt data-testid="int-input" input={mockInput} meta={mockMeta} />,
    );
    expect(
      container.querySelector("input[data-testid='int-input']"),
    ).toBeTruthy();
  });

  it("FieldsFloat data-testid 透传到原生 input", () => {
    const { container } = render(
      <FieldsFloat
        data-testid="float-input"
        input={{ ...mockInput, value: 1.5 }}
        meta={mockMeta}
      />,
    );
    expect(
      container.querySelector("input[data-testid='float-input']"),
    ).toBeTruthy();
  });

  it("FieldsInteger data-testid 透传到原生 input", () => {
    const { container } = render(
      <FieldsInteger
        data-testid="integer-input"
        input={{ ...mockInput, value: 42 }}
        meta={mockMeta}
      />,
    );
    expect(
      container.querySelector("input[data-testid='integer-input']"),
    ).toBeTruthy();
  });

  it("FieldsBoolean data-testid 透传到 checkbox", () => {
    const { container } = render(
      <FieldsBoolean
        data-testid="bool-input"
        input={{ ...mockInput, value: true }}
        meta={mockMeta}
      />,
    );
    expect(container.querySelector("[data-testid='bool-input']")).toBeTruthy();
  });

  it("FieldsTextArea data-testid 透传到原生 textarea", () => {
    const { container } = render(
      <FieldsTextArea
        data-testid="textarea-input"
        input={mockInput}
        meta={mockMeta}
      />,
    );
    expect(
      container.querySelector("textarea[data-testid='textarea-input']"),
    ).toBeTruthy();
  });

  it("FieldsString 不传 data-testid 时不会产生空属性", () => {
    const { container } = render(
      <FieldsString input={mockInput} meta={mockMeta} />,
    );
    expect(container.querySelector("[data-testid]")).toBeNull();
  });
});

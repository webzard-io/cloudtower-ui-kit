/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import AccordionCard from "../AccordionCard";
import Avatar from "../Avatar";
import { Banner } from "../Banner";
import BlankState from "../BlankState";
import Empty from "../Empty";
import FailedLoad from "../FailedLoad";
import FormItem from "../FormItem";
import Input from "../Input";
import InputInteger from "../InputInteger";
import InputNumber from "../InputNumber";
import InputPassword from "../InputPassword";
import SimplePagination from "../SimplePagination";
import TextArea from "../TextArea";
import TimePicker from "../TimePicker";

const expectTestId = (container: HTMLElement, testId: string) => {
  expect(container.querySelector(`[data-testid="${testId}"]`)).toBeTruthy();
};

describe("data-testid pass-through", () => {
  it("Input data-testid 到达原生 input 元素", () => {
    const { container } = render(<Input data-testid="my-input" />);
    expect(
      container.querySelector("input[data-testid='my-input']"),
    ).toBeTruthy();
  });

  it("Input 有 allowClear 时 data-testid 仍到达原生 input", () => {
    const { container } = render(
      <Input data-testid="my-input-clear" allowClear />,
    );
    expect(
      container.querySelector("input[data-testid='my-input-clear']"),
    ).toBeTruthy();
  });

  it("Input 有 prefix 时 data-testid 仍到达原生 input", () => {
    const { container } = render(
      <Input data-testid="my-input-prefix" prefix="$" />,
    );
    expect(
      container.querySelector("input[data-testid='my-input-prefix']"),
    ).toBeTruthy();
  });

  it("TextArea data-testid 到达原生 textarea 元素", () => {
    const { container } = render(<TextArea data-testid="my-textarea" />);
    expect(
      container.querySelector("textarea[data-testid='my-textarea']"),
    ).toBeTruthy();
  });

  it("InputInteger data-testid 到达原生 input 元素", () => {
    const { container } = render(<InputInteger data-testid="my-int" />);
    expect(container.querySelector("input[data-testid='my-int']")).toBeTruthy();
  });

  it("InputNumber data-testid 到达原生 input 元素", () => {
    const { container } = render(<InputNumber data-testid="my-num" />);
    expect(container.querySelector("input[data-testid='my-num']")).toBeTruthy();
  });

  it("FormItem passes data-testid", () => {
    const { container } = render(
      <FormItem data-testid="my-form-item" label="Name">
        <Input />
      </FormItem>,
    );
    expectTestId(container, "my-form-item");
  });

  it("TimePicker passes data-testid", () => {
    const { container } = render(<TimePicker data-testid="my-time" />);
    expectTestId(container, "my-time");
  });

  it("Avatar passes data-testid", () => {
    const { container } = render(
      <Avatar data-testid="my-avatar" username="Test" />,
    );
    expectTestId(container, "my-avatar");
  });

  it("Empty passes data-testid", () => {
    const { container } = render(<Empty data-testid="my-empty" />);
    expectTestId(container, "my-empty");
  });

  it("BlankState passes data-testid", () => {
    const { container } = render(
      <BlankState data-testid="my-blank" title="No data" />,
    );
    expectTestId(container, "my-blank");
  });

  it("AccordionCard passes data-testid", () => {
    const { container } = render(
      <AccordionCard
        data-testid="my-accordion"
        header="Header"
        expand={<div>Content</div>}
      />,
    );
    expectTestId(container, "my-accordion");
  });

  it("Banner passes data-testid", () => {
    const { container } = render(
      <Banner data-testid="my-banner" message="Info" type="info" />,
    );
    expectTestId(container, "my-banner");
  });

  it("InputPassword data-testid 到达原生 input 元素", () => {
    const { container } = render(
      <InputPassword data-testid="my-password" />,
    );
    expect(
      container.querySelector("input[data-testid='my-password']"),
    ).toBeTruthy();
  });

  it("FailedLoad 派生子元素 testid", () => {
    const { container } = render(
      <FailedLoad
        data-testid="my-failed"
        error="some error"
        refetch={() => Promise.resolve()}
      />,
    );
    expectTestId(container, "my-failed");
    expectTestId(container, "my-failed-retry");
  });

  it("SimplePagination 派生子元素 testid", () => {
    const { container } = render(
      <SimplePagination
        data-testid="my-pager"
        current={2}
        count={100}
        size={10}
        onPageChange={() => {}}
      />,
    );
    expectTestId(container, "my-pager");
    expectTestId(container, "my-pager-prev");
    expectTestId(container, "my-pager-next");
    expectTestId(container, "my-pager-input");
  });

  it("SimplePagination 第一页不显示 prev testid", () => {
    const { container } = render(
      <SimplePagination
        data-testid="my-pager"
        current={1}
        count={100}
        size={10}
        onPageChange={() => {}}
      />,
    );
    expectTestId(container, "my-pager");
    expect(
      container.querySelector("[data-testid='my-pager-prev']"),
    ).toBeNull();
    expectTestId(container, "my-pager-next");
  });
});

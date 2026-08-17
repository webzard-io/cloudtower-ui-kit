import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { UrlUpload } from "..";
import type { UrlUploadFile } from "../UrlUpload.type";

const parseButtonName = /Parse URL|解析 URL/;

const createFile = (url: string): UrlUploadFile => ({
  uid: "url-file",
  url,
  name: url,
  fileStatus: "success",
});

const createValidatingFile = (url: string): UrlUploadFile => ({
  uid: "url-validating-file",
  url,
  name: url,
  fileStatus: "validating",
});

describe("UrlUpload", () => {
  it("触发 URL 输入值变化回调", () => {
    const onChange = vi.fn();

    render(
      <UrlUpload
        data-testid="url-upload"
        value=""
        onChange={onChange}
        fileList={[]}
        setFileList={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByTestId("url-upload-input"), {
      target: { value: "https://example.com/example.iso" },
    });

    expect(onChange).toHaveBeenCalledWith("https://example.com/example.iso");
  });

  it("默认顶部标签时描述展示在输入框上方", () => {
    render(
      <UrlUpload
        data-testid="url-upload"
        label="URL 地址"
        description="请输入远端文件 URL"
        value=""
        fileList={[]}
        setFileList={vi.fn()}
      />,
    );

    const wrapper = screen.getByTestId("url-upload");
    const description = screen.getByText("请输入远端文件 URL");
    const input = screen.getByTestId("url-upload-input");

    expect(wrapper).toHaveClass("label-top");
    expect(screen.getByText("URL 地址")).toBeInTheDocument();
    expect(
      description.compareDocumentPosition(input) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("无标签时描述展示在输入框下方", () => {
    render(
      <UrlUpload
        data-testid="url-upload"
        description="请输入远端文件 URL"
        value=""
        fileList={[]}
        setFileList={vi.fn()}
      />,
    );

    const wrapper = screen.getByTestId("url-upload");
    const input = screen.getByTestId("url-upload-input");
    const description = screen.getByText("请输入远端文件 URL");

    expect(wrapper).toHaveClass("no-label");
    expect(
      input.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("左侧标签时描述展示在输入框下方", () => {
    render(
      <UrlUpload
        data-testid="url-upload"
        label="URL 地址"
        labelPosition="left"
        description="请输入远端文件 URL"
        value=""
        fileList={[]}
        setFileList={vi.fn()}
      />,
    );

    const wrapper = screen.getByTestId("url-upload");
    const input = screen.getByTestId("url-upload-input");
    const description = screen.getByText("请输入远端文件 URL");

    expect(wrapper).toHaveClass("label-left");
    expect(screen.getByText("URL 地址")).toBeInTheDocument();
    expect(
      input.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("空 URL 时展示内置必填校验错误", async () => {
    const setFileList = vi.fn();
    const validate = vi.fn();

    render(
      <UrlUpload
        value=""
        fileList={[]}
        setFileList={setFileList}
        showParseButton
        validate={validate}
      />,
    );

    const button = screen.getByRole("button", { name: parseButtonName });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/请输入 URL。|Please enter URL\\./)).toBeInTheDocument();
    });
    expect(setFileList).toHaveBeenCalledWith([]);
    expect(validate).not.toHaveBeenCalled();
  });

  it("URL 格式错误时不执行自定义校验", async () => {
    const setFileList = vi.fn();
    const validate = vi.fn();

    render(
      <UrlUpload
        value="invalid-url"
        fileList={[]}
        setFileList={setFileList}
        showParseButton
        validate={validate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: parseButtonName }));

    await waitFor(() => {
      expect(screen.getByText(/URL 格式错误。|Invalid URL format\\./)).toBeInTheDocument();
    });
    expect(setFileList).toHaveBeenCalledWith([]);
    expect(validate).not.toHaveBeenCalled();
  });

  it("禁用状态下不可解析 URL", () => {
    const setFileList = vi.fn();

    render(
      <UrlUpload
        disabled
        value="https://example.com/example.iso"
        fileList={[]}
        setFileList={setFileList}
        showParseButton
      />,
    );

    const button = screen.getByRole("button", { name: parseButtonName });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(setFileList).not.toHaveBeenCalled();
  });

  it("没有 validate 时点击解析直接生成成功文件", () => {
    const setFileList = vi.fn();

    render(
      <UrlUpload
        value="https://example.com/example.iso"
        fileList={[]}
        setFileList={setFileList}
        showParseButton
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: parseButtonName }));

    expect(setFileList).toHaveBeenCalledWith([
      expect.objectContaining({
        url: "https://example.com/example.iso",
        name: "https://example.com/example.iso",
        fileStatus: "success",
      }),
    ]);
  });

  it("普通输入模式不展示已解析文件条目", () => {
    const file = createFile("https://example.com/example.iso");

    const { container } = render(
      <UrlUpload
        value="https://example.com/example.iso"
        fileList={[file]}
        setFileList={vi.fn()}
      />,
    );

    expect(container.querySelector(".url-upload-file")).toBeNull();
  });

  it("解析成功后隐藏输入框和解析按钮", () => {
    const file = createFile("https://example.com/example.iso");

    render(
      <UrlUpload
        data-testid="url-upload"
        value="https://example.com/example.iso"
        fileList={[file]}
        setFileList={vi.fn()}
        showParseButton
      />,
    );

    expect(screen.queryByTestId("url-upload-input")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: parseButtonName }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("https://example.com/example.iso")).toBeInTheDocument();
  });

  it("解析中禁用输入框并展示 loading 按钮", () => {
    const file = createValidatingFile("https://example.com/example.iso");

    const { container } = render(
      <UrlUpload
        data-testid="url-upload"
        value="https://example.com/example.iso"
        fileList={[file]}
        setFileList={vi.fn()}
        showParseButton
      />,
    );

    expect(screen.getByTestId("url-upload-input")).toBeDisabled();
    expect(screen.getByRole("button", { name: parseButtonName })).toBeDisabled();
    expect(container.querySelector(".ant-btn-loading")).toBeInTheDocument();
  });

  it("validate 返回错误时展示错误且清空文件条目", async () => {
    const setFileList = vi.fn();

    render(
      <UrlUpload
        value="https://example.com/example.txt"
        fileList={[]}
        setFileList={setFileList}
        showParseButton
        validate={async () => ({ error: "文件 URL 必须以 .iso 结尾" })}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: parseButtonName }));

    await waitFor(() => {
      expect(screen.getByText("文件 URL 必须以 .iso 结尾")).toBeInTheDocument();
    });
    expect(setFileList).toHaveBeenLastCalledWith([]);
  });

  it("validate 返回 data 时生成成功文件并写入数据", async () => {
    const setFileList = vi.fn();
    const data = { parsed: true };
    const validate = vi.fn(async () => ({ data }));

    render(
      <UrlUpload
        value="https://example.com/example.iso"
        fileList={[]}
        setFileList={setFileList}
        showParseButton
        validate={validate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: parseButtonName }));

    await waitFor(() => {
      expect(validate).toHaveBeenCalledWith(
        expect.objectContaining({
          url: "https://example.com/example.iso",
        }),
        [
          expect.objectContaining({
            url: "https://example.com/example.iso",
          }),
        ],
      );
      expect(setFileList).toHaveBeenLastCalledWith([
        expect.objectContaining({
          url: "https://example.com/example.iso",
          name: "https://example.com/example.iso",
          fileStatus: "success",
          data,
        }),
      ]);
    });
  });

  it("移除文件时清空文件列表并触发 onRemove", () => {
    const file = createFile("https://example.com/example.iso");
    const setFileList = vi.fn();
    const onRemove = vi.fn();
    const { container } = render(
      <UrlUpload
        value="https://example.com/example.iso"
        fileList={[file]}
        setFileList={setFileList}
        showParseButton
        onRemove={onRemove}
      />,
    );

    const removeIcon = container.querySelector(".remove-icon");
    expect(removeIcon).not.toBeNull();
    fireEvent.click(removeIcon as Element);

    expect(setFileList).toHaveBeenCalledWith([]);
    expect(onRemove).toHaveBeenCalledWith(file);
  });

  it("错误态同时展示错误信息和说明", async () => {
    render(
      <UrlUpload
        value="https://example.com/example.txt"
        description="请输入 ISO 文件 URL"
        fileList={[]}
        setFileList={vi.fn()}
        showParseButton
        validate={async () => ({ error: "文件 URL 必须以 .iso 结尾" })}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: parseButtonName }));

    await waitFor(() => {
      expect(screen.getByText("文件 URL 必须以 .iso 结尾")).toBeInTheDocument();
    });
    expect(screen.getByText("请输入 ISO 文件 URL")).toBeInTheDocument();
  });
});

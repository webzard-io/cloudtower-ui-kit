/* eslint-disable testing-library/no-container, testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { LocalUpload } from "..";
import type { LocalUploadFile } from "../LocalUpload.type";

const expectFileSize = (container: HTMLElement, sizeText: string) => {
  expect(
    Array.from(container.querySelectorAll(".file-size-line")).some(
      (element) => element.textContent === sizeText,
    ),
  ).toBe(true);
};

const createMockFile = (
  name: string,
  size: number,
  fileStatus: LocalUploadFile["fileStatus"] = "success",
): LocalUploadFile => {
  const file = new File([], name, {
    type: "application/json",
  }) as LocalUploadFile;
  file.uid = `mock-${name}`;
  file.fileStatus = fileStatus;
  Object.defineProperty(file, "size", {
    value: size,
  });
  return file;
};

describe("LocalUpload", () => {
  it("有顶部标签时描述展示在上传区域上方", () => {
    const { container } = render(
      <LocalUpload
        fileList={[]}
        setFileList={vi.fn()}
        multiple
        label="上传文件"
        description="支持上传 .json 文件"
      />,
    );

    const description = screen.getByText("支持上传 .json 文件");
    const dragger = container.querySelector(".upload-drag") as Element;

    expect(
      description.compareDocumentPosition(dragger) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("没有标签时描述展示在上传区域下方", () => {
    const { container } = render(
      <LocalUpload
        fileList={[]}
        setFileList={vi.fn()}
        multiple
        description="支持上传 .json 文件"
      />,
    );

    const description = screen.getByText("支持上传 .json 文件");
    const dragger = container.querySelector(".upload-drag") as Element;

    expect(
      dragger.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("左侧标签布局时描述展示在上传区域下方", () => {
    const { container } = render(
      <LocalUpload
        fileList={[]}
        setFileList={vi.fn()}
        multiple
        label="上传文件"
        labelPosition="left"
        description="支持上传 .json 文件"
      />,
    );

    const description = screen.getByText("支持上传 .json 文件");
    const dragger = container.querySelector(".upload-drag") as Element;

    expect(container.firstElementChild).toHaveClass("label-left");
    expect(
      dragger.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("拖拽空态展示拖拽文案和选择文件 link", () => {
    const { container } = render(
      <LocalUpload fileList={[]} setFileList={vi.fn()} multiple />,
    );

    expect(screen.getByText(/将文件拖拽到此处或/)).toBeInTheDocument();
    expect(container.querySelector(".upload-drag-link")).toHaveTextContent(
      "选择文件",
    );
  });

  it("单文件拖拽选择后展示文件名、文件大小和移除入口", () => {
    const file = createMockFile("Document-01.json", 1024 * 10);

    const { container } = render(
      <LocalUpload fileList={[file]} setFileList={vi.fn()} multiple={false} />,
    );

    expect(screen.getByText("Document-01.json")).toBeInTheDocument();
    expectFileSize(container, "10 KiB");
    expect(screen.queryByText(/重新选择|Re-select/)).not.toBeInTheDocument();
    expect(container.querySelector(".remove-button")).toBeInTheDocument();
  });

  it("单文件拖拽移除时清空列表并触发 onRemove", () => {
    const file = createMockFile("Document-01.json", 1024 * 10);
    const setFileList = vi.fn();
    const onRemove = vi.fn();

    const { container } = render(
      <LocalUpload
        fileList={[file]}
        setFileList={setFileList}
        multiple={false}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(container.querySelector(".remove-button") as Element);

    expect(setFileList).toHaveBeenCalledWith([]);
    expect(onRemove).toHaveBeenCalledWith(file);
  });

  it("单文件禁用移除时点击移除入口不清空列表", () => {
    const file = createMockFile("Document-01.json", 1024 * 10);
    const setFileList = vi.fn();

    const { container } = render(
      <LocalUpload
        fileList={[file]}
        setFileList={setFileList}
        multiple={false}
        disableRemoveList
      />,
    );

    fireEvent.click(container.querySelector(".remove-button") as Element);

    expect(setFileList).not.toHaveBeenCalled();
  });

  it("组件禁用时单文件移除入口不清空列表", () => {
    const file = createMockFile("Document-01.json", 1024 * 10);
    const setFileList = vi.fn();

    const { container } = render(
      <LocalUpload
        fileList={[file]}
        setFileList={setFileList}
        multiple={false}
        disabled
      />,
    );

    fireEvent.click(container.querySelector(".remove-button") as Element);

    expect(setFileList).not.toHaveBeenCalled();
  });

  it("多文件拖拽列表展示卡片式文件条目和文件大小", () => {
    const files = [
      createMockFile("Document-01.json", 1024 * 10),
      createMockFile("Document-02.json", 1024 * 16),
    ];

    const { container } = render(
      <LocalUpload fileList={files} setFileList={vi.fn()} multiple />,
    );

    expect(container.querySelectorAll(".upload-file-item")).toHaveLength(2);
    expect(screen.getByText("Document-01.json")).toBeInTheDocument();
    expect(screen.getByText("Document-02.json")).toBeInTheDocument();
    expectFileSize(container, "10 KiB");
    expectFileSize(container, "16 KiB");
  });

  it("多文件移除时只触发一次 onRemove", () => {
    const files = [
      createMockFile("Document-01.json", 1024 * 10),
      createMockFile("Document-02.json", 1024 * 16),
    ];
    const setFileList = vi.fn();
    const onRemove = vi.fn();

    const { container } = render(
      <LocalUpload
        fileList={files}
        setFileList={setFileList}
        multiple
        onRemove={onRemove}
      />,
    );

    fireEvent.click(container.querySelector(".remove-button") as Element);

    expect(setFileList).toHaveBeenCalledWith([files[1]]);
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(files[0]);
  });

  it("组件禁用时多文件列表移除入口不删除文件", () => {
    const files = [
      createMockFile("Document-01.json", 1024 * 10),
      createMockFile("Document-02.json", 1024 * 16),
    ];
    const setFileList = vi.fn();

    const { container } = render(
      <LocalUpload
        fileList={files}
        setFileList={setFileList}
        multiple
        disabled
      />,
    );

    fireEvent.click(container.querySelector(".remove-button") as Element);

    expect(setFileList).not.toHaveBeenCalled();
  });

  it("拖拽模式展示外部传入的字段级错误，位置在上传区域和描述之间", () => {
    const { container } = render(
      <LocalUpload
        fileList={[]}
        setFileList={vi.fn()}
        multiple
        description="支持上传 .json 文件"
        error="请选择 1 个 .tar 文件和 1 个 .json 文件。"
      />,
    );

    const fieldError = screen.getByText(
      "请选择 1 个 .tar 文件和 1 个 .json 文件。",
    );
    const dragger = container.querySelector(".upload-drag") as Element;
    const description = screen.getByText("支持上传 .json 文件");

    expect(fieldError).toHaveClass("upload-error");
    expect(
      dragger.compareDocumentPosition(fieldError) &
        Node.DOCUMENT_POSITION_CONTAINED_BY,
    ).toBeTruthy();
    expect(
      fieldError.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("按钮模式展示外部传入的字段级错误", () => {
    render(
      <LocalUpload
        type="button"
        fileList={[]}
        setFileList={vi.fn()}
        multiple
        error="请选择文件。"
      />,
    );

    expect(screen.getByText("请选择文件。")).toHaveClass("upload-error");
  });

  it("字段级错误与文件条目自身的错误同时展示", () => {
    const file = createMockFile("Document-01.json", 1024 * 10, "error");
    file.error = "不是节点相关文件。";

    render(
      <LocalUpload
        fileList={[file]}
        setFileList={vi.fn()}
        multiple
        error="请选择 1 个 .tar 文件和 1 个 .json 文件。"
      />,
    );

    expect(
      screen.getByText("请选择 1 个 .tar 文件和 1 个 .json 文件。"),
    ).toHaveClass("upload-error");
    expect(screen.getByText("不是节点相关文件。")).toHaveClass(
      "upload-file-error",
    );
  });
});

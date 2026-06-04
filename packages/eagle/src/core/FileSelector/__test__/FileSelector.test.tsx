import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { FileSelector } from "..";
import type { LocalUploadFile } from "../../LocalUpload";
import type { UrlUploadFile } from "../../UrlUpload";

const createLocalFile = (name = "Document-01.tar.gz"): LocalUploadFile => {
  const file = new File([], name, {
    type: "application/gzip",
  }) as LocalUploadFile;
  file.uid = `local-${name}`;
  file.fileStatus = "success";
  Object.defineProperty(file, "size", {
    value: 1024,
  });
  return file;
};

const createUrlFile = (
  url = "https://example.com/Document-01.tar.gz",
): UrlUploadFile => ({
  uid: "url-file",
  url,
  name: url,
  fileStatus: "success",
});

describe("FileSelector", () => {
  it("默认展示本地上传，点击 URL 后切换到 URL 上传", () => {
    render(
      <FileSelector
        data-testid="file-selector"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
      />,
    );

    expect(screen.getByText(/将文件拖拽到此处或/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("从 URL 上传"));

    expect(screen.getByTestId("file-selector")).toHaveClass("no-label");
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("已选择本地文件时禁用 URL 入口且点击不切换", () => {
    const onModeChange = vi.fn();

    render(
      <FileSelector
        localFileList={[createLocalFile()]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        onModeChange={onModeChange}
      />,
    );

    fireEvent.click(screen.getByText("从 URL 上传"));

    expect(onModeChange).not.toHaveBeenCalled();
    expect(screen.getByText("Document-01.tar.gz")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("已输入 URL 时禁用本地入口且点击不切换", () => {
    const onModeChange = vi.fn();

    render(
      <FileSelector
        defaultMode="url"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        urlValue="https://example.com/Document-01.tar.gz"
        onModeChange={onModeChange}
      />,
    );

    fireEvent.click(screen.getByText("从本地选择"));

    expect(onModeChange).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue("https://example.com/Document-01.tar.gz"))
      .toBeInTheDocument();
    expect(screen.queryByText(/将文件拖拽到此处或/)).not.toBeInTheDocument();
  });

  it("已解析 URL 文件时禁用本地入口", () => {
    const onModeChange = vi.fn();

    render(
      <FileSelector
        defaultMode="url"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[createUrlFile()]}
        setUrlFileList={vi.fn()}
        urlUploadProps={{ showParseButton: true }}
        onModeChange={onModeChange}
      />,
    );

    fireEvent.click(screen.getByText("从本地选择"));

    expect(onModeChange).not.toHaveBeenCalled();
    expect(
      screen.getByText("https://example.com/Document-01.tar.gz"),
    ).toBeInTheDocument();
  });

  it("受控模式下点击只触发 onModeChange，不自行切换展示内容", () => {
    const onModeChange = vi.fn();

    render(
      <FileSelector
        mode="local"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        onModeChange={onModeChange}
      />,
    );

    fireEvent.click(screen.getByText("从 URL 上传"));

    expect(onModeChange).toHaveBeenCalledWith("url");
    expect(screen.getByText(/将文件拖拽到此处或/)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("非受控模式支持 defaultMode 并能内部切换", () => {
    render(
      <FileSelector
        defaultMode="url"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    fireEvent.click(screen.getByText("从本地选择"));

    expect(screen.getByText(/将文件拖拽到此处或/)).toBeInTheDocument();
  });

  it("禁用状态下不可切换，且当前上传控件禁用", () => {
    const onModeChange = vi.fn();

    render(
      <FileSelector
        disabled
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        onModeChange={onModeChange}
      />,
    );

    fireEvent.click(screen.getByText("从 URL 上传"));

    expect(onModeChange).not.toHaveBeenCalled();
    expect(screen.getByText(/将文件拖拽到此处或/)).toBeInTheDocument();
    expect(
      document.querySelector(".ant-upload-disabled"),
    ).toBeInTheDocument();
  });

  it("透传 LocalUpload 和 UrlUpload 属性", () => {
    const { rerender } = render(
      <FileSelector
        data-testid="file-selector"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        localUploadProps={{
          accept: ".tar.gz",
          multiple: false,
          "data-testid": "local-upload",
        }}
      />,
    );

    expect(screen.getByTestId("local-upload")).toBeInTheDocument();

    rerender(
      <FileSelector
        mode="url"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        urlUploadProps={{
          description: "仅支持 HTTP(S) 协议。",
          placeholder: "请输入安装包 URL",
          showParseButton: true,
          "data-testid": "url-upload",
        }}
      />,
    );

    expect(screen.getByTestId("url-upload")).toBeInTheDocument();
    expect(screen.getByText("仅支持 HTTP(S) 协议。")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入安装包 URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Parse URL|解析 URL/ }))
      .toBeInTheDocument();
  });

  it("顶层描述作为默认说明，子上传组件描述可覆盖", () => {
    const { rerender } = render(
      <FileSelector
        description="默认文件说明"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
      />,
    );

    expect(screen.getByText("默认文件说明")).toBeInTheDocument();

    rerender(
      <FileSelector
        mode="url"
        description="默认文件说明"
        localFileList={[]}
        setLocalFileList={vi.fn()}
        urlFileList={[]}
        setUrlFileList={vi.fn()}
        urlUploadProps={{
          description: "URL 文件说明",
        }}
      />,
    );

    expect(screen.getByText("URL 文件说明")).toBeInTheDocument();
    expect(screen.queryByText("默认文件说明")).not.toBeInTheDocument();
  });
});

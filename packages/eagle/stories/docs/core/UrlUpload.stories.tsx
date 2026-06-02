import { UrlUpload, UrlUploadFile } from "@src/core/UrlUpload";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * UrlUpload 组件用于单 URL 文件输入，支持 URL 解析、异步校验和文件条目展示。
 *
 * ## 功能特点
 * - 支持单 URL 输入
 * - 支持解析按钮
 * - 支持异步验证
 * - 支持错误提示
 * - 支持解析后的文件条目展示
 */
const meta: Meta<typeof UrlUpload> = {
  title: "Core/UrlUpload | URL 上传",
  component: UrlUpload,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/g3vMiCwvaj8g8ZmjNvCQmU/File-Selector-%7C-%E6%96%87%E4%BB%B6%E9%80%89%E6%8B%A9%E5%99%A8?node-id=4299-116313",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UrlUpload>;

const createUrlFile = (url: string): UrlUploadFile => ({
  uid: `mock-${Math.random().toString(36).slice(2, 9)}`,
  url,
  name: url,
  fileStatus: "success",
});

const createParsingUrlFile = (url: string): UrlUploadFile => ({
  uid: "mock-parsing",
  url,
  name: url,
  fileStatus: "validating",
});

export const Basic: Story = {
  name: "普通 URL 输入",
  render: () => {
    const [value, setValue] = useState("");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="请输入远端文件 URL"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        placeholder="https://example.com/files/example.iso"
      />
    );
  },
};

export const WithParseButton: Story = {
  name: "带解析按钮",
  render: () => {
    const [value, setValue] = useState("");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="输入 URL 后点击解析"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
        placeholder="https://example.com/files/example.iso"
      />
    );
  },
};

export const ParsedFile: Story = {
  name: "解析成功",
  render: () => {
    const url = "https://example.com/files/example.iso";
    const [value, setValue] = useState(url);
    const [fileList, setFileList] = useState<UrlUploadFile[]>([
      createUrlFile(url),
    ]);

    return (
      <UrlUpload
        description="URL 已解析为文件条目"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
      />
    );
  },
};

export const Parsing: Story = {
  name: "解析中",
  render: () => {
    const url = "https://example.com/files/example.iso";
    const [value, setValue] = useState(url);
    const [fileList, setFileList] = useState<UrlUploadFile[]>([
      createParsingUrlFile(url),
    ]);

    return (
      <UrlUpload
        description="正在解析 URL"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
      />
    );
  },
};

export const ValidateFailed: Story = {
  name: "解析失败",
  render: () => {
    const [value, setValue] = useState("invalid-url");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="仅允许解析 .iso 文件"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
      />
    );
  },
};

export const CustomValidate: Story = {
  name: "自定义校验",
  render: () => {
    const [value, setValue] = useState("https://example.com/files/example.txt");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="内置 URL 校验通过后，再校验文件后缀"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
        validate={async (file) => {
          if (!file.url.endsWith(".iso")) {
            return { error: "文件 URL 必须以 .iso 结尾" };
          }
          return { data: { parsed: true } };
        }}
      />
    );
  },
};

export const Disabled: Story = {
  name: "禁用状态",
  render: () => {
    const url = "https://example.com/files/example.iso";
    const [value, setValue] = useState(url);
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="当前无法修改 URL"
        disabled
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
      />
    );
  },
};

import { FileSelector } from "@src/core";
import type { LocalUploadFile, UrlUploadFile } from "@src/core";
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * FileSelector 组件用于在本地文件选择和 URL 上传之间互斥选择文件来源。
 */
const meta: Meta<typeof FileSelector> = {
  title: "Core/FileSelector | 文件选择器",
  component: FileSelector,
  parameters: {
    docs: {
      description: {
        component:
          "由 LocalUpload 和 UrlUpload 组合而成。已选择本地文件后 URL 上传入口禁用，已输入 URL 或已解析 URL 文件后本地选择入口禁用。",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "标签",
    },
    description: {
      control: "text",
      description: "文件要求说明",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileSelector>;

const TAR_DESCRIPTION = "选择 1 个扩展名为 .tar.gz 的文件。";
const TAR_URL_DESCRIPTION =
  "仅支持 HTTP(S) 协议。需输入 1 个扩展名为 .tar.gz 的文件对应的 URL。";
const TAR_URL_PLACEHOLDER = "例如：http://192.168.17.20/tar/example.tar.gz";

const createLocalFile = (
  name: string,
  size: number,
  status: LocalUploadFile["fileStatus"] = "success",
): LocalUploadFile => {
  const file = new File([], name, {
    type: "application/gzip",
  }) as LocalUploadFile;
  file.uid = `local-${name}`;
  file.fileStatus = status;
  Object.defineProperty(file, "size", {
    value: size,
  });
  return file;
};

const createUrlFile = (url: string): UrlUploadFile => ({
  uid: `url-${url}`,
  url,
  name: url,
  fileStatus: "success",
});

export const Basic: Story = {
  name: "单文件选择 / 输入，直接上传",
  render: (args) => {
    const [localFileList, setLocalFileList] = useState<LocalUploadFile[]>([]);
    const [urlFileList, setUrlFileList] = useState<UrlUploadFile[]>([]);
    const [urlValue, setUrlValue] = useState("");

    return (
      <div style={{ width: 412 }}>
        <FileSelector
          {...args}
          localFileList={localFileList}
          setLocalFileList={setLocalFileList}
          urlFileList={urlFileList}
          setUrlFileList={setUrlFileList}
          urlValue={urlValue}
          onUrlChange={setUrlValue}
          localUploadProps={{
            accept: ".tar.gz",
            multiple: false,
          }}
          urlUploadProps={{
            description: TAR_URL_DESCRIPTION,
            placeholder: TAR_URL_PLACEHOLDER,
          }}
        />
      </div>
    );
  },
  args: {
    description: TAR_DESCRIPTION,
  },
};

export const WithParseButton: Story = {
  name: "单文件选择 / 输入，需解析",
  render: (args) => {
    const [localFileList, setLocalFileList] = useState<LocalUploadFile[]>([]);
    const [urlFileList, setUrlFileList] = useState<UrlUploadFile[]>([]);
    const [urlValue, setUrlValue] = useState("");

    return (
      <div style={{ width: 432 }}>
        <FileSelector
          {...args}
          label="OVF 文件"
          labelPosition="left"
          localFileList={localFileList}
          setLocalFileList={setLocalFileList}
          urlFileList={urlFileList}
          setUrlFileList={setUrlFileList}
          urlValue={urlValue}
          onUrlChange={setUrlValue}
          localUploadProps={{
            accept: ".ovf",
            multiple: false,
          }}
          urlUploadProps={{
            description:
              "仅支持 HTTP(S) 协议。需输入 1 个 OVF 格式的文件对应的 URL。",
            placeholder: "请输入 OVF 文件 URL",
            showParseButton: true,
            validate: async (file) => ({ data: { url: file.url } }),
          }}
        />
      </div>
    );
  },
  args: {
    description: "选择 1 个 OVF 格式的文件。",
  },
};

export const LocalSelected: Story = {
  name: "已选择本地文件",
  render: (args) => {
    const [localFileList, setLocalFileList] = useState<LocalUploadFile[]>([
      createLocalFile("Document-01.tar.gz", 3.25 * 1024 * 1024 * 1024),
    ]);
    const [urlFileList, setUrlFileList] = useState<UrlUploadFile[]>([]);
    const [urlValue, setUrlValue] = useState("");

    return (
      <div style={{ width: 412 }}>
        <FileSelector
          {...args}
          localFileList={localFileList}
          setLocalFileList={setLocalFileList}
          urlFileList={urlFileList}
          setUrlFileList={setUrlFileList}
          urlValue={urlValue}
          onUrlChange={setUrlValue}
          localUploadProps={{
            accept: ".tar.gz",
            multiple: false,
          }}
          urlUploadProps={{
            description: TAR_URL_DESCRIPTION,
            placeholder: TAR_URL_PLACEHOLDER,
          }}
        />
      </div>
    );
  },
  args: {
    description: TAR_DESCRIPTION,
  },
};

export const UrlEntered: Story = {
  name: "已输入 URL",
  render: (args) => {
    const [localFileList, setLocalFileList] = useState<LocalUploadFile[]>([]);
    const [urlFileList, setUrlFileList] = useState<UrlUploadFile[]>([
      createUrlFile("https://example.com/download"),
    ]);
    const [urlValue, setUrlValue] = useState("https://example.com/download");

    return (
      <div style={{ width: 412 }}>
        <FileSelector
          {...args}
          defaultMode="url"
          localFileList={localFileList}
          setLocalFileList={setLocalFileList}
          urlFileList={urlFileList}
          setUrlFileList={setUrlFileList}
          urlValue={urlValue}
          onUrlChange={setUrlValue}
          urlUploadProps={{
            description: TAR_URL_DESCRIPTION,
            placeholder: TAR_URL_PLACEHOLDER,
          }}
        />
      </div>
    );
  },
  args: {
    description: TAR_DESCRIPTION,
  },
};

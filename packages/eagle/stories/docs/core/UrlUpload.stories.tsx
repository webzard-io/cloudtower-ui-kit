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
  argTypes: {
    className: {
      control: "text",
      description: "自定义类名，透传到根元素",
    },
    "data-testid": {
      control: "text",
      description: "测试标识，透传到根元素",
    },
    label: {
      control: "text",
      description: "标签内容",
    },
    labelPosition: {
      control: "select",
      options: ["top", "left"],
      description:
        "标签位置。label 在左或没有 label 时，description 展示在输入框下方",
      table: { defaultValue: { summary: "top" } },
    },
    description: {
      control: "text",
      description: "描述文本。有顶部 label 时展示在输入框上方，否则展示在输入框下方",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用 URL 输入和解析操作",
      table: { defaultValue: { summary: "false" } },
    },
    value: {
      control: "text",
      description: "URL 输入框值",
    },
    onChange: {
      control: false,
      description: "URL 输入框值变化回调",
    },
    placeholder: {
      control: "text",
      description: "URL 输入框占位文案",
    },
    fileList: {
      control: false,
      description: "URL 文件列表，单 URL 场景最多一个",
    },
    setFileList: {
      control: false,
      description: "设置 URL 文件列表",
    },
    showParseButton: {
      control: "boolean",
      description:
        "是否展示解析按钮。为 false 时仅展示 URL 输入框，组件不主动创建文件条目",
      table: { defaultValue: { summary: "false" } },
    },
    parseButtonText: {
      control: "text",
      description: "解析按钮文案，仅 showParseButton=true 时生效",
    },
    disableRemoveList: {
      control: "boolean",
      description: "是否禁用解析成功后文件条目的移除入口",
      table: { defaultValue: { summary: "false" } },
    },
    validate: {
      control: false,
      description:
        "URL 验证函数，仅点击解析按钮时执行。内置必填和 URL 格式校验通过后执行，可返回 error 或 data",
    },
    onRemove: {
      control: false,
      description: "URL 文件移除事件回调",
    },
  },
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

export const CustomParseButtonText: Story = {
  name: "自定义解析按钮文案",
  render: () => {
    const [value, setValue] = useState("");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        description="按钮文案可按业务动作调整"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
        parseButtonText="校验链接"
        placeholder="https://example.com/files/example.iso"
      />
    );
  },
};

export const LabelTop: Story = {
  name: "标签在上",
  render: () => {
    const [value, setValue] = useState("");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        label="URL 地址"
        description="请输入远端文件 URL"
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

export const LabelLeft: Story = {
  name: "标签在左",
  render: () => {
    const [value, setValue] = useState("");
    const [fileList, setFileList] = useState<UrlUploadFile[]>([]);

    return (
      <UrlUpload
        label="URL 地址"
        labelPosition="left"
        description="请输入远端文件 URL"
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

export const DisableRemove: Story = {
  name: "禁用移除",
  render: () => {
    const url = "https://example.com/files/example.iso";
    const [value, setValue] = useState(url);
    const [fileList, setFileList] = useState<UrlUploadFile[]>([
      createUrlFile(url),
    ]);

    return (
      <UrlUpload
        description="解析后的 URL 已锁定，无法移除"
        value={value}
        onChange={setValue}
        fileList={fileList}
        setFileList={setFileList}
        showParseButton
        disableRemoveList
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

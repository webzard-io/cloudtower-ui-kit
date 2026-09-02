import { LocalUpload, LocalUploadFile } from "@src/core/LocalUpload";
import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * LocalUpload 组件用于本地文件上传，支持按钮上传和拖拽上传两种方式。
 *
 * ## 功能特点
 * - 支持单文件和多文件上传
 * - 支持拖拽上传
 * - 支持文件验证
 * - 支持上传进度展示
 * - 支持错误提示
 */
const meta: Meta<typeof LocalUpload> = {
  title: "Core/LocalUpload | 本地文件上传",
  component: LocalUpload,
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
      description: "上传组件标签",
    },
    labelPosition: {
      control: "select",
      options: ["top", "left"],
      description:
        "标签位置。label 在左或没有 label 时，description 展示在上传区域下方",
      table: { defaultValue: { summary: "top" } },
    },
    description: {
      control: "text",
      description: "上传要求或辅助描述文本",
    },
    info: {
      control: false,
      description: "额外信息区域，展示在上传区域和文件列表之间",
    },
    type: {
      control: "select",
      options: ["button", "dragger"],
      description: "上传触发方式：按钮上传或拖拽上传",
      table: { defaultValue: { summary: "dragger" } },
    },
    multiple: {
      control: "boolean",
      description: "是否支持多文件选择",
      table: { defaultValue: { summary: "false" } },
    },
    accept: {
      control: "text",
      description: "允许选择的文件扩展名，例如 .iso、.json",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用上传操作",
      table: { defaultValue: { summary: "false" } },
    },
    maxCount: {
      control: "number",
      description:
        "最大文件数量。multiple=false 时固定为单文件场景；仅多文件上传时按传入值限制",
    },
    fileList: {
      control: false,
      description: "受控文件列表",
    },
    setFileList: {
      control: false,
      description: "设置受控文件列表",
    },
    disableRemoveList: {
      control: "boolean",
      description: "是否禁用已选文件的移除入口。单文件拖拽态和文件列表均生效",
      table: { defaultValue: { summary: "false" } },
    },
    validate: {
      control: false,
      description:
        "文件验证函数。返回 error 时展示错误，返回 data 时写入文件自定义数据",
    },
    buttonProps: {
      control: false,
      description:
        "按钮上传的额外配置，仅 type=button 时生效，支持 className 和 hideIcon",
    },
    onRemove: {
      control: false,
      description: "文件移除事件回调",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/g3vMiCwvaj8g8ZmjNvCQmU/File-Selector-%7C-%E6%96%87%E4%BB%B6%E9%80%89%E6%8B%A9%E5%99%A8?node-id=4299-114678",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocalUpload>;

// 辅助函数：创建模拟文件
const createMockFile = (
  name: string,
  size: number,
  status: LocalUploadFile["fileStatus"],
): LocalUploadFile => {
  const file = new File([], name, {
    type: name.endsWith(".pdf") ? "application/pdf" : "text/plain",
  }) as LocalUploadFile;
  file.uid = `mock-${Math.random().toString(36).slice(2, 9)}`;
  file.fileStatus = status;
  Object.defineProperty(file, "size", {
    value: size,
  });
  return file;
};

/**
 * 基础的拖拽上传示例
 * 点击或拖拽文件到上传区域即可上传
 */
export const BasicDragger: Story = {
  name: "基础拖拽上传",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        label="上传文件"
        description="支持上传 .txt, .pdf, .doc 等格式文件"
      />
    );
  },
};

/**
 * 按钮上传示例
 * 使用按钮触发文件选择对话框
 */
export const ButtonUpload: Story = {
  name: "按钮上传",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="button"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        label="上传文件"
        description="点击按钮选择要上传的文件"
      />
    );
  },
};

/**
 * 标签在左侧，描述展示在拖拽区域下方。
 */
export const LeftLabelDragger: Story = {
  name: "标签在左",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        label="上传文件"
        labelPosition="left"
        description="支持上传 .txt, .pdf, .doc 等格式文件"
      />
    );
  },
};

/**
 * 没有标签时，描述展示在拖拽区域下方。
 */
export const NoLabelDescriptionBelow: Story = {
  name: "无标签描述在下",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        description="支持上传 .txt, .pdf, .doc 等格式文件"
      />
    );
  },
};

/**
 * 单文件拖拽上传
 * 只允许选择一个文件，选择新文件会替换旧文件
 */
export const SingleFileDragger: Story = {
  name: "单文件拖拽上传",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        label="上传配置文件"
        description="仅支持上传单个文件"
      />
    );
  },
};

/**
 * 单文件选择后
 */
export const SingleFileSelected: Story = {
  name: "单文件选择后",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => [
      createMockFile("Document-01.json", 1024 * 10, "success"),
    ]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        label="上传配置文件"
        description="仅支持上传单个文件"
      />
    );
  },
};

/**
 * 单文件解析校验中
 */
export const SingleFileValidating: Story = {
  name: "单文件解析校验中",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => [
      createMockFile("Document-01.json", 1024 * 10, "validating"),
    ]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        label="上传配置文件"
        description="仅支持上传单个文件"
      />
    );
  },
};

/**
 * 多文件选择后
 */
export const MultipleFilesSelected: Story = {
  name: "多文件选择后",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => [
      createMockFile("Document-01.json", 1024 * 10, "success"),
      createMockFile("Document-02.json", 1024 * 16, "success"),
    ]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        label="上传文件"
        description="支持上传 .json 格式文件"
      />
    );
  },
};

/**
 * 预填充文件
 */
export const WithPrefilledFiles: Story = {
  name: "预填充文件",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => {
      const mockFiles = [
        createMockFile("document.pdf", 1024 * 512, "success"),
        createMockFile("image.jpg", 1024 * 1024 * 2, "error"),
      ];
      mockFiles[1].error = "文件大小超过限制";
      return mockFiles;
    });

    return (
      <LocalUpload
        label="预填充文件示例"
        description="包含成功和失败状态的文件"
        multiple
        fileList={fileList}
        setFileList={setFileList}
      />
    );
  },
};

/**
 * 限制文件数量
 * 最多只能上传指定数量的文件
 */
export const MaxCountUpload: Story = {
  name: "限制文件数量",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => [
      createMockFile("document.pdf", 1024 * 512, "success"),
      createMockFile("image.jpg", 1024 * 1024 * 2, "success"),
      createMockFile("video.mp4", 1024 * 1024 * 10, "success"),
    ]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        maxCount={3}
        label="上传文件（最多3个）"
        description="超过限制数量将无法继续上传"
      />
    );
  },
};

/**
 * 带文件类型限制的上传
 * 只允许上传指定类型的文件
 */
export const AcceptTypeUpload: Story = {
  name: "文件类型限制",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        accept=".png"
        label="上传图片"
        description="仅支持 PNG 格式图片"
      />
    );
  },
};

/**
 * 带文件验证的上传
 * 可以自定义文件验证逻辑，验证失败会显示错误信息
 */
export const ValidatedUpload: Story = {
  name: "文件验证",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    const validate = async (file: LocalUploadFile) => {
      // 模拟异步验证
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 验证文件大小
      if (file.size > 5 * 1024 * 1024) {
        return { error: "文件大小不能超过 5MB" };
      }

      // 验证文件名
      if (file.name.includes("test")) {
        return { error: "文件名不能包含 'test'" };
      }

      return { data: { validated: true } };
    };

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        validate={validate}
        label="上传文件（带验证）"
        description="文件大小不能超过 5MB，且文件名不能包含 'test'"
      />
    );
  },
};

/**
 * 禁用状态
 * 禁用后无法进行文件上传操作
 */
export const DisabledUpload: Story = {
  name: "禁用状态",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        disabled
        label="上传文件（已禁用）"
        description="当前无法上传文件"
      />
    );
  },
};

/**
 * 禁用文件移除入口
 */
export const DisableRemove: Story = {
  name: "禁用移除",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>(() => [
      createMockFile("Document-01.json", 1024 * 10, "success"),
    ]);

    return (
      <LocalUpload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple={false}
        disableRemoveList
        label="上传配置文件"
        description="文件已锁定，无法移除"
      />
    );
  },
};

/**
 * 自定义按钮样式
 * 可以隐藏图标或添加自定义类名
 */
export const CustomButtonStyle: Story = {
  name: "自定义按钮样式",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);

    return (
      <LocalUpload
        type="button"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        buttonProps={{
          hideIcon: true,
        }}
        label="自定义按钮"
        description="按钮不显示图标"
      />
    );
  },
};

/**
 * 文件移除回调
 * 监听文件移除事件
 */
export const WithRemoveCallback: Story = {
  name: "文件移除回调",
  render: () => {
    const [fileList, setFileList] = useState<LocalUploadFile[]>([]);
    const [removedFiles, setRemovedFiles] = useState<string[]>([]);

    const handleRemove = (file: LocalUploadFile) => {
      setRemovedFiles((prev) => [file.name]);
    };

    return (
      <div>
        <LocalUpload
          type="dragger"
          fileList={fileList}
          setFileList={setFileList}
          multiple
          onRemove={handleRemove}
          label="上传文件"
          description="移除文件时会触发回调"
        />
        {removedFiles.length > 0 && (
          <div style={{ marginTop: 16, color: "#666" }}>
            已移除的文件：{removedFiles.join(", ")}
          </div>
        )}
      </div>
    );
  },
};

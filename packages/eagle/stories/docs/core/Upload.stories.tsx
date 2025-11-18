import { Upload, UploadFile } from "@src/core/Upload";
import { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";

/**
 * Upload 组件用于文件上传，支持按钮上传和拖拽上传两种方式。
 *
 * ## 功能特点
 * - 支持单文件和多文件上传
 * - 支持拖拽上传
 * - 支持文件验证
 * - 支持上传进度展示
 * - 支持错误提示
 */
const meta: Meta<typeof Upload> = {
  title: "Core/Upload | 文件上传",
  component: Upload,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

// 辅助函数：创建模拟文件
const createMockFile = (
  name: string,
  size: number,
  status: UploadFile["fileStatus"],
): UploadFile => {
  const file = new File([], name, {
    type: name.endsWith(".pdf") ? "application/pdf" : "text/plain",
  }) as UploadFile;
  file.uid = `mock-${Math.random().toString(36).slice(2, 9)}`;
  file.fileStatus = status;
  return file;
};

/**
 * 基础的拖拽上传示例
 * 点击或拖拽文件到上传区域即可上传
 */
export const BasicDragger: Story = {
  name: "基础拖拽上传",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
 * 单文件拖拽上传
 * 只允许选择一个文件，选择新文件会替换旧文件
 */
export const SingleFileDragger: Story = {
  name: "单文件拖拽上传",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
 * 按钮上传示例
 * 使用按钮触发文件选择对话框
 */
export const ButtonUpload: Story = {
  name: "按钮上传",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
 * 限制文件数量
 * 最多只能上传指定数量的文件
 */
export const MaxCountUpload: Story = {
  name: "限制文件数量",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
      // 初始化预填充文件
      const mockFiles = [
        createMockFile("document.pdf", 1024 * 512, "success"),
        createMockFile("image.jpg", 1024 * 1024 * 2, "success"),
        createMockFile("video.mp4", 1024 * 1024 * 10, "success"),
      ];
      setFileList(mockFiles);
    }, []);

    return (
      <Upload
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const validate = async (file: UploadFile) => {
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
      <Upload
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
 * 预填充文件
 */
export const WithPrefilledFiles: Story = {
  name: "预填充文件",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
      // 初始化预填充文件
      const mockFiles = [
        createMockFile("document.pdf", 1024 * 512, "success"),
        createMockFile("image.jpg", 1024 * 1024 * 2, "error"),
      ];
      mockFiles[1].error = "文件大小超过限制";
      setFileList(mockFiles);
    }, []);

    return (
      <Upload
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
 * List 类型文件列表
 * 使用标准列表展示文件，包含文件名、文件大小、文件状态等信息
 */
export const ListTypeList: Story = {
  name: "List 类型文件列表",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
      // 初始化预填充文件
      const mockFiles = [
        createMockFile("document.pdf", 1024 * 512, "success"),
        createMockFile("report.docx", 1024 * 768, "success"),
        createMockFile("data.xlsx", 1024 * 256, "validating"),
      ];
      setFileList(mockFiles);
    }, []);

    return (
      <Upload
        type="button"
        label="List 类型文件列表"
        description="使用标准列表展示文件"
        multiple
        listType="list"
        fileList={fileList}
        setFileList={setFileList}
      />
    );
  },
};

/**
 * Info 类型文件列表
 * 以 Info 形式展示文件信息，包含文件名、文件大小、文件状态等信息
 */
export const InfoListType: Story = {
  name: "Info 类型文件列表",
  render: () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
      // 初始化预填充文件
      const mockFiles = [
        createMockFile("document.pdf", 1024 * 512, "success"),
        createMockFile("image.jpg", 1024 * 1024 * 2, "error"),
      ];
      mockFiles[1].error = "文件大小超过限制";
      setFileList(mockFiles);
    }, []);

    return (
      <Upload
        type="dragger"
        fileList={fileList}
        setFileList={setFileList}
        multiple
        listType="info"
        label="Info 类型文件列表"
        description="文件将以卡片形式展示"
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    return (
      <Upload
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
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [removedFiles, setRemovedFiles] = useState<string[]>([]);

    const handleRemove = (file: UploadFile) => {
      setRemovedFiles((prev) => [file.name]);
    };

    return (
      <div>
        <Upload
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

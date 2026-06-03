import { AntdRcFile, AntdUploadProps } from "@src/antd";

/**
 * 上传文件对象
 * 继承自 Antd 的 RcFile，并添加额外的状态和错误信息
 */
export interface LocalUploadFile extends AntdRcFile {
  /** 文件唯一标识 */
  uid: string;
  /** 文件大小（字节） */
  size: number;
  /** 文件名 */
  name: string;
  /** 文件类型 */
  type: string;
  /** 备用文件名 */
  fileName?: string | undefined;
  /** 文件状态 */
  fileStatus: "error" | "success" | "need-validate" | "validating";
  /** 自定义数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  /** 错误信息 */
  error?: string | null;
}

/**
 * 文件接受类型
 * 限制只能是以 . 开头的文件扩展名
 */
export type LocalUploadAccept = `.${string}`;

/**
 * 上传按钮属性
 */
export type LocalUploadButtonProps = Pick<
  AntdUploadProps,
  "accept" | "multiple" | "disabled"
> & {
  /** 自定义类名 */
  className?: string;
  /** 是否隐藏图标 */
  hideIcon?: boolean;
  /** 文件列表 */
  fileList: LocalUploadFile[];
  /** 设置文件列表 */
  setFileList: (files: LocalUploadFile[]) => void;
  /** 最大文件数量 */
  maxCount?: number;
  /**
   * 文件验证函数
   * @param file 当前文件
   * @param files 文件列表
   * @returns 返回包含错误信息或自定义数据的 Promise
   */
  validate?: (
    file: LocalUploadFile,
    files?: LocalUploadFile[],
  ) => Promise<{ error?: string; data?: any }>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * 拖拽上传属性
 */
export type LocalUploadDraggerProps = Pick<
  AntdUploadProps,
  "accept" | "multiple" | "disabled"
> & {
  /** 自定义类名 */
  className?: string;
  /** 文件列表 */
  fileList: LocalUploadFile[];
  /** 设置文件列表 */
  setFileList: (files: LocalUploadFile[]) => void;
  /** 最大文件数量 */
  maxCount?: number;
  /** 是否禁用文件移除功能 */
  disableRemove?: boolean;
  /**
   * 文件验证函数
   * @param file 当前文件
   * @param files 文件列表
   * @returns 返回包含错误信息或自定义数据的 Promise
   */
  validate?: (
    file: LocalUploadFile,
    files?: LocalUploadFile[],
  ) => Promise<{ error?: string; data?: any }>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** 文件移除事件回调 */
  onRemove?: (file: LocalUploadFile) => void;
};

/**
 * 文件列表属性
 */
export type LocalUploadFileListProps = {
  /** 自定义类名 */
  className?: string;
  /** 文件列表 */
  fileList: LocalUploadFile[];
  /** 移除文件回调 */
  removeFile: (id: string) => void;
  /** 是否禁用移除操作 */
  disableRemove?: boolean;
  /** 文件移除事件回调 */
  onRemove?: (file: LocalUploadFile) => void;
};

/**
 * 文件信息展示属性
 */
export type LocalUploadFileInfoProps = {
  /** 文件对象 */
  file: {
    /** 文件状态 */
    fileStatus?: "error" | "success" | "need-validate" | "validating";
    /** 文件名 */
    name: string;
    /** 备用文件名 */
    fileName?: string;
    /** 文件大小 */
    size?: number;
    /** 文件唯一标识 */
    uid?: string;
    /** 错误信息 */
    error?: string | null;
  };
  /** 移除文件回调 */
  removeFile: (id: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 文件移除事件回调 */
  onRemove?: (file: LocalUploadFile) => void;
};

/**
 * Upload 组件属性
 */
export type LocalUploadProps = {
  /** 自定义类名 */
  className?: string;
  /**
   * 数据测试 id
   */
  "data-testid"?: string;
  /** 标签 */
  label?: React.ReactNode;
  /** 标签位置 */
  labelPosition?: "top" | "left";
  /** 描述文本 */
  description?: React.ReactNode;
  /** 额外信息 */
  info?: React.ReactNode;
  /** 上传类型：按钮或拖拽 */
  type?: "button" | "dragger";
  /** 是否支持多选 */
  multiple?: boolean;
  /** 接受的文件类型 */
  accept?: LocalUploadAccept;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最大文件数量 */
  maxCount?: number;
  /** 文件列表 */
  fileList: LocalUploadFile[];
  /** 设置文件列表 */
  setFileList: (files: LocalUploadFile[]) => void;
  /** 是否禁用文件列表的移除功能 */
  disableRemoveList?: boolean;
  /**
   * 文件验证函数
   * @param file 当前文件
   * @param files 文件列表
   * @returns 返回包含错误信息或自定义数据的 Promise
   *
   * @example
   * ```ts
   * const validate = async (file: LocalUploadFile) => {
   *   if (file.size > 5 * 1024 * 1024) {
   *     return { error: "文件大小不能超过 5MB" };
   *   }
   *   return { data: { validated: true } };
   * };
   * ```
   */
  validate?: (
    file: LocalUploadFile,
    files?: LocalUploadFile[],
  ) => Promise<{ error?: string; data?: any }>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** 按钮属性 */
  buttonProps?: Pick<LocalUploadButtonProps, "className" | "hideIcon">;
  /** 文件移除事件回调 */
  onRemove?: (file: LocalUploadFile) => void;
};

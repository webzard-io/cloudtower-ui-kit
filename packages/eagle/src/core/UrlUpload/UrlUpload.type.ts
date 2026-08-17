/**
 * URL 上传文件对象
 */
export interface UrlUploadFile {
  /** URL 文件唯一标识 */
  uid: string;
  /** URL 地址 */
  url: string;
  /** 文件名，默认使用完整 URL */
  name: string;
  /** 文件状态 */
  fileStatus: "error" | "success" | "need-validate" | "validating";
  /** 自定义数据 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  /** 错误信息 */
  error?: string | null;
}

/**
 * URL 上传组件属性
 */
export type UrlUploadProps = {
  /** 自定义类名 */
  className?: string;
  /** 数据测试 id */
  "data-testid"?: string;
  /** 标签 */
  label?: React.ReactNode;
  /** 标签位置 */
  labelPosition?: "top" | "left";
  /** 描述文本 */
  description?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** URL 输入框值 */
  value?: string;
  /** URL 输入框值变化回调 */
  onChange?: (value: string) => void;
  /** URL 输入框占位文案 */
  placeholder?: string;
  /** URL 文件列表，单 URL 场景最多一个 */
  fileList: UrlUploadFile[];
  /** 设置 URL 文件列表 */
  setFileList: (files: UrlUploadFile[]) => void;
  /** 是否展示解析按钮 */
  showParseButton?: boolean;
  /** 解析按钮文案 */
  parseButtonText?: React.ReactNode;
  /** 是否禁用文件移除功能 */
  disableRemoveList?: boolean;
  /**
   * URL 验证函数
   * @param file 当前 URL 文件
   * @param files URL 文件列表
   * @returns 返回包含错误信息或自定义数据的 Promise
   */
  validate?: (
    file: UrlUploadFile,
    files?: UrlUploadFile[],
  ) => Promise<{ error?: string; data?: any }>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** URL 文件移除事件回调 */
  onRemove?: (file: UrlUploadFile) => void;
};

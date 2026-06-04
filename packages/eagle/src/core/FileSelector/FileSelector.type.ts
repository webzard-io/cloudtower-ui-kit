import type {
  LocalUploadFile,
  LocalUploadProps,
} from "@src/core/LocalUpload";
import type { UrlUploadFile, UrlUploadProps } from "@src/core/UrlUpload";

/**
 * 文件选择来源。
 */
export type FileSelectorMode = "local" | "url";

/**
 * 文件选择器当前值。
 */
export type FileSelectorValue = {
  /** 当前选择来源 */
  mode: FileSelectorMode;
  /** 本地文件列表 */
  localFileList: LocalUploadFile[];
  /** URL 文件列表 */
  urlFileList: UrlUploadFile[];
  /** URL 输入框值 */
  urlValue?: string;
};

/**
 * FileSelector 组件属性。
 */
export type FileSelectorProps = {
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
  /** 当前选择来源，传入后组件为受控模式 */
  mode?: FileSelectorMode;
  /** 默认选择来源 */
  defaultMode?: FileSelectorMode;
  /**
   * 选择来源变化回调。
   * @param mode 新的选择来源
   */
  onModeChange?: (mode: FileSelectorMode) => void;
  /** 本地文件列表 */
  localFileList: LocalUploadFile[];
  /**
   * 设置本地文件列表。
   * @param files 新的本地文件列表
   */
  setLocalFileList: (files: LocalUploadFile[]) => void;
  /** URL 文件列表 */
  urlFileList: UrlUploadFile[];
  /**
   * 设置 URL 文件列表。
   * @param files 新的 URL 文件列表
   */
  setUrlFileList: (files: UrlUploadFile[]) => void;
  /** URL 输入框值 */
  urlValue?: string;
  /**
   * URL 输入框值变化回调。
   * @param value 新的 URL 输入框值
   */
  onUrlChange?: (value: string) => void;
  /** LocalUpload 透传属性 */
  localUploadProps?: Omit<
    LocalUploadProps,
    "label" | "labelPosition" | "fileList" | "setFileList" | "disabled"
  >;
  /** UrlUpload 透传属性 */
  urlUploadProps?: Omit<
    UrlUploadProps,
    | "label"
    | "labelPosition"
    | "value"
    | "onChange"
    | "fileList"
    | "setFileList"
    | "disabled"
  >;
  /** 是否禁用 */
  disabled?: boolean;
  /** 本地选择方式被禁用时的 Tooltip 文案 */
  localDisabledTooltip?: React.ReactNode;
  /** URL 上传方式被禁用时的 Tooltip 文案 */
  urlDisabledTooltip?: React.ReactNode;
};

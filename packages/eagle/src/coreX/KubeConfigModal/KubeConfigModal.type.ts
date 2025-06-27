export interface KubeConfigModalProps {
  /** 下载文件的名称，不包含文件扩展名，会自动添加 .yaml 后缀 */
  downloadName: string;
  /** 自定义描述文本，如果不提供则使用默认的下载提示文案 */
  customDesc?: string;
  /** 是否显示加载状态，当为 true 时会显示 Loading 组件 */
  loading?: boolean;
  /** kubeconfig 配置数据内容，通常是 YAML 格式的字符串 */
  data: string;
  /** 错误信息，当有错误时会禁用下载按钮 */
  error?: string;
  /** 重新获取数据的回调函数，用于刷新 kubeconfig 内容 */
  refetch?: () => void;
}

export type ErrorContentProps = {
  className?: string;
  style?: React.CSSProperties;
  errorText?: string;
  refetch?: () => void;
};

import React from "react";
import { CTError } from "@src/utils/cterror";
import { UseCTErrorMsgOptions } from "@src/hooks/useCTErrorMsg";

/**
 * 错误详情渲染器的 props
 */
export interface ErrorItemRenderProps {
  /** 单条错误消息 */
  errorMsg: string | undefined;
  /** 错误索引 */
  index: number;
}

/**
 * 错误容器渲染器的 props
 */
export interface ErrorContainerRenderProps {
  /** 自定义类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 错误信息 */
  errorMsgs: (string | undefined)[];
}

/**
 * BasicCTError 组件的 props
 */
export interface BasicCTErrorProps {
  /**
   * 错误对象，支持多种格式的错误
   * - AxiosError: Axios 请求错误
   * - CloudTowerErrorResponse: 服务端响应错误
   * - 其他类型: 会被转换为字符串显示
   */
  error: CTError | string;

  /**
   * 自定义类名，会应用到错误容器上
   */
  className?: string;

  /**
   * 自定义错误容器渲染器
   * 用于自定义整个错误信息的容器样式和结构
   * @default 使用内置的 span 容器，应用了默认样式
   */
  ErrorContainerRender?: React.FC<ErrorContainerRenderProps>;

  /**
   * 自定义错误详情渲染器
   * 用于自定义单条错误信息的渲染方式
   * 如果不提供，多条错误会被拼接成一个字符串显示
   */
  ErrorItemRender?: React.FC<ErrorItemRenderProps>;

  /**
   * 错误消息处理选项
   * 用于配置国际化命名空间和其他翻译选项
   */
  errorMsgOptions?: UseCTErrorMsgOptions;
}

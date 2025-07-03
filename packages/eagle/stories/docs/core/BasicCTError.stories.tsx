import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { css } from "@linaria/core";
import { BasicCTError } from "@src/core/BasicCTError";
import { ConfigProvider } from "@src/core";

/**
 *  BasicCTError 用于接受 cloudtower 通用错误并解析
 *
 * - 支持多种错误格式（Axios 错误、服务端响应错误等）
 * - 内置 i18n 支持
 * - 支持自定义容器和详情渲染器
 */
const meta: Meta<typeof BasicCTError> = {
  title: "Core/BasicCTError | 通用错误显示",
  component: BasicCTError,
};

export default meta;
type Story = StoryObj<typeof BasicCTError>;

// 自定义容器样式
const CustomErrorContainer = css`
  padding: 12px 16px;
  background: linear-gradient(90deg, #fff2f0 0%, #fff1f0 100%);
  border: 1px solid #ffccc7;
  border-left: 4px solid #ff4d4f;
  border-radius: 6px;
  color: #cf1322;
  display: flex;
  align-items: center;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(255, 77, 79, 0.1);

  &::before {
    content: "⚠️";
    margin-right: 8px;
    font-size: 16px;
    flex-shrink: 0;
  }
`;

// 自定义错误详情基础样式
const CustomErrorDetailItem = css`
  display: list-item;
`;

/**
 * 基本用法 - 显示简单的错误消息
 *
 * 传入一个简单的 Error 对象，组件会自动提取并显示错误消息。
 */
export const Basic: Story = {
  name: "基本用法",
  args: {
    error: {
      code: "INVALID_PARAMETER",
      params: { field: "username" },
      message: "invalid parameter",
    },
  },
};

/**
 * 显示来自服务端的结构化错误，传入一个包含错误代码和消息的服务端响应错误对象，组件会自动提取并显示错误消息。
 */
export const ServerError: Story = {
  name: "详细错误信息",
  args: {
    error: {
      code: "INVALID_PARAMETER",
      message: "参数无效，请检查输入",
      params: { field: "username" },
      details: [
        {
          reason: "INVALID_PARAMETER_DETAIL",
          message: "invalid username",
          params: { field: "username" },
        },
      ],
    },
  },
};

/**
 * 多条错误 - 显示包含多个错误详情的错误
 */
export const MultipleErrors: Story = {
  name: "多条错误信息",
  args: {
    error: {
      code: "INVALID_PARAMETER",
      message: "参数无效，请检查输入",
      details: [
        {
          reason: "INVALID_PARAMETER_DETAIL",
          message: "用户名格式不正确",
          params: { field: "username" },
        },
        {
          reason: "INVALID_PARAMETER_DETAIL",
          message: "密码长度不足",
          params: { field: "password" },
        },
        {
          reason: "INVALID_PARAMETER_DETAIL",
          message: "邮箱格式无效",
          params: { field: "email" },
        },
      ],
    },
  },
};

/**
 * Axios 请求错误
 */
export const NetworkError: Story = {
  name: "Axios 请求错误",
  args: {
    error: {
      isAxiosError: true,
      code: "NETWORK_ERROR",
      message: "网络连接超时，请检查网络设置后重试",
    } as any,
  },
};

/**
 * 自定义容器渲染器
 */
export const CustomContainer: Story = {
  name: "自定义容器",
  args: {
    error: new Error("操作失败，请重试") as any,
    ErrorContainerRender: ({ children }) => (
      <div className={CustomErrorContainer}>{children}</div>
    ),
  },
};

/**
 * 自定义错误详情渲染器
 */
export const CustomErrorDetail: Story = {
  name: "自定义错误详情",
  args: {
    error: {
      code: "INVALID_PARAMETER",
      message: "invalid parameter",
      details: [
        {
          reason: "INVALID_PARAMETER_DETAIL",
          params: { field: "username" },
        },
        {
          reason: "INVALID_PARAMETER_DETAIL",
          params: { field: "password" },
        },
        {
          reason: "INVALID_PARAMETER_DETAIL",
          params: { field: "user" },
        },
      ],
    },
    ErrorItemRender: ({ errorMsg, index }) => {
      return (
        <div className={CustomErrorDetailItem} key={index}>
          {errorMsg}
        </div>
      );
    },
  },
};

/**
 * 空错误处理
 * 当传入 null 或 undefined 时，组件会自动处理并显示默认信息。
 */
export const EmptyError: Story = {
  name: "空错误处理",
  args: {
    error: null as any,
  },
};

/**
 * 可以通过 ConfigProvider 配置 i18n 命名空间和组件 options 配置 i18n 的命名空间。 优先使用组件 options 配置的命名空间。都不配置时，默认使用 CTError 命名空间。
 */
export const Intl: Story = {
  name: "国际化",
  args: {
    error: {
      code: "INVALID_PARAMETER",
      message: "参数无效，请检查输入",
    },
    errorMsgOptions: {
      CTErrorI18nNs: "common",
    },
  },
  render: (props) => {
    return (
      <ConfigProvider
        config={{
          ctErrorI18nNs: "common",
        }}
      >
        <BasicCTError {...props} />
      </ConfigProvider>
    );
  },
};

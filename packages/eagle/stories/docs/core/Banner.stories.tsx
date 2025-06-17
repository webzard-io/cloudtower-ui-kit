import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@src/core/Banner";

/**
 * * Banner 组件
 * * 用于在页面顶部显示重要的系统通知或警告信息
 * * 支持三种不同类型：错误(error)、信息(info)和警告(warning)
 * * 可配置按钮文本和点击事件
 */
const meta = {
  title: "Core/Banner | 通知横幅",
  component: Banner,
  parameters: {
    docs: {
      description: {
        component:
          "Banner组件用于在页面顶部显示重要的系统通知、警告或错误信息，附带可选的操作按钮。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

/**
 * 错误类型横幅
 * 用于显示系统错误、严重问题或操作失败等紧急信息
 */
export const Error: Story = {
  name: "错误类型",
  args: {
    type: "error",
    message: "系统发生严重错误，部分功能可能不可用",
    btnProps: {
      text: "查看详情",
      onClick: () => console.log("点击查看错误详情"),
    },
  },
};

/**
 * 信息类型横幅
 * 用于显示一般性的系统通知或提示信息
 */
export const Info: Story = {
  name: "信息类型",
  args: {
    type: "info",
    message: "系统已更新至最新版本，包含多项功能改进",
    btnProps: {
      text: "了解更多",
      onClick: () => console.log("查看更多系统信息"),
    },
  },
};

/**
 * 警告类型横幅
 * 用于显示需要用户注意的警告信息
 */
export const Warning: Story = {
  name: "警告类型",
  args: {
    type: "warning",
    message: "系统将在30分钟后进行维护，请保存工作并退出",
    btnProps: {
      text: "知道了",
      onClick: () => console.log("用户确认警告信息"),
    },
  },
};

/**
 * 无按钮横幅
 * 展示不带操作按钮的纯通知横幅
 */
export const WithoutButton: Story = {
  name: "无按钮横幅",
  args: {
    type: "info",
    message: "欢迎使用新版本系统界面",
    btnProps: {
      text: "查看",
      hide: true,
    },
  },
};

/**
 * 长文本横幅
 * 展示包含较长文本内容的横幅
 */
export const LongMessage: Story = {
  name: "长文本横幅",
  args: {
    type: "warning",
    message:
      "由于系统升级，部分功能可能暂时不可用。我们正在努力恢复，预计将在24小时内完成。感谢您的耐心等待和理解。",
    btnProps: {
      text: "详情",
      onClick: () => console.log("查看详细说明"),
    },
  },
};

/**
 * 自定义样式
 * 展示如何为Banner添加自定义样式
 */
export const CustomStyle: Story = {
  name: "自定义样式",
  render: (args) => (
    <div style={{ height: "500px" }}>
      <Banner
        type="error"
        message="此操作无法撤销，请谨慎操作"
        btnProps={{
          text: "了解风险",
          onClick: () => console.log("查看风险说明"),
        }}
        style={{ marginBottom: "20px" }}
      />

      <Banner
        type="info"
        message="您有3条新消息"
        btnProps={{
          text: "查看",
          onClick: () => console.log("查看新消息"),
        }}
        style={{ marginBottom: "20px" }}
      />

      <Banner
        type="warning"
        message="资源使用量已达到80%"
        btnProps={{
          text: "管理资源",
          onClick: () => console.log("管理资源"),
        }}
      />
    </div>
  ),
};

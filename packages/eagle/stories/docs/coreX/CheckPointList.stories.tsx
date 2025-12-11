import {
  CheckmarkDoneSuccessCircleFill16GreenIcon,
  Loading16GradientBlueIcon,
  LogCollection16GradientBlueIcon,
  LogCollection16GrayIcon,
  NoticeTriangleFill16YellowIcon,
  XmarkFailedSeriousWarningFill16RedIcon,
} from "@cloudtower/icons-react";
import { CheckPointList } from "@src/coreX/CheckPointList";
import { type StoryObj } from "@storybook/react";
import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";

/**
 * CheckPointList 组件
 * 用于展示检查点列表，支持通过切换开关筛选未通过的检查项
 * 适用于各种预检查、健康检查等场景
 *
 * 组件特点：
 * 1. 支持五种状态展示：空闲、成功、失败、加载中、警告
 * 2. 可自定义标签样式
 * 3. 可自定义告警样式
 * 4. 支持筛选控制
 * 5. 自定义空状态展示
 */
const meta = {
  component: CheckPointList,
  title: "CoreX/CheckPointList | 检查项列表",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/rluK6VNfUWM9RDNPbalJV7/%E6%A3%80%E6%9F%A5%E9%A1%B9%E5%88%97%E8%A1%A8?node-id=6038-9540&t=867kGtbKQJqdRSPF-0",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckPointList>;

/**
 * 基础用法
 * 展示检查点列表的基础用法，包含成功和失败的检查项
 */
export const Basic: Story = {
  name: "基础用法",
  args: {
    title: "系统检查项",
    border: true,
    items: [
      {
        description: "存储空间检查",
        status: "success",
        tagProps: {
          color: "green",
          children: "通过",
        },
      },
      {
        description: "网络连接检查",
        status: "success",
        tagProps: {
          color: "green",
          children: "通过",
        },
      },
      {
        description: "权限检查",
        status: "failed",
        actions: [
          { type: "link", props: { children: "label" } },
          {
            type: "icon",
            props: {
              iconWidth: 16,
              iconHeight: 16,
              src: LogCollection16GrayIcon,
              hoverSrc: LogCollection16GradientBlueIcon,
              onClick: () => {
                console.log("collect!");
              },
            },
          },
        ],
        tagProps: {
          color: "red",
          children: "失败",
        },
        alertProps: {
          message: "当前用户没有管理员权限",
          type: "error",
        },
      },
      {
        description: "依赖检查",
        status: "failed",
        tagProps: {
          color: "red",
          children: "失败",
        },
        alertProps: {
          message: "缺少必要依赖: Node.js v16+",
          type: "error",
        },
      },
      {
        description: "依赖检查",
        status: "idle",
        alertProps: {
          message: "虚拟机失联",
          type: "normal",
        },
      },
    ],
  },
};

/**
 * 自定义标签和告警样式
 * 展示如何使用自定义标签和告警样式来增强视觉效果
 */
export const CustomStyle: Story = {
  name: "自定义标签和告警样式",
  args: {
    title: "虚拟机创建预检查",
    items: [
      {
        description: "CPU兼容性检查",
        status: "success",
        tagProps: {
          color: "green",
          icon: <CheckmarkDoneSuccessCircleFill16GreenIcon />,
          children: "通过",
        },
      },
      {
        description: "内存需求检查",
        status: "failed",
        tagProps: {
          color: "red",
          icon: <XmarkFailedSeriousWarningFill16RedIcon />,
          children: "失败",
        },
        alertProps: {
          message: "可用内存不足，无法创建虚拟机",
          type: "error",
          showIcon: true,
        },
      },
    ],
  },
};

/**
 * 所有状态类型
 * 展示所有可能的状态类型：成功、失败、加载中、警告
 */
export const AllStatusTypes: Story = {
  name: "所有状态类型",
  args: {
    title: "状态类型展示",
    items: [
      {
        description: "成功状态",
        status: "success",
        tagProps: {
          color: "green",
          icon: <CheckmarkDoneSuccessCircleFill16GreenIcon />,
          children: "成功",
        },
      },
      {
        description: "失败状态",
        status: "failed",
        tagProps: {
          color: "red",
          icon: <XmarkFailedSeriousWarningFill16RedIcon />,
          children: "失败",
        },
        alertProps: {
          message: "操作失败",
          type: "error",
        },
      },
      {
        description: "加载中状态",
        status: "loading",
        tagProps: {
          color: "blue",
          icon: <Loading16GradientBlueIcon />,
          children: "加载中",
        },
      },
      {
        description: "警告状态",
        status: "warning",
        tagProps: {
          color: "yellow",
          icon: <NoticeTriangleFill16YellowIcon />,
          children: "警告",
        },
        alertProps: {
          message: "操作可能存在风险",
          type: "warning",
        },
      },
    ],
  },
};

/**
 * 禁用筛选控件
 * 展示禁用筛选控件的情况，适用于不需要筛选功能的场景
 */
export const DisableFilterControl: Story = {
  name: "禁用筛选控件",
  args: {
    showSwitchControl: false,
    title: "基础检查",
    items: [
      {
        description: "资源可用性检查",
        status: "success",
        tagProps: {
          color: "green",
          children: "通过",
        },
      },
      {
        description: "集群健康检查",
        status: "failed",
        tagProps: {
          color: "red",
          children: "失败",
        },
        alertProps: {
          message: "集群节点状态异常",
          type: "error",
        },
      },
    ],
  },
};

/**
 * 自定义筛选开关文案
 * 展示如何自定义筛选开关的文案
 */
export const CustomSwitchText: Story = {
  name: "自定义筛选开关文案",
  args: {
    title: "检查结果",
    switchText: "只显示异常项",
    onClickSwitch: (checked) => console.log("Switch状态:", checked),
    items: [
      {
        description: "检查项 1",
        status: "success",
        tagProps: {
          color: "green",
          children: "通过",
        },
      },
      {
        description: "检查项 2",
        status: "failed",
        tagProps: {
          color: "red",
          children: "失败",
        },
        alertProps: {
          message: "检查失败",
          type: "error",
        },
      },
    ],
  },
};

/**
 * 空状态提示
 * 展示自定义空状态提示的使用方法
 */
export const EmptyState: Story = {
  name: "空状态提示",
  args: {
    title: "检查项列表",
    items: [],
    emptyText: "暂无检查项",
    emptyTextClassName: "custom-empty-class",
  },
};

/**
 * 自定义空状态渲染
 * 展示如何使用自定义渲染函数来创建空状态
 */
export const CustomEmptyRender: Story = {
  name: "自定义空状态渲染",
  args: {
    title: "检查项列表",
    items: [],
    emptyRender: (text) => (
      <div style={{ textAlign: "center", padding: "24px" }}>
        <div style={{ marginBottom: "16px" }}>
          <NoticeTriangleFill16YellowIcon />
        </div>
        <div>尚未开始检查，请先启动检查流程</div>
      </div>
    ),
  },
};

/**
 * 复杂描述内容
 * 展示如何在描述中使用复杂的ReactNode内容
 */
export const ComplexDescription: Story = {
  name: "复杂描述内容",
  args: {
    title: "带格式的检查项",
    items: [
      {
        description: (
          <span>
            存储空间检查 <b>(重要)</b>
          </span>
        ),
        status: "success",
        tagProps: {
          color: "green",
          children: "通过",
        },
      },
      {
        description: (
          <span>
            网络连接检查 <span style={{ color: "red" }}>*</span>
          </span>
        ),
        status: "failed",
        tagProps: {
          color: "red",
          children: "失败",
        },
        alertProps: {
          message: "网络连接失败，请检查网络设置",
          type: "error",
        },
      },
    ],
  },
};

/**
 * 默认开启筛选
 * 展示如何设置默认只显示未通过的检查项
 */
export const DefaultFilterEnabled: Story = {
  name: "默认开启筛选",
  args: {
    title: "默认显示未通过项",
    defaultChecked: true,
    items: [
      {
        description: "CPU检查",
        status: "success",
        tagProps: {
          color: "green",
          icon: <CheckmarkDoneSuccessCircleFill16GreenIcon />,
          children: "通过",
        },
      },
      {
        description: "内存检查",
        status: "success",
        tagProps: {
          color: "green",
          icon: <CheckmarkDoneSuccessCircleFill16GreenIcon />,
          children: "通过",
        },
      },
      {
        description: "磁盘检查",
        status: "failed",
        tagProps: {
          color: "red",
          icon: <XmarkFailedSeriousWarningFill16RedIcon />,
          children: "失败",
        },
        alertProps: {
          message: "磁盘空间不足",
          type: "error",
          showIcon: true,
        },
      },
      {
        description: "网络检查",
        status: "warning",
        tagProps: {
          color: "yellow",
          icon: <NoticeTriangleFill16YellowIcon />,
          children: "警告",
        },
        alertProps: {
          message: "网络延迟较高",
          type: "warning",
          showIcon: true,
        },
      },
    ],
  },
};

/**
 * 自定义筛选回调函数
 * 展示如何监听筛选状态变化
 */
export const CustomSwitchCallback: Story = {
  name: "自定义筛选回调函数",
  render: (args) => {
    const [lastSwitchState, setLastSwitchState] = useState<string>("尚未切换");

    return (
      <div>
        <div
          style={{
            marginBottom: "16px",
            padding: "8px",
            border: "1px solid #eee",
            borderRadius: "4px",
          }}
        >
          最后一次切换状态: <b>{lastSwitchState}</b>
        </div>

        <CheckPointList
          title="监听筛选状态变化"
          defaultChecked={false}
          onClickSwitch={(checked) => {
            setLastSwitchState(checked ? "只显示未通过项" : "显示全部项");
            console.log("Switch changed to:", checked);
          }}
          items={[
            {
              description: "系统检查",
              status: "success",
              tagProps: {
                color: "green",
                children: "通过",
              },
            },
            {
              description: "安全检查",
              status: "failed",
              tagProps: {
                color: "red",
                children: "失败",
              },
              alertProps: {
                message: "存在安全风险",
                type: "error",
              },
            },
            {
              description: "性能检查",
              status: "warning",
              tagProps: {
                color: "yellow",
                children: "警告",
              },
              alertProps: {
                message: "性能可能不佳",
                type: "warning",
              },
            },
          ]}
        />
      </div>
    );
  },
};

/**
 * Long Text Example
 * Demonstrates how the component handles long text in descriptions and alert messages
 */
export const LongText: Story = {
  name: "Long Text Example",
  args: {
    title: "System Health Check",
    border: true,
    items: [
      {
        description: loremIpsum({
          count: 3,
          units: "sentences",
        }),
        status: "success",
        tagProps: {
          color: "green",
          icon: <CheckmarkDoneSuccessCircleFill16GreenIcon />,
          children: "Passed",
        },
      },
      {
        description: loremIpsum({
          count: 2,
          units: "sentences",
        }),
        status: "failed",
        tagProps: {
          color: "red",
          icon: <XmarkFailedSeriousWarningFill16RedIcon />,
          children: "Failed",
        },
        alertProps: {
          message: loremIpsum({
            count: 4,
            units: "sentences",
          }),
          type: "error",
          showIcon: true,
        },
      },
      {
        description: loremIpsum({
          count: 5,
          units: "sentences",
        }),
        status: "warning",
        tagProps: {
          color: "yellow",
          icon: <NoticeTriangleFill16YellowIcon />,
          children: "Warning",
        },
        alertProps: {
          message: loremIpsum({
            count: 3,
            units: "sentences",
          }),
          type: "warning",
          showIcon: true,
        },
      },
      {
        description: loremIpsum({
          count: 2,
          units: "sentences",
        }),
        status: "loading",
        tagProps: {
          color: "blue",
          icon: <Loading16GradientBlueIcon />,
          children: "Loading",
        },
      },
    ],
  },
};

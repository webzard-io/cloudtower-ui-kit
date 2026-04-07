import Alert from "@src/core/Alert";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * 提示框组件，基于 antd Alert 封装。
 *
 * * 支持 info / error / warning / success / normal 五种类型
 * * 支持 action、closable、expandConfig 等功能
 * * 更多 props 请参考：https://ant.design/components/alert-cn#api
 */
const meta = {
  component: Alert,
  title: "Core/Alert | 提示框",
  argTypes: {
    type: {
      control: "select",
      options: ["info", "error", "warning", "success", "normal"],
      description: "提示类型",
      table: { defaultValue: { summary: "info" } },
    },
    message: {
      control: "text",
      description: "提示内容",
    },
    description: {
      control: "text",
      description: "辅助描述内容，expandConfig 模式下可折叠",
    },
    showIcon: {
      control: "boolean",
      description: "是否显示图标",
      table: { defaultValue: { summary: "true" } },
    },
    closable: {
      control: "boolean",
      description: "是否可关闭",
      table: { defaultValue: { summary: "false" } },
    },
    expandConfig: {
      control: false,
      description:
        "启用展开/收起功能，也可传入 ExpandableConfig 对象配置受控模式",
      table: { defaultValue: { summary: "false" } },
    },
    action: {
      control: false,
      description: "右侧操作区域（ReactNode）",
    },
    "data-testid": {
      control: "text",
      description: "测试标识，透传到根元素",
    },
  },
  args: {
    type: "info",
    message: "这是一条提示信息。",
    showIcon: true,
    closable: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/vpaSTTGHjKif7eST8vykm8/Tip-%7C-%E6%8F%90%E7%A4%BA%E6%A1%86?type=design&node-id=1315-10681&mode=design&t=WZ3znhRuHDDkB3aw-0",
    },
  },
} satisfies CoreMeta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

/**
 * 通过下方 Controls 面板调整各 Props 查看效果。
 */
export const Playground: Story = {
  name: "Playground",
  args: {
    message: "这是一条提示信息，可通过下方 Controls 面板调整各属性。",
    description: "这是展开后的描述内容。启用 expandConfig 后可折叠此区域。",
  },
};

/**
 * 五种类型：info、error、warning、success、normal。
 */
export const Basic: Story = {
  name: "基本用法",
  render: () => (
    <div
      style={{ width: 648, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <Alert
        type="info"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <Alert type="error" message="Label" />
      <Alert type="warning" message="Label" />
      <Alert type="success" message="Label" />
      <Alert type="normal" message="Label" />
    </div>
  ),
};

/**
 * 通过 `action` 属性在右侧添加操作区域。
 */
export const WithAction: Story = {
  name: "带操作",
  render: () => (
    <div
      style={{ width: 648, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <Alert
        type="info"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        action={<a>Actionlognlonglong</a>}
      />
      <Alert type="error" message="Label" action={<a>Label</a>} />
      <Alert type="warning" message="Label" action={<a>Label</a>} />
      <Alert type="success" message="Label" action={<a>Label</a>} />
      <Alert type="normal" message="Label" action={<a>Label</a>} />
    </div>
  ),
};

/**
 * 通过 `closable` 或 `onClose` 启用关闭按钮。
 */
export const Closable: Story = {
  name: "可关闭",
  args: {
    type: "info",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas et earum neque eum!",
    onClose: () => console.log("close"),
  },
};

/**
 * 同时使用 `closable` 和 `action`。
 */
export const ClosableWithAction: Story = {
  name: "可关闭 + 操作",
  args: {
    type: "info",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sit ea distinctio.",
    closable: true,
    action: <a>Label</a>,
  },
};

/**
 * `message` 支持传入 ReactNode，可自定义复杂内容。
 */
export const CustomMessage: Story = {
  name: "自定义消息",
  args: {
    type: "error",
    message: (
      <div>
        <div>解决如下问题后，再尝试保存：</div>
        <ol>
          <li>1. %原因 1 %</li>
          <li>2. %原因 2 %</li>
          <li>3. %原因 3 %</li>
        </ol>
      </div>
    ),
    action: <a>Label</a>,
  },
};

const expandConfigDescription = (
  <ul>
    <li>可观测性服务 service-A、service-B，需升级至 1.4.5 及以上版本；</li>
    <li>CloudTower 代理 agent-A、agent-B，需升级至 1.3.7 及以上版本；</li>
    <li>备份服务 backup-A、backup-B，需升级至 2.3.1 及以上版本；</li>
    <li>复制服务 replication-A、replication-B，需升级至 2.3.1 及以上版本；</li>
    <li>Everoute 服务 service-A、service-B；</li>
    <li>SMTX Kubernetes 服务。</li>
  </ul>
);

/**
 * 通过 `expandConfig` 启用展开/收起功能，`description` 内容会被折叠。
 *
 * * `expandConfig={{}}` — 非受控模式，默认收起
 * * `expandConfig={{ defaultExpanded: true }}` — 非受控模式，默认展开
 * * `expandConfig={{ expanded, onExpandChange }}` — 受控模式
 */
export const Expandable: Story = {
  name: "展开/收起",
  args: {
    type: "info",
    message: "以下系统服务的版本不适配多管理 IP 模式：",
    description: expandConfigDescription,
    expandConfig: {},
  },
};

/**
 * 设置 `defaultExpanded: true` 使组件初始即为展开状态。
 */
export const ExpandableDefaultExpanded: Story = {
  name: "展开/收起（默认展开）",
  args: {
    type: "warning",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    description: (
      <ul>
        <li>网络配置需要更新</li>
        <li>存储配置需要确认</li>
      </ul>
    ),
    expandConfig: { defaultExpanded: true },
  },
};

/**
 * 通过 `expanded` 和 `onExpandChange` 实现受控模式。
 */
export const ExpandableControlled: Story = {
  name: "展开/收起（受控）",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expanded, setExpanded] = useState(false);
    return (
      <Alert
        type="info"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        description={expandConfigDescription}
        expandConfig={{ expanded, onExpandChange: setExpanded }}
      />
    );
  },
};

/**
 * `expandConfig` 与 `action` 可同时使用。
 */
export const ExpandableWithAction: Story = {
  name: "展开/收起 + 操作",
  args: {
    type: "info",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    description: expandConfigDescription,
    expandConfig: {},
    action: <a>Label</a>,
  },
};

import {
  XmarkRemove16RegularRedIcon,
  XmarkRemove16SecondaryIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Button } from "@src/core";
import Icon from "@src/core/Icon";
import { Tab } from "@src/core/Tab/Tab";
import Tooltip from "@src/core/Tooltip";
import OverflowTooltip from "@src/coreX/OverflowTooltip";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import { Flex } from "antd5";
import React, { useState } from "react";

/**
 * Tab 是一个标签页组件，支持多个标签页之间的切换。
 *
 * ### 参数说明
 *
 * | 参数 | 说明 | 类型 | 默认值 |
 * | --- | --- | --- | --- |
 * | className | 自定义类名 | string | - |
 * | contentClassName | 内容区域的类名 | string | - |
 * | selectedKey | 当前选中的标签页 key | string | - |
 * | tabs | 标签页配置数组 | TabItem[] | [] |
 * | onChange | 切换标签页时的回调 | (key: string) => void | - |
 * | extraSlot | 额外的插槽内容，显示在标签栏右侧 | React.ReactNode | - |
 *
 * ### TabItem 参数说明
 *
 * | 参数 | 说明 | 类型 | 默认值 |
 * | --- | --- | --- | --- |
 * | key | 唯一标识符 | string | - |
 * | title | 标签页标题，可以是字符串、ReactNode 或函数 | string \| ReactNode \| ((props: { isActive: boolean }) => ReactNode) | - |
 * | onClick | 点击标签页时的回调 | () => void | - |
 * | children | 标签页内容 | React.ReactNode | - |
 *
 * ### 特性
 * - 支持响应式布局，当空间不够时自动将多余的标签页放入下拉菜单
 * - 支持自定义标题（可通过函数形式获取激活状态）
 * - 支持在标签栏右侧添加额外内容
 * - 支持自定义内容区域的样式
 */
const meta = {
  component: Tab,
  title: "Core/Tab | 标签页",
} satisfies CoreMeta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

/**
 * 基础的标签页用法，展示如何创建和使用标签页组件
 */
export const Basic: Story = {
  name: "基础用法",
  render: () => {
    const [activeKey, setActiveKey] = useState("tab1");

    const tabs = [
      {
        key: "tab1",
        title: "第一个标签",
        children: <div>这是第一个标签页的内容，展示基础用法。</div>,
      },
      {
        key: "tab2",
        title: "第二个标签",
        children: <div>这是第二个标签页的内容，包含更多信息。</div>,
      },
      {
        key: "tab3",
        title: "第三个标签",
        children: <div>这是第三个标签页的内容，可以展示不同的内容。</div>,
      },
    ];

    return (
      <div style={{ width: "100%" }}>
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="medium"
        />
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="small"
        />
      </div>
    );
  },
};

/**
 * 当有大量标签页时，组件会自动计算可用空间，将无法完整显示的标签页放入下拉菜单中
 */
export const ResponsiveLayout: Story = {
  name: "响应式布局 - 自动收起多余标签",
  render: () => {
    const [activeKey, setActiveKey] = useState("tab1");

    const tabs = [
      { key: "tab1", title: "数据概览", children: <div>数据概览内容</div> },
      {
        key: "tab2",
        title: "实时监控",
        children: <div>实时监控内容</div>,
      },
      {
        key: "tab3",
        title: "历史记录",
        children: <div>历史记录内容</div>,
      },
      {
        key: "tab4",
        title: "性能分析",
        children: <div>性能分析内容</div>,
      },
      {
        key: "tab5",
        title: "日志管理",
        children: <div>日志管理内容</div>,
      },
      {
        key: "tab6",
        title: "告警设置",
        children: <div>告警设置内容</div>,
      },
      {
        key: "tab7",
        title: "系统配置",
        children: <div>系统配置内容</div>,
      },
      {
        key: "tab8",
        title: "用户权限",
        children: <div>用户权限内容</div>,
      },
    ];

    return (
      <div style={{ width: "600px" }}>
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="medium"
        />
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="small"
        />
      </div>
    );
  },
};

/**
 * 标签页标题支持函数形式，可以接收 isActive 参数来判断当前是否激活
 */
export const CustomTitle: Story = {
  name: "自定义标题 - 函数形式",
  render: () => {
    const [activeKey, setActiveKey] = useState("tab1");

    const tabs = [
      {
        key: "tab1",
        title: ({ isActive }: { isActive: boolean }) => (
          <span style={{ color: isActive ? "#1890ff" : "#666" }}>
            标签一 {isActive && "✓"}
          </span>
        ),
        children: <div>这是使用函数形式自定义标题的第一个标签页。</div>,
      },
      {
        key: "tab2",
        title: ({ isActive }: { isActive: boolean }) => (
          <span style={{ color: isActive ? "#1890ff" : "#666" }}>
            标签二 {isActive && "✓"}
          </span>
        ),
        children: <div>这是使用函数形式自定义标题的第二个标签页。</div>,
      },
      {
        key: "tab3",
        title: ({ isActive }: { isActive: boolean }) => (
          <span style={{ color: isActive ? "#1890ff" : "#666" }}>
            标签三 {isActive && "✓"}
          </span>
        ),
        children: <div>这是使用函数形式自定义标题的第三个标签页。</div>,
      },
    ];

    return (
      <div style={{ width: "100%" }}>
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="medium"
        />
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="small"
        />
      </div>
    );
  },
};

/**
 * extraSlot 可以在标签栏右侧添加额外的内容，如按钮、图标等
 */
export const WithExtraSlot: Story = {
  name: "带额外插槽",
  render: () => {
    const [activeKey, setActiveKey] = useState("tab1");

    const tabs = [
      {
        key: "tab1",
        title: "工作区",
        children: <div>这是工作区标签页的内容。</div>,
      },
      {
        key: "tab2",
        title: "任务",
        children: <div>这是任务标签页的内容。</div>,
      },
      {
        key: "tab3",
        title: "设置",
        children: <div>这是设置标签页的内容。</div>,
      },
    ];

    const extraSlot = (
      <button
        style={{
          padding: "4px 12px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        新增标签
      </button>
    );

    return (
      <div style={{ width: "100%" }}>
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          extraSlot={extraSlot}
          size="medium"
        />
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          extraSlot={extraSlot}
          size="small"
        />
      </div>
    );
  },
};

/**
 * 展示实际业务场景中的使用方式，包含复杂的标签内容和操作
 */
export const ComplexContent: Story = {
  name: "复杂内容场景",
  render: () => {
    const [activeKey, setActiveKey] = useState("dashboard");

    const tabs = [
      {
        key: "dashboard",
        title: "仪表盘",
        children: (
          <div style={{ padding: "20px" }}>
            <h3>仪表盘概览</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  1,234
                </div>
                <div style={{ color: "#666" }}>总访问量</div>
              </div>
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>856</div>
                <div style={{ color: "#666" }}>在线用户</div>
              </div>
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>98%</div>
                <div style={{ color: "#666" }}>系统可用性</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "analytics",
        title: "数据分析",
        children: (
          <div style={{ padding: "20px" }}>
            <h3>数据分析报告</h3>
            <table
              style={{
                width: "100%",
                marginTop: "16px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  <th style={{ padding: "8px", textAlign: "left" }}>日期</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>指标</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>数值</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  <td style={{ padding: "8px" }}>2024-01-01</td>
                  <td style={{ padding: "8px" }}>访问量</td>
                  <td style={{ padding: "8px" }}>1,234</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  <td style={{ padding: "8px" }}>2024-01-02</td>
                  <td style={{ padding: "8px" }}>访问量</td>
                  <td style={{ padding: "8px" }}>1,456</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
                  <td style={{ padding: "8px" }}>2024-01-03</td>
                  <td style={{ padding: "8px" }}>访问量</td>
                  <td style={{ padding: "8px" }}>1,678</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        key: "settings",
        title: "系统设置",
        children: (
          <div style={{ padding: "20px" }}>
            <h3>系统配置</h3>
            <div style={{ marginTop: "16px" }}>
              <div style={{ marginBottom: "12px" }}>
                <label>
                  <input type="checkbox" defaultChecked /> 启用通知
                </label>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label>
                  <input type="checkbox" /> 自动备份
                </label>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label>
                  <input type="checkbox" defaultChecked /> 深色模式
                </label>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "100%" }}>
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="medium"
        />
        <Tab
          tabs={tabs}
          selectedKey={activeKey}
          onChange={setActiveKey}
          size="small"
        />
      </div>
    );
  },
};

/**
 * 自定义的 TabTitle 组件，支持删除功能
 */
const TabTitle: React.FC<{
  title: string;
  onDelete: () => void;
  isActive: boolean;
}> = ({ title, onDelete, isActive }) => {
  return (
    <Flex
      justify="space-between"
      className={css`
        height: 24px;
        width: 100%;
      `}
    >
      <OverflowTooltip
        className={css`
          margin: auto 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
        content={title}
        tooltip={title}
      />
      <Flex align="center">
        <Tooltip title="删除" placement="top">
          <Icon
            className={css`
              margin-left: 4px;
              cursor: pointer;
            `}
            src={XmarkRemove16SecondaryIcon}
            hoverSrc={XmarkRemove16RegularRedIcon}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

/**
 * 支持动态添加和删除标签页的场景。
 * - 在 extraSlot 中提供"新增标签"按钮
 * - 每个标签页标题右侧显示删除图标
 * - 可以动态添加和删除标签页
 */
export const DynamicTabs: Story = {
  name: "动态添加和删除标签",
  render: () => {
    const [tabs, setTabs] = useState([
      {
        key: "tab1",
        title: "第一个标签",
        children: <div>这是第一个标签页，可以删除。</div>,
      },
      {
        key: "tab2",
        title: "第二个标签",
        children: <div>这是第二个标签页，可以删除。</div>,
      },
      {
        key: "tab3",
        title: "第三个标签",
        children: <div>这是第三个标签页，可以删除。</div>,
      },
    ]);

    const [activeKey, setActiveKey] = useState("tab1");

    const handleAddTab = () => {
      const newKey = `tab${tabs.length + 1}`;
      const newTab = {
        key: newKey,
        title: `新标签 ${tabs.length + 1}`,
        children: <div>这是新添加的标签页 {tabs.length + 1}。</div>,
      };
      setTabs([...tabs, newTab]);
      setActiveKey(newKey);
    };

    const handleDeleteTab = (key: string) => {
      const newTabs = tabs.filter((tab) => tab.key !== key);
      if (newTabs.length === 0) {
        // 如果所有标签都被删除，添加一个默认标签
        const defaultTab = {
          key: "tab1",
          title: "默认标签",
          children: <div>这是默认标签页，可以继续添加新标签。</div>,
        };
        setTabs([defaultTab]);
        setActiveKey("tab1");
      } else {
        setTabs(newTabs);
        // 如果删除的是当前激活的标签，切换到第一个标签
        if (key === activeKey) {
          setActiveKey(newTabs[0].key);
        }
      }
    };

    const tabsWithDelete = tabs.map((tab) => ({
      ...tab,
      title: (
        <TabTitle
          title={typeof tab.title === "string" ? tab.title : `标签 ${tab.key}`}
          onDelete={() => handleDeleteTab(tab.key)}
          isActive={tab.key === activeKey}
        />
      ),
    }));

    const extraSlot = (
      <Button size="small" type="quiet" onClick={handleAddTab}>
        + 新增标签
      </Button>
    );

    return (
      <div style={{ width: "100%" }}>
        <Tab
          tabs={tabsWithDelete}
          selectedKey={activeKey}
          onChange={setActiveKey}
          extraSlot={extraSlot}
          size="medium"
        />
        <Tab
          tabs={tabsWithDelete}
          selectedKey={activeKey}
          onChange={setActiveKey}
          extraSlot={extraSlot}
          size="small"
        />
      </div>
    );
  },
};

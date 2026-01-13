import { css } from "@linaria/core";
import CopyTooltip, { CopyTooltipProps } from "@src/coreX/Copy/CopyTooltip";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

/**
 *
 * CopyTooltip 组件用于复制文本到剪贴板，并通过 tooltip 提供交互反馈。适用于需要复制文本的场景，如复制 ID、地址、配置等。
 *
 * ### 主要特性
 * - 支持自定义复制前后的 tooltip 提示文本
 * - 支持自定义触发复制的子元素
 * - 内置默认的复制图标
 * - 鼠标悬浮时显示复制提示，点击后显示复制成功提示
 *
 */
const meta: Meta<React.FC<CopyTooltipProps>> = {
  title: "CoreX/Copy/CopyTooltip | 复制提示工具",
  component: CopyTooltip,
};
export default meta;

/**
 *
 * 最基本的用法，使用默认的复制图标和默认的提示文本。
 *
 * 鼠标悬浮时显示"点击复制"，点击后显示"复制成功"。
 *
 */
export const Default: StoryObj<CopyTooltipProps> = {
  name: "基本用例",
  render: (props) => {
    return (
      <div>
        <span>虚拟机 ID: vm-12345678 </span>
        <CopyTooltip {...props} />
      </div>
    );
  },
  args: {
    text: "vm-12345678",
  },
};

/**
 *
 * 自定义复制前后的 tooltip 提示文本，可以根据业务场景提供更友好的提示信息。
 *
 */
export const CustomTooltipText: StoryObj<CopyTooltipProps> = {
  name: "自定义提示文本",
  render: (props) => {
    return (
      <div>
        <span>集群地址: https://cluster.example.com:8443 </span>
        <CopyTooltip {...props} />
      </div>
    );
  },
  args: {
    text: "https://cluster.example.com:8443",
    beforeTooltip: "点击复制集群地址",
    afterTooltip: "地址已复制到剪贴板",
  },
};

/**
 *
 * 可以自定义触发复制的子元素，比如使用文本、按钮或其他图标。
 *
 */
export const CustomChildren: StoryObj<CopyTooltipProps> = {
  name: "自定义触发元素",
  render: (props) => {
    return (
      <div>
        <CopyTooltip {...props} />
      </div>
    );
  },
  args: {
    text: "kubectl get pods -n default",
    beforeTooltip: "点击复制命令",
    afterTooltip: "命令已复制",
    children: (
      <span
        className={css`
          color: #1890ff;
          cursor: pointer;
          text-decoration: underline;
        `}
      >
        复制命令
      </span>
    ),
  },
};

/**
 *
 * 复制长文本内容，如配置文件、日志等。
 *
 */
export const LongText: StoryObj<CopyTooltipProps> = {
  name: "复制长文本",
  render: (props) => {
    return (
      <div>
        <div
          className={css`
            background: #f5f5f5;
            padding: 12px;
            border-radius: 4px;
            position: relative;
            font-family: monospace;
            font-size: 12px;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 8px;
              right: 8px;
            `}
          >
            <CopyTooltip {...props} />
          </div>
          <pre
            className={css`
              margin: 0;
              white-space: pre-wrap;
              word-break: break-all;
            `}
          >
            {props.text}
          </pre>
        </div>
      </div>
    );
  },
  args: {
    text: `apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
  namespace: default
data:
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true`,
    beforeTooltip: "点击复制配置",
    afterTooltip: "配置已复制",
  },
};

/**
 *
 * 在表格中使用，复制单元格内容。
 *
 */
export const InTable: StoryObj<CopyTooltipProps> = {
  name: "在表格中使用",
  render: () => {
    const data = [
      { name: "虚拟机-1", ip: "192.168.1.100", id: "vm-001" },
      { name: "虚拟机-2", ip: "192.168.1.101", id: "vm-002" },
      { name: "虚拟机-3", ip: "192.168.1.102", id: "vm-003" },
    ];

    return (
      <table
        className={css`
          width: 100%;
          border-collapse: collapse;
          th,
          td {
            padding: 8px 12px;
            border: 1px solid #d9d9d9;
            text-align: left;
          }
          th {
            background: #fafafa;
            font-weight: 500;
          }
        `}
      >
        <thead>
          <tr>
            <th>名称</th>
            <th>IP 地址</th>
            <th>ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.ip}</td>
              <td>{row.id}</td>
              <td>
                <CopyTooltip text={row.id} beforeTooltip="复制 ID" />
                <span style={{ marginLeft: 8 }}>
                  <CopyTooltip text={row.ip} beforeTooltip="复制 IP" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  args: {},
};

/**
 *
 * 自定义 tooltip 的样式和位置等属性。
 *
 */
export const CustomTooltipProps: StoryObj<CopyTooltipProps> = {
  name: "自定义 Tooltip 属性",
  render: (props) => {
    return (
      <div
        className={css`
          display: flex;
          gap: 16px;
          align-items: center;
        `}
      >
        <div>
          <span>placement=top: </span>
          <CopyTooltip
            text="top"
            tooltipProps={{ placement: "top" }}
            beforeTooltip="上方提示"
          />
        </div>
        <div>
          <span>placement=bottom: </span>
          <CopyTooltip
            text="bottom"
            tooltipProps={{ placement: "bottom" }}
            beforeTooltip="下方提示"
          />
        </div>
        <div>
          <span>placement=left: </span>
          <CopyTooltip
            text="left"
            tooltipProps={{ placement: "left" }}
            beforeTooltip="左侧提示"
          />
        </div>
        <div>
          <span>placement=right: </span>
          <CopyTooltip
            text="right"
            tooltipProps={{ placement: "right" }}
            beforeTooltip="右侧提示"
          />
        </div>
      </div>
    );
  },
  args: {},
};

/**
 *
 * 复制包含特殊字符和换行的文本内容。
 *
 */
export const SpecialCharacters: StoryObj<CopyTooltipProps> = {
  name: "特殊字符和换行",
  render: (props) => {
    return (
      <div>
        <div
          className={css`
            background: #f5f5f5;
            padding: 12px;
            border-radius: 4px;
            position: relative;
            font-family: monospace;
            font-size: 12px;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 8px;
              right: 8px;
            `}
          >
            <CopyTooltip {...props} />
          </div>
          <pre
            className={css`
              margin: 0;
              white-space: pre-wrap;
            `}
          >
            {props.text}
          </pre>
        </div>
      </div>
    );
  },
  args: {
    text: `export DATABASE_URL="postgresql://user:p@ssw0rd!#$%@localhost:5432/mydb?sslmode=require"
export API_KEY="sk_test_51Hv9x2L2oPQ5RCTp8X3zN4vA7eB6F"
export WEBHOOK_URL="https://api.example.com/webhooks?token=abc123&auth=xyz789"`,
  },
};

/**
 *
 * 空文本或极端场景下的处理。
 *
 */
export const EdgeCases: StoryObj<CopyTooltipProps> = {
  name: "边界场景",
  render: () => {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <div>
          <span>空文本: </span>
          <CopyTooltip text="" beforeTooltip="复制空文本" />
        </div>
        <div>
          <span>单个字符: </span>
          <CopyTooltip text="A" beforeTooltip="复制字符" />
        </div>
        <div>
          <span>超长单行文本: </span>
          <CopyTooltip
            text={"abcdefghijklmnopqrstuvwxyz0123456789".repeat(10)}
            beforeTooltip="复制超长文本"
          />
        </div>
        <div>
          <span>只包含空格: </span>
          <CopyTooltip text="     " beforeTooltip="复制空格" />
        </div>
        <div>
          <span>Emoji 表情: </span>
          <CopyTooltip text="🎉 🚀 ⭐ 💡 🔥" beforeTooltip="复制表情" />
        </div>
      </div>
    );
  },
  args: {},
};

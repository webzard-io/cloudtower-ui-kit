import React from "react";
import {
  MoreEllipsis316BoldBlueIcon,
  SettingsGear16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Button, Icon, Table } from "@src/core";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";

const meta = {
  component: Table,
  title: "Core/Table | 表格组件",
  parameters: {
    docs: {
      description: {
        component:
          "表格组件，基于 antd Table 二次封装，用于展示结构化数据列表。支持排序、行选择、展开行、加载状态、错误状态等功能。数据源要求每条记录包含 id 字段。",
      },
    },
  },
} satisfies CoreMeta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

interface VMData {
  id: string;
  name: string;
  status: "running" | "stopped" | "error";
  cpu: number;
  memory: number;
  cluster: string;
}

const vmData: VMData[] = [
  {
    id: "vm-001",
    name: "web-server-01",
    status: "running",
    cpu: 4,
    memory: 8192,
    cluster: "cluster-prod-01",
  },
  {
    id: "vm-002",
    name: "db-server-01",
    status: "running",
    cpu: 8,
    memory: 16384,
    cluster: "cluster-prod-01",
  },
  {
    id: "vm-003",
    name: "cache-server-01",
    status: "stopped",
    cpu: 2,
    memory: 4096,
    cluster: "cluster-prod-02",
  },
  {
    id: "vm-004",
    name: "test-server-01",
    status: "error",
    cpu: 4,
    memory: 8192,
    cluster: "cluster-dev-01",
  },
  {
    id: "vm-005",
    name: "api-server-01",
    status: "running",
    cpu: 4,
    memory: 8192,
    cluster: "cluster-prod-01",
  },
];

const actionStyle = css`
  vertical-align: middle;
`;

const basicColumns = [
  { key: "name", title: "名称", dataIndex: "name" },
  { key: "status", title: "状态", dataIndex: "status" },
  { key: "cpu", title: "CPU (核)", dataIndex: "cpu" },
  { key: "memory", title: "内存 (MB)", dataIndex: "memory" },
  { key: "cluster", title: "所属集群", dataIndex: "cluster" },
];

/**
 * 基础表格展示，仅配置 columns 和 dataSource。
 */
export const Basic: Story = {
  name: "基础用法",
  args: {
    columns: basicColumns,
    dataSource: vmData,
  },
};

/**
 * 带排序功能的表格，点击表头触发排序回调。
 */
export const WithSorter: Story = {
  name: "排序功能",
  args: {
    columns: basicColumns.map((col) => ({
      ...col,
      sorter: true,
    })),
    dataSource: vmData,
    onSorterChange: (order, key) => {
      console.log("排序变化:", { order, key });
    },
  },
};

/**
 * 带行选择的表格，支持多选和全选。
 */
export const WithRowSelection: Story = {
  name: "行选择",
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([
      "vm-001",
      "vm-002",
    ]);

    return (
      <Table<VMData>
        columns={basicColumns}
        dataSource={vmData}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    );
  },
};

/**
 * 带行操作菜单的表格，在每行末尾渲染操作按钮。
 */
export const WithRowMenu: Story = {
  name: "行操作菜单",
  args: {
    columns: [
      ...basicColumns,
      {
        key: "action",
        dataIndex: "id",
        title: () => (
          <Icon className={actionStyle} src={SettingsGear16GradientGrayIcon} />
        ),
        render: () => (
          <Button
            size="small"
            type="tertiary"
            prefixIcon={<Icon src={MoreEllipsis316BoldBlueIcon} />}
          />
        ),
      },
    ],
    dataSource: vmData,
  },
};

/**
 * 加载状态，显示骨架屏动画。
 */
export const Loading: Story = {
  name: "加载状态",
  args: {
    columns: basicColumns,
    loading: true,
  },
};

/**
 * 自定义骨架屏配置，可调整行数、表头高度、行高度。
 */
export const CustomSkeleton: Story = {
  name: "自定义骨架屏",
  args: {
    columns: basicColumns,
    loading: true,
    skeletonProps: {
      itemHeight: 30,
      headerHeight: 60,
      rowsCount: 10,
    },
  },
};

/**
 * 错误状态，显示错误信息替代数据。
 */
export const ErrorState: Story = {
  name: "错误状态",
  args: {
    columns: basicColumns,
    dataSource: vmData,
    error: <div>加载失败，请重试</div>,
  },
};

/**
 * 空数据状态，显示空状态提示。
 */
export const Empty: Story = {
  name: "空数据",
  args: {
    columns: basicColumns,
    dataSource: [],
    empty: "暂无虚拟机数据",
  },
};

/**
 * 固定表头，内容区滚动。
 */
export const FixedHeader: Story = {
  name: "固定表头",
  args: {
    columns: basicColumns.map((c) => ({
      ...c,
      width: 200,
    })),
    dataSource: vmData,
    scroll: { y: 200 },
  },
};

/**
 * 可展开行，点击展开显示详细信息。
 */
export const Expandable: Story = {
  name: "可展开行",
  render: () => (
    <Table<VMData>
      columns={basicColumns}
      dataSource={vmData}
      expandable={{
        expandedRowRender: (record) => (
          <ul>
            <li>ID: {record.id}</li>
            <li>名称: {record.name}</li>
            <li>状态: {record.status}</li>
            <li>CPU: {record.cpu} 核</li>
            <li>内存: {record.memory} MB</li>
            <li>集群: {record.cluster}</li>
          </ul>
        ),
        rowExpandable: () => true,
      }}
    />
  ),
};

/**
 * 使用 onRow 设置行事件。
 */
export const WithOnRow: Story = {
  name: "行事件",
  render: () => (
    <Table<VMData>
      columns={basicColumns}
      dataSource={vmData}
      onRow={(record, index) => ({
        onClick: () => {
          console.log("点击行:", record, index);
        },
        onMouseEnter: () => {
          console.log("鼠标进入行:", record.name);
        },
      })}
    />
  ),
};

/**
 * @deprecated 请使用 loading 替代
 */
export const InitLoading: Story = {
  name: "初始化 Loading（已废弃）",
  args: {
    columns: basicColumns,
    initLoading: true,
  },
};

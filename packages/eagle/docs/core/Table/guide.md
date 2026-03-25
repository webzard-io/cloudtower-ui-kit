# Table

## 简介

Table 是基于 antd Table 二次封装的表格组件，提供统一的 CloudTower 表格样式。用于展示结构化数据列表，支持排序、行选择、展开行、加载状态、错误状态等功能。数据源要求每条记录包含 id 字段作为唯一标识。

## 何时使用

- 展示结构化的数据列表（如虚拟机列表、主机列表、集群列表）
- 需要排序、筛选、分页等交互功能
- 需要行选择（单选/多选）进行批量操作
- 需要展开行显示详细信息

不要使用：

- 行内编辑场景 --> 请用 `TableForm`
- 键值对信息展示 --> 请用 `SummaryTable`
- 纯拖拽排序（不需要表格结构） --> 请用 `SortableList`

## 基础用法

```tsx
import React from "react";
import { Table } from "@cloudtower/eagle";

interface VMData {
  id: string;
  name: string;
  status: string;
  cpu: number;
  memory: number;
}

const columns = [
  { key: "name", title: "名称", dataIndex: "name" },
  { key: "status", title: "状态", dataIndex: "status" },
  { key: "cpu", title: "CPU (核)", dataIndex: "cpu" },
  { key: "memory", title: "内存 (MB)", dataIndex: "memory" },
];

const vms: VMData[] = [
  {
    id: "vm-001",
    name: "web-server-01",
    status: "running",
    cpu: 4,
    memory: 8192,
  },
  {
    id: "vm-002",
    name: "db-server-01",
    status: "running",
    cpu: 8,
    memory: 16384,
  },
];

const App = () => <Table<VMData> columns={columns} dataSource={vms} />;
```

## 常见模式

### 模式一：行选择

配合 `rowSelection` 实现行选择功能，常用于批量操作场景。

```tsx
import React, { useState } from "react";
import { Table } from "@cloudtower/eagle";

interface VMData {
  id: string;
  name: string;
  status: string;
}

const App = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Table<VMData>
      columns={columns}
      dataSource={vms}
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: (keys) => setSelectedKeys(keys as string[]),
      }}
    />
  );
};
```

### 模式二：排序功能

通过 `onSorterChange` 回调处理排序逻辑，列配置中设置 `sorter: true` 启用排序。

```tsx
import React from "react";
import { Table } from "@cloudtower/eagle";

const columns = [
  { key: "name", title: "名称", dataIndex: "name", sorter: true },
  { key: "cpu", title: "CPU", dataIndex: "cpu", sorter: true },
];

const App = () => {
  const handleSorterChange = (order, key) => {
    console.log("排序:", order, key);
  };

  return (
    <Table<VMData>
      columns={columns}
      dataSource={vms}
      onSorterChange={handleSorterChange}
    />
  );
};
```

### 模式三：加载与错误状态

通过 `loading` 显示骨架屏加载状态，通过 `error` 显示错误信息。

```tsx
import React from "react";
import { Table } from "@cloudtower/eagle";

const App = () => {
  const { data, isLoading, isError } = useFetchVMs();

  return (
    <Table<VMData>
      columns={columns}
      dataSource={data}
      loading={isLoading}
      error={isError ? "加载失败，请重试" : undefined}
    />
  );
};
```

### 模式四：可展开行

通过 `expandable` 配置展开行内容，适用于显示详细信息。

```tsx
import React from "react";
import { Table } from "@cloudtower/eagle";

const App = () => (
  <Table<VMData>
    columns={columns}
    dataSource={vms}
    expandable={{
      expandedRowRender: (record) => (
        <div>
          <p>ID: {record.id}</p>
          <p>详细信息: ...</p>
        </div>
      ),
      rowExpandable: (record) => record.status === "running",
    }}
  />
);
```

### 模式五：行操作菜单

在列配置中添加操作列，渲染操作按钮或菜单。

```tsx
import React from "react";
import { Table, Button, Icon } from "@cloudtower/eagle";
import { MoreEllipsis316BoldBlueIcon } from "@cloudtower/icons-react";

const columns = [
  { key: "name", title: "名称", dataIndex: "name" },
  {
    key: "action",
    title: "操作",
    render: (_, record) => (
      <Button
        size="small"
        type="tertiary"
        prefixIcon={<Icon src={MoreEllipsis316BoldBlueIcon} />}
        onClick={() => console.log("操作:", record)}
      />
    ),
  },
];
```

## 相关组件

- `TableForm`: 表格表单，用于行内编辑场景
- `SummaryTable`: 摘要表格，用于键值对信息展示
- `BatchOperation`: 批量操作工具栏，配合行选择使用
- `Pagination`: 分页器，用于分页控制

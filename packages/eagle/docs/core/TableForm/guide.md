# TableForm

## 简介

TableForm 是行内编辑的表格表单组件，适用于批量数据录入场景。支持多种内置列类型（text/input/password/checkbox/affix）和自定义列渲染，表头批量填充、行的增删和拖拽排序、三种校验触发模式（Normal/Aggressive/Lazy），以及通过 `errors` 属性注入外部错误信息。通过 `useRef<TableFormHandle>` 可命令式操作数据和校验。

## 何时使用

- 需要批量录入结构化数据（如添加多台主机、配置多个网络接口）
- 每行数据结构相同，需要行内直接编辑
- 需要表头批量填充功能（一次输入应用到所有行）
- 需要行级别的增删和拖拽排序

不要使用：

- 只有单行数据录入 --> 请用 `Form`
- 纯展示型表格（不需要编辑） --> 请用 `Table`
- 仅需拖拽排序（不需要编辑） --> 请用 `SortableList`

## 基础用法

```tsx
import React, { useRef } from "react";
import { TableForm } from "@cloudtower/eagle";
import type { TableFormColumn, TableFormHandle } from "@cloudtower/eagle";

const columns: TableFormColumn[] = [
  { key: "name", title: "主机名", type: "input", autoIncrease: true },
  {
    key: "ip",
    title: "管理 IP",
    type: "input",
    validator: ({ value }) => (!value ? "IP 不能为空" : undefined),
  },
  { key: "password", title: "密码", type: "password" },
];

const App = () => {
  const ref = useRef<TableFormHandle>(null);

  return (
    <TableForm
      ref={ref}
      columns={columns}
      defaultData={[
        { name: "host0", ip: "", password: "" },
        { name: "host1", ip: "", password: "" },
      ]}
      rowAddConfig={{ addible: true, maximum: 10 }}
      row={{ deletable: true }}
      onBodyChange={(data) => console.log("数据变更:", data)}
    />
  );
};
```

## 常见模式

### 模式一：批量填充 + 自动递增

适用于需要快速填入相似数据的场景。表头输入框的值会批量应用到所有行，配合 `autoIncrease` 可以自动递增末尾数字。

```tsx
import React from "react";
import { TableForm } from "@cloudtower/eagle";
import type { TableFormColumn } from "@cloudtower/eagle";

const columns: TableFormColumn[] = [
  {
    key: "hostname",
    title: "主机名",
    type: "input",
    autoIncrease: true,
    defaultValue: "host0",
  },
  { key: "ip", title: "管理 IP", type: "input" },
  { key: "enabled", title: "启用", type: "checkbox", align: "center" },
];

const App = () => (
  <TableForm
    columns={columns}
    defaultData={[
      { hostname: "host0", ip: "10.0.0.1", enabled: true },
      { hostname: "host1", ip: "10.0.0.2", enabled: true },
      { hostname: "host2", ip: "10.0.0.3", enabled: false },
    ]}
    onHeaderChange={(data, columnKey) =>
      console.log("批量填充:", columnKey, data)
    }
  />
);
```

### 模式二：自定义列渲染

适用于内置列类型无法满足需求的场景。通过 `render` 函数可以渲染任意组件（如 Select、DatePicker 等）。

```tsx
import React from "react";
import { TableForm, Select } from "@cloudtower/eagle";
import type { TableFormColumn } from "@cloudtower/eagle";

const columns: TableFormColumn[] = [
  { key: "name", title: "名称", type: "input" },
  {
    key: "role",
    title: "角色",
    defaultValue: "worker",
    render({ isHeader, value, onChange, placeholder }) {
      return (
        <Select
          size="small"
          value={value as string}
          onChange={onChange}
          placeholder={isHeader ? "批量选择" : "请选择"}
          options={[
            { label: "Master", value: "master" },
            { label: "Worker", value: "worker" },
          ]}
        />
      );
    },
    validator({ value }) {
      if (!value) return "请选择角色";
    },
  },
];

const App = () => (
  <TableForm
    columns={columns}
    defaultData={[{ name: "", role: "worker" }]}
    rowAddConfig={{ addible: true }}
    row={{ deletable: true }}
  />
);
```

### 模式三：行配置 + 外部错误注入

适用于校验逻辑在外部（如服务端返回错误）的场景。通过 `row` 统一配置行行为，通过 `errors` 注入外部错误信息。

```tsx
import React, { useState } from "react";
import { TableForm } from "@cloudtower/eagle";
import type { TableFormColumn, TableFormErrorsType } from "@cloudtower/eagle";

const columns: TableFormColumn[] = [
  { key: "name", title: "名称", type: "input" },
  { key: "value", title: "值", type: "input" },
];

const App = () => {
  const [errors, setErrors] = useState<TableFormErrorsType>([null]);

  return (
    <TableForm
      columns={columns}
      defaultData={[{ name: "key1", value: "" }]}
      row={{
        deletable: true,
        draggable: true,
        splitType: "zebraMarking",
        validator: (rowIndex, rowData) =>
          !rowData.name ? "名称不能为空" : undefined,
      }}
      errors={errors}
      onBodyChange={(data) => {
        // 模拟服务端校验
        const newErrors = data.map((row) =>
          row.value === "error" ? { value: "该值不合法" } : null,
        );
        setErrors(newErrors);
      }}
    />
  );
};
```

## 废弃说明

以下属性已废弃，请迁移至 `row` 配置：

- `draggable` --> `row.draggable`
- `deleteConfig` --> `row.deletable` + `row.disableActions`
- `rowSplitType` --> `row.splitType`
- `renderRowDescription` --> `row.customizedDescription`
- `rowValidator` --> `row.validator`

## 相关组件

- `Form`: 标准表单容器，适用于非表格化的表单场景
- `Table`: 数据展示表格，适用于只读场景
- `SortableList`: 可拖拽排序列表，适用于纯排序（无编辑）场景

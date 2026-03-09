# RejectDialog

## 简介

RejectDialog 是操作拒绝反馈对话框，基于 SmallDialog 封装。用于告知用户某个操作无法执行及其原因，通过 `type` 属性（RejectDialogType 枚举）支持四种模式：Single（单个对象拒绝）、All（批量全部拒绝）、Part（批量部分拒绝）、Custom（自定义内容）。仅 Part 模式显示确认按钮（允许用户继续操作未被拒绝的部分）。

## 何时使用

- 单个资源操作被拒绝，需要展示拒绝原因（Single 模式）
- 批量操作中全部资源都不可操作，需要逐一列出原因（All 模式）
- 批量操作中部分资源不可操作，用户可选择跳过并继续（Part 模式）
- 标准模式无法满足的特殊拒绝反馈（Custom 模式）

不要使用：

- 删除确认场景 --> 请用 `DeleteDialog`
- 通用确认/提示场景 --> 请用 `SmallDialog`
- 包含表单的操作反馈 --> 请用 `MediumDialog`

## 基础用法

```tsx
import React from "react";
import {
  RejectDialog,
  RejectDialogType,
  Button,
  KitStoreProvider,
  ModalStack,
} from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Single}
              title="无法删除虚拟机"
              content="虚拟机正在运行中，请先关机再执行删除操作"
              description="请解决以上问题后重试"
            />
          ),
          props: {},
        })
      }
    >
      删除虚拟机
    </Button>
  );
};
```

## 常见模式

### 模式一：单个对象拒绝 - 多条原因

适用于单个资源有多个拒绝原因需要列出的场景。支持有序列表（ordered）、无序列表（unordered）和资源列表（resource）三种列表样式。

```tsx
import React from "react";
import { RejectDialog, RejectDialogType, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Single}
              title="无法删除虚拟机"
              content={[
                "虚拟机当前状态为运行中，需要先关机",
                "存在未完成的数据备份任务",
                "该虚拟机已被安全策略锁定",
              ]}
              listType="ordered"
              description="请解决以上问题后重试"
            />
          ),
          props: {},
        })
      }
    >
      删除虚拟机
    </Button>
  );
};
```

### 模式二：批量全部拒绝

适用于批量操作中所有资源均被拒绝的场景。content 使用 `{ [对象名]: [原因列表] }` 格式。

```tsx
import React from "react";
import { RejectDialog, RejectDialogType, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.All}
              title="无法删除选中的虚拟机"
              content={{
                "vm-master-01": ["作为集群主节点，需要先迁移控制平面"],
                "vm-db-01": ["当前为主数据库节点", "有活跃的数据库连接"],
              }}
              description="以下虚拟机无法执行删除操作"
              secondaryDesc="建议在业务低峰期执行删除操作"
            />
          ),
          props: {},
        })
      }
    >
      批量删除虚拟机
    </Button>
  );
};
```

### 模式三：批量部分拒绝

适用于批量操作中部分资源可继续操作的场景。Part 模式会显示确认按钮（默认 danger 样式），通过 `okButtonProps={{ danger: false }}` 可改为非危险样式。

```tsx
import React from "react";
import { RejectDialog, RejectDialogType, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <RejectDialog
              type={RejectDialogType.Part}
              title="升级虚拟机工具"
              description="选中的 3 个虚拟机中，有 1 个可以升级。"
              content={{
                vm1: ["无需升级"],
                vm2: ["未安装虚拟机工具"],
              }}
              partialDescription="2 个虚拟机无法升级，继续操作将跳过这些虚拟机。"
              okText="部分升级"
              okButtonProps={{ danger: false }}
              onOk={(popModal) => {
                console.log("执行部分升级");
                popModal();
              }}
            />
          ),
          props: {},
        })
      }
    >
      批量升级虚拟机工具
    </Button>
  );
};
```

## 废弃说明

当前推荐使用。RejectDialog 是操作拒绝反馈的标准组件，替代了直接使用 SmallDialog 手动组织拒绝信息的做法。

## 相关组件

- `SmallDialog`: 底层对话框组件（492px），RejectDialog 基于其封装
- `DeleteDialog`: 删除确认对话框，用于需要用户确认的删除操作
- `MediumDialog`: 中型对话框（720px），适用于包含表单的复杂反馈场景

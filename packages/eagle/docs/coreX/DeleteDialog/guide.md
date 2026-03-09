# DeleteDialog

## 简介

DeleteDialog 是一个预设了删除确认样式的对话框组件，基于 SmallDialog 封装。确认按钮默认使用危险（红色）样式以突出操作风险，支持异步删除（confirmLoading）和 footer 错误信息展示。固定宽度 492px。

## 何时使用

- 删除单个或多个资源前需要用户二次确认
- 需要展示删除操作的风险提示（主描述 + 辅助说明）
- 异步删除操作需要 loading 状态和错误反馈

不要使用：

- 操作被拒绝/不可执行的反馈 --> 请用 `RejectDialog`
- 包含表单输入的删除确认 --> 请用 `MediumDialog`
- 非删除类的简单确认 --> 请用 `SmallDialog`

## 基础用法

```tsx
import React from "react";
import {
  DeleteDialog,
  Button,
  KitStoreProvider,
  ModalStack,
} from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          component: () => (
            <DeleteDialog
              title="删除虚拟机"
              description="确定要删除虚拟机 vm-prod-01 吗？"
              secondaryDesc="删除后数据将无法恢复。"
              onOk={(popModal) => {
                console.log("confirmed delete");
                popModal();
              }}
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

### 模式一：异步删除 + 错误处理

适用于删除操作需要调用 API 的场景。通过 `confirmLoading` 控制按钮加载状态，`error` 展示操作失败信息。

```tsx
import React, { useState } from "react";
import { DeleteDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const AsyncDeleteDialog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <DeleteDialog
      title="删除集群"
      description="确定要删除集群 cluster-01 吗？"
      secondaryDesc="删除过程中请耐心等待。"
      confirmLoading={loading}
      error={error}
      onOk={async (popModal) => {
        setLoading(true);
        setError(undefined);
        try {
          await deleteCluster("cluster-01");
          popModal();
        } catch {
          setError("删除失败，请重试");
        } finally {
          setLoading(false);
        }
      }}
    />
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({ component: () => <AsyncDeleteDialog />, props: {} })
      }
    >
      删除集群
    </Button>
  );
};
```

### 模式二：自定义按钮文案

适用于需要更明确的按钮文案来引导用户决策的场景。

```tsx
import React from "react";
import { DeleteDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      danger
      onClick={() =>
        pushModal({
          component: () => (
            <DeleteDialog
              title="删除数据盘"
              description="该数据盘中可能包含重要数据，删除后将无法恢复。"
              cancelText="暂不删除"
              okText="确认删除"
              onOk={(popModal) => {
                console.log("confirmed delete disk");
                popModal();
              }}
            />
          ),
          props: {},
        })
      }
    >
      删除数据盘
    </Button>
  );
};
```

## 废弃说明

当前推荐使用。DeleteDialog 是删除确认场景的标准组件，替代了直接使用 SmallDialog 手动配置 danger 按钮的做法。

## 相关组件

- `SmallDialog`: 底层对话框组件（492px），DeleteDialog 基于其封装
- `RejectDialog`: 操作拒绝反馈对话框，用于告知用户操作无法执行的原因
- `MediumDialog`: 中型对话框（720px），适用于包含表单的删除确认

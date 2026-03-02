# SmallDialog

## 简介

SmallDialog 是一个固定 492px 宽度的轻量级对话框组件，适用于简单确认、信息提示和自定义轻量弹窗场景。通过 `usePushModal` / `popModal` 管理弹窗生命周期，内置初始化加载态、错误信息展示和骨架屏等能力。

## 何时使用

- 简单确认操作（如"确认关闭虚拟机？"）
- 纯信息提示（隐藏确认按钮，仅展示关闭按钮）
- 需要异步提交并展示加载状态的轻量弹窗
- 需要初始化加载数据后再展示内容的弹窗

不要使用：

- 包含表单的场景 --> 请用 `MediumDialog`
- 多步骤向导流程 --> 请用 `WizardDialog`
- 全屏沉浸式操作 --> 请用 `ImmersiveDialog`
- 删除确认场景 --> 请用 `DeleteDialog`（已封装删除确认样式和交互）
- 操作被拒绝 / 不可执行的反馈 --> 请用 `RejectDialog`（支持 Single / All / Part / Custom 四种模式）

## 基础用法

```tsx
import React from "react";
import { SmallDialog, Button, KitStoreProvider, ModalStack } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  const openDialog = () => {
    pushModal({
      component: () => (
        <SmallDialog
          title="关闭虚拟机"
          onOk={(popModal) => {
            console.log("确认关闭");
            popModal();
          }}
          onCancel={(popModal) => {
            popModal();
          }}
        >
          <p>确定要关闭虚拟机 "vm-prod-01" 吗？</p>
        </SmallDialog>
      ),
      props: {},
    });
  };

  return (
    <Button type="primary" onClick={openDialog}>
      关闭虚拟机
    </Button>
  );
};
```

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `React.ReactNode` | -- | 弹窗标题（必填） |
| width | `number \| string` | `492` | 弹窗宽度 |
| TitleRender | `React.FC<{ title?: React.ReactNode }>` | 内置 `DefaultTitleRender` | 自定义标题渲染组件，替换默认标题样式 |
| children | `React.ReactNode` | -- | 弹窗主体内容 |
| okText | `string` | `"确认"` / 初始化失败时为 `"重试"` | 确认按钮文案 |
| cancelText | `string` | 有确认按钮时 `"取消"`，无确认按钮时 `"关闭"` | 取消按钮文案 |
| showOk | `boolean` | `true` | 是否显示确认按钮。设为 `false` 时仅展示取消/关闭按钮 |
| onOk | `(popModal: () => void) => void` | -- | 点击确认按钮的回调，参数 `popModal` 用于关闭弹窗 |
| onCancel | `(popModal: () => void) => void` | -- | 点击取消按钮或关闭弹窗的回调，参数 `popModal` 用于关闭弹窗。未传入时默认调用 `popModal()` |
| maskClosable | `boolean` | `true` | 是否可点击遮罩层关闭弹窗 |
| closable | `boolean` | `true` | 是否显示右上角关闭按钮 |
| className | `string` | -- | 自定义弹窗容器类名 |
| footerClassName | `string` | -- | 自定义 footer 区域类名 |
| okButtonProps | `ButtonProps` | -- | 确认按钮的额外属性，会透传给底层 Button 组件。`okText` 优先级高于 `okButtonProps.children` |
| cancelButtonProps | `ButtonProps` | -- | 取消按钮的额外属性，会透传给底层 Button 组件。`cancelText` 优先级高于 `cancelButtonProps.children` |
| error | `React.ReactNode` | -- | 展示在 footer 区域的错误文案，非空时自动显示错误区域 |
| showFooterErrorIcon | `boolean` | `true` | 是否在 footer 错误文案前展示错误图标 |
| hideFooter | `boolean` | `false` | 是否隐藏 footer（包括确认和取消按钮） |
| confirmLoading | `boolean` | -- | 确认按钮的加载状态，为 `true` 时确认按钮展示 loading |
| initializing | `boolean` | -- | 是否处于初始化加载中。为 `true` 时标题和内容区域展示骨架屏，footer 隐藏 |
| initializingError | `string \| React.ReactNode` | -- | 初始化失败时的错误内容。非空时展示错误提示界面，确认按钮变为"重试" |
| initializingSkeletonRows | `number` | -- | 初始化骨架屏的行数，用于控制加载占位高度 |

## 常见模式

### 模式一：异步提交弹窗

适用于点击确认后需要执行异步操作（如 API 请求）的场景。通过 `confirmLoading` 控制按钮加载状态，操作完成后再关闭弹窗。

```tsx
import React, { useState } from "react";
import { SmallDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const ShutdownVmDialog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <SmallDialog
      title="关闭虚拟机"
      confirmLoading={loading}
      error={error}
      onOk={async (popModal) => {
        setLoading(true);
        setError(undefined);
        try {
          await shutdownVm("vm-prod-01");
          popModal();
        } catch (e) {
          setError("关闭虚拟机失败，请重试");
        } finally {
          setLoading(false);
        }
      }}
    >
      <p>确定要关闭虚拟机 "vm-prod-01" 吗？</p>
      <p>关闭后该虚拟机上运行的所有服务将停止。</p>
    </SmallDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({ component: () => <ShutdownVmDialog />, props: {} })
      }
    >
      关闭虚拟机
    </Button>
  );
};
```

### 模式二：初始化加载弹窗

适用于弹窗打开后需要先请求数据再展示内容的场景。利用 `initializing`、`initializingError` 和 `initializingSkeletonRows` 三个属性组合控制加载、失败、成功三种状态。

```tsx
import React, { useEffect, useMemo, useState } from "react";
import { SmallDialog, Button } from "@cloudtower/eagle";
import type { SmallDialogProps } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const HostDetailDialog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<{ name: string; ip: string }>();

  const fetchData = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await fetchHostDetail("host-01");
      setData(result);
    } catch (e) {
      setError("加载主机信息失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const modalProps: SmallDialogProps = useMemo(() => {
    if (loading) {
      return { title: "", initializing: true, initializingSkeletonRows: 3 };
    }
    if (error) {
      return { title: "", initializingError: error, onOk: fetchData };
    }
    return { title: `主机详情 - ${data?.name}` };
  }, [loading, error, data]);

  return (
    <SmallDialog {...modalProps}>
      <p>主机名称：{data?.name}</p>
      <p>IP 地址：{data?.ip}</p>
    </SmallDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({ component: () => <HostDetailDialog />, props: {} })
      }
    >
      查看主机详情
    </Button>
  );
};
```

### 模式三：自定义确认弹窗（纯信息提示）

适用于仅需要展示信息，不需要用户做"确认/取消"选择的场景。通过 `showOk={false}` 隐藏确认按钮，将取消按钮文案改为"我知道了"。

```tsx
import React from "react";
import { SmallDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <SmallDialog
              title="集群升级完成"
              showOk={false}
              cancelText="我知道了"
            >
              <p>集群 "cluster-prod" 已成功升级到 v4.2.0。</p>
              <p>所有节点均已完成滚动更新，当前运行状态正常。</p>
            </SmallDialog>
          ),
          props: {},
        })
      }
    >
      查看升级结果
    </Button>
  );
};
```

## 废弃说明

当前推荐使用。SmallDialog 替代了 `LegacyModal` 的普通弹窗场景，新代码应统一使用 SmallDialog。

## 相关组件

- `MediumDialog` — 中等尺寸对话框（720px），适用于包含表单输入的场景
- `ImmersiveDialog` — 全屏沉浸式对话框，适用于需要大量操作空间的场景
- `WizardDialog` — 向导式对话框，适用于多步骤流程
- `DeleteDialog` — 删除确认对话框，封装了删除场景的标准样式和交互（位于 `@cloudtower/eagle` 的 coreX 模块）
- `RejectDialog` — 操作拒绝反馈对话框，支持 Single（单条拒绝）、All（全部拒绝）、Part（部分拒绝）、Custom（自定义内容）四种模式（位于 `@cloudtower/eagle` 的 coreX 模块）

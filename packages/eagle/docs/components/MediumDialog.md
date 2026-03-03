# MediumDialog

## 简介

MediumDialog 是一个固定 720px 宽度的中型对话框组件，继承 SmallDialog 的全部功能，在此基础上提供更大的显示区域（720px 宽度、60px 水平内边距）和更突出的标题排版（d1s_bold_title）。适用于包含表单输入、内容较多的确认等场景。通过 `isContentFull` 属性可开启全屏模式，使弹窗尺寸变为 `width: calc(100vw - 160px)`、`height: calc(100vh - 80px)`，适合需要大面积展示内容的场景。

## 何时使用

- 包含表单输入的弹窗（如编辑虚拟机配置、创建网络策略）
- 内容较多的确认弹窗，492px 宽度不够展示时
- 需要大面积展示内容（如表格、拓扑图）的场景，配合 `isContentFull` 使用

不要使用：

- 简单确认或信息提示 --> 请用 `SmallDialog`
- 多步骤向导流程 --> 请用 `WizardDialog`
- 全屏沉浸式操作 --> 请用 `ImmersiveDialog`
- 删除确认场景 --> 请用 `DeleteDialog`（已封装删除确认样式和交互）
- 操作被拒绝 / 不可执行的反馈 --> 请用 `RejectDialog`（支持 Single / All / Part / Custom 四种模式）

## 基础用法

```tsx
import React from "react";
import { MediumDialog, Button, KitStoreProvider, ModalStack } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  const openDialog = () => {
    pushModal({
      component: () => (
        <MediumDialog
          title="编辑虚拟机"
          onOk={(popModal) => {
            console.log("保存配置");
            popModal();
          }}
          onCancel={(popModal) => {
            popModal();
          }}
        >
          <form>
            <label>虚拟机名称</label>
            <input defaultValue="vm-prod-01" />
            <label>CPU (核)</label>
            <input type="number" defaultValue={4} />
            <label>内存 (GB)</label>
            <input type="number" defaultValue={8} />
          </form>
        </MediumDialog>
      ),
      props: {},
    });
  };

  return (
    <Button type="primary" onClick={openDialog}>
      编辑虚拟机
    </Button>
  );
};
```

## Props

MediumDialog 继承 SmallDialog 的全部属性，并新增以下属性：

### MediumDialog 新增属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| isContentFull | `boolean` | `false` | 内容是否尽可能占满视窗。开启后弹窗尺寸变为 `width: calc(100vw - 160px)`、`height: calc(100vh - 80px)`，内容区域自动 flex 填充剩余高度 |

### 继承自 SmallDialog 的属性

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `React.ReactNode` | -- | 弹窗标题（必填） |
| width | `number \| string` | `720` | 弹窗宽度。MediumDialog 默认为 720，`isContentFull` 为 true 时变为 `calc(100vw - 160px)` |
| TitleRender | `React.FC<{ title?: React.ReactNode }>` | 内置 `d1s_bold_title` 渲染 | 自定义标题渲染组件，替换默认标题样式。MediumDialog 默认使用 `Typo.Display.d1s_bold_title` |
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
| initializingSkeletonRows | `number` | `3` | 初始化骨架屏的行数，用于控制加载占位高度。MediumDialog 默认为 3（SmallDialog 默认为 2） |

## 常见模式

### 模式一：表单提交弹窗

适用于在弹窗中包含表单输入的场景。通过 `confirmLoading` 控制提交按钮加载状态，提交成功后再关闭弹窗。

```tsx
import React, { useState } from "react";
import { MediumDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const EditVmDialog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <MediumDialog
      title="编辑虚拟机"
      confirmLoading={loading}
      error={error}
      onOk={async (popModal) => {
        setLoading(true);
        setError(undefined);
        try {
          await saveVmConfig({ name: "vm-prod-01", cpu: 4, memory: 8 });
          popModal();
        } catch (e) {
          setError("保存配置失败，请重试");
        } finally {
          setLoading(false);
        }
      }}
    >
      <form>
        <label>虚拟机名称</label>
        <input defaultValue="vm-prod-01" />
        <label>CPU (核)</label>
        <input type="number" defaultValue={4} />
        <label>内存 (GB)</label>
        <input type="number" defaultValue={8} />
      </form>
    </MediumDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({ component: () => <EditVmDialog />, props: {} })
      }
    >
      编辑虚拟机
    </Button>
  );
};
```

### 模式二：数据展示弹窗

适用于在弹窗中展示较多详情信息的场景。利用 `initializing`、`initializingError` 控制加载状态，加载完成后展示数据。

```tsx
import React, { useEffect, useMemo, useState } from "react";
import { MediumDialog, Button } from "@cloudtower/eagle";
import type { MediumDialogProps } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const VmDetailDialog: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<{
    name: string;
    cpu: number;
    memory: number;
    disks: string[];
    nics: string[];
  }>();

  const fetchData = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await fetchVmDetail("vm-prod-01");
      setData(result);
    } catch (e) {
      setError("加载虚拟机详情失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const modalProps: Partial<MediumDialogProps> = useMemo(() => {
    if (loading) {
      return { title: "", initializing: true, initializingSkeletonRows: 5 };
    }
    if (error) {
      return { title: "", initializingError: error, onOk: fetchData };
    }
    return { title: `虚拟机详情 - ${data?.name}` };
  }, [loading, error, data]);

  return (
    <MediumDialog showOk={false} cancelText="关闭" {...modalProps}>
      <p>虚拟机名称：{data?.name}</p>
      <p>CPU：{data?.cpu} 核</p>
      <p>内存：{data?.memory} GB</p>
      <p>磁盘：{data?.disks?.join(", ")}</p>
      <p>网卡：{data?.nics?.join(", ")}</p>
    </MediumDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({ component: () => <VmDetailDialog />, props: {} })
      }
    >
      查看虚拟机详情
    </Button>
  );
};
```

### 模式三：全屏内容弹窗（isContentFull）

适用于需要大面积展示内容（如表格、拓扑图、日志）的场景。开启 `isContentFull` 后弹窗尺寸变为 `width: calc(100vw - 160px)`、`height: calc(100vh - 80px)`，内容区域自动 flex 填充剩余高度。

```tsx
import React from "react";
import { MediumDialog, Button } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => (
            <MediumDialog
              title="虚拟机任务日志"
              isContentFull
              showOk={false}
              cancelText="关闭"
            >
              <div style={{ flex: 1, overflow: "auto" }}>
                <pre>
                  {`[2024-01-15 10:00:01] 开始迁移虚拟机 vm-prod-01
[2024-01-15 10:00:05] 正在同步内存页...
[2024-01-15 10:01:30] 内存同步完成，开始切换
[2024-01-15 10:01:32] 迁移完成，虚拟机已在目标主机上运行`}
                </pre>
              </div>
            </MediumDialog>
          ),
          props: {},
        })
      }
    >
      查看任务日志
    </Button>
  );
};
```

## 与 SmallDialog 的差异对比

| 特性 | SmallDialog | MediumDialog |
|------|-------------|--------------|
| 默认宽度 | 492px | 720px |
| 水平内边距 | 40px | 60px |
| 标题排版 | `d2_bold_title` | `d1s_bold_title` |
| 骨架屏默认行数 | 2 | 3 |
| 全屏模式 | 不支持 | 支持（`isContentFull`） |
| 适用场景 | 简单确认、信息提示 | 表单弹窗、内容较多的确认 |

## 废弃说明

当前推荐使用。MediumDialog 替代了 `LegacyModal` 的中型弹窗场景，新代码中包含表单或内容较多的弹窗应统一使用 MediumDialog。

## 相关组件

- `SmallDialog` -- 小尺寸对话框（492px），适用于简单确认和信息提示
- `ImmersiveDialog` -- 全屏沉浸式对话框，适用于需要大量操作空间的场景
- `WizardDialog` -- 向导式对话框，适用于多步骤流程
- `DeleteDialog` -- 删除确认对话框，封装了删除场景的标准样式和交互（位于 `@cloudtower/eagle` 的 coreX 模块）
- `RejectDialog` -- 操作拒绝反馈对话框，支持 Single（单条拒绝）、All（全部拒绝）、Part（部分拒绝）、Custom（自定义内容）四种模式（位于 `@cloudtower/eagle` 的 coreX 模块）

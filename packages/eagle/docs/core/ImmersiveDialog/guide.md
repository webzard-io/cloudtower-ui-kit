# ImmersiveDialog

## 简介

ImmersiveDialog 是一个沉浸式全屏对话框组件，支持左中右三栏布局。默认三栏布局宽度：左侧面板 192px、中间内容区 648px、右侧面板 192px。设置 `isContentFull` 后内容区占满整个对话框，不再渲染左右面板。通过 `usePushModal` / `usePopModal` 管理弹窗生命周期，内置初始化加载态、错误信息展示和骨架屏等能力。

## 何时使用

- 需要大面积内容展示的场景（如详情页、配置面板）
- 复杂操作流程，需要同时展示导航、内容和辅助信息
- 需要左侧导航 + 中间表单/内容 + 右侧帮助信息的三栏布局

不要使用：

- 多步骤向导流程 --> 请用 `WizardDialog`
- 简单确认操作 --> 请用 `SmallDialog`
- 包含表单的中等复杂度场景 --> 请用 `MediumDialog`

## 布局说明

ImmersiveDialog 提供两种布局模式：

### 三栏布局（默认）

默认模式下，对话框分为左、中、右三栏：

- **左侧面板**（`left`）：宽度 192px，适合放置导航菜单或步骤指示器
- **中间内容区**（`children`）：宽度 648px，标题和 footer 与中间内容区对齐
- **右侧面板**（`right`）：宽度 192px，适合放置辅助信息或快捷操作

左右面板为 `position: fixed` 定位，中间内容区可独立滚动。

### 全屏内容模式（`isContentFull`）

设置 `isContentFull={true}` 后，左右面板不再渲染，内容区占满整个对话框宽度（左右各留 40px 内边距）。适用于不需要侧边栏的全屏展示场景。

## 基础用法

```tsx
import React from "react";
import { ImmersiveDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const NetworkConfigDialog: React.FC = () => {
  const popModal = usePopModal();

  return (
    <ImmersiveDialog
      title="网络配置"
      left={<div>导航菜单</div>}
      right={<div>帮助信息</div>}
      onOk={() => {
        console.log("确认保存");
        popModal();
      }}
    >
      <p>这里是网络配置的主体内容。</p>
    </ImmersiveDialog>
  );
};

// 使用方式
const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <NetworkConfigDialog />,
          props: { name: "NetworkConfigDialog" },
        })
      }
    >
      网络配置
    </Button>
  );
};
```

> **注意**：ImmersiveDialog 的 `onOk` 签名是 `(e: React.MouseEvent) => void`，不会自动关闭弹窗。必须通过 `usePopModal()` 获取 `popModal` 函数手动关闭，这一点与 SmallDialog / MediumDialog 的 `(popModal: () => void) => void` 签名不同。

## 常见模式

### 模式一：三栏布局

适用于需要导航、内容和辅助信息同时展示的场景。左右面板固定定位，中间内容区可滚动。

```tsx
import React from "react";
import { ImmersiveDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const ClusterConfigDialog: React.FC = () => {
  const popModal = usePopModal();

  return (
    <ImmersiveDialog
      title="集群配置"
      left={
        <ul>
          <li>基本信息</li>
          <li>网络设置</li>
          <li>存储配置</li>
          <li>高可用</li>
        </ul>
      }
      right={
        <div>
          <h4>帮助</h4>
          <p>集群配置说明文档...</p>
        </div>
      }
      onOk={() => {
        console.log("保存配置");
        popModal();
      }}
    >
      <div>
        <h3>基本信息</h3>
        <p>集群名称、描述等配置项...</p>
      </div>
    </ImmersiveDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <ClusterConfigDialog />,
          props: { name: "ClusterConfigDialog" },
        })
      }
    >
      集群配置
    </Button>
  );
};
```

### 模式二：全屏内容（isContentFull）

适用于不需要侧边栏的全屏展示场景，如查看大量数据、展示图表等。

```tsx
import React from "react";
import { ImmersiveDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const MonitorDashboardDialog: React.FC = () => {
  const popModal = usePopModal();

  return (
    <ImmersiveDialog
      title="监控面板"
      isContentFull
      showOk={false}
      cancelText="关闭"
      onCancel={() => {
        popModal();
      }}
    >
      <div>
        <h3>CPU 使用率</h3>
        <p>图表内容...</p>
        <h3>内存使用率</h3>
        <p>图表内容...</p>
      </div>
    </ImmersiveDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      onClick={() =>
        pushModal({
          component: () => <MonitorDashboardDialog />,
          props: { name: "MonitorDashboardDialog" },
        })
      }
    >
      查看监控
    </Button>
  );
};
```

### 模式三：带 footerLeftAction 的对话框

适用于需要在 footer 左侧放置额外操作（如"重置"按钮、提示文案）的场景。

```tsx
import React, { useState } from "react";
import { ImmersiveDialog, Button } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

const AdvancedSettingsDialog: React.FC = () => {
  const popModal = usePopModal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <ImmersiveDialog
      title="高级设置"
      isContentFull
      confirmLoading={loading}
      error={error}
      footerLeftAction={
        <Button type="quiet" onClick={() => console.log("重置为默认值")}>
          重置为默认值
        </Button>
      }
      onOk={async () => {
        setLoading(true);
        setError(undefined);
        try {
          await saveSettings();
          popModal();
        } catch (e) {
          setError("保存设置失败，请重试");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div>
        <h3>高级配置项</h3>
        <p>配置内容...</p>
      </div>
    </ImmersiveDialog>
  );
};

const App = () => {
  const pushModal = usePushModal();

  return (
    <Button
      type="primary"
      onClick={() =>
        pushModal({
          component: () => <AdvancedSettingsDialog />,
          props: { name: "AdvancedSettingsDialog" },
        })
      }
    >
      高级设置
    </Button>
  );
};
```

## 关键警告

ImmersiveDialog 的 `onOk` 签名是 `(e: React.MouseEvent) => void`，与 SmallDialog / MediumDialog 的 `(popModal: () => void) => void` **不同**。

- SmallDialog / MediumDialog：`onOk` 回调的第一个参数就是 `popModal` 函数，可以直接调用来关闭弹窗。
- ImmersiveDialog：`onOk` 回调的参数是原生的鼠标事件对象，**不会自动关闭弹窗**。必须在组件内部通过 `usePopModal()` hook 获取 `popModal` 函数，手动调用来关闭弹窗。

```tsx
// SmallDialog -- onOk 的参数就是 popModal
<SmallDialog
  onOk={(popModal) => {
    popModal(); // 直接通过参数关闭
  }}
/>

// ImmersiveDialog -- 需要 usePopModal() hook
const MyDialog = () => {
  const popModal = usePopModal(); // 必须通过 hook 获取

  return (
    <ImmersiveDialog
      onOk={(e) => {
        // e 是 React.MouseEvent，不是 popModal
        popModal(); // 通过 hook 返回的函数关闭
      }}
    />
  );
};
```

## 相关组件

- `SmallDialog` -- 小型对话框（492px），适用于简单确认和信息提示场景
- `MediumDialog` -- 中等尺寸对话框（720px），适用于包含表单输入的场景
- `WizardDialog` -- 向导式对话框，适用于多步骤流程
- `DeleteDialog` -- 删除确认对话框，封装了删除场景的标准样式和交互（位于 `@cloudtower/eagle` 的 coreX 模块）
- `RejectDialog` -- 操作拒绝反馈对话框，支持 Single（单条拒绝）、All（全部拒绝）、Part（部分拒绝）、Custom（自定义内容）四种模式（位于 `@cloudtower/eagle` 的 coreX 模块）

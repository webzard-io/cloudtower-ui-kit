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

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `React.ReactNode` | -- | 弹窗标题 |
| children | `React.ReactNode` | -- | 中间内容区的主体内容 |
| isContentFull | `boolean` | -- | 是否内容占满整个对话框。为 `true` 时不渲染左右面板，内容区占满全宽 |
| left | `React.ReactNode` | -- | 左侧面板的自定义内容（三栏布局模式下生效） |
| leftClassName | `string` | -- | 左侧面板的自定义类名 |
| right | `React.ReactNode` | -- | 右侧面板的自定义内容（三栏布局模式下生效） |
| rightClassName | `string` | -- | 右侧面板的自定义类名 |
| closeIcon | `React.ReactNode` | 内置关闭图标 | 自定义关闭图标 |
| showCancel | `boolean` | `true` | 是否显示取消按钮 |
| cancelText | `string` | 有确认按钮时 `"取消"`，无确认按钮时 `"关闭"` | 取消按钮的文本 |
| cancelButtonProps | `ButtonProps` | -- | 取消按钮的额外属性，透传给底层 Button 组件 |
| showOk | `boolean` | `true` | 是否显示确认按钮 |
| okText | `string` | `"确认"` / 初始化失败时为 `"重试"` | 确认按钮的文本 |
| okButtonProps | `ButtonProps` | -- | 确认按钮的额外属性，透传给底层 Button 组件 |
| onOk | `(e: React.MouseEvent) => void` | -- | 点击确认按钮的回调。**不会自动关闭弹窗**，需要通过 `usePopModal()` 手动关闭 |
| error | `React.ReactNode` | -- | 展示在 footer 区域的错误信息，非空时自动显示错误区域 |
| showFooterErrorIcon | `boolean` | `true` | 是否在 footer 错误信息前展示错误图标 |
| hideFooter | `boolean` | `false` | 是否隐藏 footer（包括确认和取消按钮） |
| footerLeftAction | `React.ReactNode` | -- | 底部左侧的操作区域，可放置额外按钮或提示信息 |
| confirmLoading | `boolean` | -- | 确认按钮的加载状态，为 `true` 时确认按钮展示 loading |
| initializing | `boolean` | -- | 是否处于初始化加载中。为 `true` 时标题和内容区域展示骨架屏，footer 隐藏 |
| initializingError | `string \| React.ReactNode` | -- | 初始化失败时的错误内容。非空时展示错误提示界面，标题变为"加载失败"，确认按钮变为"重试" |
| className | `string` | -- | 自定义弹窗容器类名 |
| visible | `boolean` | `true` | 是否显示弹窗 |

此外，ImmersiveDialog 继承了 antd Modal 的其他属性（如 `onCancel`、`maskClosable`、`closable` 等），会透传给底层 Modal 组件。

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

## 废弃说明

当前推荐使用。ImmersiveDialog 替代了 `LegacyModal` 的全屏弹窗场景，新代码应统一使用 ImmersiveDialog。

## 相关组件

- `SmallDialog` -- 小型对话框（492px），适用于简单确认和信息提示场景
- `MediumDialog` -- 中等尺寸对话框（720px），适用于包含表单输入的场景
- `WizardDialog` -- 向导式对话框，适用于多步骤流程
- `DeleteDialog` -- 删除确认对话框，封装了删除场景的标准样式和交互（位于 `@cloudtower/eagle` 的 coreX 模块）
- `RejectDialog` -- 操作拒绝反馈对话框，支持 Single（单条拒绝）、All（全部拒绝）、Part（部分拒绝）、Custom（自定义内容）四种模式（位于 `@cloudtower/eagle` 的 coreX 模块）

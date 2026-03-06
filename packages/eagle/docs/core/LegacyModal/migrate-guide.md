# LegacyModal 迁移指南

> **给 Coding Agent 的说明：**
> 1. 阅读本文档了解 LegacyModal 到新 Dialog 组件的完整迁移映射
> 2. 阅读替代组件的文档（如 `../SmallDialog/guide.md`）了解新 API
> 3. 如果遇到本文档未覆盖的边界情况，标注为"建议方案，请确认后再执行"，等待开发者确认
> 4. 不要在没有逐个确认的情况下直接执行批量迁移

`LegacyModal` 已被标记为 `@deprecated`，将在未来版本中移除。请根据以下指南将其迁移到对应的新 Dialog 组件。

## 选择替代组件

| LegacyModal 使用模式 | 替代组件 | 判断条件 |
|---|---|---|
| `normal={true}` 或默认模式 | SmallDialog / MediumDialog | 内容较少（如确认提示、简单表单）使用 SmallDialog（默认宽度 492px）；内容较多（如复杂表单、详情展示）使用 MediumDialog（默认宽度 720px） |
| `fullscreen={true}` | ImmersiveDialog | 需要全屏展示的场景，如大表单、数据编辑 |
| `wizard={...}` | WizardDialog | 多步骤向导流程，如创建向导、配置引导 |

## Props 映射表

### 通用 Props 对照

| LegacyModal | SmallDialog / MediumDialog | ImmersiveDialog | WizardDialog | 说明 |
|---|---|---|---|---|
| `title` | `title` | `title` | `title` | 标题，用法不变 |
| `width` | `width` | 不需要（自动全屏） | 不需要（自动全屏） | SmallDialog 默认 492px，MediumDialog 默认 720px |
| `confirmLoading` | `confirmLoading` | `confirmLoading` | `confirmLoading` | 确认按钮加载状态，用法不变 |
| `okText` | `okText` | `okText` | `okText` | 确认按钮文案，用法不变 |
| `cancelText` | `cancelText` | `cancelText` | `cancelText` | 取消按钮文案，用法不变 |
| `okButtonProps` | `okButtonProps` | `okButtonProps` | `okButtonProps` | 确认按钮属性，用法不变 |
| `cancelButtonProps` | `cancelButtonProps` | `cancelButtonProps` | `cancelButtonProps` | 取消按钮属性，用法不变 |
| `showOk` | `showOk` | `showOk` | `showOk` | 是否显示确认按钮，用法不变 |
| `showCancel` | 无（始终显示） | `showCancel` | `showCancel` | SmallDialog 始终显示取消按钮 |
| `error` | `error` | `error` | `error` | 错误信息，用法不变 |
| `maskClosable` | `maskClosable` | 继承 antd Modal | 继承 antd Modal | 新组件默认值有变化，见下方说明 |
| `className` | `className` | `className` | `className` | 自定义类名，用法不变 |
| `closable` | `closable` | 继承 antd Modal | 继承 antd Modal | 用法不变 |
| `closeIcon` | 无（内置样式） | `closeIcon` | `closeIcon` | SmallDialog 内置了关闭图标样式 |
| `hideFooterButtonBorder` | 无 | 无 | 无 | 新组件已移除此设计，无需迁移 |
| `normal` | 无 | 无 | 无 | 新组件无需此参数，通过选择不同组件来区分 |
| `fullscreen` | 无 | 无 | 无 | 新组件无需此参数，使用 ImmersiveDialog 即为全屏 |

### 新增 Props

| Props | 可用组件 | 说明 |
|---|---|---|
| `hideFooter` | SmallDialog / MediumDialog / ImmersiveDialog | 是否隐藏底部按钮区域 |
| `showFooterErrorIcon` | SmallDialog / MediumDialog / ImmersiveDialog | 是否显示错误图标（默认 true） |
| `initializing` | SmallDialog / MediumDialog / ImmersiveDialog | 初始化加载状态，显示骨架屏 |
| `initializingError` | SmallDialog / MediumDialog / ImmersiveDialog | 初始化错误内容 |
| `initializingSkeletonRows` | SmallDialog / MediumDialog | 初始化骨架屏行数 |
| `isContentFull` | MediumDialog / ImmersiveDialog | 内容是否占满视窗 |
| `footerLeftAction` | ImmersiveDialog / WizardDialog | 底部左侧操作区域 |
| `left` / `right` | ImmersiveDialog / WizardDialog | 左侧/右侧自定义内容 |
| `TitleRender` | SmallDialog / MediumDialog | 自定义标题渲染组件 |
| `footerClassName` | SmallDialog / MediumDialog | 自定义 footer 类名 |

## 回调签名变化

这是迁移中最关键的变化。新 Dialog 组件的 `onOk` 和 `onCancel` 签名与 LegacyModal 不同：

### LegacyModal（旧）

```typescript
// onOk 和 onCancel 都接收 MouseEvent，弹窗关闭由内部 redux 状态控制
onOk?: (e: React.MouseEvent<HTMLElement>) => void;
onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
```

### SmallDialog / MediumDialog（新）

```typescript
// onOk 和 onCancel 都接收 popModal 函数作为参数
// 调用 popModal() 关闭弹窗，不调用则弹窗保持打开
onOk?: (popModal: () => void) => void;
onCancel?: (popModal: () => void) => void;
```

SmallDialog / MediumDialog 内部已调用 `usePopModal()`，并将 `popModal` 作为参数传递给回调。这意味着：

- 如果不传 `onOk`，点击确认按钮会自动关闭弹窗
- 如果不传 `onCancel`，点击取消按钮或关闭图标会自动关闭弹窗
- 如果传了回调，需要在合适的时机手动调用 `popModal()` 来关闭弹窗

### ImmersiveDialog / WizardDialog（新）

```typescript
// onOk 接收 MouseEvent，需要手动使用 usePopModal() 关闭弹窗
onOk?: (e: React.MouseEvent<HTMLElement>) => void;
// onCancel 接收 MouseEvent，组件内部会自动调用 popModal() 关闭
onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
```

ImmersiveDialog / WizardDialog 内部也调用了 `usePopModal()`，但行为不同：

- 点击取消按钮或关闭图标时，组件内部会先调用 `popModal()` 再触发 `onCancel`
- 点击确认按钮时，组件内部不会自动关闭弹窗，需要在 `onOk` 中使用 `usePopModal()` 手动关闭

## 迁移前后代码对比

### 场景一：普通弹窗

迁移前（LegacyModal）：

```tsx
import { LegacyModal } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

function MyPage() {
  const pushModal = usePushModal();

  const handleOpen = () => {
    pushModal({
      component: () => (
        <LegacyModal
          title="确认删除"
          normal={true}
          onOk={(e) => {
            // 执行删除操作
            deleteItem();
          }}
          onCancel={(e) => {
            // LegacyModal 通过内部 redux 状态控制关闭
          }}
        >
          <p>确定要删除此项吗？</p>
        </LegacyModal>
      ),
      props: {},
    });
  };

  return <button onClick={handleOpen}>删除</button>;
}
```

迁移后（SmallDialog）：

```tsx
import { SmallDialog } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

function MyPage() {
  const pushModal = usePushModal();

  const handleOpen = () => {
    pushModal({
      component: () => (
        <SmallDialog
          title="确认删除"
          onOk={(popModal) => {
            // 执行删除操作
            deleteItem();
            // 手动调用 popModal 关闭弹窗
            popModal();
          }}
          // 不传 onCancel，点击取消时自动关闭
        >
          <p>确定要删除此项吗？</p>
        </SmallDialog>
      ),
      props: {},
    });
  };

  return <button onClick={handleOpen}>删除</button>;
}
```

### 场景二：全屏弹窗

迁移前（LegacyModal fullscreen）：

```tsx
import { LegacyModal } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

function MyPage() {
  const pushModal = usePushModal();

  const handleOpen = () => {
    pushModal({
      component: () => (
        <LegacyModal
          title="编辑配置"
          fullscreen={true}
          confirmLoading={loading}
          onOk={(e) => {
            saveConfig();
          }}
          onCancel={(e) => {
            // 关闭
          }}
        >
          <ConfigForm />
        </LegacyModal>
      ),
      props: {},
    });
  };

  return <button onClick={handleOpen}>编辑</button>;
}
```

迁移后（ImmersiveDialog）：

```tsx
import { ImmersiveDialog } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

function ConfigDialog() {
  const popModal = usePopModal();

  return (
    <ImmersiveDialog
      title="编辑配置"
      confirmLoading={loading}
      onOk={(e) => {
        saveConfig().then(() => {
          // ImmersiveDialog 的 onOk 不会自动关闭弹窗
          // 需要手动调用 popModal()
          popModal();
        });
      }}
      // onCancel 不需要手动关闭，组件内部会自动调用 popModal()
    >
      <ConfigForm />
    </ImmersiveDialog>
  );
}

function MyPage() {
  const pushModal = usePushModal();

  const handleOpen = () => {
    pushModal({
      component: () => <ConfigDialog />,
      props: {},
    });
  };

  return <button onClick={handleOpen}>编辑</button>;
}
```

### 场景三：向导弹窗

迁移前（LegacyModal wizard）：

```tsx
import { LegacyModal } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

function MyPage() {
  const pushModal = usePushModal();
  const [step, setStep] = useState(0);

  const handleOpen = () => {
    pushModal({
      component: () => (
        <LegacyModal
          title="创建虚拟机"
          fullscreen={true}
          wizard={{
            step: step,
            onStepChange: (s) => setStep(s),
            steps: [
              {
                title: "基本信息",
                render: <BasicInfoStep />,
                onOk: (e) => {
                  // 校验后进入下一步
                },
              },
              {
                title: "网络配置",
                render: <NetworkStep />,
                onOk: (e) => {
                  // 提交创建
                  createVM();
                },
              },
            ],
          }}
        >
          {/* 公共内容 */}
        </LegacyModal>
      ),
      props: {},
    });
  };

  return <button onClick={handleOpen}>创建</button>;
}
```

迁移后（WizardDialog）：

```tsx
import { WizardDialog } from "@cloudtower/eagle";
import { usePushModal, usePopModal } from "@cloudtower/eagle";

function CreateVMDialog() {
  const popModal = usePopModal();

  return (
    <WizardDialog
      title="创建虚拟机"
      steps={[
        {
          title: "基本信息",
          children: <BasicInfoStep />,
        },
        {
          title: "网络配置",
          children: <NetworkStep />,
        },
      ]}
      onNextStep={(step) => {
        // 返回 false 可阻止进入下一步（用于校验）
        if (!validate()) return false;
      }}
      onStepChange={(step) => {
        // 步骤变化回调
      }}
      onOk={(e) => {
        // 最后一步点击确认时触发
        createVM().then(() => {
          popModal();
        });
      }}
    >
      {/* 公共内容（可选） */}
    </WizardDialog>
  );
}

function MyPage() {
  const pushModal = usePushModal();

  const handleOpen = () => {
    pushModal({
      component: () => <CreateVMDialog />,
      props: {},
    });
  };

  return <button onClick={handleOpen}>创建</button>;
}
```

## 关键差异说明

### 1. 向导步骤配置

| 对比项 | LegacyModal wizard | WizardDialog |
|---|---|---|
| 步骤内容字段 | `render: React.ReactNode` | `children: React.ReactNode` |
| 步骤级别的 onOk | 支持（每个 step 可配 `onOk`） | 不支持（统一使用顶层 `onOk`） |
| 步骤级别的 onPrev | 支持（每个 step 可配 `onPrev`） | 不支持（统一使用 `onPrevStep`） |
| 步骤级别的 okText | 支持（每个 step 可配 `okText`） | 不支持（统一使用 `nextText` / `okText`） |
| 步骤级别的 disabled | 支持 | 不支持 |
| 步骤管理 | 需要外部维护 `step` 状态 | 内部管理（也可通过 `step` prop 受控） |
| 阻止下一步 | 不支持 | `onNextStep` 返回 `false` 可阻止 |
| 隐藏左侧步骤 | `hideLeft` | `hideSteps` |
| 禁用上一步 | `disablePrevStep` | 无（由 `onPrevStep` 自行控制） |

### 2. maskClosable 默认值

| 组件 | 默认值 |
|---|---|
| LegacyModal | `false` |
| SmallDialog | `true` |
| MediumDialog | `true` |
| ImmersiveDialog | 继承 antd Modal 默认值 |
| WizardDialog | 继承 antd Modal 默认值 |

如果你的业务场景要求点击遮罩层不关闭弹窗，需要显式设置 `maskClosable={false}`。

### 3. 弹窗关闭机制

LegacyModal 通过内部 redux 状态（`closeId`）控制关闭动画和移除，开发者只需在回调中执行业务逻辑。

新 Dialog 组件的关闭行为：

- **SmallDialog / MediumDialog**：`onOk` 和 `onCancel` 接收 `popModal` 参数，开发者决定何时关闭
- **ImmersiveDialog / WizardDialog**：取消操作自动关闭，确认操作需通过 `usePopModal()` 手动关闭

## 迁移步骤

1. **确定 LegacyModal 使用模式** -- 检查是否使用了 `fullscreen`、`wizard` 等 prop，对照上方表格选择替代组件

2. **替换 import**
   ```tsx
   // 迁移前
   import { LegacyModal } from "@cloudtower/eagle";
   // 迁移后（根据场景选择）
   import { SmallDialog } from "@cloudtower/eagle";
   import { MediumDialog } from "@cloudtower/eagle";
   import { ImmersiveDialog } from "@cloudtower/eagle";
   import { WizardDialog } from "@cloudtower/eagle";
   ```

3. **调整 Props** -- 对照 Props 映射表，移除不再支持的 prop（`normal`、`fullscreen`、`hideFooterButtonBorder`），添加必要的新 prop

4. **改写 onOk / onCancel 回调**
   - 如果迁移到 SmallDialog / MediumDialog：将回调签名从 `(e) => {}` 改为 `(popModal) => {}`，在需要关闭弹窗时调用 `popModal()`
   - 如果迁移到 ImmersiveDialog / WizardDialog：在组件内部使用 `usePopModal()` 获取 `popModal`，在 `onOk` 中手动调用关闭。注意，对于 ImmersiveDialog / WizardDialog，需要将弹窗内容抽取为独立组件以便使用 hook

5. **处理向导模式迁移**（仅 wizard 场景）
   - 将 `wizard.steps[].render` 改为 `steps[].children`
   - 移除步骤级别的 `onOk`、`onPrev`、`okText`，统一使用顶层回调
   - 利用 `onNextStep` 返回 `false` 的机制替代步骤级别的校验逻辑
   - 如果之前依赖外部 `step` 状态，可以改为让 WizardDialog 内部管理，通过 `onStepChange` 监听变化

6. **运行类型检查**
   ```bash
   cd packages/eagle && yarn typings
   ```

7. **手动验证功能** -- 检查弹窗的打开、关闭、确认、取消、遮罩层点击等行为是否符合预期

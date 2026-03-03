# 使用模式

## 弹窗模式

弹窗通过 `usePushModal` hook 打开，组件在 ModalStack 中渲染：

```tsx
import { SmallDialog } from "@cloudtower/eagle";
import { usePushModal } from "@cloudtower/eagle";

const pushModal = usePushModal();
pushModal({
  component: () => (
    <SmallDialog
      title="确认操作"
      onOk={(popModal) => {
        doSomething();
        popModal(); // 手动关闭弹窗
      }}
    >
      确定要执行此操作吗？
    </SmallDialog>
  ),
  props: {},
});
```

### onOk 签名差异

**SmallDialog / MediumDialog：**

```tsx
// onOk 接收 popModal 函数，由开发者决定何时关闭
onOk={(popModal) => {
  doSomething();
  popModal();
}}
// 不传 onOk 时，点击确认自动关闭
// 不传 onCancel 时，点击取消自动关闭
```

**ImmersiveDialog / WizardDialog：**

```tsx
// onOk 接收 MouseEvent，需要通过 usePopModal() 手动关闭
// 必须将弹窗内容抽取为独立组件以使用 hook
function MyDialog() {
  const popModal = usePopModal();
  return (
    <ImmersiveDialog
      title="编辑"
      onOk={(e) => {
        doSomething().then(() => popModal());
      }}
    >
      内容
    </ImmersiveDialog>
  );
}

// 打开方式
pushModal({
  component: () => <MyDialog />,
  props: {},
});
```

### 常见错误

1. `onOk={() => {}}` 给 SmallDialog 但不调用 `popModal` → 弹窗无法关闭
2. 在 ImmersiveDialog 中期望 `onOk` 参数包含 `popModal` → 应使用 `usePopModal()` hook
3. 使用 `pushModal(<Component />)` → 应使用 `pushModal({ component: () => (<Component />), props: {} })`
4. 从子路径导入 `@cloudtower/eagle/dist/esm/...` → 应从 `@cloudtower/eagle` 主入口导入

## 表单模式

> 待补充：Form + FormItem 基本用法、校验、表单弹窗配合

## 表格模式

> 待补充：Table 基本用法、排序/筛选/分页、TableForm 行内编辑

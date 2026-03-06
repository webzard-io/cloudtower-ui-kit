---
name: cloudtower-eagle
description: >
  Use when using @cloudtower/eagle components in a project,
  selecting UI components for a feature, or migrating deprecated
  components/APIs. Triggers on imports from @cloudtower/eagle,
  mentions of CloudTower UI, ui-kit, or eagle component library.
---

# CloudTower Eagle 组件库

基于 Ant Design 的 React 组件库，100+ 组件。

## 导入

```tsx
import { Button, Table, SmallDialog } from "@cloudtower/eagle";
import "@cloudtower/eagle/dist/style.css";
```

应用根节点需包裹 `UIKitProvider`。

## 关键规则

1. 所有组件从 `@cloudtower/eagle` 导入，不要从子路径导入
2. 弹窗通过 `usePushModal()` 打开（不要用已废弃的 `pushModal()` 函数）
3. SmallDialog/MediumDialog 的 `onOk` 签名是 `(popModal) => void`；ImmersiveDialog/WizardDialog 是 `(e) => void` + `usePopModal()`
4. 使用 `useParrotTranslation` 做 i18n（不要直接用 react-i18next 的 `useTranslation`）
5. 新代码禁止使用废弃组件/API

## 查阅详细文档

- 组件索引：`node_modules/@cloudtower/eagle/docs/llms.txt`
- 组件详细文档：`node_modules/@cloudtower/eagle/docs/<layer>/<组件名>/guide.md`（layer 为 core 或 coreX）
- 废弃组件迁移：`node_modules/@cloudtower/eagle/docs/<layer>/<组件名>/migrate-guide.md`

如果组件没有 `guide.md`，按以下方式获取信息：

1. `llms.txt` 确认组件定位
2. 读 TypeScript 类型定义：`node_modules/@cloudtower/eagle/dist/src/<layer>/<组件名>/<component>.type.d.ts`

如果 node_modules 路径不存在（pnpm/Yarn PnP）：
```bash
find . -path "*/@cloudtower/eagle/docs/llms.txt" 2>/dev/null
```

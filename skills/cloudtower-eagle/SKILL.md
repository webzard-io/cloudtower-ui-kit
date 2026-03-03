---
name: cloudtower-eagle
description: >
  Use when using @cloudtower/eagle components in a project,
  selecting UI components for a feature, or migrating deprecated
  components/APIs. Triggers on imports from @cloudtower/eagle,
  mentions of CloudTower UI, or eagle component library.
---

# CloudTower Eagle 组件库

基于 Ant Design 的 React 组件库，100+ 组件。

## 导入

```tsx
import { Button, Table, SmallDialog } from "@cloudtower/eagle";
import "@cloudtower/eagle/dist/style.css";
```

应用根节点需包裹 `UIKitProvider`。

## 组件选型

| 需求 | 推荐组件 |
|------|----------|
| 按钮/操作 | Button, ButtonGroup |
| 文本输入 | Input, InputNumber, InputInteger, TextArea |
| 选择器 | Select, Cascader, Checkbox, Radio, Switch |
| 表单 | Form + FormItem（封装 antd Form） |
| 表格 | Table（封装 antd Table，支持排序/筛选/分页） |
| 行内编辑表格 | TableForm |
| 简单确认/提示弹窗 | SmallDialog（492px） |
| 删除确认弹窗 | DeleteDialog（自带 danger 按钮） |
| 操作被拒绝/不可执行 | RejectDialog（四种模式） |
| 表单/内容弹窗 | MediumDialog（720px） |
| 全屏操作弹窗 | ImmersiveDialog |
| 多步骤向导弹窗 | WizardDialog |
| 全局轻提示 | message |
| 警告提示条 | Alert, Banner |
| 标签页 | Tab |
| 面包屑/步骤条 | Breadcrumb, Steps |
| 分页 | Pagination, SimplePagination |
| 状态标签 | Tag, StatusCapsule, Token |
| 文本溢出提示 | Truncate, OverflowTooltip |
| 空状态 | Empty, BlankState |
| 数据格式化 | Byte, Percent, Time, Duration 等 |
| 图表 | DonutChart, LineChart, BarChart |

完整组件列表见 `node_modules/@cloudtower/eagle/docs/llms.txt`。

## 废弃清单

| 废弃项 | 替代方案 |
|--------|----------|
| LegacyModal | SmallDialog / MediumDialog / ImmersiveDialog / WizardDialog |
| LegacySelect | Select |
| DeprecatedProgress | Progress |
| DeprecatedDonutChart | DonutChart |
| pushModal() / popModal() / closeModal() | usePushModal() / usePopModal() / useCloseModal() |
| useUIKit() | 直接 import 各组件 |
| Table.initLoading | Table.loading |
| Tooltip.followMouse | 移除 |
| Timeline.detailMessage | Timeline.detailMessages |
| TableForm.deleteConfig 等 | TableForm.row 配置 |

迁移指南见 `references/migration-guide.md`。

## 关键规则

1. 所有组件从 `@cloudtower/eagle` 导入，不要从子路径导入
2. 弹窗通过 `usePushModal()` 打开（不要用已废弃的 `pushModal()` 函数）
3. SmallDialog/MediumDialog 的 `onOk` 签名是 `(popModal) => void`；ImmersiveDialog/WizardDialog 是 `(e) => void` + `usePopModal()`
4. 使用 `useParrotTranslation` 做 i18n（不要直接用 react-i18next 的 `useTranslation`）
5. 新代码禁止使用废弃组件/API

## 查阅详细文档

- 使用模式和代码示例：`references/usage-patterns.md`
- 迁移指南：`references/migration-guide.md`
- 组件索引：`node_modules/@cloudtower/eagle/docs/llms.txt`
- 组件详细文档：`node_modules/@cloudtower/eagle/docs/components/<组件名>.md`

如果 node_modules 路径不存在（pnpm/Yarn PnP）：
```bash
find . -path "*/@cloudtower/eagle/docs/llms.txt" 2>/dev/null
```

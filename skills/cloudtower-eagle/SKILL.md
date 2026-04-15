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

## Figma Token 查找顺序

当任务来自 Figma 设计稿，或者你需要把 Figma 的字体、颜色 token 映射到 Eagle 代码时，按下面的顺序查，不要先猜名字。

### 先读 Figma MCP 返回什么

拿到 `get_design_context` 结果后，不要猜 token 名，按这个顺序获取信息：

1. 看生成代码里的 `var(--...)`
2. 这里通常能直接拿到颜色 token，例如 `var(--fill/notice/light, ...)`、`var(--text/colorful/outstanding, ...)`
3. 接着看 `These styles are contained in the design:`
4. 这里通常能直接拿到字体 token，例如 `Label/label4-regular-sc`
5. 如果两边都有信息，优先以生成代码里实际出现的 token 为准
6. 不要假设文字一定使用 `text/...` token；某些设计系统组件会直接使用 `fill/...` token 作为文字颜色

### 字体

1. 先从 Figma design context 里提取 typography token 名。
2. 优先查 `FIGMA_TO_TYPO`，找到后直接使用对应的 `Typo.*`。
3. 如果 Figma 名和 Eagle 导出名不完全一致，再按字号、行高、字重、是否 uppercase 归一化，选择最接近的 `Typo.*`。
4. 不要只靠名称猜测，必要时再看编译后的 `dist/components.css` 确认实际字体样式。

### 颜色

1. 先判断目标文件上下文，再决定输出格式。
2. 如果当前文件已经有 `$...` 写法、依赖全局 Sass 变量、或者外部项目通过 `@cloudtower/eagle/dist/variables.scss` 注入样式变量，优先使用 Sass 变量。
3. 这里要把 `dist/variables.scss` 当作外部项目真实消费的 Sass 变量接口；它是旧 `variables.scss` 与最新 `token/color.scss` 的并集，不要把源码 `src/**/variables.scss` 当作唯一外部事实。
4. 如果当前文件是 TS/Linaria、已经在用 `Color`、或者并不依赖全局 Sass 变量，优先使用 `Color.*`。
5. `dist/token.css` 只用来校验 Figma token 名和 CSS 变量形式，不作为首选输出格式。
6. 不要先猜旧变量名，先按 Figma token 名去查现有导出与 `dist` 产物。

**示例 1：Sass 上下文**

输入：Figma `Form / Tip` 组件，目标文件里已经有 `$text-light-secondary` 这类写法  
输出：
- 颜色优先使用 `$fill-serious-light`、`$text-colorful-serious`、`$text-colorful-outstanding`
- 字体优先使用 `Typo.Label.l4_regular`

**示例 2：TS/Linaria 上下文**

输入：Figma `Form / Tip` 组件，目标文件已经在用 `Color.*`  
输出：
- 颜色优先使用 `Color.fill.serious.light`、`Color.text.colorful.serious`、`Color.text.colorful.outstanding`
- 字体仍然优先使用 `Typo.Label.l4_regular`

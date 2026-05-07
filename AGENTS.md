# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

CloudTower UI Kit — 基于 Ant Design 的企业级 React 组件库，采用 Yarn Workspaces + Lerna + Turbo 的 monorepo 架构。

## Monorepo 结构

- **packages/eagle** — 核心组件库（100+ 基础组件 + 30+ 复合组件），React 17 + TypeScript 5 + antd 4/5 + Linaria + Rollup
- **packages/parrot** — i18n 模块，基于 i18next，支持 zh-CN / en-US
- **packages/icons** — SVG 图标源文件（从 Figma 同步），私有包
- **packages/icons-react** — 由 SVG 自动生成的 React 图标组件，SVGR + Rollup

## 常用命令

```bash
# 安装依赖
yarn

# 构建所有包（turbo 编排，含 prebuild → build → typings）
yarn build

# 启动 Storybook 开发（端口 6006）
cd packages/eagle && yarn storybook

# 运行所有测试（vitest）
yarn test:ci

# 运行 eagle 包测试（支持 watch 模式）
cd packages/eagle && yarn test

# 运行单个测试文件
cd packages/eagle && yarn test -- src/core/Button/__test__/Button.test.tsx

# TypeScript 类型检查（生成声明文件）
cd packages/eagle && yarn typings

# Lint（ESLint + auto-fix）
yarn lint

# 格式化（Prettier）
yarn format

# 构建图标（先构建 SVG，再生成 React 组件）
cd packages/icons-react && yarn prebuild && yarn build

# Bundle 大小检查
yarn bundlewatch
```

## 架构要点

### 组件分层

- **`src/core/`** — 基础 UI 组件（Button, Table, Form, Select, Modal 等），大多封装 antd4
- **`src/coreX/`** — 复合/业务组件（BarChart, BatchOperation, CronPlan, DateRangePicker 等）
- **`src/hooks/`** — 自定义 hooks（useParrotTranslation, useElementsSize, useCTErrorMsg 等）
- **`src/store/`** — Redux store（Modal 栈管理、Chart 状态）
- **`src/styles/`** — 设计 token 和样式系统
- **`src/UIKitProvider/`** — 顶层 Provider，管理 Kit 上下文、i18n、message

### Ant Design 双版本

- **antd 4.5.0** — 现有组件使用，修改旧组件时保持 antd4
- **antd5 (5.14.0)** — 新组件使用，需加 `prefixCls={${Antd5PrefixCls}-xxx}` 做样式隔离

### 样式系统

- **Linaria** (`@linaria/core` 的 `css`) — 零运行时 CSS-in-JS，样式变量名以 `Style` 结尾（如 `ContentStyle`）
- **SCSS** — 设计 token（颜色在 `src/styles/token/color.scss`），直接作为 SCSS 变量使用
- **字体排版** — 使用 `src/core/Typo/index.ts` 预定义的 Linaria 样式，用 `cx` 合并
- 不要使用 `styled`，不要使用未定义的变量

### i18n

- 使用 `useParrotTranslation` hook（从 `@src/hooks/useParrotTranslation` 导入）
- 翻译文件位于 `packages/parrot/src/locales/{zh-CN,en-US}/`，分 common.json, components.json, unit.json, metric.json
- 禁止直接从 react-i18next 导入 `Trans` 和 `useTranslation`（ESLint 会报错）

## 重要：始终使用 package.json 定义的 script

检查、构建、测试等操作必须通过项目根目录 `package.json` 中定义的 script 执行，不要直接调用 `npx prettier`、`npx eslint` 等命令：

```bash
yarn lint      # ESLint 检查 + auto-fix（不要用 npx eslint）
yarn format    # Prettier 格式化（不要用 npx prettier）
yarn test:ci   # 运行测试（不要用 npx vitest）
yarn build     # 构建（不要用 npx rollup）
```

子包的 script 同理，使用 `cd packages/eagle && yarn test` 而非直接调用 `npx vitest`。

## 编码规范

### 文件组织

```
ComponentName/
  ├── index.tsx           # 组件实现
  ├── component.type.ts   # 类型定义（Props 命名：ComponentNameProps）
  ├── component.style.ts  # 样式（可选）
  └── __test__/
      └── component.test.tsx
```

### 关键规则

- 每个 tsx 文件必须 `import React from "react"`
- 始终使用命名导出 `export const`，不使用 `export default`（Story 的 meta 除外）
- 使用双引号（ESLint `quotes` 规则）
- Import 排序遵循 `eslint-plugin-simple-import-sort`
- 类型定义添加 JSDoc 注释
- 弹窗使用 `usePushModal` / `usePopModal`（从 `@src/core/KitStoreProvider` 导入）

### 测试

- 框架：Vitest + jsdom + @testing-library/react
- 配置：`packages/eagle/vitest.config.ts`
- 路径别名：`@src/*` → `./src/*`，`@cloudtower/parrot` 指向本地包

### Storybook

- Story 文件放在 `packages/eagle/stories/docs/{core,coreX,cascader}/`
- 每个 Story 需包含组件介绍、参数说明、多个场景用例
- Story meta 的 title 格式：`"Core/ComponentName | 中文描述"`

## 构建输出

eagle 包通过 Rollup 构建，输出：

- `dist/cjs/` 和 `dist/esm/` — JS 模块
- `dist/style.css` — 完整样式（含字体）
- `dist/components.css` — 组件样式（不含字体）
- `dist/font.css` — 字体样式
- `dist/token.css` — CSS 变量 token
- `dist/src/` — 类型声明文件

## Git 提交规范

### 何时 fixup vs 新建 commit

- **Fixup 合入旧 commit**：PR 内已有 commit 引入的内容需要修复/调整时（bug 修复、类型错误、措辞调整、review 反馈），一律 fixup 到引入该内容的 commit
- **新建 commit**：PR 新增独立工作项时（新 task、新 feature、改动不属于 PR 内任何已有 commit 的范围）
- 原则：PR 内的修修补补全部 fixup，只有全新的工作项才新建 commit，保持每个 commit 是完整的逻辑单元

### Fixup 操作方法

- 使用 `git commit --no-verify -m "fixup! <target-commit-hash>"` 创建 fixup commit，然后用 `GIT_SEQUENCE_EDITOR=true git rebase -i --autosquash --no-verify <base>^` 将其合入目标 commit
- 不同文件的改动如果属于不同的 commit，必须分别创建 fixup commit 指向各自的目标 commit，不要混在一起
- `--autosquash` 必须配合 `-i` 使用，否则不会生效

## 发版流程

通过 GitHub Actions 自动化：Create Release PR workflow 触发 → Lerna 升版 → 合入 PR → 自动发布到 npm。支持 patch 和 minor 版本。版本号跟随 CloudTower 产品版本。

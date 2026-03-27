---
name: cloudtower-eagle-dev
description: >
  Use when working on @cloudtower/eagle component library:
  enhancing component documentation for agent-friendliness,
  adding new components, updating docs after Props changes,
  deprecating components, auditing doc freshness,
  or adding data-testid support for e2e testing.
  Triggers when editing files under packages/eagle/src/.
---

# CloudTower Eagle 组件开发指南

## 场景

### 1. 组件 Agent 友好化 / 新增组件文档

当需要给已有或新增组件编写完整的 Agent 友好文档时：

**流程：** 增强 JSDoc → 补充 Storybook → 编写 Markdown → 更新索引

详细步骤见 `references/doc-workflow.md`，文档模板见 `references/doc-template.md`。

### 2. 新增/修改组件时添加 data-testid 支持

新增组件或修改已有组件时，必须确保 `data-testid` 能正确透传到 e2e 工具实际交互的 DOM 元素上。
不同类型的组件需要不同的处理方式（共四层策略）。

详细策略和代码示例见 `references/add-testid.md`。

**关键原则：**

- 仅做透传，不自动生成 testid 值
- antd 会在原生元素外包裹额外 DOM 层，需要特别处理
- 改动后编写测试验证 testid 到达了正确的目标元素

### 3. Props 变更后同步文档

当修改了组件的 Props 类型定义后：

1. 更新对应 type.ts 中的 JSDoc（属性描述、默认值、新增/移除的标注）
2. 如果 Storybook 中没有覆盖新 Props 的场景，补充 Story
3. 运行 `yarn typings` 确认类型无误

### 4. 废弃组件

详细步骤见 `references/deprecation-workflow.md`。

### 5. 检查文档是否过时

对比组件的 type.ts 与其 Markdown 文档，检查是否存在：

- type.ts 中有但 Markdown Props 表缺失的属性
- type.ts 中已删除但 Markdown 仍列出的属性
- JSDoc 中的 `@default` 与 Markdown 描述不一致
- 废弃标记不同步（type.ts 标了 `@deprecated` 但文档未说明）

列出差异清单，由开发者确认后再修改。

## 共用规则

1. **始终用 package.json 定义的 script**：`yarn lint`, `yarn format`, `yarn typings`, `yarn test:ci`, `yarn build-storybook`
2. 代码示例统一从 `@cloudtower/eagle` 主入口导入
3. 弹窗打开方式：`pushModal({ component: () => (<Component />), props: {} })`
4. 文档和注释用中文编写
5. 不要使用 emoji

## 产出物检查清单

每次文档改动完成后，确认：

- [ ] `yarn typings` 通过
- [ ] `yarn test:ci` 通过
- [ ] `yarn format` 和 `yarn lint` 通过
- [ ] 新增/修改的文件已列入 git 暂存区

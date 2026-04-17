---
name: cloudtower-eagle-dev
description: >
  Use when working on @cloudtower/eagle component library:
  adding or modifying components, writing JSDoc/Storybook/Markdown docs,
  adding data-testid for e2e testing, deprecating components,
  updating Props types, or auditing doc freshness.
  Triggers when editing files under packages/eagle/src/,
  or when user mentions: 写文档, 加 story, 组件废弃, 加 data-testid,
  testid 透传, Props 变更, 文档过时, agent 友好化, 写 JSDoc,
  补充 Storybook, add component, write docs, deprecate.
---

# CloudTower Eagle 组件开发指南

## 场景

### 1. 组件 Agent 友好化 / 新增组件文档

当需要给已有或新增组件编写完整的 Agent 友好文档时：

**流程：** 增强 JSDoc → 补充 Storybook → 编写 Markdown → 更新索引

详细步骤见 `references/doc-workflow.md`，文档模板见 `references/doc-template.md`。

### 2. 新增/修改组件时添加 data-testid 支持

新增组件或修改已有组件时，必须确保 `data-testid` 能正确透传到 e2e 工具实际交互的 DOM 元素上。
不同类型的组件需要不同的处理方式（共四层策略 + 多个补充策略）。

详细策略和代码示例见 `references/add-testid.md`（文件较长，开头有目录可快速定位）。

**速查决策树：**

1. 组件是 Radio / Checkbox 等隐藏 input + label 点击的控件？→ **第一层补充（marker ref 到 label）**
2. 组件是基础 Input 封装（antd 有 affix-wrapper）？→ **第一层补充（ref 回调到原生 input）**
3. 组件渲染单一根元素且根元素就是交互目标？→ **第一层（显式透传）**
4. 组件有 `input` prop 对象（react-final-form Fields）？→ **第二层（注入 input 对象）**
5. 组件渲染可点击选项列表（菜单、标签页、分段控制器）？→ **第三层（选项级 testid）**
6. 根组件下有多个独立操作目标（button、dropdown 等）？→ **第四层（前缀 + 子元素后缀）**

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

### 6. Typography 和 Color 的维护规则

当修改或新增 Typography、Color 相关内容时，按下面的规则处理。

**Color**

1. `src/styles/token/color.ts` 和 `src/styles/token/color.scss` 是当前和 Figma 对齐的颜色定义。
2. `src/styles/common/variables.scss` 主要用来兼容旧的 Sass 变量名，不建议继续把新颜色优先加在这里。
3. 外部项目真正会用到的是 `dist/variables.scss`，所以旧的 Sass 变量名不能轻易删除或改名。
4. 如果任务是“同步 / 对齐 / 更新 Color”，先运行 `yarn check:color`。
5. 如果 `check:color` 报告有漂移，再运行 `yarn sync:color`，然后查看 diff，再决定是否继续。
6. 不要在没有先跑 `check:color` 的情况下手写 Color token 对齐改动。
7. 从 Figma 读取颜色时，先看 `get_design_context` 结果里的 `var(--...)`，不要先猜旧变量名。

**Typography**

1. `Typo` 是对外公开的用法，现有 key 不要直接删除，也不要随意改名。
2. 如果任务是“同步 / 对齐 / 更新 Typography”，先运行 `yarn check:typography`。
3. 如果 `check:typography` 报告有漂移，再运行 `yarn sync:typography`，然后查看 diff，再决定是否继续。
4. 不要在没有先跑 `check:typography` 的情况下手写 Typography 对齐改动。
5. Typography 同步遵循这条规则：
   - 上游新增 key：本地新增
   - 上游同 key 改值：本地同步改值
   - 上游删除 key：本地不删除，只在报告里提示
6. 从 Figma 读取字体时，先看 design context 里的字体 token，再查 `FIGMA_TO_TYPO`。
7. 如果 Figma 名字和代码名字不完全一样，再按字号、行高、字重、是否大写来判断，不要只靠名字猜。

**文档**

1. 不要在多个地方各写一份完整映射表，避免以后不同步。
2. 如果这次改动会影响 agent 查找 Typography 或 Color 的方式，再同步更新：
   - `packages/eagle/docs/llms.txt`
   - `skills/cloudtower-eagle/SKILL.md`

## 共用规则

1. **始终用 package.json 定义的 script**：`yarn lint`, `yarn format`, `yarn typings`, `yarn test:ci`, `yarn build-storybook`
2. 代码示例统一从 `@cloudtower/eagle` 主入口导入
3. 弹窗打开方式：`pushModal({ component: () => (<Component />), props: {} })`
4. 文档和注释用中文编写
5. 不要使用 emoji
6. **组件改动需同步测试**：新增组件、修改 Props 行为、添加 data-testid 时，编写或更新对应的单元测试（`src/<layer>/<Component>/__test__/`），验证新行为符合预期

## 产出物检查清单

每次改动完成后，确认：

- [ ] `yarn typings` 通过
- [ ] `yarn test:ci` 通过
- [ ] `yarn format` 和 `yarn lint` 通过
- [ ] 新增/修改的文件已列入 git 暂存区

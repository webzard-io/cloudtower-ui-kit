# 组件文档编写流程

适用于：组件 Agent 友好化、新增组件文档。

## Step 1: 增强 JSDoc

修改文件：`packages/eagle/src/core/<Component>/<component>.type.ts`（coreX 组件对应 `src/coreX/<Component>/`）

**接口级别：**

- `@description`：一两句话说明用途和定位
- `@example`（2-3 个）：完整可运行的代码片段，含 import
- `@see`：相关组件（功能相近或常配合使用的）

**属性级别：**

- 说明用途
- 列出枚举值的含义（不要只写 `string`）
- 标注 `@default`（从源码实现中确认真实默认值）

**注意事项：**

- 先阅读组件实现代码，确认每个 prop 的真实行为和默认值
- 如果组件继承其他组件的 Props，只注释自有属性
- 每个 tsx 文件必须有 `import React from "react"`
- **上层封装引导**：如果某个场景有更专用的封装组件，`@description` 和 `@see` 中不要将该场景列为本组件的推荐用途，而应引导到专用组件。例如 ImmersiveDialog 不应推荐用于"多步骤向导"（应引导到 WizardDialog），SmallDialog 不应推荐用于"删除确认"（应引导到 DeleteDialog）

## Step 2: 审查并补充 Storybook

文件位置：`packages/eagle/stories/docs/core/<Component>.stories.tsx`（coreX 组件对应 `stories/docs/coreX/`）

- 确保每个 Story 有 `storyName`（中文名称）
- 确保 meta 有 `parameters.docs.description.component`（组件功能描述）
- 补充缺失的典型场景（基础用法、各 Props 变体、组合使用）
- **不要创建与其他组件功能重叠的 Story**（如在 A 组件里实现 B 组件的效果）
- **组件描述避免推荐有专用封装的场景**：meta 描述和 Story 注释中，如果某场景有更专用的组件，应明确引导而非暗示本组件可用（如 ImmersiveDialog 描述不应包含"向导流程"，应写"向导请使用 WizardDialog"）
- Story 中的代码示例使用 CloudTower 业务域变量名（虚拟机、集群、主机等）

## Step 3: 编写 Markdown 文档

输出到：`packages/eagle/docs/<layer>/<ComponentName>/guide.md`（layer 与 src 层级一致：core 或 coreX）

按 `references/doc-template.md` 模板编写。内容从 Step 1 的 JSDoc 和 Step 2 的 Storybook 中提取，确保一致性。

**关键要求：**

- 代码示例可直接复制使用（含完整 import）
- "何时使用"要包含反面场景（"不要用于 X，请用 Y"）
- "废弃说明"章节仅在组件已废弃或包含废弃属性时才添加；非废弃组件不要包含此章节
- 不要在 guide.md 中重复 Props 表——Props 信息由 type.ts 的 JSDoc 承载

## Step 4: 更新索引

编辑 `packages/eagle/docs/llms.txt`：

- 如果是新组件，在对应分类下添加条目
- 如果有详细 Markdown 文档，使用链接格式：`[ComponentName](<layer>/ComponentName/guide.md): 一句话描述`
- 如果没有详细文档，使用纯文本：`- ComponentName: 一句话描述`

## Step 5: 按需更新消费侧 Skill

检查 `skills/cloudtower-eagle/SKILL.md`，确认关键规则和文档路径指引是否需要更新。

## Step 6: 验证

运行以下检查，全部通过后才可提交：

```bash
cd packages/eagle && yarn typings
yarn test:ci
yarn format
yarn lint
```

# 废弃组件流程

当需要将一个组件标记为废弃时，按以下步骤操作。

## Step 1: 标记 @deprecated

在组件的类型定义文件中，为接口添加 `@deprecated` JSDoc：

```typescript
/**
 * @deprecated 请迁移至 <替代组件>。迁移指南见 docs/migration.md
 */
export type XxxProps = { ... };
```

在组件实现文件中同样添加 `@deprecated`。

## Step 2: 更新迁移指南

编辑 `packages/eagle/docs/migration.md`：

1. 在"废弃清单速查"表中添加条目
2. 如果替代方案简单（直接替换），在条目说明中写清楚
3. 如果替代方案复杂（API 差异大），编写详细迁移指南章节，包含：
   - Props 映射对照表
   - 回调签名变化
   - 迁移前后代码对比
   - 迁移步骤清单

## Step 3: 更新索引

编辑 `packages/eagle/docs/llms.txt`：

- 将组件从原分类移到"废弃组件"分类
- 使用删除线格式：`- ~~ComponentName~~: 已废弃，请迁移至 <替代组件>`

## Step 4: 更新消费侧 Skill

编辑 `skills/cloudtower-eagle/SKILL.md`：

- 在废弃清单表中添加条目

同步 `skills/cloudtower-eagle/references/migration-guide.md`：

- 复制 `packages/eagle/docs/migration.md` 的内容

## Step 5: 验证

确认以下位置都已同步更新：

- [ ] 类型定义：`@deprecated` JSDoc
- [ ] `docs/migration.md`：废弃清单 + 详细指南（如需要）
- [ ] `docs/llms.txt`：移到废弃分类
- [ ] `skills/cloudtower-eagle/SKILL.md`：废弃清单
- [ ] `skills/cloudtower-eagle/references/migration-guide.md`：与 migration.md 同步

运行验证：

```bash
cd packages/eagle && yarn typings
yarn test:ci
yarn format
yarn lint
```

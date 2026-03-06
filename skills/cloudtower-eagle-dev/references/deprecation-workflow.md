# 废弃组件流程

当需要将一个组件标记为废弃时，按以下步骤操作。

## Step 1: 标记 @deprecated

在组件的类型定义文件中，为接口添加 `@deprecated` JSDoc：

```typescript
/**
 * @deprecated 请迁移至 <替代组件>。迁移指南见 docs/<layer>/<ComponentName>/migrate-guide.md
 */
export type XxxProps = { ... };
```

在组件实现文件中同样添加 `@deprecated`。

## Step 2: 编写迁移指南

在 `packages/eagle/docs/<layer>/<ComponentName>/` 目录下创建 `migrate-guide.md`（layer 为 core 或 coreX）。

如果替代方案简单（直接替换），迁移指南可以很短。如果 API 差异大，需包含：
- Props 映射对照表
- 回调签名变化
- 迁移前后代码对比
- 迁移步骤清单

## Step 3: 更新索引

编辑 `packages/eagle/docs/llms.txt`：

- 将组件从原分类移到"废弃组件"分类
- 使用链接+删除线格式：`- [~~ComponentName~~](<layer>/ComponentName/migrate-guide.md): 已废弃，请迁移至 <替代组件>`

## 验证

运行以下检查，全部通过后才可提交：

```bash
cd packages/eagle && yarn typings
yarn test:ci
yarn format
yarn lint
```

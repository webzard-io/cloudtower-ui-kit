## 贡献代码

> 使用 kit specify 或者 smartx kit 时。请使用`别名`导入。esbuild 在构建时，会将相对路径下的代码打包，会造成 kitContext 不唯一的情况。

```js
import { kitContext } from "@cloudtower/eagle/kit/specify";
```

### 组件放在哪里？

组件可以放置在

- `src/components`

  业务组件，需要使用 `codegen组件` 的组件

- `src/kit/smartx/components`

  非业务紧密无关，如 子网掩码填写组件。

  smartx kit 增强组件

### 迁移 tower 中组件

从 tower 中迁移组件需要考虑的是，当前组件需要放置在什么位置。

如果不确定的话，建议放在 `src/components` 下。

### 新增组件

### 组件调试

### 使用

@cloudtower/eagle 的导出可参考 package.json 的 exports 字段。

当前分为四类导出

- @cloudtower/eagle/kit/specify

  kit 接口定义，包含 kitContext 与 mockImpl

- @cloudtower/eagle/kit/smartx

  kit 实现，包含 kit 的 antd 实现，与 smartx 功能组件（非业务紧耦合）。

- @cloudtower/eagle/generated/xxx

  generated 是 graphql codegen 生成代码，包含 类型，组件。与业务耦合度高。

- @cloudtower/eagle

  根导出直接导出 `src/components` 组件，便于使用。

## 待修复

`generated/form2.tsx` 类型过大，生成产生问题

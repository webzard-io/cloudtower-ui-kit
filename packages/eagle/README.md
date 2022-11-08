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

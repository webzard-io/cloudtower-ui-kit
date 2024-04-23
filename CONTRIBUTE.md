## 快速开始

- 安装依赖

  项目根目录，执行

  ```
  yarn
  ```

- 启动 Storybook
  ```
  cd packages/eagle && yarn storybook
  ```

## 如何贡献代码

### 如何新增 icon

- 将需要新增的 svg 图片放到 pacakge/icons/src 下。
- 提交 pr 前可以切换到 packages/icons-react 执行 `yarn build`，执行成功，即表示 SVG 构建成功。然后切换至 packages/ealge 执行 `yarn storybook` 可以在 react-icons 下看到对应的 icon 效果。
- 提交名称注意名称合法性，目前是会将 `x-y-z` 转换为 `XZY` 格式的组件。注意名称中不要以数字开头和带上 `-` 之外的标点符号。
- 目前 icon 只支持 SVG 格式，非 SVG 格式的 icon 目前需要在自己的 repo 中通过 `require('demo.png')` 的方式进行使用

### 新增组件

请阅读 [公共组件指南](https://docs.google.com/document/d/1RbsiPYzOi7JJ-quMrgGpIX61hn31xxNws0hrgrBl094/edit#heading=h.wfhi0u4x2tzo), 明确一下相关组件的划分位置。

#### 新增 antd5 组件

从 Cascader(级联组件) 开始，为了满足一些新组件的实现，eagle 加入了 antd5 组件库，需要基于 antd5 组件进行开发的情况下，或者 export 一个 antd5 组件的话，需要注意，加上 `prefixCls={${Antd5PrefixCls}-xxx}` 的 props， 来做好样式隔离，以防与 antd4.5 样式定义产生冲突。

详见： https://ant.design/docs/react/migration-v5-cn#%E9%80%9A%E8%BF%87%E5%88%AB%E5%90%8D%E5%AE%89%E8%A3%85-v5

### 补充组件的 storybook

TBD

目前可参考 SegmentControl / Cascader 等实现。 建议请先阅读 storybook 官方文档， 参考好的例子实现。

### 新增相关 token 变量

可以参考 color 处理。增加相关 token 后，请提供相关的 storybook 示例

#### 新增 ts 变量

在 src/styles/token 文件夹下，新增相关的 ts 变量文件， 并且在 src/styles/index.ts 中进行 export

#### 新增 css 变量

在 src/styles/token 文件夹下， 新增相关 css 变量文件，并且在 src/styles/token.ts 中进行 export

#### 新增 scss 变量

在 src/styles/token 文件夹下。新增相关的 scss 变量文件，并且修改 rollup.config.js 文件， 查找到 color.scss 一行，按照 color 的处理，追加新增的 scss 变量内容。

## 建议的 VSCode 配置

**.vscode/extensions.json**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "EditorConfig.EditorConfig"
  ]
}
```

**.vscode/settings.json**

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true
}
```

## 关于 Husky

husky 被用于格式化代码和检查 eslint 错误。

在每次 commit 都会执行 `lint-staged`

然而，更推荐使用 vscode configuration，避免存在失效的情况。

如果正在使用 windows 可以参考这片文章 https://typicode.github.io/husky/#/?id=yarn-on-windows

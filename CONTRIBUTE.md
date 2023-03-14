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

## 包目录预览

```
└── packages
    ├── eagle
    │   ├── __test__
    │   ├── src
    │   │   ├── UIKitProvider
    │   │   ├── components
    │   │   │   ├── Alert
    │   │   │   ├── Arch
    │   │   │   ├── Badge
    │   │   │   ├── BaseIcon
    │   │   │   ├── Bit
    │   │   │   ├── BitPerSecond
    │   │   │   ├── Bps
    │   │   │   ├── Button
    │   │   │   ├── ButtonGroup
    │   │   │   ├── Byte
    │   │   │   ├── Checkbox
    │   │   │   │   └── __test__
    │   │   │   ├── Empty
    │   │   │   ├── ErrorBoundary
    │   │   │   ├── FailedLoad
    │   │   │   ├── Fields
    │   │   │   │   ├── FieldsBoolean
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsDateTime
    │   │   │   │   ├── FieldsDateTimeRange
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsEnum
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsFloat
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsInt
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsInteger
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsString
    │   │   │   │   │   └── __test__
    │   │   │   │   ├── FieldsTextArea
    │   │   │   │   └── FieldsTimePicker
    │   │   │   │       └── __test__
    │   │   │   ├── Frequency
    │   │   │   ├── Icon
    │   │   │   ├── Input
    │   │   │   │   └── __test__
    │   │   │   ├── InputGroup
    │   │   │   │   └── __test__
    │   │   │   ├── InputInteger
    │   │   │   │   └── __test__
    │   │   │   ├── InputNumber
    │   │   │   ├── InputTagItem
    │   │   │   ├── KitStoreProvider
    │   │   │   ├── Loading
    │   │   │   ├── Metric
    │   │   │   ├── Modal
    │   │   │   ├── ModalStack
    │   │   │   ├── Overflow
    │   │   │   ├── Pagination
    │   │   │   ├── Percent
    │   │   │   ├── Progress
    │   │   │   ├── Radio
    │   │   │   ├── SearchInput
    │   │   │   │   └── __test__
    │   │   │   ├── Second
    │   │   │   ├── Select
    │   │   │   ├── SimplePagination
    │   │   │   │   └── __test__
    │   │   │   ├── Space
    │   │   │   ├── Speed
    │   │   │   ├── Steps
    │   │   │   ├── Styled
    │   │   │   ├── Switch
    │   │   │   ├── Table
    │   │   │   │   └── __test__
    │   │   │   ├── TextArea
    │   │   │   ├── TimePicker
    │   │   │   ├── TimeZoneSelect
    │   │   │   ├── Tooltip
    │   │   │   ├── TowerTable
    │   │   │   ├── Truncate
    │   │   │   ├── Typo
    │   │   │   └── images
    │   │   ├── hooks
    │   │   ├── spec
    │   │   ├── store
    │   │   ├── stories
    │   │   ├── styles
    │   │   │   ├── common
    │   │   │   ├── component
    │   │   │   └── fonts
    │   │   └── utils
    │   │       └── __test__
    │   └── tools
    │       └── templates
    ├── icons
    │   ├── 16
    │   │   ├── filled
    │   │   └── outline
    │   ├── 24
    │   │   ├── filled
    │   │   └── outline
    │   ├── 32
    │   │   └── outline
    │   └── src
    │       ├── 16
    │       │   ├── filled
    │       │   └── outline
    │       ├── 24
    │       │   ├── filled
    │       │   └── outline
    │       └── 32
    │           └── outline
    ├── icons-react
    │   ├── 16
    │   │   ├── filled
    │   │   │   └── esm
    │   │   └── outline
    │   │       └── esm
    │   ├── 24
    │   │   ├── filled
    │   │   │   └── esm
    │   │   └── outline
    │   │       └── esm
    │   ├── 32
    │   │   └── outline
    │   │       └── esm
    │   └── scripts
    └── parrot
        ├── src
        │   └── locales
        │       ├── en-US
        │       └── zh-CN
        └── tools
            └── templates
```

- 生成树指令

  ```
  tree -d -I "node_modules|dist"
  ```

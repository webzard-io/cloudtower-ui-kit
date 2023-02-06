## Quick Start

- Install Deps

  At Root of Project, Run

  ```
  yarn
  ```

- Build Packages

  At Root of Project, Run

  ```
  yarn build
  ```

- Start Stroy

  At Story Folder, Run a Storybook

  ```
  yarn storybook
  ```

## Recommended VSCode Config

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

## Packages Introduction

generate tree list

```
tree -d -I "node_modules|dist"
```

```
├── packages
│   ├── eagle
│   │   ├── src
│   │   │   ├── components
|   |   |   |   ├── KitStoreProvider (Store Provider,Redux hooks)
│   │   │   │   ├── antd.tsx
│   │   │   │   └── ...
│   │   │   ├── hooks
│   │   │   ├── spec (kitContext defined)
│   │   │   ├── store
│   │   │   ├── styles
│   │   │   └── utils
│   │   ├── __test__
│   │   └── tools
│   │       └── templates
│   └── parrot
│       ├── src
│       │   └── locales
│       │       ├── en-US
│       │       └── zh-CN
│       └── tools
│           └── templates
└── story
```

## About Husky

husky is enabled for foramt code and check eslint error.

It will run `lint-staged` at pre-commit.

However, it is still strongly recommended to use vscode configuration, engineers should guarantee code quality.

If you are using Yarn + Windows. You can check this document https://typicode.github.io/husky/#/?id=yarn-on-windows

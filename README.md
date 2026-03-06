# CloudTower UI KIT

[storybook]: https://cloudtower-ui-kit.vercel.app
[next storybook]: https://next-cloudtower-ui-kit.vercel.app
[v3.x storybook]: https://v3xx-cloudtower-ui-kit.vercel.app
[贡献代码]: ./CONTRIBUTE.md

## [StoryBook]

main 分支 storybook [storyBook]

next 分支 storybook [next storybook]

v3.x 分支 storybook [v3.x storybook]

## 发版

进入到 [Create Release PR](https://github.com/webzard-io/cloudtower-ui-kit/actions/workflows/create-publish-pr.yml) 的 workflow 界面

详见 RELEASE.md

## 使用

```tsx
import { antdKit } from "@cloudtower/eagle";
import { initParrotI18n, UIKitProvider } from "@cloudtower/eagle";
// Set Up Style
import "@cloudtower/eagle/dist/style.css";

initParrotI18n();
// Set Up Providers
ReactDOM.render(
  <React.StrictMode>
    <UIKitProvider>
      <App />
    <UIKitProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
```

```tsx
import { Button } from "@cloudtower/eagle";
import React, { useContext } from "react";

const App = () => {
  return (
    <div>
      <Button
        onClick={() => {
          alert("hello");
        }}
      >
        say hello
      </Button>
    </div>
  );
};

export default App;
```

## AI / Agent 集成

组件库提供了机器可读的文档和 Agent Skill，方便 AI coding agent 理解和使用组件。

### Agent 友好文档

文档随 npm 包发布，安装后位于 `node_modules/@cloudtower/eagle/docs/`：

- `docs/llms.txt` -- 组件索引，按分类列出所有组件及一句话描述
- `docs/<layer>/<组件名>/guide.md` -- 组件详细文档（Props、用法示例、常见模式）
- `docs/<layer>/<组件名>/migrate-guide.md` -- 废弃组件迁移指南（在各废弃组件目录下）

### Agent Skills

Skill 遵循 [Agent Skills 开放标准](https://github.com/vercel-labs/skills)，兼容 Claude Code、Cursor、Copilot 等 40+ Agent 工具。

| Skill | 说明 |
|-------|------|
| `cloudtower-eagle` | 消费侧：帮助 Agent 在业务项目中正确使用组件（组件选型、废弃迁移、使用模式） |
| `cloudtower-eagle-dev` | 生产侧：帮助 Agent 参与组件库开发（编写文档、Props 变更同步、废弃组件流程） |

安装：

```bash
# 查看可用 skill
npx skills add webzard-io/cloudtower-ui-kit --list

# 安装消费侧 skill（在业务项目中）
npx skills add webzard-io/cloudtower-ui-kit --skill cloudtower-eagle

# 安装生产侧 skill（组件库开发时）
npx skills add webzard-io/cloudtower-ui-kit --skill cloudtower-eagle-dev
```

## 如何 [贡献代码]

- 快速开始
  ```
  yarn && cd packages/eagle && yarn storybook
  ```

详细参考 [贡献代码]

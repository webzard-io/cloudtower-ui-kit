# CloudTower UI KIT

[storybook]: https://cloudtower-ui-kit.vercel.app
[next storybook]: https://next-cloudtower-ui-kit.vercel.app
[v3.x storybook]: https://v3xx-cloudtower-ui-kit.vercel.app
[贡献代码]: ./CONTRIBUTE.md

## [StoryBook]

main 分支 storybook [storyBook]

next 分支 storybook [next storybook]

v3.x 分支 storybook [v3.x storybook]

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

## 如何 [贡献代码]

- 快速开始
  ```
  yarn && cd packages/eagle && yarn storybook
  ```

详细参考 [贡献代码]

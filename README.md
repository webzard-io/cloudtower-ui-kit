# CloudTower UI KIT

[storybook]: https://cloudtower-ui-kit.vercel.app
[v4.0 storybook]: https://v400-cloudtower-ui-kit.vercel.app
[贡献代码]: ./CONTRIBUTE.md

## [StoryBook]

main 分支 storybook [storyBook]

v4.0 分支 storybook [v4.0 storybook]

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
    <KitStoreProvider>
      <UIKitProvider>
        <App />
      <UIKitProvider>
    </KitStoreProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
```

```tsx
import { useUIKit } from "@cloudtower/eagle";
import React, { useContext } from "react";

const App = () => {
  // Use Component
  const kit = useUIKit();
  return (
    <div>
      <kit.button
        onClick={() => {
          alert("hello");
        }}
      >
        say hello
      </kit.button>
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

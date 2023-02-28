# CloudTower UI KIT

The Source Code is Maintained on [github](https://github.com/webzard-io/cloud-tower-ui-kit)

[storybook]: https://cloudtower-ui-kit.vercel.app

## [StoryBook]

## Usage

```tsx
import { antdKit } from "@cloudtower/eagle";
import { KitStoreProvider, kitContext } from "@cloudtower/eagle";
import { initParrotI18n } from "@cloudtower/eagle";
// Set Up Style
import "@cloudtower/eagle/dist/style.css";

initParrotI18n();
// Set Up Providers
ReactDOM.render(
  <React.StrictMode>
    <KitStoreProvider>
      <kitContext.Provider value={antdKit}>
        <App />
      </kitContext.Provider>
    </KitStoreProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
```

```tsx
import { kitContext } from "@cloudtower/eagle";
import React, { useContext } from "react";

const App = () => {
  // Use Component
  const kit = useContext(kitContext);
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

## Stories

[Stories](http://192.168.28.80:8080/) is built by storybook

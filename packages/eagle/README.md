## Usage

```tsx
import { antdKit } from "@cloudtower/eagle";
import { KitStoreProvider, kitContext } from "@cloudtower/eagle";
import { initParrotI18n } from "@cloudtower/eagle";

import "@cloudtower/eagle/dist/style.css";

initParrotI18n();

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

## Debug

## Contribute

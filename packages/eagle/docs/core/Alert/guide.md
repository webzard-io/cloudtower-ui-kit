# Alert

## 简介

提示框组件，基于 antd Alert 封装。用于页面内的警告或提示信息展示，支持 info / error / warning / success / normal 五种类型。扩展了 action 操作区和展开/收起功能。

## 何时使用

- 表单或页面中展示操作提示、警告、错误信息
- 内容较长需要折叠展示时，使用 expandConfig 模式
- 需要在提示信息旁边放置操作按钮（如跳转链接）

不要使用：

- 全局横幅通知 --> 请用 `Banner`
- 自动消失的轻提示 --> 请用 `message`
- 需要用户确认的模态提示 --> 请用 `SmallDialog`

## 基础用法

```tsx
import React from "react";
import Alert from "@cloudtower/eagle/Alert";

const App = () => <Alert type="info" message="集群升级已完成。" />;
```

## 常见模式

### 模式一：带操作按钮

适用于提示信息旁需要放置操作入口的场景，如跳转到详情页。

```tsx
import React from "react";
import Alert from "@cloudtower/eagle/Alert";

const App = () => (
  <Alert
    type="warning"
    message="主机 node-1 存在未处理的告警。"
    action={<a>查看详情</a>}
  />
);
```

### 模式二：展开/收起（非受控）

适用于提示内容较长、需要折叠展示的场景。收起时仅显示 message，展开后在 message 下方内联显示 description。

```tsx
import React from "react";
import Alert from "@cloudtower/eagle/Alert";

const App = () => (
  <Alert
    type="info"
    message="以下系统服务的版本不适配多管理 IP 模式："
    description={
      <ul>
        <li>可观测性服务 service-A，需升级至 1.4.5 及以上版本</li>
        <li>CloudTower 代理 agent-A，需升级至 1.3.7 及以上版本</li>
      </ul>
    }
    expandConfig={{}}
  />
);
```

设置默认展开：`expandConfig={{ defaultExpanded: true }}`。

### 模式三：展开/收起（受控）

适用于需要从外部控制展开状态的场景。

```tsx
import React, { useState } from "react";
import Alert from "@cloudtower/eagle/Alert";

const App = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Alert
      type="info"
      message="以下系统服务的版本不适配多管理 IP 模式："
      description={
        <ul>
          <li>可观测性服务 service-A，需升级至 1.4.5 及以上版本</li>
        </ul>
      }
      expandConfig={{ expanded, onExpandChange: setExpanded }}
    />
  );
};
```

### 模式四：可关闭 + 操作 + 展开/收起

多种功能可组合使用。

```tsx
import React from "react";
import Alert from "@cloudtower/eagle/Alert";

const App = () => (
  <Alert
    type="info"
    message="以下服务需要升级："
    description={
      <ul>
        <li>备份服务 v2.3.0 -> v2.3.1</li>
      </ul>
    }
    action={<a>立即升级</a>}
    expandConfig
    closable
  />
);
```

## 相关组件

- `Banner`：全局横幅通知，固定在页面顶部
- `message`：全局提示，自动消失
- `SmallDialog`：需要用户确认的模态提示

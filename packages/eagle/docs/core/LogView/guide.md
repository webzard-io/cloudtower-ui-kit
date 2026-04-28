# LogView

## 简介

LogView 是基于 xterm 封装的日志查看器组件，用于展示静态日志文本或通过 EventSource 追加的流式日志。组件内置顶部搜索栏、搜索结果导航、滚动缓冲控制、终端尺寸自适应，以及空状态和错误状态的自定义渲染能力。

## 何时使用

- 展示任务、主机、集群、控制器等对象的运行日志
- 需要在大量日志中搜索关键字，并在匹配结果之间跳转
- 需要接入 SSE / EventSource 实时追加日志流
- 长时间运行的日志流需要限制历史缓冲行数，控制内存占用

不要使用：

- 展示结构化数据列表 --> 请用 `Table`
- 仅展示短文本或状态描述 --> 请用 `Typo` / `Alert`
- 需要编辑命令或交互式终端输入 --> LogView 默认禁用 stdin，需使用专门的终端组件

## 基础用法

通过 `content` 传入完整日志文本，换行内容会按终端逐行渲染。默认显示顶部搜索栏，用户输入关键字后可以在命中结果之间上下跳转。

```tsx
import React from "react";
import { LogView } from "@cloudtower/eagle";

const logContent = [
  "[2026-04-24 14:30:00.101] INFO node-01 bootstrap started",
  "[2026-04-24 14:30:01.233] INFO node-01 loading cluster metadata",
  "[2026-04-24 14:30:04.889] ERROR node-03 failed to fetch event payload",
].join("\n");

const App = () => <LogView content={logContent} rows={16} />;
```

## 常见模式

### 模式一：关闭搜索栏

适用于只需要纯日志视图，或外层页面已经提供统一搜索入口的场景。

```tsx
import React from "react";
import { LogView } from "@cloudtower/eagle";

const App = () => <LogView content={logContent} rows={12} showSearch={false} />;
```

### 模式二：实时追加日志

如果外部已经通过接口轮询、WebSocket 或其他方式拿到增量日志，可以把日志拼接为新的 `content` 传入。组件会在新内容以前一次内容为前缀时只追加增量，避免整屏清空重绘。

```tsx
import React, { useEffect, useState } from "react";
import { LogView } from "@cloudtower/eagle";

const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLogs((prevLogs) => [
        ...prevLogs,
        `[${new Date().toISOString()}] INFO receive log chunk`,
      ]);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <LogView
      content={logs.length > 0 ? `${logs.join("\n")}\n` : ""}
      rows={14}
      scrollback={1000}
    />
  );
};
```

### 模式三：接入 EventSource 日志流

启用 `eventSource` 后，通过 `eventSourceOptions` 配置 SSE 地址、事件名、重连和消息格式化逻辑。`formatMessage` 应返回写入终端的字符串；组件会在缺少换行时自动补充 `\n`。

```tsx
import React from "react";
import { LogView } from "@cloudtower/eagle";

const App = () => (
  <LogView
    rows={18}
    eventSource
    eventSourceOptions={{
      url: "/api/tasks/task-001/logs/stream",
      reconnect: true,
      reconnectWait: 3,
      formatMessage: (message) => {
        const data = JSON.parse(message);

        return `[${data.time}] ${data.level} ${data.content}`;
      },
      onError: (error) => {
        console.error("日志流连接失败:", error);
      },
    }}
  />
);
```

### 模式四：自定义空状态和错误状态

当没有 `content` 且未接收到日志数据时，可以通过 `emptyRenderer` 渲染空态。EventSource 连接报错时可以通过 `errorRenderer` 展示错误说明，并调用第三个参数 `reconnect` 触发重新连接。

```tsx
import React from "react";
import { Button, LogView } from "@cloudtower/eagle";

const App = () => (
  <LogView
    eventSource
    eventSourceOptions={{
      url: "/api/tasks/task-001/logs/stream",
      reconnect: false,
    }}
    emptyRenderer={() => (
      <div style={{ textAlign: "center" }}>等待日志输出...</div>
    )}
    errorRenderer={(_terminal, _error, reconnect) => (
      <div style={{ textAlign: "center" }}>
        <div>日志流连接失败</div>
        <Button type="primary" onClick={reconnect}>
          重新连接
        </Button>
      </div>
    )}
  />
);
```

### 模式五：大日志量搜索优化

日志量较大时，建议限制 `searchHighlightLimit`，并适当调大搜索框防抖时间，避免一次性高亮过多命中结果导致页面卡顿。

```tsx
import React from "react";
import { LogView } from "@cloudtower/eagle";

const App = () => (
  <LogView
    content={largeLogContent}
    rows={18}
    scrollback={100000}
    searchHighlightLimit={1000}
    searchInputProps={{
      debounceWait: 400,
      placeholder: "搜索日志关键字",
    }}
  />
);
```

### 模式六：键盘快捷键

LogView 默认接管终端区域内的翻页、复制和全选快捷键，以匹配日志查看体验。外层页面需要统一处理键盘行为时，可以关闭 `enableKeyboardShortcuts`。

```tsx
import React from "react";
import { LogView } from "@cloudtower/eagle";

const App = () => (
  <LogView content={logContent} enableKeyboardShortcuts={false} />
);
```

## 注意事项

- `content` 适合静态日志或外部已合并好的实时日志；直接使用 SSE 时优先配置 `eventSource` 和 `eventSourceOptions`。
- 大日志量场景下同时设置 `scrollback` 和 `searchHighlightLimit`，避免无限保留历史行和过多搜索高亮带来的性能问题。
- `searchInputProps` 会覆盖内置搜索框属性，修改 `onChange`、`onSearchNext` 或 `onSearchPrev` 时要确认不会破坏日志搜索导航。
- `emptyRenderer` 和 `errorRenderer` 会覆盖在终端上方，适合展示轻量提示和操作入口，不建议放置复杂表单。

## 相关组件

- `SearchInput`：LogView 顶部搜索栏基于 SearchInput 封装
- `Table`：展示结构化日志列表或审计事件时使用
- `Alert`：展示短提示、告警或错误说明时使用

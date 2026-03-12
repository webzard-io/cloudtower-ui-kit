# SearchInput

## 简介

搜索输入框组件，基于 Input 封装，提供防抖搜索、结果导航（上一个/下一个/计数器）和最近搜索历史功能。支持受控和非受控两种模式，宽度默认 276px。

## 何时使用

- 表格内搜索高亮匹配结果，需要上下翻页定位
- 页面全局搜索，需要防抖避免频繁请求
- 需要保留最近搜索记录的搜索场景

不要使用：

- 仅需要简单输入框 --> 请用 `Input`
- 下拉选择过滤 --> 请用 `Select` 的搜索模式
- 级联选择中的搜索 --> `Cascader` 已内置 SearchInput

## 基础用法

最简单的搜索框，仅响应输入变化并防抖处理：

```tsx
import React, { useState } from "react";
import { SearchInput } from "@cloudtower/eagle";

const App = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <SearchInput
      debounceWait={300}
      onChange={(value) => setKeyword(value)}
    />
  );
};
```

## 常见模式

### 模式一：带结果导航

适用于搜索后需要在匹配结果之间上下翻页的场景（如表格内搜索高亮）。同时提供 `onSearchNext` 和 `onSearchPrev` 后，输入框后缀会显示 "current/total" 计数器和上下翻页按钮。按 Enter 键等同于点击"下一个"。

```tsx
import React, { useState } from "react";
import { SearchInput } from "@cloudtower/eagle";

const VmTableSearch = () => {
  const [matchedVms, setMatchedVms] = useState<string[]>([]);

  return (
    <SearchInput
      total={matchedVms.length}
      onChange={(value) => {
        // 根据关键词过滤匹配的虚拟机列表
        const matched = allVms.filter((vm) => vm.name.includes(value));
        setMatchedVms(matched);
      }}
      onSearchNext={(value, current) => {
        // 滚动到第 current 个匹配结果
        scrollToVm(matchedVms[current - 1]);
      }}
      onSearchPrev={(value, current) => {
        scrollToVm(matchedVms[current - 1]);
      }}
    />
  );
};
```

### 模式二：受控模式（外部控制当前索引）

适用于需要从组件外部控制当前高亮索引的场景，例如同步多个搜索结果视图。通过 `current` prop 传入索引值，组件不再内部管理位置状态。

```tsx
import React, { useState } from "react";
import { SearchInput, Button } from "@cloudtower/eagle";

const App = () => {
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState(1);
  const total = 10;

  return (
    <div>
      <SearchInput
        value={value}
        current={current}
        total={total}
        debounceWait={0}
        onChange={(v) => setValue(v)}
        onSearchNext={(v, nextCurrent) => setCurrent(nextCurrent)}
        onSearchPrev={(v, prevCurrent) => setCurrent(prevCurrent)}
      />
      <Button onClick={() => setCurrent(1)}>回到第一个</Button>
    </div>
  );
};
```

注意：使用受控模式（传入 `value`）时，需把 `debounceWait` 设置为 0，否则输入时会有卡顿。

### 模式三：最近搜索历史

启用 `enableRecentSearch` 后，搜索记录会通过 localStorage 持久化存储。聚焦空输入框时自动显示最近搜索记录的下拉菜单，点击记录项可直接填入搜索。不同业务场景应使用不同的 `recentSearchLocalStorageKey` 以隔离数据。

```tsx
import React from "react";
import { SearchInput } from "@cloudtower/eagle";

const App = () => (
  <SearchInput
    enableRecentSearch
    recentSearchLocalStorageKey="host-search"
    maxRecentCount={5}
    onChange={(value) => console.log("搜索:", value)}
  />
);
```

## 相关组件

- `Input`：基础输入框，SearchInput 基于它封装
- `Cascader`：级联选择器，内置了 SearchInput 作为搜索区域

import { Button } from "@src/core";
import SearchInput from "@src/core/SearchInput";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * * tower legacy 组件， 带 debounce 的搜索框
 * * MR: http://gitlab.smartx.com/frontend/tower/-/merge_requests/930
 *
 * * SearchInput 搜索输入框组件
 * * 带有防抖功能的搜索输入框
 * * 支持结果导航功能（上一个/下一个）
 * * 可以内部管理状态，也支持完全受控模式
 * * 支持自定义图标和样式
 *
 */
const meta = {
  component: SearchInput,
  title: "Core/SearchInput | 搜索框",
  parameters: {
    docs: {
      description: {
        component:
          "带有防抖功能的搜索输入框组件，支持搜索结果导航和完全受控模式。",
      },
    },
  },
  args: {
    debounceWait: 300,
    onSearchPrev: undefined,
    onSearchNext: undefined,
    total: undefined,
  },
} satisfies CoreMeta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

/**
 * 基本使用示例
 * 展示最简单的搜索框用法，仅处理输入变化
 */
export const Basic: Story = {
  name: "基本使用",
  parameters: {
    docs: {
      description: {
        story: "最基本的搜索框使用方式，仅响应输入变化并进行防抖处理。",
      },
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("");
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={(v) => {
          console.log(v);
          setValue(v);
        }}
      />
    );
  },
};

/**
 * 带搜索结果导航的示例
 * 展示如何使用结果导航功能，显示当前位置和总数
 */
export const withTotal: Story = {
  name: "带搜索结果导航",
  parameters: {
    docs: {
      description: {
        story:
          "启用搜索结果导航功能，显示当前位置和总数，支持上一个/下一个操作。组件内部管理当前位置状态。",
      },
    },
  },
  args: {
    total: 10,
    onSearchPrev: (value, current) => {
      console.log("上一个结果:", value, current);
    },
    onSearchNext: (value, current) => {
      console.log("下一个结果:", value, current);
    },
  },
};

/**
 * 外部控制当前索引的示例
 * 展示如何使用 current prop 控制搜索项目的当前索引
 */
export const ExternallyControlled: Story = {
  name: "外部控制当前索引",
  parameters: {
    docs: {
      description: {
        story:
          "完全受控模式的示例，通过 current prop 从外部控制当前索引。这允许在组件外部完全控制搜索导航的状态。",
      },
    },
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState("搜索内容");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [current, setCurrent] = useState(3);
    const total = 10;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <SearchInput
            value={value}
            current={current} // 通过 prop 控制当前索引
            total={total}
            onChange={(v) => {
              console.log("搜索:", v);
              setValue(v);
            }}
            onSearchNext={(v, nextCurrent) => {
              console.log("下一个:", v, nextCurrent);
              setCurrent(nextCurrent);
            }}
            onSearchPrev={(v, prevCurrent) => {
              console.log("上一个:", v, prevCurrent);
              setCurrent(prevCurrent);
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>
            当前索引: {current}/{total}
          </span>
          <Button
            onClick={() => setCurrent((current) => Math.max(1, current - 1))}
            disabled={current <= 1}
          >
            上一个
          </Button>
          <Button
            onClick={() =>
              setCurrent((current) => Math.min(total, current + 1))
            }
            disabled={current >= total}
          >
            下一个
          </Button>
          <Button onClick={() => setCurrent(1)}>回到第一个</Button>
          <Button onClick={() => setCurrent(total)}>跳到最后一个</Button>
        </div>
      </div>
    );
  },
};

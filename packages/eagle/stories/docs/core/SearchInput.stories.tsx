import SearchInput from "@src/core/SearchInput";
import { CoreMeta } from "@stories/types";
import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";

/**
 * * tower legacy 组件， 带 debounce 的搜索框
 * * MR: http://gitlab.smartx.com/frontend/tower/-/merge_requests/930
 */
const meta = {
  component: SearchInput,
  title: "Core/SearchInput | 搜索框",
  args: {
    debounceWait: 300,
    onSearchPrev: undefined,
    onSearchNext: undefined,
    total: undefined,
  },
} satisfies CoreMeta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Basic: Story = {
  name: "基本使用",
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

export const withTotal: Story = {
  name: "带上搜索总数",
  args: {
    total: 10,
    onSearchPrev: () => {},
    onSearchNext: () => {},
  },
};

import { css } from "@linaria/core";
import SearchInput from "@src/core/SearchInput";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

const ContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/SearchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInput> = (args) => {
  const [value, setValue] = useState("");

  return (
    <div className={ContainerStyle}>
      <SearchInput
        value={value}
        onChange={(v) => {
          console.log(v);
          setValue(v);
        }}
      />
      <SearchInput
        size="small"
        total={10}
        onSearchPrev={() => {}}
        onSearchNext={() => {}}
        onChange={(v) => {
          console.log(v);
        }}
      />
    </div>
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Truncate from ".";

export default {
  title: "Truncate",
  component: Truncate,
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
} as ComponentMeta<typeof Truncate>;

export const Basic: ComponentStory<typeof Truncate> = (props) => {
  return (
    <>
      <Truncate {...props} />
    </>
  );
};

Basic.args = {
  text: "truncate component",
  len: 16,
  frontLen: 4,
  backLen: 4,
  hoverShowFullText: true,
  inline: true,
};

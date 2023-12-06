import { Meta } from "@storybook/react";
import React, { useState } from "react";

import { SwitchWithTextProps } from "../../spec";
import SwitchWithText from "./";

const story: Meta<SwitchWithTextProps> = {
  title: "SwitchWithText",
  component: SwitchWithText,
};

export default story;

export const Basic = () => {
  const [checked, setChecked] = useState(false);
  return (
    <SwitchWithText
      checked={checked}
      onChange={(v) => {
        setChecked(v);
      }}
    />
  );
};
Basic.args = {};

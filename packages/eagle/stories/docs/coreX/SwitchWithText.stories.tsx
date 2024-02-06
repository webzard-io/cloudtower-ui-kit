import SwitchWithText from "@src/coreX/SwitchWithText";
import { SwitchWithTextProps } from "@src/coreX/SwitchWithText/switchWithText.type";
import { Meta } from "@storybook/react";
import React, { useState } from "react";

const story: Meta<SwitchWithTextProps> = {
  title: "CoreX/SwitchWithText",
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

import { Meta } from "@storybook/react";
import React from "react";

import OverflowTooltip from ".";
const story: Meta<any> = {
  title: "OverflowTooltip",
  component: OverflowTooltip,
};
export default story;

export const Default = ({ width, content }) => {
  return (
    <>
      <div style={{ width }}>
        <OverflowTooltip content={content} />
      </div>
    </>
  );
};
Default.args = {
  width: "300px",
  content: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
};

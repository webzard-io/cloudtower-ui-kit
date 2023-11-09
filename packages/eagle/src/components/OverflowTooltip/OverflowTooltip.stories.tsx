import { css } from "@linaria/core";
import { Meta } from "@storybook/react";
import React from "react";

import OverflowTooltip from ".";
const story: Meta<any> = {
  title: "OverflowTooltip",
  component: OverflowTooltip,
};
export default story;

const MultipleLineEllipseStyle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

export const Default = ({ width, content, isMultiLine }) => {
  return (
    <>
      <div style={{ width }}>
        <OverflowTooltip
          className={isMultiLine ? MultipleLineEllipseStyle : ""}
          isMultiLine={isMultiLine}
          content={content}
        />
      </div>
    </>
  );
};
Default.args = {
  width: "300px",
  isMultiLine: false,
  content: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
};

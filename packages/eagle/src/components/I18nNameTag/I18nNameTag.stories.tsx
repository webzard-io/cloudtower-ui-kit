import { css } from "@linaria/core";
import { Meta } from "@storybook/react";
import React from "react";

import I18nNameTag from ".";
const story: Meta<typeof I18nNameTag> = {
  title: "I18nNameTag",
  component: I18nNameTag,
};
export default story;

export const Default = ({ width, content, isMultiLine }) => {
  return (
    <>
      <div style={{ width }}>
        <I18nNameTag name="xzdry" i18nKey="common.test-xzdry" />
      </div>
    </>
  );
};
Default.args = {
  width: "300px",
  isMultiLine: false,
  content: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
};

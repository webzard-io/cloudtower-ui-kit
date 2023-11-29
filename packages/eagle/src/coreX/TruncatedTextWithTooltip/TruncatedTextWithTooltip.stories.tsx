import { css } from "@linaria/core";
import { Meta } from "@storybook/react";
import React from "react";

import { TruncateTextWithTooltipType } from "../../spec";
import TruncatedTextWithTooltip from ".";

type TruncatedTextWithTooltipComponentType =
  React.FC<TruncateTextWithTooltipType>;

const story: Meta<TruncatedTextWithTooltipComponentType> = {
  title: "TruncatedTextWithTooltip",
  component: TruncatedTextWithTooltip,
};

export default story;

export const Basic = () => {
  const wrapperStyle = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100px;
  `;

  return (
    <div className={wrapperStyle}>
      <TruncatedTextWithTooltip text="LabelLabelLabelLabelLabelLabel" />
    </div>
  );
};

import { css } from "@linaria/core";
import TruncatedTextWithTooltip from "@src/coreX/TruncatedTextWithTooltip";
import { TruncateTextWithTooltipType } from "@src/spec";
import { Meta } from "@storybook/react";
import React from "react";

type TruncatedTextWithTooltipComponentType =
  React.FC<TruncateTextWithTooltipType>;

const story: Meta<TruncatedTextWithTooltipComponentType> = {
  title: "CoreX/TruncatedTextWithTooltip",
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

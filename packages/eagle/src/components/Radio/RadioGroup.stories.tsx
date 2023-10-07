import { css } from "@linaria/core";
import { Space } from "antd";
import React from "react";

import Radio, { RadioButton, RadioGroup } from "./";

const Page = css`
  padding: 20px;
`;

export const Basic = () => {
  return (
    <div className={Page}>
      <RadioGroup defaultValue={1}>
        <Radio value={1}>Label</Radio>
        <Radio value={2}>Label</Radio>
      </RadioGroup>
    </div>
  );
};
Basic.story = {
  name: "Basic",
};

export const GroupButton = () => {
  return (
    <div className={Page}>
      <Space direction="vertical">
        <RadioGroup defaultValue={1}>
          <RadioButton value={1}>Label</RadioButton>
          <RadioButton value={2}>Label</RadioButton>
          <RadioButton value={3}>Label</RadioButton>
        </RadioGroup>

        <RadioGroup defaultValue={1} disabled={true}>
          <RadioButton value={1}>Label</RadioButton>
          <RadioButton value={2}>Label</RadioButton>
          <RadioButton value={3}>Label</RadioButton>
        </RadioGroup>

        <RadioGroup defaultValue={1}>
          <RadioButton value={1}>Label</RadioButton>
          <RadioButton value={2}>Label</RadioButton>
          <RadioButton type="input">Unit</RadioButton>
        </RadioGroup>

        <RadioGroup defaultValue={1} disabled={true}>
          <RadioButton value={1}>Label</RadioButton>
          <RadioButton value={2}>Label</RadioButton>
          <RadioButton type="input">Unit</RadioButton>
        </RadioGroup>
      </Space>
    </div>
  );
};
GroupButton.story = {
  name: "GroupButton",
  parameters: {
    design: {
      type: "figma",
      // the disabled radioButtonGroup has been redesigned, details are in: https://www.figma.com/file/ltqp4xZLuVG10FaIFLWdqY/I%3A-Rack-Awareness?node-id=1120%3A2
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=1088%3A131",
    },
  },
};

const meta = {
  title: "RadioGroup/Radio",
};

export default meta;

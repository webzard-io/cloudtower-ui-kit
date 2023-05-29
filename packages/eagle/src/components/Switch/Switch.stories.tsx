import { Space } from "antd";
import { css } from "linaria";
import React, { useState } from "react";
import { withDesign } from "storybook-addon-designs";

import Switch from "./";

const Page = css`
  padding: 20px;
`;

export const Basic = () => {
  const [large, setLargeSwitch] = useState(false);
  const [medium, setMediumSwitch] = useState(false);
  const [small, setSmallSwitch] = useState(false);

  return (
    <div className={Page}>
      <Space direction="vertical">
        <Switch
          size="large"
          checked={large}
          onChange={(bool) => setLargeSwitch(bool)}
        />
        <Switch checked={medium} onChange={(bool) => setMediumSwitch(bool)} />
        <Switch
          size="small"
          checked={small}
          onChange={(bool) => setSmallSwitch(bool)}
        />
      </Space>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=239%3A113",
    },
  },
};

export default {
  title: "Switch",
  decorators: [withDesign],
};

import { css } from "@linaria/core";
import Radio from "@src/components/Radio";
import { Space } from "antd";
import React from "react";

const Page = css`
  padding: 20px;
`;

export const Basic = () => {
  return (
    <div className={Page}>
      <Space direction="vertical">
        <Radio>Button Title</Radio>
        <Radio checked={true} description="Detail description paragraph here.">
          Button Title
        </Radio>
        <Radio disabled={true}>Button Title</Radio>
        <Radio
          disabled={true}
          checked={true}
          description="Detail description paragraph here."
        >
          Button Title
        </Radio>
      </Space>
    </div>
  );
};
Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=1671%3A4403",
    },
  },
};

export const Compact = () => {
  return (
    <div className={Page}>
      <Space direction="vertical">
        <Radio compact={true}>Button Title</Radio>
        <Radio
          compact={true}
          checked={true}
          description="Detail description paragraph here."
        >
          Button Title
        </Radio>
        <Radio compact={true} disabled={true}>
          Button Title
        </Radio>
        <Radio
          compact={true}
          disabled={true}
          checked={true}
          description="Detail description paragraph here."
        >
          Button Title
        </Radio>
      </Space>
    </div>
  );
};
Compact.story = {
  name: "Compact",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=1671%3A4403",
    },
  },
};

export default {
  title: "Radio",
};

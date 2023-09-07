import { BorderOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import { Typo } from "../Typo";
import Tag from ".";

const colors = [
  "blue",
  "red",
  "red-ontint",
  "yellow",
  "green",
  "green-ontint",
  "gray",
  "purple",
] as const;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "Tag",
  decorators: [withDesign],
};

export const Basic = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Small</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {colors.map((color) => (
          <Space>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag size="small" color={color}>
              Label
            </Tag>
            <Tag icon={<BorderOutlined />} size="small" color={color}>
              Label
            </Tag>
          </Space>
        ))}
      </Space>
      <Title>Medium</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {colors.map((color) => (
          <Space>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag size="medium" color={color}>
              Label
            </Tag>
            <Tag icon={<BorderOutlined />} size="medium" color={color}>
              Label
            </Tag>
          </Space>
        ))}
      </Space>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/%5BArchived%5D-CloudTower-UI-1.0.5?type=design&node-id=405-9&mode=design&t=sD3RRB9kLjiEzIo4-0",
    },
  },
};

export default story;

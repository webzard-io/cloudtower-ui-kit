import { BorderOutlined } from "@ant-design/icons";
import { ComponentStory, Story } from "@storybook/react";
import { Space } from "antd";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import { TagComponentType } from "../../spec";
import { Typo } from "../Typo";
import Tag, { PresetColors } from ".";
const MediumColors = ["blue", "red", "yellow", "green", "gray", "purple"];

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "Tag",
  decorators: [withDesign],
};

export const Basic: ComponentStory<TagComponentType> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Small</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {PresetColors.map((color) => (
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
        {MediumColors.map((color) => (
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

export const Custom: Story<{
  maxWidth: string;
  content: string;
  color: string;
  size: "small" | "medium";
  hoverable: boolean;
}> = ({ maxWidth, content, ...props }) => {
  return (
    <Tag style={{ maxWidth: maxWidth }} {...props}>
      {content}
    </Tag>
  );
};

Custom.args = {
  color: "blue",
  hoverable: true,
  content: "label",
  size: "small",
  maxWidth: "100px",
};

Custom.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium"],
    },
  },
};

export default story;

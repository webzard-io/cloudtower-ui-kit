import { BorderOutlined } from "@ant-design/icons";
import { css } from "@linaria/core";
import { ComponentStory, Story } from "@storybook/react";
import { Space } from "antd";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import { SplitTagComponentType, TagComponentType } from "../../spec";
import BaseTruncate from "../Truncate";
import { Typo } from "../Typo";
import Tag, { PresetColors as TagPresetColors } from ".";
import { PresetColors } from "./const";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "Tag",
  decorators: [withDesign],
};

const modes = ["Default", "Hover", "Default", "Hover"];

export const Basic: ComponentStory<TagComponentType> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Small</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        <Space
          className={css`
            & > div {
              width: 90px;
            }
          `}
          style={{ marginTop: "12px" }}
        >
          <span />
          {modes.map((mode) => (
            <div>{mode}</div>
          ))}
        </Space>
        {TagPresetColors.map((color) => (
          <Space
            className={css`
              & > div {
                width: 90px;
              }
            `}
          >
            <span>{color}</span>
            <Tag size="small" color={color}>
              Label
            </Tag>
            {color.includes("ontint") ? (
              <span />
            ) : (
              <Tag className="__pseudo-states-hover" size="small" color={color}>
                Label
              </Tag>
            )}
            <Tag icon={<BorderOutlined />} size="small" color={color}>
              Label
            </Tag>
            {color.includes("ontint") ? (
              <span />
            ) : (
              <Tag
                className="__pseudo-states-hover"
                icon={<BorderOutlined />}
                size="small"
                color={color}
              >
                Label
              </Tag>
            )}
          </Space>
        ))}
      </Space>
      <Title>Medium</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {PresetColors.map((color) => (
          <Space
            className={css`
              & > div {
                width: 90px;
              }
            `}
          >
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag size="medium" color={color}>
              Label
            </Tag>
            <Tag className="__pseudo-states-hover" size="medium" color={color}>
              Label
            </Tag>
            <Tag icon={<BorderOutlined />} size="medium" color={color}>
              Label
            </Tag>
            <Tag
              className="__pseudo-states-hover"
              icon={<BorderOutlined />}
              size="medium"
              color={color}
            >
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
  content: string;
  color: string;
  size: "small" | "medium";
  hoverable: boolean;
}> = ({ content, ...props }) => {
  return <Tag {...props}>{content}</Tag>;
};

Custom.args = {
  color: "blue",
  hoverable: true,
  content: "label",
  size: "small",
};

Custom.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium"],
    },
  },
};

export const SplitTag: ComponentStory<SplitTagComponentType> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div>Tag.SplitTag</div>
      <Title>Small</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {PresetColors.map((color) => (
          <Space>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              size="small"
              color={color}
            />
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              icon={<BorderOutlined />}
              size="small"
              color={color}
            />
          </Space>
        ))}
      </Space>
      <Title>Medium</Title>
      <Space direction="vertical" style={{ marginTop: "12px" }}>
        {PresetColors.map((color) => (
          <Space>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              size="medium"
              color={color}
            />
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              icon={<BorderOutlined />}
              size="medium"
              color={color}
            />
          </Space>
        ))}
      </Space>
    </div>
  );
};

export const Truncate: Story<{
  content: string;
  len: number;
  color: string;
  size: "small" | "medium";
}> = ({ content, len, ...props }) => {
  return (
    <>
      <div>配合 Truncate 组件使用</div>
      <div style={{ marginTop: "50px" }}>
        <Tag {...props}>
          <BaseTruncate backLen={0} text={content} len={len} />
        </Tag>
      </div>
    </>
  );
};

Truncate.args = {
  content: "longlonglonglong",
  color: "magenta",
  size: "small",
  len: 10,
};
Truncate.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium"],
    },
  },
};

export default story;

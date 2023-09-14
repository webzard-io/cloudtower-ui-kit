import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { Space } from "antd";
import React from "react";

import { TokenComponentType } from "../../spec";
import BaseTruncate from "../Truncate";
import { Typo } from "../Typo";
import Token, { PresetColors } from ".";

export default {
  title: "Token",
  component: Token,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZE1a32eYk89k4cfGEEOph2/Tag-%26-Token-%7C-%E6%A0%87%E7%AD%BE%E5%92%8C%E5%8F%AF%E7%BC%96%E8%BE%91%E6%A0%87%E7%AD%BE?type=design&node-id=1-41&mode=design&t=nnkSC0vipHqxIYf7-0",
    },
  },
} as ComponentMeta<TokenComponentType>;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

export const Basic: ComponentStory<TokenComponentType> = () => {
  return (
    <>
      <Title>Basic</Title>
      <Space direction="vertical" className="size">
        <div className="large-size">
          <div>Large</div>
          <Space>
            {PresetColors.map((color) => (
              <Space direction="vertical">
                <Token closable size="large" color={color}>
                  Label
                </Token>
                <Token closable checked size="large" color={color}>
                  Label
                </Token>
                <Token size="large" color={color}>
                  Label
                </Token>
                <Token checked size="large" color={color}>
                  Label
                </Token>
              </Space>
            ))}
          </Space>
        </div>
        <div className="medium-size">
          <div>Medium</div>
          <Space>
            {PresetColors.map((color) => (
              <Space direction="vertical">
                <Token closable size="medium" color={color}>
                  Label
                </Token>
                <Token closable checked size="medium" color={color}>
                  Label
                </Token>
                <Token size="medium" color={color}>
                  Label
                </Token>
                <Token checked size="medium" color={color}>
                  Label
                </Token>
              </Space>
            ))}
          </Space>
        </div>
        <div className="small-size">
          <div>Small</div>
          <Space>
            {PresetColors.map((color) => (
              <Space direction="vertical">
                <Token closable size="small" color={color}>
                  Label
                </Token>
                <Token closable checked size="small" color={color}>
                  Label
                </Token>
                <Token size="small" color={color}>
                  Label
                </Token>
                <Token checked size="small" color={color}>
                  Label
                </Token>
              </Space>
            ))}
          </Space>
        </div>
      </Space>
    </>
  );
};

export const Custom: Story<{
  content: string;
  color: string;
  size: "small" | "medium" | "large";
  closable: boolean;
}> = ({ content, ...props }) => {
  return (
    <>
      <Title>Custom</Title>
      <Token {...props}>{content}</Token>
    </>
  );
};

Custom.args = {
  content: "label",
  color: "magenta",
  size: "small",
  closable: true,
};

Custom.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export const Truncate: Story<{
  content: string;
  len: number;
  color: string;
  size: "small" | "medium" | "large";
  closable: boolean;
}> = ({ content, len, ...props }) => {
  return (
    <>
      <div>配合 Truncate 组件使用</div>
      <div style={{ marginTop: "50px" }}>
        <Token {...props}>
          <BaseTruncate backLen={0} text={content} len={len} />
        </Token>
      </div>
    </>
  );
};

Truncate.args = {
  content: "longlonglonglong",
  color: "magenta",
  size: "small",
  closable: true,
  len: 10,
};

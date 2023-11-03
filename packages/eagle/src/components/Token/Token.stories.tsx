import { Placeholder16Icon } from "@cloudtower/icons-react";
import { Meta, StoryObj } from "@storybook/react";
import { Space } from "antd";
import React from "react";

import { TokenColor, TokenComponentType } from "../../spec";
import BaseTruncate from "../Truncate";
import { Typo } from "../Typo";
import Token, { PresetColors } from ".";

const story: Meta<TokenComponentType> = {
  title: "Token",
  component: Token,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZE1a32eYk89k4cfGEEOph2/Tag-%26-Token-%7C-%E6%A0%87%E7%AD%BE%E5%92%8C%E5%8F%AF%E7%BC%96%E8%BE%91%E6%A0%87%E7%AD%BE?type=design&node-id=1-41&mode=design&t=nnkSC0vipHqxIYf7-0",
    },
  },
};
export default story;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

export const Basic: StoryObj<TokenComponentType> = {
  render: () => {
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
                  <Token
                    closable
                    size="large"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token closable checked size="large" color={color}>
                    Label
                  </Token>
                  <Token
                    closable
                    checked
                    size="large"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token size="large" color={color}>
                    Label
                  </Token>
                  <Token
                    size="large"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token checked size="large" color={color}>
                    Label
                  </Token>
                  <Token
                    checked
                    size="large"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
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
                  <Token
                    closable
                    size="large"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token closable checked size="medium" color={color}>
                    Label
                  </Token>
                  <Token
                    closable
                    checked
                    size="medium"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token size="medium" color={color}>
                    Label
                  </Token>
                  <Token
                    size="medium"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token checked size="medium" color={color}>
                    Label
                  </Token>
                  <Token
                    checked
                    size="medium"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
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
                  <Token
                    closable
                    size="small"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token closable checked size="small" color={color}>
                    Label
                  </Token>
                  <Token
                    closable
                    checked
                    size="small"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token size="small" color={color}>
                    Label
                  </Token>
                  <Token
                    size="small"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                  <Token checked size="small" color={color}>
                    Label
                  </Token>
                  <Token
                    checked
                    size="small"
                    color={color}
                    icon={<Placeholder16Icon />}
                  >
                    Label
                  </Token>
                </Space>
              ))}
            </Space>
          </div>
        </Space>
      </>
    );
  },
};

export const Default: StoryObj<{
  content: string;
  color: TokenColor;
  size: "small" | "medium" | "large";
  closable: boolean;
}> = {
  render: ({ content, ...props }) => {
    return (
      <>
        <Token {...props}>{content}</Token>
      </>
    );
  },
};

Default.args = {
  content: "label",
  closable: undefined,
  size: undefined,
  color: undefined,
};

Default.argTypes = {
  size: {
    control: "radio",
    options: ["small", "medium", "large"],
  },
  color: {
    control: "radio",
    options: ["blue", "red", "yellow", "green", "gray"],
  },
  closable: {
    control: "boolean",
  },
};

export const Truncate: StoryObj<{
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

export const Tooltip: StoryObj<{
  content: string;
  tooltipConfig: {
    title: string;
  };
}> = ({ content, ...props }) => {
  return (
    <>
      <div>可以通过传递 tooltipConfig 使 closeIcon hover 时显示 tooltip</div>
      <div style={{ marginTop: "50px" }}>
        <Token closable {...props}>
          {content}
        </Token>
      </div>
    </>
  );
};

Tooltip.args = {
  content: "longlonglonglong",
  tooltipConfig: {
    title: "remove token",
  },
};

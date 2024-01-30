import { Placeholder16Icon } from "@cloudtower/icons-react";
import Token, { PresetColors } from "@src/core/Token";
import BaseTruncate from "@src/core/Truncate";
import { Typo } from "@src/core/Typo";
import { TokenComponentType } from "@src/spec";
import { Meta, StoryObj } from "@storybook/react";
import { Space } from "antd";
import React from "react";

type Story = StoryObj<TokenComponentType>;

const story: Meta<TokenComponentType> = {
  title: "Core/Token | 可编辑标签",
  component: Token,
  parameters: {
    expanded: false,
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

export const Basic: Story = {
  name: "基础样式",
  parameters: {
    controls: {
      exclude: ["checked"],
    },
    expanded: false,
  },
  args: {
    size: "small",
    color: "blue",
    closable: true,
    children: "Label",
    icon: <Placeholder16Icon />,
    tooltipConfig: {
      title: "Label",
    },
  },
  argTypes: {
    color: {
      control: "radio",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
  },
};

/**
 * 设置 closable 会使 Token 处于可编辑状态，此时会展示移除按钮
 *
 * 移除按钮的不透明度默认为 60%，hover 时，不透明度为 100%
 */
export const Editable: Story = {
  name: "可编辑",
  parameters: {
    controls: {
      include: ["size", "children", "color"],
    },
  },
  args: {
    size: "small",
    color: "blue",
    closable: true,
    children: "Label",
  },
  argTypes: {
    color: {
      control: "radio",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
  },
};

/**
 * Token 默认不可编辑，不展示移除按钮
 *
 * Token 可以是任意颜色，但是在不可编辑的语义下通常是灰色（默认颜色)
 *
 * 根据业务场景，有时候会对不可编辑的项提供 Hover Tooltip，说明不可编辑的原因。
 */
export const NonEditable: Story = {
  name: "不可编辑",
  parameters: {
    controls: {
      include: ["size", "children", "color"],
    },
  },
  args: {
    size: "small",
    children: "Label",
  },
  argTypes: {
    color: {
      control: "radio",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
  },
};

/**
 *
 * 配合 Truncate 组件使用
 */
export const Truncate: Story = {
  parameters: {
    controls: {
      include: ["size", "color"],
    },
  },
  args: {
    children: <BaseTruncate backLen={0} text="longlonglonglong" len={10} />,
  },
  argTypes: {
    color: {
      control: "radio",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
  },
};

/**
 * 可以通过 tooltipConfig 来配置移除按钮要提示的 tooltip 内容
 */
export const TooltipConfig: Story = {
  name: "移除按钮 Tooltip",
  parameters: {
    controls: {
      include: ["tooltipConfig"],
    },
  },
  args: {
    tooltipConfig: {
      title: "Label",
    },
    closable: true,
    children: "Label",
  },
};

export const Variants: Story = {
  name: "所有变体",
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => {
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

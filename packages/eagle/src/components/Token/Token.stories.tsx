import { Space } from "antd";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import Select from "../Select";
import { Typo } from "../Typo";
import Token from ".";

const colors = ["blue", "red", "yellow", "green", "gray"] as const;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "Token",
  decorators: [withDesign],
};

const tagRender = (props: any) => {
  const { label, value, closable, onClose } = props;
  return (
    <Token
      color={value}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Token>
  );
};

const TokenFiled = () => {
  const options = [
    { value: "blue" },
    { value: "red" },
    { value: "green" },
    { value: "yellow" },
  ];

  return (
    <div style={{ marginTop: "5px" }}>
      <Select
        size="small"
        style={{ width: "300px" }}
        input={{}}
        mode="tags"
        options={options}
        tagRender={tagRender}
        defaultValue={["blue"] as any}
      />
    </div>
  );
};

export const Basic = () => {
  return (
    <>
      <Title>Size</Title>
      <Space direction="vertical" className="size">
        <div className="large-size">
          <div>Large</div>
          <Space>
            {colors.map((color) => (
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
            {colors.map((color) => (
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
            {colors.map((color) => (
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
      <Title>Token Field</Title>
      <TokenFiled />
    </>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/BpDArP1CG6k9D1sLNscKbM/CloudTower-UI?node-id=2%3A23&mode=dev",
    },
  },
};

export default story;

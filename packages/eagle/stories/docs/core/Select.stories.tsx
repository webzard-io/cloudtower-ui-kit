import { styled } from "@linaria/react";
import Select from "@src/core/Select";
import { LeftEndSelectStyle, RightEndSelectStyle } from "@src/core/Styled";
import { Typo } from "@src/core/Typo";
import { Meta } from "@storybook/react";
import { Select as AntdSelect, Space as AntdSpace } from "antd";
import cs from "classnames";
import React from "react";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const Subtitle: React.FC = ({ children }) => (
  <div className={Typo.Display.d3_regular_title} style={{ width: "100%" }}>
    {children}
  </div>
);

const Space = styled(AntdSpace)`
  padding: 12px 0;
  width: 100%;
  > .ant-space-item {
    width: 126px;
  }
`;

const options = [
  <AntdSelect.Option value="jack">Jack</AntdSelect.Option>,
  <AntdSelect.Option value="lucy">Lucy</AntdSelect.Option>,
  <AntdSelect.Option value="disabled" disabled>
    Disabled
  </AntdSelect.Option>,
];

type RowProps = {
  state:
    | "Normal"
    | "Hover"
    | "Active"
    | "Focus"
    | "Disabled"
    | "Expanded"
    | "Loading";
};
const Row: React.FC<RowProps> = ({ state }) => {
  const props = {
    Normal: {
      input: {},
    },
    Hover: { className: "__pseudo-states-hover", input: {} },
    Active: { className: "__pseudo-states-active", input: {} },
    Focus: { className: "__pseudo-states-focus", input: {} },
    Expanded: { open: true, input: {} },
    Disabled: {
      input: {},
      disabled: true,
    },
    Loading: {
      input: {},
      loading: true,
    },
  }[state];
  return (
    <>
      <Space
        size={100}
        style={{ marginBottom: state === "Expanded" ? "100px" : undefined }}
      >
        <Select placeholder="Label" {...props}>
          {options}
        </Select>
        <Select
          placeholder="Label"
          {...props}
          className={cs(props.className, LeftEndSelectStyle)}
        >
          {options}
        </Select>
        <Select
          placeholder="Label"
          {...props}
          className={cs(props.className, RightEndSelectStyle)}
        >
          {options}
        </Select>
        <Select placeholder="Label" danger {...props}>
          {options}
        </Select>
      </Space>
      <Subtitle>{state}</Subtitle>
    </>
  );
};

const meta: Meta = {
  title: "Core/Select",
};

export default meta;

export const Basic = () => {
  return (
    <div style={{ padding: "20px", paddingBottom: "200px" }}>
      <Title>Size</Title>
      <Space>
        <Select input={{}} placeholder="Label" size="large">
          {options}
        </Select>
        <Select input={{}} placeholder="Label">
          {options}
        </Select>
      </Space>

      <Title>State</Title>
      <Row state="Normal" />
      <Row state="Hover" />
      <Row state="Active" />
      <Row state="Focus" />
      <Row state="Expanded" />
      <Row state="Disabled" />
      <Row state="Loading" />
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=8651%3A25024",
    },
  },
};

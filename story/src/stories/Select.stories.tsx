import {
  antdKit,
  getAntdKit as getSmartxKit,
  LeftEndSelectStyle,
  RightEndSelectStyle,
  Typo,
} from "@cloudtower/eagle";
import styled from "@emotion/styled";
import { ComponentMeta } from "@storybook/react";
import { Space as AntdSpace } from "antd";
import cs from "classnames";
import React from "react";
import { withDesign } from "storybook-addon-designs";

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

const UIKit = getSmartxKit();
const options = [
  <UIKit.option value="jack">Jack</UIKit.option>,
  <UIKit.option value="lucy">Lucy</UIKit.option>,
  <UIKit.option value="disabled" disabled>
    Disabled
  </UIKit.option>,
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
        <UIKit.select placeholder="Label" {...props}>
          {options}
        </UIKit.select>
        <UIKit.select
          placeholder="Label"
          {...props}
          className={cs(props.className, LeftEndSelectStyle)}
        >
          {options}
        </UIKit.select>
        <UIKit.select
          placeholder="Label"
          {...props}
          className={cs(props.className, RightEndSelectStyle)}
        >
          {options}
        </UIKit.select>
        <UIKit.select placeholder="Label" danger {...props}>
          {options}
        </UIKit.select>
      </Space>
      <Subtitle>{state}</Subtitle>
    </>
  );
};

export default {
  title: "Select",
  decorators: [withDesign],
} as ComponentMeta<typeof antdKit.select>;

export const Basic = () => {
  return (
    <div style={{ padding: "20px", paddingBottom: "200px" }}>
      <Title>Size</Title>
      <Space>
        <UIKit.select input={{}} placeholder="Label" size="large">
          {options}
        </UIKit.select>
        <UIKit.select input={{}} placeholder="Label">
          {options}
        </UIKit.select>
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

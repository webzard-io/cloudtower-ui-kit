import {
  getAntdKit,
  LeftEndInputStyle,
  RightEndInputStyle,
  Typo,
} from "@cloudtower/eagle";
import { Col, Row as AntdRow } from "antd";
import cs from "classnames";
import React, { Fragment } from "react";
import { withDesign } from "storybook-addon-designs";

const kit = getAntdKit();

const Info: React.FC = ({ children }) => (
  <div
    className={Typo.Label.l1_regular}
    style={{ width: "100%", margin: "10px 0" }}
  >
    {children}
  </div>
);

type RowProps = {
  state:
    | "Normal"
    | "Hover"
    | "Active"
    | "Focus"
    | "Error"
    | "Error Hover"
    | "Error Active"
    | "Error Focus"
    | "Disabled";
  size: "large" | "middle" | "small";
};
const Row: React.FC<RowProps> = ({ state, size }) => {
  const inputProps = {
    Normal: {},
    Hover: {
      className: "__pseudo-states-hover",
    },
    Active: {
      className: "__pseudo-states-active",
    },
    Focus: {
      className: "__pseudo-states-focus",
    },
    Error: {
      error: true,
    },
    "Error Hover": {
      error: true,
      className: "__pseudo-states-hover",
    },
    "Error Active": {
      error: true,
      className: "__pseudo-states-active",
    },
    "Error Focus": {
      error: true,
      className: "__pseudo-states-focus",
    },
    Disabled: {
      disabled: true,
    },
  }[state];

  return (
    <div className={size}>
      <kit.input size={size} {...inputProps} placeholder="Label" />
      <kit.input
        size={size}
        {...inputProps}
        className={cs(inputProps.className, LeftEndInputStyle)}
        placeholder="Label"
        suffix="Unit"
      />
      <kit.input
        size={size}
        {...inputProps}
        className={cs(inputProps.className, RightEndInputStyle)}
        placeholder="Label"
        suffix="Unit"
      />
      <Info>{state}</Info>
    </div>
  );
};

const Section = ({ size }: { size: "large" | "middle" | "small" }) => {
  return (
    <Fragment>
      <div
        className={Typo.Display.d2_bold_title}
        style={{ marginBottom: "20px" }}
      >
        {size}
      </div>
      <Row size={size} state="Normal" />
      <Row size={size} state="Hover" />
      <Row size={size} state="Active" />
      <Row size={size} state="Focus" />
      <Row size={size} state="Disabled" />
      <Row size={size} state="Error" />
      <Row size={size} state="Error Hover" />
      <Row size={size} state="Error Active" />
      <Row size={size} state="Error Focus" />
      <div className={size}>
        <kit.textArea size={size} placeholder="Label" />
        <Info>TextArea</Info>
      </div>
    </Fragment>
  );
};

export default {
  title: "Input",
  decorators: [withDesign],
};

export const Input = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Section size="large" />
      <Section size="middle" />
      <Section size="small" />
    </div>
  );
};

Input.story = {
  name: "Text Field",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=8639%3A21589",
    },
  },
};

type Row2Props = {
  state:
    | "Normal"
    | "Hover"
    | "Checked"
    | "Partial checked"
    | "Disabled"
    | "Disabled & Checked"
    | "Disabled & Partial checked";
};
const CheckboxRow: React.FC<Row2Props> = ({ state }) => {
  const checkboxProps = {
    Normal: {},
    Hover: {
      className: "__pseudo-states-hover",
    },
    Checked: {
      checked: true,
    },
    "Partial checked": {
      indeterminate: true,
    },
    Disabled: {
      disabled: true,
    },
    "Disabled & Checked": {
      checked: true,
      disabled: true,
    },
    "Disabled & Partial checked": {
      indeterminate: true,
      disabled: true,
    },
  }[state];

  return (
    <Fragment>
      <AntdRow>
        <Col span={4}>
          <kit.checkbox {...checkboxProps} />
        </Col>
        <Col span={5}>
          <kit.checkbox {...checkboxProps}>Button Title</kit.checkbox>
        </Col>
        <Col span={5}>
          <kit.checkbox
            {...checkboxProps}
            description="Detail description paragraph here."
          >
            Button Title
          </kit.checkbox>
        </Col>
        <Col span={5}>
          <kit.checkbox {...checkboxProps} compact>
            Button Title
          </kit.checkbox>
        </Col>
        <Col span={5}>
          <kit.checkbox
            {...checkboxProps}
            compact
            description="Detail description paragraph here."
          >
            Button Title
          </kit.checkbox>
        </Col>
      </AntdRow>
      <Info>{state}</Info>
    </Fragment>
  );
};

export const Checkbox = () => {
  return (
    <div style={{ padding: "20px" }}>
      <CheckboxRow state="Normal" />
      <CheckboxRow state="Hover" />
      <CheckboxRow state="Checked" />
      <CheckboxRow state="Partial checked" />
      <CheckboxRow state="Disabled" />
      <CheckboxRow state="Disabled & Checked" />
      <CheckboxRow state="Disabled & Partial checked" />
    </div>
  );
};

Checkbox.story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=130%3A700",
    },
  },
};

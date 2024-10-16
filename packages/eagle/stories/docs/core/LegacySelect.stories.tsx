import { DisconnectedCluster16GrayIcon } from "@cloudtower/icons-react";
import { styled } from "@linaria/react";
import LegacySelect from "@src/core/LegacySelect";
import { getOptions } from "@src/core/Select/select.widgets";
import { LeftEndSelectStyle, RightEndSelectStyle } from "@src/core/Styled";
import Tooltip from "@src/core/Tooltip";
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
const meta: Meta = {
  title: "Core/LegacySelect",
};

export default meta;

export const Basic = () => {
  const options = [
    <AntdSelect.Option value="jack">Jack</AntdSelect.Option>,
    <AntdSelect.Option value="lucy">Lucy</AntdSelect.Option>,
    <AntdSelect.Option value="disabled" disabled>
      Disabled
    </AntdSelect.Option>,
  ];

  function OptionsDemo(props: React.PropsWithChildren<{}>) {
    return (
      <Space>
        <LegacySelect input={{}} placeholder="Label" size="large">
          {props.children}
        </LegacySelect>
        <LegacySelect input={{}} placeholder="Label">
          {props.children}
        </LegacySelect>
        <LegacySelect input={{}} placeholder="Label" size="small">
          {props.children}
        </LegacySelect>
      </Space>
    );
  }

  function Prefix() {
    const options = getOptions([
      {
        value: "site-name-1",
        prefix: (
          <Tooltip title="连接异常">
            <DisconnectedCluster16GrayIcon />
          </Tooltip>
        ),
        children: "site-name-1",
      },
      {
        value: "site-name-2",
        children: "site-name-2",
      },
      {
        value: "site-name-3",
        children: "site-name-3",
        disabled: true,
      },
    ]);

    return <OptionsDemo>{options}</OptionsDemo>;
  }

  function Suffix() {
    const options = getOptions([
      {
        value: "site-name-1",
        suffix: (
          <Tooltip title="连接异常">
            <DisconnectedCluster16GrayIcon />
          </Tooltip>
        ),
        children: "site-name-1",
      },
      {
        value: "site-name-2",
        children: "site-name-2",
      },
      {
        value: "site-name-3",
        children: "site-name-3",
        disabled: true,
      },
    ]);

    return <OptionsDemo>{options}</OptionsDemo>;
  }

  function Truncate() {
    const options = getOptions([
      {
        value: "loooooooooooooong name",
        children: "loooooooooooooong name",
      },
      {
        value: "site-name-2",
        children: "site-name-2",
      },
      {
        value: "site-name-3",
        children: "site-name-3",
        disabled: true,
      },
    ]);

    return <OptionsDemo>{options}</OptionsDemo>;
  }

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
        <Subtitle>{state}</Subtitle>
        <Space
          size={100}
          style={{ marginBottom: state === "Expanded" ? "100px" : undefined }}
        >
          <LegacySelect placeholder="Label" {...props}>
            {options}
          </LegacySelect>
          <LegacySelect
            placeholder="Label"
            {...props}
            className={cs(props.className, LeftEndSelectStyle)}
          >
            {options}
          </LegacySelect>
          <LegacySelect
            placeholder="Label"
            {...props}
            className={cs(props.className, RightEndSelectStyle)}
          >
            {options}
          </LegacySelect>
          <LegacySelect placeholder="Label" danger {...props}>
            {options}
          </LegacySelect>
        </Space>
      </>
    );
  };

  return (
    <div style={{ padding: "20px", paddingBottom: "200px" }}>
      <Title>Size</Title>
      <Space>
        <LegacySelect input={{}} placeholder="Label" size="large">
          {options}
        </LegacySelect>
        <LegacySelect input={{}} placeholder="Label">
          {options}
        </LegacySelect>
        <LegacySelect input={{}} placeholder="Label" size="small">
          {options}
        </LegacySelect>
      </Space>

      <Title>State</Title>
      <Row state="Normal" />
      <Row state="Hover" />
      <Row state="Active" />
      <Row state="Focus" />
      <Row state="Expanded" />
      <Row state="Disabled" />
      <Row state="Loading" />

      <Title>Prefix</Title>
      <Prefix />

      <Title>Suffix</Title>
      <Suffix />

      <Title>Truncate</Title>
      <Truncate />
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

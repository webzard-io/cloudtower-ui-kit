import { DisconnectedCluster16GrayIcon } from "@cloudtower/icons-react";
import { styled } from "@linaria/react";
import Select from "@src/core/Select";
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
    | "Loading"
    | "LoadingValue"
    | "Search";
};
const meta: Meta = {
  title: "Core/Select",
};

export default meta;

export const Basic = () => {
  const options = [
    <AntdSelect.Option value="jack" label="Jack">
      Jack
    </AntdSelect.Option>,
    <AntdSelect.Option value="lucy" label="Lucy">
      Lucy
    </AntdSelect.Option>,
    <AntdSelect.Option value="disabled" label="Disabled" disabled>
      Disabled
    </AntdSelect.Option>,
  ];

  function OptionsDemo(props: React.PropsWithChildren<{}>) {
    return (
      <AntdSpace>
        <Select
          input={{}}
          style={{ width: 256 }}
          placeholder="Label"
          size="large"
          {...props}
        >
          {props.children}
        </Select>
        <Select
          input={{}}
          style={{ width: 256 }}
          placeholder="Label"
          {...props}
        >
          {props.children}
        </Select>
        <Select
          input={{}}
          style={{ width: 256 }}
          placeholder="Label"
          size="small"
          {...props}
        >
          {props.children}
        </Select>
      </AntdSpace>
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
        value: "looooooooooooooooooooooooooooooooooooooong name",
        children: "looooooooooooooooooooooooooooooooooooooong name",
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
      LoadingValue: {
        input: {},
        isLoadingValue: true,
      },
      Search: {
        input: {},
        showSearch: true,
      },
    }[state];
    return (
      <>
        <Subtitle>{state}</Subtitle>
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
      </>
    );
  };

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
        <Select input={{}} placeholder="Label" size="small">
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
      <Row state="LoadingValue" />

      <Row state="Search" />

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
      url: "https://www.figma.com/design/vxsox2ppG3aNiD9qGSyFdc/Select%E4%B8%A8%E5%8D%95%E9%A1%B9%E9%80%89%E6%8B%A9%E5%99%A8?node-id=1-41&m=dev",
    },
  },
};

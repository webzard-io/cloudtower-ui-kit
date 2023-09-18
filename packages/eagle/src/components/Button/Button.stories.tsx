import {
  DownOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import cs from "classnames";
import _ from "lodash";
import React from "react";

import { ButtonProps } from "../../spec";
import { Typo } from "../Typo";
import Button from ".";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);
const Subtitle: React.FC = ({ children }) => (
  <span
    className={Typo.Display.d3_regular_title}
    style={{ display: "inline-block", width: "160px" }}
  >
    {children}
  </span>
);
const Section: React.FC<{ type: ButtonProps["type"]; background?: string }> = ({
  type,
  background,
}) => {
  return (
    <>
      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)}</Subtitle>
        <Button icon={<PlusOutlined />} type={type}>
          Label
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </Button>
        <Button disabled icon={<PlusOutlined />} type={type}>
          Disabled
        </Button>
        <Button icon={<DownOutlined />} type={type} />
        <Button icon={<EllipsisOutlined />} type={type} shape="circle" />
        <Button loading type={type} />
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Danger</Subtitle>
        <Button danger icon={<PlusOutlined />} type={type}>
          Label
        </Button>
        <Button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </Button>
        <Button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </Button>
        <Button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </Button>
        <Button danger disabled icon={<PlusOutlined />} type={type}>
          Disabled
        </Button>
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Orange</Subtitle>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className="btn-primary-orange"
        >
          Label
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-hover")}
        >
          Hover
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-active")}
        >
          Active
        </Button>
        <Button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-focus")}
        >
          Focus
        </Button>
        <Button
          className="btn-primary-orange"
          disabled
          icon={<PlusOutlined />}
          type={type}
        >
          Disabled
        </Button>
      </Space>

      {(type === "ordinary" || type === "ordinary-onTint") && (
        <Space
          size="middle"
          style={{ padding: "12px", width: "100%", background }}
        >
          <Subtitle>{_.capitalize(type)} Blue</Subtitle>
          <Button className="ordinary-blue" icon={<PlusOutlined />} type={type}>
            Label
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-hover")}
            icon={<PlusOutlined />}
            type={type}
          >
            Hover
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-active")}
            icon={<PlusOutlined />}
            type={type}
          >
            Active
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-focus")}
            icon={<PlusOutlined />}
            type={type}
          >
            Focus
          </Button>
          <Button
            className="ordinary-blue"
            disabled
            icon={<PlusOutlined />}
            type={type}
          >
            Disabled
          </Button>
          <Button
            className="ordinary-blue"
            icon={<DownOutlined />}
            type={type}
          />
          <Button
            className="ordinary-blue"
            icon={<EllipsisOutlined />}
            type={type}
            shape="circle"
          />
        </Space>
      )}

      {type === "quiet" && (
        <Space
          size="middle"
          style={{ padding: "12px", width: "100%", background }}
        >
          <Subtitle>{_.capitalize(type)} Basic</Subtitle>
          <Button className="quiet-blue" icon={<PlusOutlined />} type={type}>
            Label
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-hover")}
            icon={<PlusOutlined />}
            type={type}
          >
            Hover
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-active")}
            icon={<PlusOutlined />}
            type={type}
          >
            Active
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-focus")}
            icon={<PlusOutlined />}
            type={type}
          >
            Focus
          </Button>
          <Button
            className="quiet-blue"
            disabled
            icon={<PlusOutlined />}
            type={type}
          >
            Disabled
          </Button>
          <Button className="quiet-blue" icon={<DownOutlined />} type={type} />
          <Button
            className="quiet-blue"
            icon={<EllipsisOutlined />}
            type={type}
            shape="circle"
          />
        </Space>
      )}
    </>
  );
};

export const Basic = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Size</Title>
      <Space style={{ marginTop: "12px" }}>
        <Button type="primary" size="large">
          Label
        </Button>
        <Button type="primary">Label</Button>
        <Button type="primary" size="small">
          Label
        </Button>
      </Space>

      <Title>Type</Title>
      <Section type="primary" />
      <Section type="secondary" />
      <Section type="tertiary" background="#EDF0F7" />

      <Section type="ordinary" />
      <Section type="ordinary-onTint" background="#EDF0F7" />
      <Section type="quiet" />
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/CloudTower-UI-Components?node-id=99%3A0",
    },
  },
};

const story = {
  title: "Button",
};

export default story;

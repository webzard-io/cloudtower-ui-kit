import {
  DownOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import cs from "classnames";
import _ from "lodash";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import { Typo } from "../../styles";
import { antdKit as kit } from "../";
import { ButtonProps } from "../base";

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
        <kit.button icon={<PlusOutlined />} type={type}>
          Label
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </kit.button>
        <kit.button disabled icon={<PlusOutlined />} type={type}>
          Disabled
        </kit.button>
        <kit.button icon={<DownOutlined />} type={type} />
        <kit.button icon={<EllipsisOutlined />} type={type} shape="circle" />
        <kit.button loading type={type} />
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Danger</Subtitle>
        <kit.button danger icon={<PlusOutlined />} type={type}>
          Label
        </kit.button>
        <kit.button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </kit.button>
        <kit.button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </kit.button>
        <kit.button
          danger
          icon={<PlusOutlined />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </kit.button>
        <kit.button danger disabled icon={<PlusOutlined />} type={type}>
          Disabled
        </kit.button>
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Orange</Subtitle>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className="btn-primary-orange"
        >
          Label
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-hover")}
        >
          Hover
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-active")}
        >
          Active
        </kit.button>
        <kit.button
          icon={<PlusOutlined />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-focus")}
        >
          Focus
        </kit.button>
        <kit.button
          className="btn-primary-orange"
          disabled
          icon={<PlusOutlined />}
          type={type}
        >
          Disabled
        </kit.button>
      </Space>

      {(type === "ordinary" || type === "ordinary-onTint") && (
        <Space
          size="middle"
          style={{ padding: "12px", width: "100%", background }}
        >
          <Subtitle>{_.capitalize(type)} Blue</Subtitle>
          <kit.button
            className="ordinary-blue"
            icon={<PlusOutlined />}
            type={type}
          >
            Label
          </kit.button>
          <kit.button
            className={cs("ordinary-blue", "__pseudo-states-hover")}
            icon={<PlusOutlined />}
            type={type}
          >
            Hover
          </kit.button>
          <kit.button
            className={cs("ordinary-blue", "__pseudo-states-active")}
            icon={<PlusOutlined />}
            type={type}
          >
            Active
          </kit.button>
          <kit.button
            className={cs("ordinary-blue", "__pseudo-states-focus")}
            icon={<PlusOutlined />}
            type={type}
          >
            Focus
          </kit.button>
          <kit.button
            className="ordinary-blue"
            disabled
            icon={<PlusOutlined />}
            type={type}
          >
            Disabled
          </kit.button>
          <kit.button
            className="ordinary-blue"
            icon={<DownOutlined />}
            type={type}
          />
          <kit.button
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
          <kit.button
            className="quiet-blue"
            icon={<PlusOutlined />}
            type={type}
          >
            Label
          </kit.button>
          <kit.button
            className={cs("quiet-blue", "__pseudo-states-hover")}
            icon={<PlusOutlined />}
            type={type}
          >
            Hover
          </kit.button>
          <kit.button
            className={cs("quiet-blue", "__pseudo-states-active")}
            icon={<PlusOutlined />}
            type={type}
          >
            Active
          </kit.button>
          <kit.button
            className={cs("quiet-blue", "__pseudo-states-focus")}
            icon={<PlusOutlined />}
            type={type}
          >
            Focus
          </kit.button>
          <kit.button
            className="quiet-blue"
            disabled
            icon={<PlusOutlined />}
            type={type}
          >
            Disabled
          </kit.button>
          <kit.button
            className="quiet-blue"
            icon={<DownOutlined />}
            type={type}
          />
          <kit.button
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

export default {
  title: "Button",
  decorators: [withDesign],
};

export const Basic = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Size</Title>
      <Space style={{ marginTop: "12px" }}>
        <kit.button type="primary" size="large">
          Label
        </kit.button>
        <kit.button type="primary">Label</kit.button>
        <kit.button type="primary" size="small">
          Label
        </kit.button>
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

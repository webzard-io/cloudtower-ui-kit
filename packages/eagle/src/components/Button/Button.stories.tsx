import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Space } from "antd";
import cs from "classnames";
import _ from "lodash";
import React from "react";

import { ButtonProps } from "../../spec";
import { Typo } from "../Typo";
import Button from ".";
import {
  ArrowBoldDown16WhiteIcon,
  MoreEllipsis316BoldOntintIcon,
  PlusAddCreateNew16BoldOntintIcon,
} from "@cloudtower/icons-react";
import Icon from "../Icon";

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
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
        >
          Label
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </Button>
        <Button
          disabled
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
        >
          Disabled
        </Button>
        <Button icon={<Icon src={ArrowBoldDown16WhiteIcon} />} type={type} />
        <Button
          icon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
          type={type}
          shape="circle"
        />
        <Button loading type={type} />
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Danger</Subtitle>
        <Button
          danger
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
        >
          Label
        </Button>
        <Button
          danger
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-hover"
        >
          Hover
        </Button>
        <Button
          danger
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-active"
        >
          Active
        </Button>
        <Button
          danger
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="__pseudo-states-focus"
        >
          Focus
        </Button>
        <Button
          danger
          disabled
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
        >
          Disabled
        </Button>
      </Space>

      <Space
        size="middle"
        style={{ padding: "12px", width: "100%", background }}
      >
        <Subtitle>{_.capitalize(type)} Orange</Subtitle>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className="btn-primary-orange"
        >
          Label
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-hover")}
        >
          Hover
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-active")}
        >
          Active
        </Button>
        <Button
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
          type={type}
          className={cs("btn-primary-orange", "__pseudo-states-focus")}
        >
          Focus
        </Button>
        <Button
          className="btn-primary-orange"
          disabled
          prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
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
          <Button
            className="ordinary-blue"
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Label
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-hover")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Hover
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-active")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Active
          </Button>
          <Button
            className={cs("ordinary-blue", "__pseudo-states-focus")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Focus
          </Button>
          <Button
            className="ordinary-blue"
            disabled
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Disabled
          </Button>
          <Button
            className="ordinary-blue"
            icon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type={type}
          />
          <Button
            className="ordinary-blue"
            icon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
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
          <Button
            className="quiet-blue"
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Label
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-hover")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Hover
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-active")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Active
          </Button>
          <Button
            className={cs("quiet-blue", "__pseudo-states-focus")}
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Focus
          </Button>
          <Button
            className="quiet-blue"
            disabled
            prefixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type={type}
          >
            Disabled
          </Button>
          <Button
            className="quiet-blue"
            icon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type={type}
          />
          <Button
            className="quiet-blue"
            icon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
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

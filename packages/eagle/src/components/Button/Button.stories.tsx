import {
  ArrowBoldDown16WhiteIcon,
  MoreEllipsis316BoldOntintIcon,
  PlusAddCreateNew16BoldOntintIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Space } from "antd";
import cs from "classnames";
import _ from "lodash";
import React from "react";

import { ButtonProps } from "../../spec";
import Icon from "../Icon";
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
        <Button
          prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
          type={type}
        />
        <Button
          prefixIcon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
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
            prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type={type}
          />
          <Button
            className="ordinary-blue"
            prefixIcon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
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
            prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type={type}
          />
          <Button
            className="quiet-blue"
            prefixIcon={<Icon src={MoreEllipsis316BoldOntintIcon} />}
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

export const RoundedIcon = () => {
  return (
    <>
      <Title>
        为了避免与 suffixIcon 和 prefixIcon 属性混淆使用，移除了 icon
        属性。如果您需要单独的图标按钮，请使用 suffixIcon 或 prefixIcon
        属性，并且不需要传递 children。
      </Title>
      <div style={{ marginBottom: "10px" }}>
        <span style={{ width: "110px", display: "inline-block" }}>
          only prefixIcon:
        </span>
        <Space>
          <Button
            size="large"
            prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type="primary"
          />
          <Button
            size="middle"
            prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type="primary"
          />
          <Button
            size="small"
            prefixIcon={<Icon src={ArrowBoldDown16WhiteIcon} />}
            type="primary"
          />
        </Space>
      </div>
      <div>
        <span style={{ width: "110px", display: "inline-block" }}>
          only suffixIcon:
        </span>
        <Space>
          <Button
            size="large"
            suffixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type="primary"
          />
          <Button
            size="middle"
            suffixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type="primary"
          />
          <Button
            size="small"
            suffixIcon={<Icon src={PlusAddCreateNew16BoldOntintIcon} />}
            type="primary"
          />
        </Space>
      </div>
    </>
  );
};

export const CustomChildren = () => {
  return (
    <>
      <Title>
        children 结构稍微复杂的情况，比如在 children 组合使用 Icon +
        text，需要使用者自己保证 Icon 和文字的间距
      </Title>
      <div style={{ marginTop: "20px" }}>
        <Space>
          <Button
            size="middle"
            type="primary"
            className={css`
              column-gap: 8px;
            `}
          >
            <Icon src={PlusAddCreateNew16BoldOntintIcon} />
            text
          </Button>
        </Space>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Space>
          <Button
            size="middle"
            type="primary"
            className={css`
              column-gap: 8px;
              width: 200px;
            `}
          >
            <Icon src={PlusAddCreateNew16BoldOntintIcon} />
            text
          </Button>
        </Space>
      </div>
    </>
  );
};

export const Link = () => {
  return (
    <>
      <div>
        <p>当 type 传入 'link'时，会呈现为超链接文本的形式</p>
        <p>
          不建议通过 type='link' 的形式使用 button 来实现超链接的效果，应该使用
          Link 组件
        </p>
        <p>这里仅对已有的用法进行展示</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button type="link">text</Button>
      </div>
    </>
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

export const ButtonWithTooltip = () => {
  return (
    <Tooltip placement="top" title="show tooltip here">
      <Button>Test</Button>
    </Tooltip>
  );
};

import {
  Jump16GradientBlueIcon,
  Placeholder16Icon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Link from "@src/components/Link";
import { Typo } from "@src/components/Typo";
import { LinkComponentType } from "@src/spec";
import { Stack } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import cs from "classnames";
import React from "react";

const Title: React.FC<{ className?: string }> = ({ children, className }) => (
  <div
    style={{ marginTop: "16px" }}
    className={cs(Typo.Display.d2_bold_title, className)}
  >
    {children}
  </div>
);

const Description: React.FC = ({ children }) => (
  <div
    style={{ width: "90px" }}
    className={cs(
      Typo.Label.l2_regular,
      css`
        color: $text-light-secondary;
      `
    )}
  >
    {children}
  </div>
);

const story: Meta<LinkComponentType> = {
  title: "Link",
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          "具有导航属性的可交互文本，点击后跳转到某个页面，通常出现在句子中或句子后。",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/S8p67oojCXWvxTCc38B7uk/Link%EF%BD%9C%E8%B6%85%E9%93%BE%E6%8E%A5?node-id=1235%3A24718&mode=dev",
    },
  },
};

export const Default: StoryObj<{
  type?: "default" | "subtle";
  disabled?: boolean;
  href?: string;
  content?: string;
  target?: string;
  showIcon?: boolean;
}> = {
  render: ({ content, showIcon, ...props }) => {
    return (
      <Link
        prefixIcon={showIcon ? <Jump16GradientBlueIcon /> : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  },
  args: {
    content: "Link",
    type: undefined,
    disabled: false,
    showIcon: true,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["default", "subtle"],
    },
  },
};

export const StyleAndBehavior: StoryObj<LinkComponentType> = {
  parameters: {
    docs: {
      description: {
        story: "样式和行为",
      },
    },
  },
  render: () => {
    const modes = ["Default", "Hover", "Active", "Disabled"];
    const types = ["default", "subtle"] as const;

    return (
      <>
        <div
          className={css`
            ol,
            ul {
              list-style: auto;
              margin-left: 20px;
            }
          `}
        >
          <Title>样式和行为</Title>
          <ol style={{ marginTop: "16px" }}>
            <li>
              组件样式：Link 组件当前提供两种样式，包括主要应用于句子或段落中的
              Default 样式和搭配 Table 组件使用的 Subtle 样式
            </li>
            <li>
              交互状态：默认、悬浮、点击 3
              种状态必须呈现；禁用状态，设计师可根据具体场景选择使用。
            </li>
          </ol>
        </div>
        <div style={{ padding: "20px" }}>
          <Stack direction="vertical">
            <Stack>
              <span style={{ width: "90px" }} />
              {modes.map((mode) => (
                <Description>{mode}</Description>
              ))}
            </Stack>
            {types.map((type) => (
              <Stack
                className={css`
                  & > .box {
                    width: 90px;
                  }
                `}
              >
                <Description>{type}</Description>
                <div className="box">
                  <Link type={type}>Label</Link>
                </div>
                <div className="box">
                  <Link className="__pseudo-states-hover" type={type}>
                    Label
                  </Link>
                </div>
                <div className="box">
                  <Link className="__pseudo-states-active" type={type}>
                    Label
                  </Link>
                </div>
                <div className="box">
                  <Link disabled type={type}>
                    Label
                  </Link>
                </div>
              </Stack>
            ))}
          </Stack>
        </div>
      </>
    );
  },
};

export const Variants: StoryObj<LinkComponentType> = {
  parameters: {
    docs: {
      description: {
        story: "所有变体",
      },
    },
  },
  render: () => {
    const modes = [
      {
        name: "Default",
      },
      {
        name: "Hover",
        className: "__pseudo-states-hover",
      },
      {
        name: "Active",
        className: "__pseudo-states-active",
      },
      {
        name: "Disabled",
        disabled: true,
      },
    ];
    const types = ["No Icon", "Icon Left", "Icon Right"];

    const VariantsComponent = ({ type }: { type: "default" | "subtle" }) => {
      return (
        <Stack direction="vertical">
          <Stack>
            {type === "default" && <span style={{ width: "90px" }} />}
            {types.map((type) => (
              <Description>{type}</Description>
            ))}
          </Stack>
          {modes.map((m) => (
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              {type === "default" && <Description>{m.name}</Description>}
              <div className="box">
                <Link className={m.className} type={type} disabled={m.disabled}>
                  Label
                </Link>
              </div>
              <div className="box">
                <Link
                  className={m.className}
                  type={type}
                  disabled={m.disabled}
                  prefixIcon={<Placeholder16Icon />}
                >
                  Label
                </Link>
              </div>
              <div className="box">
                <Link
                  suffixIcon={<Placeholder16Icon />}
                  className={m.className}
                  type={type}
                  disabled={m.disabled}
                >
                  Label
                </Link>
              </div>
            </Stack>
          ))}
        </Stack>
      );
    };

    return (
      <Stack>
        <Stack
          className={css`
            margin-right: 50px;
          `}
          direction="vertical"
        >
          <Title
            className={css`
              padding-left: 102px;
            `}
          >
            Default
          </Title>
          <VariantsComponent type="default" />
        </Stack>
        <Stack direction="vertical">
          <Title>Subtle</Title>
          <VariantsComponent type="subtle" />
        </Stack>
      </Stack>
    );
  },
};

export default story;

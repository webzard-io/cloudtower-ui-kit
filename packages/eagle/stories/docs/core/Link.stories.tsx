import {
  Jump16GradientBlueIcon,
  Placeholder16Icon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Link from "@src/core/Link";
import { Typo } from "@src/core/Typo";
import { LinkComponentType, LinkProps } from "@src/spec";
import { Stack, Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import cs from "classnames";
import React from "react";

type Story = StoryObj<LinkComponentType>;

const Description: React.FC = ({ children }) => (
  <div
    style={{ width: "130px" }}
    className={cs(
      Typo.Label.l2_regular,
      css`
        color: $text-light-secondary;
      `,
    )}
  >
    {children}
  </div>
);

/**
 * 具有导航属性的可交互文本，点击后跳转到某个页面，通常出现在句子中或句子后。
 */
const story: Meta<LinkComponentType> = {
  title: "Core/Link | 文本链接",
  component: Link,
  parameters: {
    controls: { include: ["type", "disabled"] },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/S8p67oojCXWvxTCc38B7uk/Link%EF%BD%9C%E8%B6%85%E9%93%BE%E6%8E%A5?node-id=1235%3A24718&mode=dev",
    },
  },
};

/**
 * Link 组件由图标（可选）、文本标签构成
 */
export const Basic: Story = {
  name: "构成",
  args: {
    children: "Link",
    type: "default",
    disabled: false,
    prefixIcon: <Jump16GradientBlueIcon />,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["default", "primary", "secondary"],
    },
  },
};

/**
 * 组件样式：Link 组件当前提供 3 种样式：
 *
 * - Default ：主要应用于句子或段落中
 *
 * - Primary：搭配其他组件使用，例如 Table 组件
 *
 * - Secondary ：搭配其他组件使用，例如 Progress Bar 组件
 *
 * 交互状态：默认、悬浮、点击 3 种状态必须呈现；禁用状态
 *
 */
export const StyleAndBehavior: StoryObj<LinkComponentType> = {
  name: "样式和行为",
  render: () => {
    const modes = ["Default", "Hover", "Active", "Disabled"];
    const types = ["default", "primary", "secondary"] as const;

    return (
      <div style={{ padding: "20px" }}>
        <Stack direction="vertical">
          <Stack>
            <span style={{ width: "130px" }} />
            {modes.map((mode) => (
              <Description>{mode}</Description>
            ))}
          </Stack>
          {types.map((type) => (
            <Stack
              className={css`
                & > .box {
                  width: 130px;
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
    );
  },
};

export const Variants: StoryObj<LinkComponentType> = {
  name: "所有变体",
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
    const types = ["No Icon", "Icon Left", "Icon Right", "Icon Left and Right"];

    const VariantsComponent = ({
      title,
      type,
    }: {
      title: string;
      type: LinkProps["type"];
    }) => {
      return (
        <Stack direction="vertical">
          <Title>{title}</Title>
          <Stack direction="vertical">
            <Stack>
              <span style={{ width: "130px" }} />
              {types.map((type) => (
                <Description>{type}</Description>
              ))}
            </Stack>
            {modes.map((m) => (
              <Stack
                className={css`
                  & > .box {
                    width: 130px;
                  }
                `}
              >
                <Description>{m.name}</Description>
                <div className="box">
                  <Link
                    className={m.className}
                    type={type}
                    disabled={m.disabled}
                  >
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
                <div className="box">
                  <Link
                    suffixIcon={<Placeholder16Icon />}
                    prefixIcon={<Placeholder16Icon />}
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
        </Stack>
      );
    };

    return (
      <Stack direction="vertical">
        <VariantsComponent title="Default" type="default" />
        <VariantsComponent title="Primary" type="primary" />
        <VariantsComponent title="Secondary" type="secondary" />
      </Stack>
    );
  },
};

export default story;

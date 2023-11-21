import { Placeholder16Icon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Meta, StoryObj } from "@storybook/react";
import cs from "classnames";
import React from "react";

import { LinkComponentType } from "../../spec";
import Stack from "../Stack";
import { Typo } from "../Typo";
import Link from ".";

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
      `,
    )}
  >
    {children}
  </div>
);

const story: Meta<LinkComponentType> = {
  title: "Link",
  component: Link,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/S8p67oojCXWvxTCc38B7uk/Link%EF%BD%9C%E8%B6%85%E9%93%BE%E6%8E%A5?node-id=1235%3A24718&mode=dev",
    },
  },
};

export const Basic: StoryObj<LinkComponentType> = {
  render: () => {
    const modes = ["Default", "Hover", "Active", "Disabled"];
    const types = ["default", "subtle"] as const;

    return (
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
    );
  },
};

export const Variants: StoryObj<LinkComponentType> = {
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

    const VariantsComponent = ({ type }) => {
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

export const Default: StoryObj<{
  type?: "default" | "subtle";
  disabled?: boolean;
  href?: string;
  content?: string;
  target?: string;
}> = {
  render: ({ content, ...props }) => {
    return <Link {...props}>{content}</Link>;
  },
  args: {
    content: "Link",
    type: undefined,
    disabled: false,
    href: "https://www.google.com",
    target: "__blank",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["default", "subtle"],
    },
  },
};

export default story;

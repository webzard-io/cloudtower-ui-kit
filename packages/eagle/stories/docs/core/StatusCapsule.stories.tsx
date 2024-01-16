import { css } from "@linaria/core";
import StatusCapsule from "@src/core/StatusCapsule";
import { PresetColors } from "@src/core/StatusCapsule";
import { Typo } from "@src/core/Typo";
import { StatusCapsuleColor, StatusCapsuleComponentType } from "@src/spec";
import { Stack } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import cs from "classnames";
import React from "react";

const Title: React.FC<{ classNames?: string }> = ({ children, classNames }) => (
  <div
    style={{ marginTop: "16px", marginBottom: "16px" }}
    className={cs(Typo.Display.d2_bold_title, classNames)}
  >
    {children}
  </div>
);

const story: Meta<StatusCapsuleComponentType> = {
  title: "Core/StatusCapsule",
  component: StatusCapsule,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/fn3cJbku877wDMImYgQv9H/Status-Capsule?node-id=1527%3A2957&mode=dev",
    },
  },
};

export const Basic: StoryObj<StatusCapsuleComponentType> = {
  render: () => {
    const modes = ["Default", "Hover", "Default", "Hover"];
    return (
      <Stack>
        <div style={{ marginRight: "70px" }}>
          <Title
            classNames={css`
              padding-left: 100px;
            `}
          >
            Colorful bg
          </Title>
          <Stack direction="vertical">
            <Stack>
              <span style={{ width: "90px" }} />
              {modes.map((mode) => (
                <div style={{ width: "90px" }}>{mode}</div>
              ))}
            </Stack>
            {PresetColors.map((color) => (
              <Stack
                className={css`
                  & > .box {
                    width: 90px;
                  }
                `}
              >
                <span style={{ width: "90px" }}>{color}</span>
                <div className="box">
                  <StatusCapsule color={color}>Label</StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule
                    className="__pseudo-states-hover"
                    color={color}
                  >
                    Label
                  </StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule number={1} color={color}>
                    Label
                  </StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule
                    number={1}
                    className="__pseudo-states-hover"
                    color={color}
                  >
                    Label
                  </StatusCapsule>
                </div>
              </Stack>
            ))}
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <span style={{ width: "90px" }}>loading</span>
              <div className="box">
                <StatusCapsule loading>Label</StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule className="__pseudo-states-hover" loading>
                  Label
                </StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule number={1} loading>
                  Label
                </StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule
                  className="__pseudo-states-hover"
                  number={1}
                  loading
                >
                  Label
                </StatusCapsule>
              </div>
            </Stack>
          </Stack>
        </div>
        <div>
          <Title>Off-White bg</Title>
          <Stack direction="vertical">
            <Stack>
              {modes.map((mode) => (
                <div style={{ width: "90px" }}>{mode}</div>
              ))}
            </Stack>
            {PresetColors.map((color) => (
              <Stack
                className={css`
                  & > .box {
                    width: 90px;
                  }
                `}
              >
                <div className="box">
                  <StatusCapsule offWhiteMode color={color}>
                    Label
                  </StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule
                    offWhiteMode
                    className="__pseudo-states-hover"
                    color={color}
                  >
                    Label
                  </StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule offWhiteMode number={1} color={color}>
                    Label
                  </StatusCapsule>
                </div>
                <div className="box">
                  <StatusCapsule
                    offWhiteMode
                    number={1}
                    className="__pseudo-states-hover"
                    color={color}
                  >
                    Label
                  </StatusCapsule>
                </div>
              </Stack>
            ))}
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <div className="box">
                <StatusCapsule offWhiteMode loading>
                  Label
                </StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule
                  offWhiteMode
                  className="__pseudo-states-hover"
                  loading
                >
                  Label
                </StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule offWhiteMode number={1} loading>
                  Label
                </StatusCapsule>
              </div>
              <div className="box">
                <StatusCapsule
                  offWhiteMode
                  className="__pseudo-states-hover"
                  number={1}
                  loading
                >
                  Label
                </StatusCapsule>
              </div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    );
  },
};

export const Default: StoryObj<{
  content: string;
  color: StatusCapsuleColor;
  hoverable: boolean;
  offWhiteMode?: boolean;
  number?: number;
}> = {
  render: ({ content, ...props }) => {
    return <StatusCapsule {...props}>{content}</StatusCapsule>;
  },
  args: {
    content: "label",
    color: undefined,
    offWhiteMode: false,
    hoverable: false,
    number: 0,
  },
  argTypes: {
    color: {
      control: "radio",
      options: [
        "blue",
        "red",
        "yellow",
        "green",
        "gray",
        "success",
        "danger",
        "warning",
      ],
    },
  },
};

export default story;

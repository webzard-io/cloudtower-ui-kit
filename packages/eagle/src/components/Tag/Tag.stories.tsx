import {
  ErrorExclamationIcon,
  InfoICircleFill16BlueIcon,
  Loading16GradientBlueIcon,
  NoticeTriangleFill16YellowIcon,
  Placeholder16Icon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { ComponentStory, Story } from "@storybook/react";
import React from "react";
import { withDesign } from "storybook-addon-designs";

import { SplitTagComponentType, TagComponentType } from "../../spec";
import Stack from "../Stack";
import BaseTruncate from "../Truncate";
import { Typo } from "../Typo";
import Tag, { PresetColors as TagPresetColors } from ".";
import { PresetColors } from "./const";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "Tag",
  decorators: [withDesign],
};

const modes = ["Default", "Hover", "Default", "Hover"];

export const Basic: ComponentStory<TagComponentType> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>Small</Title>
      <Stack direction="vertical">
        <Stack>
          <span style={{ width: "90px" }} />
          {modes.map((mode) => (
            <div style={{ width: "90px" }}>{mode}</div>
          ))}
        </Stack>
        {TagPresetColors.map((color) => (
          <Stack
            className={css`
              & > .box {
                width: 90px;
              }
            `}
          >
            <span style={{ width: "90px" }}>{color}</span>
            <div className="box">
              <Tag size="small" color={color}>
                Label
              </Tag>
            </div>
            <div className="box">
              {color.includes("ontint") ? (
                <span />
              ) : (
                <Tag
                  className="__pseudo-states-hover"
                  size="small"
                  color={color}
                >
                  Label
                </Tag>
              )}
            </div>
            <div className="box">
              <Tag icon={<Placeholder16Icon />} size="small" color={color}>
                Label
              </Tag>
            </div>
            <div className="box">
              {color.includes("ontint") ? (
                <span />
              ) : (
                <Tag
                  className="__pseudo-states-hover"
                  icon={<Placeholder16Icon />}
                  size="small"
                  color={color}
                >
                  Label
                </Tag>
              )}
            </div>
          </Stack>
        ))}
      </Stack>
      <Title>Medium</Title>
      <Stack direction="vertical">
        {TagPresetColors.map((color) => (
          <Stack
            className={css`
              & > .box {
                width: 90px;
              }
            `}
          >
            <span style={{ width: "90px" }}>{color}</span>
            <div className="box">
              <Tag size="medium" color={color}>
                Label
              </Tag>
            </div>
            <div className="box">
              {color.includes("ontint") ? (
                <span />
              ) : (
                <Tag
                  className="__pseudo-states-hover"
                  size="medium"
                  color={color}
                >
                  Label
                </Tag>
              )}
            </div>
            <div className="box">
              <Tag icon={<Placeholder16Icon />} size="medium" color={color}>
                Label
              </Tag>
            </div>
            <div className="box">
              {color.includes("ontint") ? (
                <span />
              ) : (
                <Tag
                  className="__pseudo-states-hover"
                  icon={<Placeholder16Icon />}
                  size="medium"
                  color={color}
                >
                  Label
                </Tag>
              )}
            </div>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/%5BArchived%5D-CloudTower-UI-1.0.5?type=design&node-id=405-9&mode=design&t=sD3RRB9kLjiEzIo4-0",
    },
  },
};

export const Custom: Story<{
  content: string;
  color: string;
  size: "small" | "medium";
  hoverable: boolean;
}> = ({ content, ...props }) => {
  return <Tag {...props}>{content}</Tag>;
};

Custom.args = {
  color: "blue",
  hoverable: true,
  content: "label",
  size: "small",
};

Custom.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium"],
    },
  },
};

export const SplitTag: ComponentStory<SplitTagComponentType> = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div>Tag.SplitTag</div>
      <Title>Small</Title>
      <Stack direction="vertical">
        {PresetColors.map((color) => (
          <Stack>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              size="small"
              color={color}
            />
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              icon={<Placeholder16Icon />}
              size="small"
              color={color}
            />
          </Stack>
        ))}
      </Stack>
      <Title>Medium</Title>
      <Stack direction="vertical">
        {PresetColors.map((color) => (
          <Stack>
            <span style={{ display: "inline-block", width: "90px" }}>
              {color}
            </span>
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              size="medium"
              color={color}
            />
            <Tag.SplitTag
              primaryContent="Label"
              secondaryContent="Label"
              icon={<Placeholder16Icon />}
              size="medium"
              color={color}
            />
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export const Truncate: Story<{
  content: string;
  len: number;
  color: string;
  size: "small" | "medium";
}> = ({ content, len, ...props }) => {
  return (
    <>
      <div>配合 Truncate 组件使用</div>
      <div style={{ marginTop: "50px" }}>
        <Tag {...props}>
          <BaseTruncate backLen={0} text={content} len={len} />
        </Tag>
      </div>
    </>
  );
};

Truncate.args = {
  content: "longlonglonglong",
  color: "magenta",
  size: "small",
  len: 10,
};
Truncate.argTypes = {
  size: {
    control: {
      type: "select",
      options: ["small", "medium"],
    },
  },
};

export const WithIcon = () => {
  return (
    <>
      <Stack direction="vertical">
        <Stack>
          <span>small-tag</span>
          <Stack>
            <Tag icon={<ErrorExclamationIcon />} size="small" color="red">
              1
            </Tag>
            <Tag
              icon={<NoticeTriangleFill16YellowIcon />}
              size="small"
              color="yellow"
            >
              1
            </Tag>
            <Tag icon={<InfoICircleFill16BlueIcon />} size="small" color="blue">
              2
            </Tag>
            <Tag icon={<Loading16GradientBlueIcon />} size="small" color="gray">
              2
            </Tag>
          </Stack>
        </Stack>
        <Stack>
          <span>medium-tag</span>
          <Stack>
            <Tag icon={<ErrorExclamationIcon />} size="medium" color="red">
              1
            </Tag>
            <Tag
              icon={<NoticeTriangleFill16YellowIcon />}
              size="medium"
              color="yellow"
            >
              1
            </Tag>
            <Tag
              icon={<InfoICircleFill16BlueIcon />}
              size="medium"
              color="blue"
            >
              2
            </Tag>
            <Tag
              icon={<Loading16GradientBlueIcon />}
              size="medium"
              color="gray"
            >
              2
            </Tag>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default story;

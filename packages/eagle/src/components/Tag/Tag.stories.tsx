import {
  ErrorExclamationIcon,
  InfoICircleFill16BlueIcon,
  Loading16GradientBlueIcon,
  NoticeTriangleFill16YellowIcon,
  Placeholder16Icon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Tag, { PresetColors as TagPresetColors } from "@src/components/Tag";
import { PresetColors } from "@src/components/Tag/const";
import BaseTruncate from "@src/components/Truncate";
import { SplitTagComponentType, TagColor, TagComponentType } from "@src/spec";
import { Container, Stack, Title } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
const story: Meta<TagComponentType> = {
  title: "Tag",
  component: Tag,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ZE1a32eYk89k4cfGEEOph2/Tag-%26-Token-%7C-%E6%A0%87%E7%AD%BE%E5%92%8C%E5%8F%AF%E7%BC%96%E8%BE%91%E6%A0%87%E7%AD%BE?type=design&node-id=1-41&mode=design&t=FzfpehZkOFyt0tte-0",
    },
  },
};

const modes = ["Default", "Hover", "Default", "Hover"];

export const Basic: StoryObj<{
  content: string;
  color: TagColor;
  size: "small" | "medium";
  hoverable: boolean;
}> = {
  render: () => {
    return (
      <>
        <div>
          <Title>类型</Title>
          <Container>
            <Stack spacing={50}>
              <Stack direction="vertical">
                <Title size="small">Basic Tag</Title>
                <div className="component">
                  <Tag color="blue">Label</Tag>
                </div>
              </Stack>
              <Stack direction="vertical">
                <Title size="small">Tag with Icon</Title>
                <div className="component">
                  <Tag color="blue" icon={<Placeholder16Icon />}>
                    Label
                  </Tag>
                </div>
              </Stack>
              <Stack direction="vertical">
                <Title size="small">Split Tag</Title>
                <div className="component">
                  <Tag.SplitTag
                    color="blue"
                    primaryContent="Label"
                    secondaryContent="Label"
                  >
                    Label
                  </Tag.SplitTag>
                </div>
              </Stack>
              <Stack direction="vertical">
                <Title size="small">Split Tag with Icon</Title>
                <div className="component">
                  <Tag.SplitTag
                    color="blue"
                    icon={<Placeholder16Icon />}
                    primaryContent="Label"
                    secondaryContent="Label"
                  >
                    Label
                  </Tag.SplitTag>
                </div>
              </Stack>
              <Stack direction="vertical">
                <Title size="small">Name Tag</Title>
                <div className="component">
                  <Tag.NameTag>Label</Tag.NameTag>
                </div>
              </Stack>
            </Stack>
          </Container>
        </div>
      </>
    );
  },
};

export const Variants: StoryObj<TagComponentType> = {
  render: () => {
    return (
      <>
        <Title>所有变体</Title>
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
      </>
    );
  },
};

export const Custom: StoryObj<{
  content: string;
  color: TagColor;
  size: "small" | "medium";
  hoverable: boolean;
}> = {
  render: ({ content, ...props }) => {
    return <Tag {...props}>{content}</Tag>;
  },
  args: {
    content: "label",
    size: undefined,
    color: undefined,
    hoverable: false,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "medium"],
    },
    color: {
      control: "radio",
      options: ["blue", "red", "yellow", "green", "gray"],
    },
  },
};

export const SplitTag: StoryObj<SplitTagComponentType> = {
  render: () => {
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
  },
};

export const Truncate: StoryObj<{
  content: string;
  len: number;
  color: TagColor;
  size: "small" | "medium";
}> = {
  render: ({ content, len, ...props }) => {
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
  },
  args: {
    content: "longlonglonglong",
    color: "default",
    size: "small",
    len: 10,
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium"],
      },
    },
  },
};

export const legacyWithAntd = {
  render: () => {
    const antdColors: TagColor[] = [
      "success",
      "processing",
      "error",
      "warning",
      "default",
    ];
    return (
      <>
        <div>对齐 antd 原来的命名</div>
        {antdColors.map((color) => (
          <Tag size="medium" style={{ marginRight: "5px" }} color={color}>
            {color}
          </Tag>
        ))}
      </>
    );
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

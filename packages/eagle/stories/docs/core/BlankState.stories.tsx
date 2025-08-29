import BlankState from "@src/core/BlankState";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  component: BlankState,
  title: "Core/BlankState | 空白状态",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/6ojVUQ97WttmbAFc0PXueC/%E7%A9%BA%E7%99%BD%E7%8A%B6%E6%80%81?node-id=2093-22032&t=3iPTQ7Npwfgt43o0-0",
    },
  },
} satisfies CoreMeta<typeof BlankState>;

export default meta;

type Story = StoryObj<typeof BlankState>;

const commonContainerStyle: React.CSSProperties = {
  width: 400,
  height: 300,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/**
 * 基础用法
 */
export const DefaultMediumBlankState: Story = {
  name: "默认大小",
  render: (args) => {
    return (
      <BlankState
        {...args}
        title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle"
        description="ReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReason"
        action={{
          label: "Action",
          onClick: () => {
            console.log("handle action");
          },
        }}
      />
    );
  },
};

/**
 * Large size
 */
export const LargeBlankState: Story = {
  name: "size: large",
  render: (args) => {
    return (
      <div style={{ width: 800, height: 400 }}>
        <BlankState
          {...args}
          size="large"
          title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle"
          description="ReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

/**
 * Large size 指定宽度 200px
 */
export const LargeBlankStateWithSpecifyContainer: Story = {
  name: "size: large,width: 200",
  render: (args) => {
    return (
      <div style={{ width: 800, height: 400 }}>
        <BlankState
          {...args}
          width={200}
          size="large"
          title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle"
          description="ReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

/**
 * Small size
 */
export const SmallBlankState: Story = {
  name: "size: small",
  render: (args) => {
    return (
      <div style={commonContainerStyle}>
        <BlankState
          {...args}
          size="small"
          title="TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle"
          description="ReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

/**
 * Area size with gray background
 */
export const AreaBlankState: Story = {
  name: "size: area",
  render: (args) => {
    return (
      <div style={commonContainerStyle}>
        <BlankState
          {...args}
          size="area"
          backgroundColor="gray"
          title="TitleTitle"
          description="Reason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

/**
 * Area size with white background
 */
export const AreaBlankStateWithWhiteBackground: Story = {
  name: "size: area",
  render: (args) => {
    return (
      <div style={{ ...commonContainerStyle, backgroundColor: "black" }}>
        <BlankState
          {...args}
          size="area"
          backgroundColor="white"
          title="TitleTitle"
          description="Reason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

/**
 * XSmall size 不含描述
 */
export const XSmallBlankState: Story = {
  name: "size: xSmall",
  render: (args) => {
    return (
      <div style={commonContainerStyle}>
        <BlankState
          {...args}
          size="xSmall"
          title="Title"
          description="ReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReasonReason"
          action={{
            label: "Action",
            onClick: () => {
              console.log("handle action");
            },
          }}
        />
      </div>
    );
  },
};

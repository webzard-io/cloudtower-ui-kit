import { Antd5Anchor, Antd5AnchorProps } from "@src/core";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

type Story = StoryObj<React.FC<Antd5AnchorProps>>;

/**
 * Antd5Anchor 是 antd5 的 Anchor 组件。
 *
 * 详细用法参考：https://ant.design/components/anchor-cn
 * API 保持一致
 */

const meta: Meta<React.FC<Antd5AnchorProps>> = {
  title: "Core/Antd5Anchor",
  component: Antd5Anchor,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export default meta;

export const Basic: Story = {
  name: "基础用法",
  parameters: {
    controls: {
      include: ["menu"],
    },
  },
  render: () => {
    return (
      <div>
        <div
          id="antd5-anchor-container"
          style={{
            width: "400px",
            height: "400px",
            overflow: "auto",
            display: "inline-block",
          }}
        >
          <div
            id="first"
            style={{ height: "400px", background: "rgba(255,0,0,0.02)" }}
          />
          <div
            id="second"
            style={{ height: "400px", background: "rgba(0,255,0,0.02)" }}
          />
        </div>
        <div
          style={{
            display: "inline-block",
          }}
        >
          <Antd5Anchor
            getContainer={() =>
              document.getElementById("antd5-anchor-container") ?? window
            }
            replace={false}
            items={[
              {
                key: "1",
                href: "#first",
                title: "Anchor 1",
              },
              {
                key: "2",
                href: "#second",
                title: "Anchor 2",
              },
            ]}
          />
        </div>
      </div>
    );
  },
  args: {},
};

import { css } from "@linaria/core";
import { Antd5Dropdown, Antd5DropdownProps } from "@src/core";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Space, Typography } from "antd5";

type Story = StoryObj<React.FC<Antd5DropdownProps>>;

/**
 * 本Dropdown是 antd5 的 Dropdown 组件。
 *
 * 详细用法参考：https://ant.design/components/dropdown-cn
 */
const meta: Meta<React.FC<Antd5DropdownProps>> = {
  title: "Core/Antd5Dropdown",
  component: Antd5Dropdown,
  decorators: [
    (Story) => {
      return (
        <div
          className={css`
            width: 600px;
            display: flex;
            row-gap: 20px;
            flex-direction: column;
            padding-bottom: 40px;
          `}
        >
          {<Story />}
        </div>
      );
    },
  ],
};

export default meta;

const menu: Antd5DropdownProps["menu"] = {
  items: [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ],
  selectable: true,
  defaultSelectedKeys: ["3"],
};

export const Basic: Story = {
  name: "基础用法",
  parameters: {
    controls: {
      include: ["menu"],
    },
  },
  render: (props) => {
    return (
      <Antd5Dropdown menu={menu}>
        <Typography.Link>
          <Space>Selectable</Space>
        </Typography.Link>
      </Antd5Dropdown>
    );
  },
  args: {},
};

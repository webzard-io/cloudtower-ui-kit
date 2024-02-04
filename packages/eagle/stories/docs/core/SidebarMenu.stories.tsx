import { css } from "@linaria/core";
import { SidebarMenu, SidebarMenuItemProps, SidebarMenuProps } from "@src/core";
import type { ProgressProps } from "@src/core/Progress/progress.type";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

type Story = StoryObj<React.FC<ProgressProps>>;

/**
 * 本侧边栏是 antd5 的 Menu 组件，主要用途的是侧边栏导航菜单。
 *
 * 详细用法参考：https://ant.design/components/menu-cn
 */
const meta: Meta<React.FC<ProgressProps>> = {
  title: "Core/SidebarMenu | 侧边栏菜单",
  component: SidebarMenu,
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

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: SidebarMenuItemProps[],
  type?: "group",
): SidebarMenuItemProps {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as SidebarMenuItemProps;
}

const items: SidebarMenuProps["items"] = [
  getItem("Navigation One", "sub1", null, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group",
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group",
    ),
  ]),

  getItem("Navigation Two", "sub2", null, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  getItem("Navigation Three", "sub4", null, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

export const Basic: Story = {
  name: "基础用法",
  parameters: {
    controls: {
      include: ["items"],
    },
  },
  render: (props) => {
    return <SidebarMenu items={items} />;
  },
  args: {},
};

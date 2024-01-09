import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";

import { CustomHeader } from "./CustomHeader.stories";
import ExpandableContainer from "./ExpandableContainer";
import ExpandableItem from "./ExpandableItem";

export const Template: StoryFn<typeof ExpandableItem> = (args) => {
  return (
    <div style={{ padding: "20px", background: "#EDF0F7" }}>
      <ExpandableContainer>
        <ExpandableItem header={<CustomHeader />} {...args}>
          <div>hello custom</div>
        </ExpandableItem>
      </ExpandableContainer>
    </div>
  );
};

const meta: Meta<typeof ExpandableItem> = {
  title: "Core/Expandable List | 可展开收起列表/Item",
  render: Template,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/BtAxslDBMmBZ3P8WZ1yAQf/Expandable-List-%7C-%E5%8F%AF%E5%B1%95%E5%BC%80%E6%94%B6%E8%B5%B7%E5%88%97%E8%A1%A8?type=design&node-id=1-41&mode=design&t=WytLBBYgSbNHz2uP-0",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExpandableItem>;

export const OrderedOneExpand: Story = {
  args: {
    order: 1,
  },
};

export const OrderedElevenExpand: Story = {
  args: {
    order: 11,
  },
};

export const DisableExpand: Story = {
  args: {
    disableExpand: true,
  },
};

export const ActivedDisableExpand: Story = {
  args: {
    disableExpand: true,
    defaultActive: true,
  },
};

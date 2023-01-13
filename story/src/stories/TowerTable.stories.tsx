import { ITowerTableProps, TowerTable } from "@cloudtower/eagle";
import { antdKit } from "@cloudtower/eagle";
import { kitContext } from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TowerTable",
  component: TowerTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => {
      return (
        <kitContext.Provider value={antdKit}>
          <Story />
        </kitContext.Provider>
      );
    },
  ],
} as ComponentMeta<typeof TowerTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<
  React.FC<ITowerTableProps<{ id: string; h1: string; h2: string; h3: string }>>
> = (args) => <TowerTable {...args} />;

export const common = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
common.args = {
  uniqueTableKey: "TestTowerTable",
  loading: false,
  empty: false,
  dataSource: [
    {
      id: "1",
      h1: "hello",
      h2: "hello2",
      h3: "hello3",
    },
    {
      id: "2",
      h1: "hello",
      h2: "hello2",
      h3: "hello3",
    },
  ],
  pagination: {
    count: 4,
    skip: 0,
    size: 2,
    defaultSize: 10,
  },
  columns: [
    {
      title: "h1",
      key: "h1",
      dataIndex: "h1",
      sortOrder: "ascend",
      sortable: true,
      sorter: true,
      width: 150,
    },
    {
      title: "h2",
      key: "h2",
      dataIndex: "h2",
      sortOrder: "ascend",
      sortable: true,
      sorter: true,
      width: 150,
    },
    {
      title: "h3",
      key: "h3",
      dataIndex: "h3",
      sortOrder: "ascend",
      sortable: true,
      sorter: true,
      width: 150,
    },
  ],
  refetch: async () => {
    return [];
  },
};

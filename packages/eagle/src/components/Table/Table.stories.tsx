import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import Table from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => {
  const [selectionType, setSelectionType] =
    useState<"checkbox" | "radio">("checkbox");

  const columns = [
    {
      key: "Name",
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      key: "Age",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "Address",
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [
    {
      id: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      id: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      id: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      id: "4",
      name: "Disabled User",
      age: 99,
      address: "Sidney No. 1 Lake Park",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {};

  return (
    <Table<DataType>
      loading={false}
      rowSelection={{
        type: selectionType,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => {
          console.log("test test", record);
          return {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name,
          };
        },
      }}
      columns={columns}
      dataSource={data}
    />
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};

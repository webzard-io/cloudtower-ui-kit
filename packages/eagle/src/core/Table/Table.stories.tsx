// @ts-nocheck
import {
  MoreEllipsis316BoldBlueIcon,
  SettingsGear16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import Button from "@src/core/Button";
import Icon from "@src/core/Icon";
import Table, { ColumnTitle } from "@src/core/Table";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
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

const actionStyle = css`
  vertical-align: middle;
`;

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
  {
    key: "Action",
    dataIndex: "id",
    title: () => (
      <Icon className={actionStyle} src={SettingsGear16GradientGrayIcon} />
    ),
    render: () => (
      <Button
        size="small"
        type="tertiary"
        prefixIcon={<Icon src={MoreEllipsis316BoldBlueIcon} />}
      />
    ),
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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table<DataType>> = (args) => {
  const { columns, dataSource } = args;
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

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
      dataSource={dataSource}
    />
  );
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  columns: columns,
  dataSource: data,
};

export const SortSimpleTitle = Template.bind({});
SortSimpleTitle.args = {
  columns: columns.map((column, index) => ({
    ...column,
    sorter: (a, b) => a - b,
    title: `hello ${index}`,
  })),
  dataSource: data,
};

export const SortCustomTitle = Template.bind({});

SortCustomTitle.args = {
  columns: columns.map((column, index) => ({
    ...column,
    sorter: (a, b) => a - b,
    title: ({ sortOrder, sortColumn, filters }) => {
      return (
        <ColumnTitle
          title={`hello ${index}`}
          sortOrder={
            sortColumn?.dataIndex === column.dataIndex ? sortOrder : undefined
          }
        />
      );
    },
  })),
  dataSource: data,
};

export const OnRowPropCustom: ComponentStory<typeof Table<DataType>> = (
  args
) => {
  const {
    onRow = (record: DataType, index?: number) => {
      return {
        onClick: () => {
          setBehaveior(`row ${index}:${record.name} click`);
        },
        onDoubleClick: () => {
          setBehaveior(`row ${index}:${record.name} doubleClick`);
        },
        onContextMenu: () => {
          setBehaveior(`row ${index}:${record.name} contextMenu`);
        },
        onMouseEnter: () => {
          setBehaveior(`row ${index}:${record.name} mouseEnter`);
        },
        onMouseLeave: () => {
          setBehaveior(`row ${index}:${record.name} mouseleave`);
        },
      };
    },
  } = args;
  const [behavior, setBehaveior] = useState("");

  return (
    <>
      <h1>{behavior}</h1>
      <Table<DataType>
        loading={false}
        columns={columns}
        dataSource={data}
        onRow={onRow}
      />
    </>
  );
};

import {
  MoreEllipsis316BoldBlueIcon,
  SettingsGear16GradientGrayIcon,
} from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Button, Icon, Table } from "@src/core";
import { CoreMeta } from "@stories/types";
import { StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  component: Table,
  title: "Core/Table | 表格组件",
} satisfies CoreMeta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
}

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

const actionStyle = css`
  vertical-align: middle;
`;

const columns = [
  {
    key: "Name",
    title: "Name",
    dataIndex: "name",
    render: (text: string) => <span>{text}</span>,
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

/**
 * 在 loading error 不存在的情况下
 *
 * 显示表格数据
 */
export const ShowData: Story = {
  name: "显示表格数据",
  args: {
    columns,
    dataSource: data,
  },
};

/**
 * 在 loading error dataSource 存在值的情况下
 *
 * 显示 loading
 */
export const ShowLoadingWithDataAndError: Story = {
  name: "显示 Loading",
  args: {
    columns,
    loading: true,
    dataSource: data,
    error: <div>some error</div>,
  },
};

/**
 * 在 error dataSource 存在值的情况下
 *
 * 显示 error
 */
export const ShowError: Story = {
  name: "显示 Error",
  args: {
    columns,
    dataSource: data,
    error: <div>some error</div>,
  },
};

/**
 * 在 loading dataSource 存在值的情况下
 *
 * 显示 loading
 */

export const ShowLoadingWithData: Story = {
  name: "显示 Loading",
  args: {
    columns,
    loading: true,
    dataSource: data,
  },
};

/**
 * 在 error loading dataSource 不存在值的情况下
 *
 * 显示空表格
 */

export const ShowEmpty: Story = {
  name: "显示空表格数据",
  args: {
    columns,
  },
};

/**
 * 仅存在 loading 的情况
 *
 * 显示 Loading
 */

export const ShowLoadingWithEmpty: Story = {
  name: "显示 Loading",
  args: {
    loading: true,
    columns,
  },
};

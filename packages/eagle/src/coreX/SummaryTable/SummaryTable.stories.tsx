import { css } from "@linaria/core";
import Button from "@src/core/Button";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { SummaryTableComponentType, SummaryTableItem } from "../../spec";
import SummaryTable from ".";

const meta: Meta<SummaryTableComponentType> = {
  title: "CoreX/SummaryTable",
  component: SummaryTable,
  parameters: {
    docs: {
      description: {
        component: "SummaryTable 用于描述某种事物的详细特征，多用于详情",
      },
    },
  },
  argTypes: {},
};

export default meta;

export const Basic: StoryObj<SummaryTableComponentType> = {
  render: (props) => {
    const dataSource = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
    };
    const items: SummaryTableItem<typeof dataSource>[] = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
      },
      {
        key: "age",
        title: "Age",
        dataIndex: "age",
      },
      {
        key: "email",
        title: "Email",
        dataIndex: "email",
        render: (value) => {
          return <Button type="link">{value}</Button>;
        },
      },
    ];

    return (
      <div
        className={css`
          width: 600px;
        `}
      >
        <SummaryTable {...props} items={items} dataSource={dataSource} />
      </div>
    );
  },
  args: {
    border: true,
    title: "",
    showHeader: false,
    rightAlign: false,
    showEdit: false,
    layout: "horizontal",
    labelWidth: "71%",
  },
  argTypes: {
    layout: {
      control: "radio",
      options: ["horizontal", "inline"],
    },
  },
};

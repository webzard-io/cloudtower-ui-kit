import { render, screen } from "@testing-library/react";
import { Select } from "antd";
import React from "react";

import TableForm from "..";
import { TableFormProps } from "../types";

const selectOptions = [
  { label: "选项 1", value: "option 1" },
  { label: "选项 2", value: "option 2" },
  { label: "选项 3", value: "option 3" },
  { label: "选项 4", value: "option 4" },
];

const commonTableFormProps: TableFormProps = {
  columns: [
    {
      type: "text",
      title: "title",
      subTitle: "批量填充",
      key: "name",
      displayText:
        "NameNameNameNameNameNameNameNameNameNameNameNameNameNameName",
      width: 100,
    },
    {
      type: "input",
      title: "起始管理 IP",
      key: "address",
      defaultValue: "",
      validator: ({ value }) => {
        if ((value as string)?.includes("Value")) {
          return "Input Level Error Msg. Input Level Error Msg.";
        }
      },
    },
    {
      type: "input",
      title: "递增 input",
      subTitle: "连续递增",
      key: "increase",
      defaultValue: "must end with number,like: value0",
      autoIncrease: true,
    },
    {
      type: "password",
      title: "密码",
      key: "password",
    },
    {
      type: "checkbox",
      title: "复选框",
      subTitle: "checkbox",
      key: "checkbox",
      hidden: false,
      align: "center",
    },
    {
      type: "affix",
      title: "affix",
      key: "affix",
    },
    {
      title: "自定义组件",
      subTitle: "",
      key: "customizedCmpt",
      defaultValue: "option 2",
      render({ isHeader, value, rowIndex, ...restProps }) {
        return (
          <Select
            {...restProps}
            size="small"
            placeholder={
              isHeader
                ? "批量选择"
                : selectOptions.find((o) => o.value === restProps.placeholder)
                    ?.label || "请选择"
            }
            value={value as string}
            options={selectOptions}
          />
        );
      },
      validator({ value, rowIndex }) {
        const val = value as string;
        if (val?.includes("3")) {
          return "this is a special error for option 3";
        }
      },
    },
  ],
};
describe("table form render", () => {
  it("default data is undefined", () => {
    const { container } = render(<TableForm {...commonTableFormProps} />);
    expect({
      linaria: true,
      dom: container,
    }).toMatchSnapshot();

    const allRows = screen.queryAllByTestId("eagle-table-form-row-for-test");
    expect(allRows.length).toBe(0);
  });

  it("default data is empty - without hideEmptyTable", () => {
    render(<TableForm {...commonTableFormProps} defaultData={[]} />);

    const tableFormWrapper = screen.queryByTestId("eagle-table-form-wrapper");
    expect(tableFormWrapper).toBeInTheDocument();

    const allRows = screen.queryAllByTestId("eagle-table-form-row-for-test");
    const deleteActions = screen.queryAllByTestId(
      "eagle-table-form-row-action",
    );
    expect(allRows.length).toBe(0);
    expect(deleteActions.length).toBe(0);
  });

  it("default data is empty - with hideEmptyTable", () => {
    render(
      <TableForm {...commonTableFormProps} defaultData={[]} hideEmptyTable />,
    );

    const tableFormWrapper = screen.queryByTestId("eagle-table-form-wrapper");
    expect(tableFormWrapper).not.toBeInTheDocument();
  });

  it("has row configuration", () => {
    render(
      <TableForm
        {...commonTableFormProps}
        defaultData={[
          {
            address: "Value",
            password: "this-is-pwd",
            checkbox: false,
          },
          {
            address: "row has address",
            password: "this-is-pwd",
            checkbox: true,
          },
          {
            address: "row has address",
            password: "this-is-pwd",
            checkbox: false,
          },
        ]}
        row={{
          descriptions: ["this is a special desc for the first row"],
          deletable: true,
          splitType: "zebraMarking",
          validator(rowIndex, rowData) {
            if (rowIndex === 2 && rowData["address"]?.includes("row")) {
              return "Row Level Error Msg.";
            }
          },
        }}
      />,
    );

    const hasDescEle = screen.getByText(
      "this is a special desc for the first row",
    );
    const deleteActions = screen.queryAllByTestId(
      "eagle-table-form-row-action",
    );
    const zebraMarkingStyleEle = document.querySelectorAll(
      ".row-split-by-zebraMarking",
    );
    expect(hasDescEle).toBeInTheDocument();
    expect(deleteActions.length).toBe(3);
    expect(zebraMarkingStyleEle.length).toBe(1);
  });

  it("has errors configuration", () => {
    render(
      <TableForm
        {...commonTableFormProps}
        defaultData={[
          {
            address: "Value",
            password: "this-is-pwd",
            checkbox: false,
          },
          {
            address: "row has address",
            password: "this-is-pwd",
            checkbox: true,
          },
          {
            address: "row has address",
            password: "this-is-pwd",
            checkbox: false,
          },
        ]}
        errors={[
          "this is a row error",
          {
            address: "this is address cell error",
            password: "this is password cell error",
          },
        ]}
      />,
    );

    expect(screen.queryAllByText("this is a row error").length).toBe(1);
    expect(screen.queryAllByText(/cell error/).length).toBe(0);
  });
});

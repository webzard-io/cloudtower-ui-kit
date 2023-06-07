import { styled } from "@linaria/react";
import { Checkbox, Form, Input, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { withDesign } from "storybook-addon-designs";

import Button from "../Button";
import { Typo } from "../Typo";
import TableForm from ".";
import { DataType, TableFormHandle, TableFormProps } from "./types";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const ContentWrapper = styled.div`
  padding: 20px;
`;

const BatchInputForm: React.FC<{
  updateTableForm?: (data: DataType[]) => void;
  tableForm2DataLength?: number;
}> = ({ updateTableForm, tableForm2DataLength }) => {
  const onFinish = (values) => {
    if (tableForm2DataLength) {
      const newData = [...Array(tableForm2DataLength)].fill({ ...values });
      updateTableForm?.(newData);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ marginBottom: "10px" }}
      size="small"
      layout="inline"
    >
      <Form.Item label="起始管理 IP" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="递增 input" name="increase">
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item label="复选框" name="checkbox" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="affix" name="affix">
        <Input />
      </Form.Item>
      <Form.Item label="自定义组件" name="customizedCmpt">
        <Select options={selectOptions} />
      </Form.Item>

      <Form.Item style={{ alignSelf: "flex-end" }}>
        <Button type="quiet" className="quiet-blue" htmlType="submit">
          批量填充
        </Button>
      </Form.Item>
    </Form>
  );
};

const story = {
  title: "TableForm",
  decorators: [withDesign],
};

const selectOptions = [
  { label: "选项 1", value: "option 1" },
  { label: "选项 2", value: "option 2" },
  { label: "选项 3", value: "option 3" },
  { label: "选项 4", value: "option 4" },
];

const commonTableFormProps: TableFormProps = {
  onHeaderChange: (data) => {},
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
      render({ isHeader, value, ...restProps }) {
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
  onBodyChange: (data, rowIndex, columnKey) => {
    console.group("onBodyChange:");
    console.log("data: ", data);
    console.log("rowIndex: ", rowIndex);
    console.log("column key: ", columnKey);
    console.groupEnd();
  },
  rowValidator: (rowIndex, rowData) => {
    if (rowIndex === 2 && rowData["address"]?.includes("row")) {
      return "Row Level Error Msg.";
    }
  },
};

export const Basic = () => {
  const [formHandle, setFormHandle] = useState<TableFormHandle>();
  const [tableForm2DataLength, setTableForm2DataLength] = useState<number>();
  const ref = useRef<TableFormHandle>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setFormHandle(ref.current);
    }
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Space direction="vertical">
        <Title>Batch input TableForm</Title>
        <ContentWrapper>
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
              {
                address: "row has address",
                password: "this-is-pwd",
                checkbox: false,
              },
              {
                address: "row has address",
                password: "this-is-pwd",
                checkbox: false,
              },
              {
                address: "row has address",
                password: "this-is-pwd",
                checkbox: false,
              },
            ]}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px" }}>
        <Title>Batch input TableForm with dynamic rows</Title>
        <ContentWrapper>
          <BatchInputForm
            updateTableForm={formHandle?.setData}
            tableForm2DataLength={tableForm2DataLength}
          />
          <TableForm
            ref={ref}
            {...commonTableFormProps}
            deletable
            disableBatchFilling
            rowAddConfig={{
              addible: true,
              maximum: 8,
            }}
            onBodyChange={(data) => {
              setTableForm2DataLength(data.length);
            }}
          />
        </ContentWrapper>
      </Space>
      <Space direction="vertical" style={{ marginTop: "32px", width: "100%" }}>
        <Title>Batch input TableForm</Title>
        <ContentWrapper>
          <TableForm {...commonTableFormProps} disableBatchFilling draggable />
        </ContentWrapper>
      </Space>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sv8N9opZrWCMApiGeq2V6M/Table-Form-%7C-%E8%A1%A8%E6%A0%BC%E8%A1%A8%E5%8D%95?type=design&node-id=1-41&t=3ZbR4MoYkAvXtd0P-0",
    },
  },
};

export default story;

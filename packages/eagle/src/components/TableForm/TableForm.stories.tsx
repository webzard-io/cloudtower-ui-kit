import { Select, Space } from "antd";
import React, { useRef } from "react";
import { withDesign } from "storybook-addon-designs";

import { Typo } from "../Typo";
import TableForm from ".";
import { TableFormHandle } from "./types";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

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

export const Basic = () => {
  const ref = useRef<TableFormHandle | null>(null);
  return (
    <div style={{ padding: "20px" }}>
      <Title>TableForm</Title>
      <Space style={{ marginTop: "12px" }}>
        <TableForm
          ref={ref}
          onHeaderChange={(data) => {}}
          defaultData={[]}
          deletable
          draggable
          // disableBatchFilling
          rowAddConfig={{
            addible: true,
            maximum: 5,
          }}
          columns={[
            {
              type: "text",
              title: "title",
              subTitle: "批量填充",
              key: "name",
              defaultValue: "",
              displayText: "主机",
              placeholder: "",
              hidden: false,
            },
            {
              type: "input",
              title: "起始管理 IP",
              subTitle: "address",
              key: "address",
              defaultValue: "",
              // subTitleColor: "",
              // placeholder: "",
              hidden: false,
              headerValidator: (value) => {
                if (value.includes("some")) {
                  return "";
                } else {
                  return "校验错误";
                }
              },
            },
            {
              type: "input",
              title: "递增 input",
              subTitle: "连续递增",
              key: "increase",
              defaultValue: "",
              hidden: false,
              autoIncrease: true,
            },
            {
              type: "password",
              title: "密码",
              subTitle: "",
              key: "password",
              defaultValue: "",
              placeholder: "",
              hidden: false,
              subTitleColor: "",
            },
            {
              type: "checkbox",
              title: "checkbox",
              subTitle: "",
              key: "checkbox",
              defaultValue: "",
              placeholder: "",
              hidden: false,
              subTitleColor: "",
            },
            {
              type: "affix",
              title: "affix",
              subTitle: "",
              key: "affix",
              defaultValue: "",
              placeholder: "",
              hidden: false,
              subTitleColor: "",
            },
            {
              title: "自定义组件",
              subTitle: "",
              key: "customizedCmpt",
              // defaultValue: "option 2",
              render({ isHeader, value, ...restProps }) {
                return (
                  <Select
                    {...restProps}
                    placeholder={
                      isHeader
                        ? "批量选择"
                        : selectOptions.find(
                            (o) => o.value === restProps.placeholder
                          )?.label || "请选择"
                    }
                    value={value as string}
                    options={selectOptions}
                  />
                );
              },
            },
          ]}
        />
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

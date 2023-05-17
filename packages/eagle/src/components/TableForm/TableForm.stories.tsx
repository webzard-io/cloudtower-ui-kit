import { Space } from "antd";
import React, { useRef } from "react";
import { withDesign } from "storybook-addon-designs";

import { Typo } from "../Typo";
import TableForm, { TableFormHandle } from ".";

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const story = {
  title: "TableForm",
  decorators: [withDesign],
};

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
          columns={[
            {
              type: "text",
              title: "title",
              subTitle: "批量输入",
              key: "name",
              defaultValue: "",
              displayText: "主机",
              subTitleColor: "danger",
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

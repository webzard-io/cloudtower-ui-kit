import { styled } from "@linaria/react";
import { Space as AntdSpace } from "antd";
import React from "react";

import { IStepsProps } from "../../spec";
import { Typo } from "../Typo";
import Steps from "./";

const Space = styled(AntdSpace)`
  padding: 12px 0;
  width: 100%;

  > .ant-space-item {
    width: 100%;
  }
`;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

const stepsConfig: IStepsProps["stepsConfig"] = [
  { title: "Step 1" },
  { title: "Step 2" },
  { title: "Step 3" },
];

export default {
  title: "Steps",
};

export const Basic = () => {
  return (
    <div style={{ padding: "20px", paddingBottom: "200px" }}>
      <Title>Normal</Title>
      <Space>
        <Steps stepsConfig={stepsConfig} />
      </Space>
      <Title>Steps showStepCount</Title>
      <Space>
        <Steps stepsConfig={stepsConfig} showStepCount />
      </Space>
    </div>
  );
};

Basic.story = {
  name: "Basic",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/C3bVSRfVDDulSv2nnwoYdX/%E5%AE%89%E5%85%A8%E7%AD%96%E7%95%A5%E5%8A%9F%E8%83%BD%E5%A2%9E%E5%BC%BA?node-id=326%3A58892",
    },
  },
};

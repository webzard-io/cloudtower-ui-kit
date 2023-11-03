import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Meta, StoryObj } from "@storybook/react";
import { Space as AntdSpace } from "antd";
import React, { useState } from "react";

import { IStepsProps } from "../../spec";
import Button from "../Button";
import { Typo } from "../Typo";
import Steps from "./";

const story: Meta<IStepsProps> = {
  title: "Steps",
  component: Steps,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/xkslNKgPBtHcyJoVgPxOsf/Steps-%7C-%E6%AD%A5%E9%AA%A4%E6%9D%A1?type=design&node-id=72-19555&mode=design&t=GGU8TKKlI6GambU7-0",
    },
  },
};

export default story;

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

export const Basic = () => {
  const stepsConfig: IStepsProps["stepsConfig"] = new Array(3)
    .fill(0)
    .map((_) => ({
      title:
        "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
    }));

  return (
    <div style={{ padding: "20px", paddingBottom: "200px", width: "800px" }}>
      <Title>Normal</Title>
      简单显示
      <Space>
        <Steps
          stepsConfig={[
            { title: "Lable" },
            { title: "Label" },
            { title: "Label " },
          ]}
          current={0}
        />
      </Space>
      当 current 步骤较长时
      <Space>
        <Steps
          stepsConfig={[
            { title: "Label" },
            {
              title:
                "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
            },
            { title: "Label" },
          ]}
          current={1}
        />
      </Space>
      当非 current 步骤较长时
      <Space>
        <Steps
          stepsConfig={[
            { title: "Label" },
            {
              title:
                "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
            },
            { title: "Label" },
          ]}
          current={2}
        />
      </Space>
      当 current 步骤超长时
      <Space>
        <Steps
          stepsConfig={[
            { title: "Label" },
            { title: "Label" },
            {
              title:
                "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
            },
          ]}
          current={2}
        />
      </Space>
      <Title>Disabled</Title>
      <Space>
        <Steps stepsConfig={stepsConfig} disabled current={2} />
      </Space>
    </div>
  );
};

export const Default: StoryObj<IStepsProps> = () => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <Title>步骤切换</Title>
      <div
        className={css`
          margin: 10px 0;
        `}
      >
        <ol>
          <li>顺序：点击下一步；</li>
          <li>
            倒序：点击上一步；已完成（complete）步骤，可通过点击步骤条快速跳转至对应步骤，该步骤后的步骤回到待办（to-do）状态；
          </li>
          <li>
            待办状态（to-do） / 当前（current）状态下的步骤条均不支持点击。
          </li>
          <li>传递 onChange 后，可以通过点击 Step item 快速回到某一步</li>
        </ol>
      </div>
      <div>
        <Steps
          className={css`
            margin: 10px 0;
            width: 656px;
          `}
          onChange={(current) => {
            setCurrent(current);
          }}
          stepsConfig={[
            { title: "Label" },
            { title: "Label" },
            { title: "Label" },
            { title: "Label" },
          ]}
          current={current}
        />
        <Button
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          prev
        </Button>
        <span
          className={css`
            margin: 0px 8px;
          `}
        >
          current: {current}
        </span>
        <Button
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          next
        </Button>
      </div>
    </>
  );
};
Default.args = {};

export const Horizontal: StoryObj<IStepsProps> = () => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div
        className={css`
          margin: 10px 0;
        `}
      >
        纵向步骤条为定宽，省略触发条件根据单个 step 所容纳字数决定。省略会触发
        Tooltips 进行 全部信息展示。
      </div>
      <div>
        <Steps
          className={css`
            margin: 10px 0;
          `}
          direction="vertical"
          onChange={(current) => {
            setCurrent(current);
          }}
          stepsConfig={[
            {
              title:
                "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabellabellabel",
            },
            { title: "Label" },
            {
              title:
                "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabellabellabel",
            },
            { title: "Label" },
          ]}
          current={current}
        />
        <Button
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          prev
        </Button>
        <span
          className={css`
            margin: 0px 8px;
          `}
        >
          current: {current}
        </span>
        <Button
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          next
        </Button>
      </div>
    </>
  );
};
Horizontal.args = {};

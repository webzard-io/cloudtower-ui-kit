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
      url: "https://www.figma.com/file/C3bVSRfVDDulSv2nnwoYdX/%E5%AE%89%E5%85%A8%E7%AD%96%E7%95%A5%E5%8A%9F%E8%83%BD%E5%A2%9E%E5%BC%BA?node-id=326%3A58892",
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

const commonTitle = { title: "Label" };
const titleLong = { title: "LabelLabelLabelLabeLabelLabelLabel" };
const titleLongLong = {
  title: "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
};
const titleVeryLong = {
  title:
    "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel",
};

const stepsConfig: IStepsProps["stepsConfig"] = new Array(3)
  .fill(0)
  .map((_) => commonTitle);

export const Basic = () => {
  return (
    <div style={{ padding: "20px", paddingBottom: "200px" }}>
      <Title>Normal</Title>
      <Space>
        <Steps stepsConfig={stepsConfig} current={-1} />
      </Space>
      <Space>
        <Steps stepsConfig={stepsConfig} current={0} />
      </Space>
      <Space>
        <Steps stepsConfig={stepsConfig} current={1} />
      </Space>
      <Space>
        <Steps stepsConfig={stepsConfig} current={2} />
      </Space>
      <Space>
        <Steps stepsConfig={stepsConfig} current={3} />
      </Space>
      <Title>Disabled</Title>
      <Space>
        <Steps stepsConfig={stepsConfig} disabled current={2} />
      </Space>
    </div>
  );
};

export const AdaptiveOrEllipsis: StoryObj<IStepsProps> = () => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <Title>自适应&省略</Title>
      <div>
        Step 未选中时，省略过长部分，宽度均分；省略部分 step，通过 hover
        展示全部信息 tips。
      </div>
      <div>
        <Space style={{ width: "656px" }}>
          <Steps
            stepsConfig={[commonTitle, titleVeryLong, commonTitle, commonTitle]}
            current={0}
          />
        </Space>
      </div>
      <div>Step Current 时，展示 step 内全部内容。</div>
      <div>
        <Space style={{ width: "656px" }}>
          <Steps
            stepsConfig={[commonTitle, titleLong, commonTitle, commonTitle]}
            current={1}
          />
        </Space>
      </div>
      <div>
        <div>
          极端情况下，其余 step 最小宽度为 60px，若依旧无法展示，则 Current Setp
          进行省略展示。
        </div>
        <Space style={{ width: "656px" }}>
          <Steps
            stepsConfig={[commonTitle, titleVeryLong, commonTitle, commonTitle]}
            current={1}
          />
        </Space>
      </div>
      <div>
        <Title>交互演示</Title>
        <div style={{ marginTop: "10px" }}>
          <div
            style={{ width: "656px" }}
            className={css`
              > div {
                margin-bottom: 20px;
              }
            `}
          >
            <div>
              <Steps
                stepsConfig={[commonTitle, titleVeryLong, commonTitle]}
                current={current}
              />
            </div>
            <div>
              <Steps
                stepsConfig={new Array(4).fill(0).map((_) => titleVeryLong)}
                current={current}
              />
            </div>
            <div>
              <Steps
                stepsConfig={[
                  commonTitle,
                  titleVeryLong,
                  commonTitle,
                  titleLongLong,
                  commonTitle,
                ]}
                current={current}
              />
            </div>
          </div>
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
      </div>
    </>
  );
};
AdaptiveOrEllipsis.args = {};

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
        </ol>
      </div>
      <div>
        <Steps
          className={css`
            margin: 10px 0;
          `}
          onChange={(current) => {
            setCurrent(current);
          }}
          stepsConfig={[commonTitle, commonTitle, titleLong, commonTitle]}
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

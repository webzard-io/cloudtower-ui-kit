import { css } from "@linaria/core";
import Legend from "@src/core/Legend";
import { LegendPresetColors } from "@src/core/Legend";
import { LegendColor, LegendComponentType } from "@src/core/Legend/legend.type";
import { Typo } from "@src/core/Typo";
import { Stack } from "@stories/components";
import { Meta, StoryObj } from "@storybook/react";
import cs from "classnames";
import React from "react";

const Title: React.FC<{ classNames?: string }> = ({ children, classNames }) => (
  <div
    style={{ marginTop: "16px", marginBottom: "16px" }}
    className={cs(Typo.Display.d2_bold_title, classNames)}
  >
    {children}
  </div>
);

/**
 * 图例组件，用于展示状态。
 *
 * 圆形：作为"状态灯"表示状态，用法类似[**状态胶囊**](/docs/core-statuscapsule-状态胶囊--docs)
 *
 * 方形：用作图例使用常配合 Charts、多颜色计数等使用
 */
const story: Meta<LegendComponentType> = {
  title: "Core/Legend | 图例",
  component: Legend,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fBonrbcyOxASdnjeFWzph6/Legend-%26-Breathing-LED?t=mI1pni9wB9zomC18-0",
    },
  },
};

export const Basic: StoryObj<LegendComponentType> = {
  render: () => {
    const modes = ["Default", "Hover", "Default", "Hover"];
    return (
      <Stack>
        <div style={{ marginRight: "70px" }}>
          <Title
            classNames={css`
              padding-left: 100px;
            `}
          >
            Colorful bg
          </Title>
          <Stack direction="vertical">
            <Stack>
              <span style={{ width: "90px" }} />
              {modes.map((mode) => (
                <div style={{ width: "90px" }}>{mode}</div>
              ))}
            </Stack>
            {LegendPresetColors.map((color, index) => (
              <Stack
                className={css`
                  & > .box {
                    width: 90px;
                  }
                `}
              >
                <span style={{ width: "90px" }}>{color}</span>
                <div className="box">
                  <Legend
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    className="__pseudo-states-hover"
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                    hoverable={true}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    number={1}
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    number={1}
                    className="__pseudo-states-hover"
                    color={color}
                    hoverable={true}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
              </Stack>
            ))}
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <span style={{ width: "90px" }}>loading</span>
              <div className="box">
                <Legend shape="loading" color="success">
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend className="__pseudo-states-hover" shape="loading">
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend number={1} shape="loading">
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend
                  className="__pseudo-states-hover"
                  number={1}
                  shape="loading"
                >
                  Label
                </Legend>
              </div>
            </Stack>
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <span style={{ width: "90px" }}>big number</span>
              <div className="box">
                <Legend>LabelLabelLabelLabelLabelLabelLabelLabel</Legend>
              </div>
              <div className="box">
                <Legend className="__pseudo-states-hover">
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
              <div className="box">
                <Legend number={1}>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
              <div className="box">
                <Legend className="__pseudo-states-hover" number={1}>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
            </Stack>
          </Stack>
        </div>
        <div style={{ backgroundColor: "#172640CC", padding: "10px" }}>
          <Title
            classNames={css`
              color: #ffffff;
            `}
          >
            On-Tint bg
          </Title>
          <Stack direction="vertical">
            <Stack>
              {modes.map((mode) => (
                <div style={{ width: "90px", color: "#FFFFFF" }}>{mode}</div>
              ))}
            </Stack>
            {LegendPresetColors.map((color, index) => (
              <Stack
                className={css`
                  & > .box {
                    width: 90px;
                  }
                `}
              >
                <div className="box">
                  <Legend
                    onTintMode
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    onTintMode
                    className="__pseudo-states-hover"
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    onTintMode
                    number={1}
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
                <div className="box">
                  <Legend
                    onTintMode
                    number={1}
                    className="__pseudo-states-hover"
                    color={color}
                    key={index}
                    shape={index % 2 === 0 ? "circle" : "square"}
                  >
                    Label
                  </Legend>
                </div>
              </Stack>
            ))}
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <div className="box">
                <Legend onTintMode shape="loading">
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend
                  onTintMode
                  className="__pseudo-states-hover"
                  shape="loading"
                >
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend onTintMode number={1} shape="loading">
                  Label
                </Legend>
              </div>
              <div className="box">
                <Legend
                  onTintMode
                  className="__pseudo-states-hover"
                  number={1}
                  shape="loading"
                >
                  Label
                </Legend>
              </div>
            </Stack>
            <Stack
              className={css`
                & > .box {
                  width: 90px;
                }
              `}
            >
              <div className="box">
                <Legend onTintMode>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
              <div className="box">
                <Legend className="__pseudo-states-hover" onTintMode>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
              <div className="box">
                <Legend number={1} onTintMode>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
              <div className="box">
                <Legend className="__pseudo-states-hover" number={1} onTintMode>
                  LabelLabelLabelLabelLabelLabelLabelLabel
                </Legend>
              </div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    );
  },
};

export const Default: StoryObj<{
  content: string;
  color: LegendColor;
  hoverable: boolean;
  offWhiteMode?: boolean;
  number?: number;
}> = {
  render: ({ content, ...props }) => {
    return <Legend {...props}>{content}</Legend>;
  },
  args: {
    content: "label",
    color: undefined,
    offWhiteMode: false,
    hoverable: false,
    number: 0,
  },
  argTypes: {
    color: {
      control: "radio",
      options: [
        "blue",
        "red",
        "yellow",
        "green",
        "gray",
        "success",
        "danger",
        "warning",
      ],
    },
  },
};

export default story;

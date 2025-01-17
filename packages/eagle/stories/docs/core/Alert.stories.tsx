import { css } from "@linaria/core";
import Alert from "@src/core/Alert";
import { Typo } from "@src/core/Typo";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
export default {
  title: "Core/Alert",
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/vpaSTTGHjKif7eST8vykm8/Tip-%7C-%E6%8F%90%E7%A4%BA%E6%A1%86?type=design&node-id=1315-10681&mode=design&t=WZ3znhRuHDDkB3aw-0",
    },
  },
} as ComponentMeta<typeof Alert>;

const Title: React.FC = ({ children }) => (
  <div style={{ marginTop: "16px" }} className={Typo.Display.d2_bold_title}>
    {children}
  </div>
);

export const Basic: ComponentStory<typeof Alert> = () => {
  return (
    <>
      <div
        className={css`
          width: 648px;
          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <Title>Basic</Title>
        <Alert
          type="info"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Alert type="error" message="Label" />
        <Alert type="warning" message="Label" />
        <Alert type="success" message="Label" />
        <Alert type="normal" message="Label" />
      </div>

      <div
        className={css`
          width: 648px;
          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <Title>Witch Action</Title>
        <Alert
          type="info"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Actionlognlonglong
            </div>
          }
        />
        <Alert
          type="error"
          message="Label"
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />
        <Alert
          type="warning"
          message="Label"
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />
        <Alert
          type="success"
          message="Label"
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />
        <Alert
          type="normal"
          message="Label"
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />
      </div>
      <div
        className={css`
          width: 648px;
          & > div {
            margin-bottom: 10px;
          }
        `}
      >
        <Title>Closable</Title>
        <Alert
          type="info"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas et earum neque eum! Magnam, illum iusto aspernatur odit hic, voluptate explicabo soluta eos unde eaque sunt nostrum quo architecto asperiores."
          onClose={() => console.log("close")}
        />

        <Title>Closable And custom action</Title>

        <Alert
          type="info"
          message=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sit ea distinctio, cupiditate voluptatum nesciunt aliquam deleniti illum consequatur est numquam nam ratione expedita? Tempore, quis. Autem, animi obcaecati! Iure."
          closable
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />

        <Title>Custom message</Title>
        <Alert
          type="error"
          message={
            <div>
              <div>解决如下问题后，再尝试保存：</div>
              <div>
                <ol>
                  <li>1. %原因 1 %</li>
                  <li>2. %原因 2 %</li>
                  <li>3. %原因 3 %</li>
                </ol>
              </div>
            </div>
          }
          action={
            <div
              className={css`
                color: $text-light-general;
                cursor: pointer;
              `}
            >
              Label
            </div>
          }
        />
      </div>
    </>
  );
};

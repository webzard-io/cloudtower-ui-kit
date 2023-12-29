import type { Meta } from "@storybook/react";
import { message } from "antd";
import { createHashHistory } from "history";
import React from "react";

import { GoBackButtonType } from "../../spec";
import GoBackButton from ".";

const meta: Meta<React.FC<GoBackButtonType>> = {
  title: "CoreX/GoBackButton",
  component: GoBackButton,
  parameters: {
    docs: {
      description: {
        component:
          "GoBackButton 通常与路由库集成，用于导航到上一个页面或指定的路径，以实现更便捷的导航功能",
      },
    },
  },
};

export default meta;

export const Basic = () => {
  const history = createHashHistory();

  return (
    <GoBackButton
      title="prev"
      history={history}
      path=""
      onClick={() => {
        message.info("go back");
      }}
    />
  );
};

Basic.args = {};

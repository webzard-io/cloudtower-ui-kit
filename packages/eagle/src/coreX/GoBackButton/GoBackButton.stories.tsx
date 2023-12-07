import type { Meta } from "@storybook/react";
import { message } from "antd";
import { createHashHistory } from "history";
import React from "react";

import GoBackButton from ".";

const stroy: Meta<typeof GoBackButton> = {
  title: "GoBackButton",
  component: GoBackButton,
  parameters: {
    docs: {
      description: {
        component:
          "GoBackButton 与路由库集成，用于导航到上一个页面或指定的路径，以实现更便捷的导航功能",
      },
    },
  },
};

export default stroy;

export const Basic = () => {
  const history = createHashHistory();

  return (
    <GoBackButton
      title="test"
      history={history}
      path=""
      onClick={() => {
        message.info("go back");
        console.log(history);
      }}
    />
  );
};

Basic.args = {
  title: "test",
  path: "/path",
};

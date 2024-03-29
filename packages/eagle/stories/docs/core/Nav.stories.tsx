import { CloudtowerLogo16GradientBlueIcon } from "@cloudtower/icons-react";
import { css } from "@linaria/core";
import { Icon } from "@src/core";
import Avatar from "@src/core/Avatar";
import Nav from "@src/core/Nav";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  component: Nav,
  title: "Core/Nav | 导航栏",
};

export default meta;
type Story = StoryObj<typeof Nav>;

const Style = css`
  header {
    min-width: 900px !important;
  }
`;

const DemoNav = () => {
  return (
    <div className={Style}>
      <Nav
        left={[
          <Icon
            src={CloudtowerLogo16GradientBlueIcon}
            iconWidth={24}
            iconHeight={24}
          />,
        ]}
        center={["smartx"]}
        right={[<Avatar username="R" />]}
      />
    </div>
  );
};

/**
 * 导航栏分为三个区域，可以通过 left、right、center 来进行对应的设置
 */
export const Basic: Story = {
  render: () => <DemoNav />,
  args: {},
};

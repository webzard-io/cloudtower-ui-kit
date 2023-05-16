import {
  ActiveUninstal14GradiendtRedIcon,
  CopyToEllipsis324GradientBlueIcon,
  Loading16GradientBlueIcon,
  VmIcon24BlueIcon,
} from "@cloudtower/icons-react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Row } from "antd";
import _ from "lodash";
import React from "react";

import { arrowChevronDownSmall16Blue, loading24GradientBlue } from "../images";
import Icon from ".";

const IconStories = (props: any) => {
  return (
    <div>
      <Row>Icon 和本地 repe 的 image src 的使用</Row>
      <Row>
        <Icon src={arrowChevronDownSmall16Blue} />
        <Icon src={loading24GradientBlue} isRotate={true} />
      </Row>
      <Row>Icon 和 @cloudtower/react-icons</Row>
      <Row>
        <Icon src={ActiveUninstal14GradiendtRedIcon} />
        <Icon src={Loading16GradientBlueIcon} isRotate={true} />
        <Icon src={Loading16GradientBlueIcon}>加载中</Icon>
        <Icon src={VmIcon24BlueIcon} iconHeight={24} iconWidth={24} />
        <Icon
          src={CopyToEllipsis324GradientBlueIcon}
          iconHeight={32}
          iconWidth={32}
        />
      </Row>
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Icon",
  component: IconStories,
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconStories> = (args) => {
  return <IconStories {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};

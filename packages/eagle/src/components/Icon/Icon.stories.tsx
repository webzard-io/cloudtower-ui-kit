import { ActiveUninstal14GradiendtRedIcon } from "@cloudtower/icons-react";
import * as SVG from "@cloudtower/icons-react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Row } from "antd";
import _ from "lodash";
import React from "react";

import { arrowChevronDownSmall16Blue } from "../images";
import Icon, { formatImagesStr } from ".";

const IconStories = (props: any) => {
  const image_str = "active-uninstal-14-gradiendt-red";
  return (
    <div>
      <Row>Icon 和本地 repe 的 image src 的使用</Row>
      <Row>
        <Icon src={arrowChevronDownSmall16Blue} />
      </Row>
      <Row>Icon 和 @cloudtower/react-icons</Row>
      <Row>
        <Icon src={ActiveUninstal14GradiendtRedIcon} />
      </Row>
      <Row>Icon 和字符串 'arrow-chevron-down-small-16-blue' 的使用</Row>
      <Row>
        <Icon src={SVG[formatImagesStr(image_str)]} />
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

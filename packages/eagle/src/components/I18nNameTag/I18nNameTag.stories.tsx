import { initParrotI18n } from "@cloudtower/parrot";
import { Meta } from "@storybook/react";
import React from "react";

import I18nNameTag from ".";
const story: Meta<typeof I18nNameTag> = {
  title: "I18nNameTag",
  component: I18nNameTag,
};
export default story;

initParrotI18n({
  resources: {
    "zh-CN": {
      test: {
        highlight: "这是一条会高亮传入 <1>{name}</1> 的词条",
      },
    },
  },
});

export const Default = ({ name }) => {
  return <I18nNameTag name={name} i18nKey="test.highlight" />;
};
Default.args = {
  name: "Label",
};

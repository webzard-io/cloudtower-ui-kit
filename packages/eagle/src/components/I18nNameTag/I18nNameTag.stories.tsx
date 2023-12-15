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
        longHighlightText: "高亮内容 <1>{name}</1> 过长时，会自动换行",
      },
    },
  },
});

export const Default = ({ name }: { name: string }) => {
  return (
    <>
      <I18nNameTag name={name} i18nKey="test.highlight" />
      <div style={{ width: "230px" }}>
        <I18nNameTag
          name="longlonglonglonglonglonglonglonglonglonglong"
          i18nKey="test.longHighlightText"
        />
      </div>
    </>
  );
};
Default.args = {
  name: "Label",
};

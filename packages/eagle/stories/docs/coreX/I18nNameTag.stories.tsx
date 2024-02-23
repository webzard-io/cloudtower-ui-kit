import I18nNameTag from "@src/coreX/I18nNameTag";
import { Meta } from "@storybook/react";
import React from "react";
const meta: Meta<typeof I18nNameTag> = {
  title: "CoreX/I18nNameTag",
  component: I18nNameTag,
};
export default meta;

export const Default = {
  name: "基本用例",
  render: ({ name }: { name: string }) => {
    return <I18nNameTag name={name} i18nKey="test.highlight" />;
  },
  args: {
    name: "Label",
  },
};

export const LongText = {
  name: "高亮文字过长",
  render: ({ name }: { name: string }) => {
    return (
      <div style={{ width: "230px" }}>
        <I18nNameTag name={name} i18nKey="test.longHighlightText" />
      </div>
    );
  },
  args: {
    name: "longlonglonglonglonglonglonglonglonglonglong",
  },
};

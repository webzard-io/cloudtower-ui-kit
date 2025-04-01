import I18nNameTag from "@src/coreX/I18nNameTag";
import { Meta } from "@storybook/react";
import React from "react";
const meta: Meta<typeof I18nNameTag> = {
  title: "CoreX/I18nNameTag",
  component: I18nNameTag,
};
export default meta;

/**
 *
 * 请注意，由于 I18nNameTag 存在 typo， 使用 I18nNameTag 的词条使用的 html tag index 都需要从 1 开始用起
 *
 * 例如： "delete_alert_group_policy_desc": "确认要删除通知聚合策略 <1>{name}</1> 吗？",
 *
 * slack: https://smartx1.slack.com/archives/GD3UU318A/p1700202217700279
 */
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

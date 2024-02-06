import { initParrotI18n } from "@cloudtower/parrot";
import { ParrotTrans } from "@src/core/ParrotTrans";
import NamesTooltip from "@src/coreX/NamesTooltip";
import { NamesTooltipType } from "@src/coreX/NamesTooltip/namesTooltip.type";
import { Stack, Title } from "@stories/components";
import { Meta } from "@storybook/react";
import React from "react";

type NamesTooltipComponentType = React.FC<NamesTooltipType>;

const story: Meta<NamesTooltipComponentType> = {
  title: "CoreX/NamesTooltip",
  component: NamesTooltip,
};

export default story;

initParrotI18n({
  resources: {
    "zh-CN": {
      test: {
        highlight: "<0>line</0>",
      },
    },
  },
});

export const Basic = () => {
  const names = [
    {
      id: "1",
      name: "line 1",
    },
    {
      id: "2",
      name: "line 2",
    },
  ];
  return (
    <Stack direction="vertical">
      <Title>Basic</Title>
      <div>
        <NamesTooltip names={names}>hover me</NamesTooltip>
      </div>
      <Title>Variant</Title>
      <p>
        一种常见的用法是配合 react-i18next 的 <b>Trans Component</b>{" "}
        给某个单词添加 tooltip 提示
      </p>
      <div>
        <ParrotTrans i18nKey={"test.highlight"}>
          <NamesTooltip names={names} />
        </ParrotTrans>
      </div>
    </Stack>
  );
};

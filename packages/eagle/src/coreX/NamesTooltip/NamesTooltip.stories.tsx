import { initParrotI18n } from "@cloudtower/parrot";
import { Meta } from "@storybook/react";
import React from "react";

import { ParrotTrans } from "../../core/ParrotTrans";
import { NamesTooltipType } from "../../spec";
import NamesTooltip from ".";

type NamesTooltipComponentType = React.FC<NamesTooltipType>;

const story: Meta<NamesTooltipComponentType> = {
  title: "NamesTooltip",
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
    <ParrotTrans i18nKey={"test.highlight"}>
      <NamesTooltip names={names} />
    </ParrotTrans>
  );
};

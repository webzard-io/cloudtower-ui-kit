import { Nic24GradientBlueIcon } from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import { Typo } from "@src/core/Typo";
import { Meta, StoryFn } from "@storybook/react";
import React from "react";
export const CustomHeader: StoryFn = () => (
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ display: "flex" }}>
      <Icon
        src={Nic24GradientBlueIcon}
        iconWidth={24}
        iconHeight={24}
        style={{ marginRight: "6px" }}
      />
      <div>
        <div
          className={Typo.Label.l3_bold_title}
          style={{
            lineHeight: "20px",
            height: "20px",
            marginBottom: "2px",
          }}
        >
          123
        </div>
        <div style={{ lineHeight: "18px", height: "18px" }}>
          <span>321</span>
          <span>111</span>
          <span>222</span>
        </div>
      </div>
    </div>
    <div>other thing</div>
  </div>
);

const meta: Meta<typeof CustomHeader> = {
  title: "Core/Expandable List | 可展开收起列表/CustomHeader",
  render: CustomHeader,
};

export default meta;

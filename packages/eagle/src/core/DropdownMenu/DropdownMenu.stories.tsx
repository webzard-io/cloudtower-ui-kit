import { Failback24BlueIcon } from "@cloudtower/icons-react";
import Icon from "@src/core/Icon";
import React from "react";

import DropDownMenu from ".";

const meta = {
  title: "DropdownMenu",
};

export default meta;

export const DefaultExample = () => {
  return (
    <DropDownMenu
      trigger={["click"]}
      items={[
        {
          key: "hello1",
          title: "hello 1",
          type: "group",
          children: [
            {
              key: "hello child",
              text: "child text",
            },
            {
              key: "hello child1",
              text: "child text1",
            },
          ],
        },
        {
          key: "hello2",
          title: "hello 2",
          type: "divider",
        },
        {
          key: "hello3",
          title: "hello 3",
          type: "single",
          text: "aaaa",
        },
      ]}
      slotsElements={{
        trigger(args) {
          return <div>trigger</div>;
        },
      }}
    />
  );
};

export const WithIcon = () => {
  return (
    <DropDownMenu
      trigger={["click"]}
      items={[
        {
          key: "hello1",
          title: "hello 1",
          type: "group",
          children: [
            {
              key: "hello child",
              text: "child text",
              icon: (
                <Icon src={Failback24BlueIcon} iconHeight={24} iconWidth={24}>
                  child text
                </Icon>
              ),
            },
            {
              key: "hello child1",
              text: "child text1",
              icon: (
                <Icon src={Failback24BlueIcon} iconHeight={24} iconWidth={24}>
                  child text1
                </Icon>
              ),
            },
          ],
        },
        {
          key: "hello2",
          title: "hello 2",
          type: "divider",
        },
        {
          key: "hello3",
          title: "hello 3",
          type: "single",
          text: "aaaa",
          icon: (
            <Icon src={Failback24BlueIcon} iconHeight={24} iconWidth={24}>
              aaaa
            </Icon>
          ),
        },
      ]}
      slotsElements={{
        trigger(args) {
          return <div>trigger</div>;
        },
      }}
    />
  );
};

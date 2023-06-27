import React from "react";
import { withDesign } from "storybook-addon-designs";
import { Dropdown, Menu } from "antd";
import { css, cx } from "@linaria/core";
import { Typo } from "../components/Typo";

export default {
  title: "Menu",
  decorators: [withDesign],
};

const Page = css`
  padding: 20px;
`;

const Icon = css`
  width: 24px;
  height: 24px;
  background: rgba(240, 100, 48, 0.1);
`;

export const ContextualMenu = () => {
  return (
    <div className={Page}>
      <div className={Typo.Label.l2_bold}>Size</div>
      <div>
        <Dropdown
          visible
          overlay={
            <Menu style={{ width: 130 }}>
              <Menu.ItemGroup title="LABEL">
                <Menu.Item>
                  <div className={cx(Icon, "menu-icon")}></div>
                  Label
                </Menu.Item>
                <Menu.Item>
                  <div className={cx(Icon, "menu-icon")}></div>
                  Label
                </Menu.Item>
                <Menu.SubMenu title="Label" popupOffset={[-3, -5]}>
                  <Menu.Item>Label</Menu.Item>
                </Menu.SubMenu>
              </Menu.ItemGroup>
            </Menu>
          }
        >
          <span></span>
        </Dropdown>
      </div>
    </div>
  );
};

ContextualMenu.story = {
  name: "Contextual Menu",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nOhhbt8AO1EscJOfx60rfD/SMTX-UI-Components?node-id=130%3A1343",
    },
  },
};

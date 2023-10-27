import { Meta, StoryFn } from "@storybook/react";
import { Divider } from "antd";
import React, { Fragment } from "react";

import { CustomHeader } from "./CustomHeader.stories";
import ExpandableContainer from "./ExpandableContainer";
import ExpandableItem from "./ExpandableItem";

const values = [1, 2, 3, 4];

export const Template: StoryFn<typeof ExpandableContainer> = (args) => {
  return (
    <div style={{ padding: "20px", background: "#EDF0F7" }}>
      <ExpandableContainer {...args}>
        {values.map((v, index) => {
          return (
            <Fragment key={v}>
              <ExpandableItem header={<CustomHeader />}>
                <div>hello custom</div>
              </ExpandableItem>
              {index === values.length - 1 ? null : (
                <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
              )}
            </Fragment>
          );
        })}
      </ExpandableContainer>
    </div>
  );
};

const meta: Meta<typeof ExpandableContainer> = {
  title: "Expandable/List",
  render: Template,
};

export default meta;

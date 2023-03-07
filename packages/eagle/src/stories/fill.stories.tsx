import { PlusCircleBlueIcon } from "@cloudtower/icons-react/16/filled";
import { AlertBellGradientBlueIcon } from "@cloudtower/icons-react/24/filled";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

const IconStories = (props: any) => {
  return (
    <div>
      <div>
        16
        <div>
          <PlusCircleBlueIcon />
        </div>
      </div>
      <div>
        24
        <div>
          <AlertBellGradientBlueIcon />
        </div>
      </div>
    </div>
  );
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "icons-react/FillIcons",
  component: IconStories,
} as ComponentMeta<typeof IconStories>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconStories> = (args) => {
  return <IconStories {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};

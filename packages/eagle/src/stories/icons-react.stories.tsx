import * as Icons from "@cloudtower/icons-react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Divider } from "antd";
import _ from "lodash";
import React, { useMemo, useState } from "react";

import Input from "../components/Input";

const IconStories = (props: any) => {
  const [filter, setFilter] = useState<string>("");
  const filteredIcons = useMemo(() => {
    const keys = Object.keys(Icons).filter((k) =>
      k.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())
    );
    return _.pick(Icons, keys);
  }, [filter]);

  return (
    <div>
      <Input onChange={(e) => setFilter(e.target.value)} />
      <Divider />
      {Object.values(filteredIcons).map((I) => (
        <I />
      ))}
    </div>
  );
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "@cloudtower/react-icons",
  component: IconStories,
} as ComponentMeta<typeof IconStories>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconStories> = (args) => {
  return <IconStories {...args} />;
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {};

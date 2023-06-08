import { Divider, Space } from "antd";
import React, { useState } from "react";
import { withDesign } from "storybook-addon-designs";

import TimeZoneSelect from ".";

export const TimeZoneSelectStory = () => {
  const [value, setValue] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>();
  return (
    <Space direction="vertical">
      <Space direction="vertical">
        <h1>Basic</h1>
        <TimeZoneSelect value={value} onChange={(val) => setValue(val)} />
        <span>Selected time zone is: {value}</span>
      </Space>
      <Divider />
      <Space direction="vertical">
        <h1>Use Browser Time as Default Value</h1>
        <TimeZoneSelect
          defaultUseBrowserTime
          value={value2}
          onChange={(val) => setValue2(val)}
        />
        <span>Selected time zone is: {value2}</span>
        <button onClick={() => setValue2(undefined)}>reset</button>
      </Space>
      <Divider />
      <Space direction="vertical">
        <h1>Disabled</h1>
        <TimeZoneSelect
          value={undefined}
          disabled
          onChange={(val) => undefined}
        />
      </Space>
      <Space direction="vertical">
        <h1>Custom Placeholder</h1>
        <TimeZoneSelect
          value={undefined}
          onChange={(val) => undefined}
          placeholder="Hello, Timezone!"
        />
      </Space>
      <Space direction="vertical">
        <h1>With Default Option</h1>
        <TimeZoneSelect
          value={value3}
          onChange={(val) => setValue3(val)}
          defaultOptionValue={"Asia/Shanghai"}
        />
        <span>Selected time zone is: {value3}</span>
        <button onClick={() => setValue3(undefined)}>reset</button>
      </Space>
    </Space>
  );
};

TimeZoneSelectStory.story = {
  name: "TimeZoneSelect Field",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/cBtzODsNQn67nmdIR07mMC/%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4%E9%80%89%E6%8B%A9%E5%99%A8?node-id=2015%3A78955",
    },
  },
};

const Story = {
  title: "TimeZoneSelect",
  decorators: [withDesign],
};

export default Story;

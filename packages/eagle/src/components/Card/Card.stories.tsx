import React from "react";

import Card from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Card",
  render: Card,
};

export default meta;

export const Shadow = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card title={"hello"} collapsible={true} shadow={true} {...args}>
        Hello World
      </Card>
    </div>
  );
};

export const NoShadow = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card title={"hello"} collapsible={true} shadow={false} {...args}>
        Hello World
      </Card>
    </div>
  );
};

export const Hoverable = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card
        title={"hello"}
        collapsible={true}
        shadow={true}
        hoverable={true}
        {...args}
      >
        Hello World
      </Card>
    </div>
  );
};

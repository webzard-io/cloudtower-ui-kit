import React from "react";

import Card from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Card",
  render: Card,
  args: {},
};

export default meta;

export const DefaultCard = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card {...args}>Hello World</Card>
    </div>
  );
};

export const WithTitle = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card title={"hello"} {...args}>
        Hello World
      </Card>
    </div>
  );
};

export const Collapsible = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card title={"hello"} collapsible={true} {...args}>
        Hello World
      </Card>
    </div>
  );
};

export const NoShadow = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card shadow={false} {...args}>
        Hello World
      </Card>
    </div>
  );
};

export const Hoverable = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card
        hoverable={true}
        {...args}
        onClick={() => {
          alert("card click");
        }}
      >
        Hello World
      </Card>
    </div>
  );
};

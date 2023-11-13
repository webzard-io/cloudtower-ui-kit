import React from "react";

import Card from ".";
import LoadingShimmer from "./LoadingShimmer";

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

export const LoadingCard = (args) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#EDF0F7" }}>
      <Card
        loading={{
          shimmerStyle: {
            height: "50px",
            animationDuration: "2100ms",
          },
        }}
        {...args}
      >
        Hello World
      </Card>
    </div>
  );
};

export const SmallLoadingCard = (args) => {
  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        backgroundColor: "#EDF0F7",
      }}
    >
      <Card
        loading={{
          shimmerStyle: {
            height: "200px",
            animationDuration: "2100ms",
          },
        }}
        {...args}
      >
        Hello World
      </Card>
    </div>
  );
};

export const FastLoadingCard = (args) => {
  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        backgroundColor: "#EDF0F7",
      }}
    >
      <Card
        loading={{
          shimmerStyle: {
            height: "200px",
            animationDuration: "1100ms",
          },
        }}
        {...args}
      >
        Hello World
      </Card>
    </div>
  );
};

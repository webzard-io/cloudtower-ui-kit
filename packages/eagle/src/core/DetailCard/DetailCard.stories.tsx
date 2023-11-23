import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import DetailCard from ".";

const meta: Meta<typeof DetailCard> = {
  title: "DetailCard",
  component: DetailCard,
  parameters: {
    docs: {
      description: {
        component: "Show some things detail,with a card style",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DetailCard>;

export const StringTitleAndChildren: Story = {
  parameters: {
    docs: {
      description: {
        story: "title and children can be a string.",
      },
    },
  },
  args: {
    title: "Hello DetailCard",
    children: "Show Details Here",
  },
};

export const ComponentTitleAndChildren: Story = {
  parameters: {
    docs: {
      description: {
        story: "title and children can be a react component.",
      },
    },
  },
  args: {
    title: <h1>Hello DetailCard</h1>,
    children: <p>Show p tag Details Here</p>,
  },
};

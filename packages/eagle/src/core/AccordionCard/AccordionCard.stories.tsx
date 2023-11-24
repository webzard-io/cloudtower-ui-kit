import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import AccordionCard from ".";

const meta: Meta<typeof AccordionCard> = {
  title: "AccordionCard",
  component: AccordionCard,
  parameters: {
    docs: {
      description: {
        component: "AccordionCard default props",
      },
    },
  },
  argTypes: {
    unmountOnExit: {
      type: "boolean",
      defaultValue: true,
    },
    mountOnEnter: {
      type: "boolean",
      defaultValue: true,
    },
    defaultExpand: {
      type: "boolean",
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccordionCard>;

export const FunctionHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: "header can accept function that return component",
      },
    },
  },
  args: {
    header: (active: boolean) => {
      return <div>{active ? "active" : "inactive"}</div>;
    },
    expand: <div>expand</div>,
  },
};

export const HeaderWithCloseIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: "header can custom by user.",
      },
    },
  },
  args: {
    header: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        header
        <AccordionCard.CloseButton />
      </div>
    ),
    expand: <div>expand</div>,
  },
};

import CircleLoading from "@src/coreX/CircleLoading";
import { Meta, StoryObj } from "@storybook/react";

/**
 *
 * 目前应用场景：
 * * arcfra 中取代三角 loading
 */
export default {
  title: "CoreX/CircleLoading | 环形 Loading Indicator",
  component: CircleLoading,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MuddRtDG75MYYsfkNKTBOZ/Arcfra-%E7%9B%B8%E5%85%B3-UI-%E6%94%B9%E9%80%A0?node-id=34-10510&t=aSbvNr4s1fKyiTJA-0",
    },
  },
} satisfies Meta<typeof CircleLoading>;

type Story = StoryObj<typeof CircleLoading>;

export const Basic: Story = {
  args: {
    fullView: false,
  },
};

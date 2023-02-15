import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { pushModal } from "../../store";
import KitStoreProvider from "../KitStoreProvider";
import ModalStack from "../ModalStack";
import ImmersiveModal from "./ImmersiveModal";

export default {
  title: "Modal",
  decorators: [
    (Story) => {
      return (
        <KitStoreProvider>
          <ModalStack />
          <Story />
        </KitStoreProvider>
      );
    },
  ],
} as ComponentMeta<
  (
    props: React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  ) => JSX.Element
>;

const Template: ComponentStory<
  (
    props: React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  ) => JSX.Element
> = (args) => <button {...args}>open modal</button>;

export const ImmersiveDialog = Template.bind({});

ImmersiveDialog.args = {
  onClick: () => {
    pushModal({
      component: ImmersiveModal,
      props: {
        name: "ImmersiveModal",
      },
    });
  },
};

import {
  antdKit,
  kitContext as UIKitContext,
  KitStoreProvider,
  ModalStack,
  pushModal,
} from "@cloudtower/eagle";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import ContentErrorModal from "./modal/ContentErrorModal";
import FootErrorModal from "./modal/FootErrorModal";
import ImmersiveModal from "./modal/ImmersiveModal";

export default {
  title: "Modal",
  decorators: [
    (Story) => {
      return (
        <KitStoreProvider>
          <UIKitContext.Provider value={antdKit}>
            <ModalStack />
            <Story />
          </UIKitContext.Provider>
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

export const FootErrorDialog = Template.bind({});

FootErrorDialog.args = {
  onClick: () => {
    pushModal({
      component: FootErrorModal,
      props: {
        name: "FootErrorDialog",
      },
    });
  },
};

export const ContentErrorDialog = Template.bind({});

ContentErrorDialog.args = {
  onClick: () => {
    pushModal({
      component: ContentErrorModal,
      props: {
        name: "ContentErrorModal",
      },
    });
  },
};

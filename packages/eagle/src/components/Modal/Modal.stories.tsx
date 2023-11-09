import { Meta } from "@storybook/react";
import React from "react";

import { ModalProps } from "../../spec";
import { pushModal } from "../../store";
import Button from "../Button";
import KitStoreProvider from "../KitStoreProvider";
import ModalStack from "../ModalStack";
import Modal from ".";
import AsideModal from "./AsideModal";
import ImmersiveModal from "./ImmersiveModal";
const story: Meta<ModalProps> = {
  title: "Modal",
  component: Modal,
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
};

export default story;

export const ImmersiveDialog = (args) => {
  return (
    <Button type="primary" {...args}>
      open modal
    </Button>
  );
};

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

export const WithAside = (args) => {
  return (
    <Button type="primary" {...args}>
      open modal
    </Button>
  );
};

WithAside.args = {
  onClick: () => {
    pushModal({
      component: AsideModal,
      props: {
        name: "AsideModal",
      },
    });
  },
};
